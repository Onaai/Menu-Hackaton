import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { AuthService } from "./application/auth-service.js";
import { RestaurantService } from "./application/restaurant-service.js";
import { SugerenciasService } from "./application/sugerencias-service.js";
import { createApiHandler } from "./api/handler.js";
import { OAuth } from "./api/oauth.js";
import { ARS_PER_USDT } from "./config/cotizacion.js";
import { demoMenu } from "./config/demo-menu.js";
import { seedDemo } from "./config/demo-seed.js";
import { imprimirBilleteras } from "./infrastructure/consola.js";
import { CuentasEnMemoria, SesionesEnMemoria } from "./infrastructure/cuentas.js";
import { InMemoryMenuCatalog, InMemorySessionRepository, systemClock, uuidGenerator } from "./infrastructure/in-memory.js";
import { RecomendadorHeuristico, RecomendadorQvac } from "./infrastructure/recomendador-qvac.js";
import { RecomendadorQvacSdk, type DescriptorModelo } from "./infrastructure/recomendador-qvac-sdk.js";
import { InMemoryWalletLedger } from "./infrastructure/wallet-ledger.js";
import { WdkWalletLedger } from "./infrastructure/wallet-wdk.js";
import { restaurantePorDefecto } from "./domain/restaurante.js";
import { LedgerConLog } from "./infrastructure/wallet-log.js";

const aqui = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(aqui, "..", "..", "public");

const port = Number(process.env["PORT"] ?? 3000);
const baseUrl = process.env["BASE_URL"] ?? `http://localhost:${port}`;

// Red y token de la simulación. Cuando se pase a WDK real, esto sale del .env
// y tiene que coincidir con la red donde de verdad está el token.
// Identificadores limpios, sin adornos: se imprimen tal cual dentro del
// comando `wdk send` de ejemplo, y un nombre con espacios lo dejaría
// impresentable. Que la simulación es simulación ya lo dice la cabecera.
const RED = process.env["WDK_NETWORK"] ?? "sepolia";
const TOKEN = process.env["WDK_TOKEN"] ?? "USDT";

// QVAC: la IA local.
//
//   QVAC_MODE=sdk       (por defecto) el modelo lo carga esta misma app con
//                       @qvac/sdk. No hay servidor que levantar aparte.
//   QVAC_MODE=http      el adaptador viejo, contra `qvac serve openai`.
//   QVAC_MODE=apagado   sin IA. Las sugerencias salen del plan B y se avisa.
const QVAC_MODE = process.env["QVAC_MODE"] ?? "sdk";
const QVAC_URL = process.env["QVAC_URL"] ?? "http://localhost:11434";
const QVAC_MODEL = process.env["QVAC_MODEL"] ?? "qvac-local";
// Cual modelo del registro de QVAC. Se midieron los dos con 60 llamadas cada
// uno (scripts/confiabilidad-qvac.mjs):
//
//                        dieta ok  sin repetir  sin copiar  mediana
//   LLAMA_3_2_1B_INST     100%        92%          93%       3,4 s
//   QWEN3_4B_INST_Q4_K_M  100%       100%         100%      10,4 s
//
// Va el 4B: 60 de 60 en todas las de confiabilidad, y cero descartes del
// validador. Los 7 segundos extra los paga una pantalla que dice "pensando"
// mientras la persona sigue leyendo la carta; una sugerencia repetida o un
// motivo copiado los ve el cliente.
//
// Con QVAC_MODELO_SDK=LLAMA_3_2_1B_INST_Q4_0 se vuelve al chico, que sigue
// siendo 100% seguro en dieta y va tres veces mas rapido.
const QVAC_MODELO_SDK = process.env["QVAC_MODELO_SDK"] ?? "QWEN3_4B_INST_Q4_K_M";
const QVAC_DEVICE = process.env["QVAC_DEVICE"] ?? "cpu";
// 4096 y no 2048: el prompt lleva la carta entera mas un ejemplo de dos turnos.
// Con la carta de demo sobra, pero una carta de restaurante de verdad —la que
// sale de scripts/menu-ocr.js— tiene cincuenta platos y desborda el contexto.
const QVAC_CTX = Number(process.env["QVAC_CTX"] ?? 4096);

// ── Cableado ────────────────────────────────────────────────────────────────
// Este archivo es el único lugar donde se elige qué adaptador concreto entra.
// Cambiar `InMemoryWalletLedger` por `WdkWalletLedger` es cambiar esta línea.

// WDK_MODE=simulado vuelve al libro en memoria. Por defecto va WDK de verdad:
// semilla BIP-39, derivación BIP-44 y motor de políticas.
const usaWdk = (process.env["WDK_MODE"] ?? "wdk") !== "simulado";
const ledgerBase = usaWdk
  ? new WdkWalletLedger({
      ...(process.env["WDK_SEED"] ? { seed: process.env["WDK_SEED"] } : {}),
      chain: RED,
      ...(process.env["EVM_RPC_URL"] ? { rpcUrl: process.env["EVM_RPC_URL"] } : {}),
      tokenAddress: process.env["WDK_TOKEN_ADDRESS"] ?? "0x0000000000000000000000000000000000000000",
      tokenDecimals: Number(process.env["WDK_TOKEN_DECIMALS"] ?? 6),
      topePorOperacionInCents: Number(process.env["WDK_TOPE_OPERACION"] ?? 15_000),
      topeDiarioInCents: Number(process.env["WDK_TOPE_DIARIO"] ?? 50_000),
    })
  : new InMemoryWalletLedger(systemClock, uuidGenerator);
const wallets = new LedgerConLog(ledgerBase, RED, TOKEN);

const menu = new InMemoryMenuCatalog(demoMenu);

const service = new RestaurantService(
  new InMemorySessionRepository(),
  menu,
  systemClock,
  uuidGenerator,
  wallets,
);

const auth = new AuthService(
  new CuentasEnMemoria(systemClock, uuidGenerator),
  new SesionesEnMemoria(systemClock),
  systemClock,
);

// El descriptor sale del registro del SDK y trae parametros, cuantizacion y
// motor. Todo lo que se muestra en pantalla sobre el modelo lo reporta QVAC:
// no hay un solo dato escrito a mano.
let descriptorQvac: DescriptorModelo | null = null;
if (QVAC_MODE === "sdk") {
  const registro = (await import("@qvac/sdk")) as unknown as Record<string, DescriptorModelo>;
  const encontrado = registro[QVAC_MODELO_SDK];
  if (!encontrado) {
    console.error(`\n  QVAC_MODELO_SDK="${QVAC_MODELO_SDK}" no existe en el registro de @qvac/sdk.`);
    process.exit(1);
  }
  descriptorQvac = encontrado;
}

const recomendadorSdk = descriptorQvac
  ? new RecomendadorQvacSdk(descriptorQvac, { device: QVAC_DEVICE, ctxSize: QVAC_CTX })
  : null;
const recomendadorQvac = recomendadorSdk ?? new RecomendadorQvac(QVAC_URL, QVAC_MODEL);
const modeloMostrado = recomendadorSdk ? recomendadorSdk.modeloUsado : QVAC_MODEL;
const sugerencias = new SugerenciasService(
  menu,
  QVAC_MODE === "apagado" ? new RecomendadorHeuristico() : recomendadorQvac,
  new RecomendadorHeuristico(),
  systemClock,
  modeloMostrado,
);

const googleClientId = process.env["GOOGLE_CLIENT_ID"];
const googleClientSecret = process.env["GOOGLE_CLIENT_SECRET"];
const oauth = new OAuth({
  baseUrl,
  ...(googleClientId ? { googleClientId } : {}),
  ...(googleClientSecret ? { googleClientSecret } : {}),
});

restaurantePorDefecto.arsPorUsdt = ARS_PER_USDT;
const semilla = await seedDemo(service, wallets);
restaurantePorDefecto.walletAddress = semilla.negocio.address;
let qvacArriba = false;
if (QVAC_MODE !== "apagado") {
  if (recomendadorSdk) {
    // Se carga ANTES de escuchar: si el banner dice "cargada", es verdad.
    // Con el modelo ya en ~/.qvac/models son ~10 s. La primera vez lo baja, y
    // por eso se avisa el progreso: 2,5 GB en silencio parece que se colgó.
    console.log(`  Cargando modelo local (${recomendadorSdk.modeloUsado})...`);
    let ultimoAviso = -1;
    qvacArriba = await recomendadorSdk.arrancar((pct, bajados, total) => {
      // De a 10%: una línea por token de progreso ensucia la terminal.
      const escalon = Math.floor(pct / 10);
      if (escalon === ultimoAviso) return;
      ultimoAviso = escalon;
      const mb = (n: number) => (n / 1e6).toFixed(0);
      console.log(`    bajando ${pct.toFixed(0)}% (${mb(bajados)}/${mb(total)} MB)`);
    });
  } else {
    qvacArriba = await recomendadorQvac.disponible();
  }
}

const server = createServer(createApiHandler({
  service,
  wallets,
  auth,
  sugerencias,
  oauth,
  publicDir,
  cookieSegura: baseUrl.startsWith("https://"),
  red: RED,
  token: TOKEN,
  restaurante: restaurantePorDefecto,
  wdk: usaWdk
    ? { activo: true, onchain: (ledgerBase as WdkWalletLedger).onchain, paquete: "@tetherto/wdk" }
    : { activo: false, onchain: false },
  ...(usaWdk ? { estadoWdk: () => (ledgerBase as WdkWalletLedger).estado() } : {}),
  ...(recomendadorSdk ? { estadoQvac: () => recomendadorSdk.estado() } : {}),
}));

server.listen(port, () => {
  const ok = (s: string) => `\x1b[32m${s}\x1b[0m`;
  const mal = (s: string) => `\x1b[31m${s}\x1b[0m`;
  const gris = (s: string) => `\x1b[90m${s}\x1b[0m`;

  console.log("");
  console.log("  ┌────────────────────────────────────────────────────────┐");
  console.log("  │  MESA ABIERTA                                          │");
  console.log("  └────────────────────────────────────────────────────────┘");
  console.log("");
  console.log(`  Cliente   ${baseUrl}/`);
  console.log(`  Cocina    ${baseUrl}/cocina.html      ${gris("← pantalla del local")}`);
  console.log(`  Caja      ${baseUrl}/billeteras.html  ${gris("← pantalla del local")}`);
  console.log("");
  if (QVAC_MODE === "apagado") {
    console.log(`  IA local (QVAC)   ${gris("apagada (QVAC_MODE=apagado)")}  ${gris("las sugerencias salen del plan B y se avisa en pantalla")}`);
  } else if (recomendadorSdk) {
    const e = recomendadorSdk.estado();
    console.log(`  IA local (QVAC)   ${qvacArriba ? ok("cargada en el proceso") : mal("NO cargó")}  ${gris(`@qvac/sdk · ${e.modelo}`)}`);
    console.log(`  ${gris(`    ${e.parametros} · ${e.cuantizacion} · ${e.motor} · ${e.device} · ctx ${e.ctxSize}`)}`);
    if (qvacArriba) {
      console.log(`  ${gris("    salida restringida por gramática: el modelo NO puede nombrar un plato que no está en la carta")}`);
    } else {
      console.log(`  ${mal(`    ${e.fallo ?? "razón desconocida"}`)}`);
    }
  } else {
    console.log(`  IA local (QVAC)   ${qvacArriba ? ok("conectada") : mal("NO responde")}  ${gris(`${QVAC_URL} · modelo ${QVAC_MODEL}`)}`);
    if (!qvacArriba) {
      console.log(`  ${gris("    levantala con:  qvac serve openai --preload <modelo>")}`);
      console.log(`  ${gris("    sin ella las sugerencias salen del plan B, y se avisa en pantalla")}`);
    }
  }
  const wdkLedger = usaWdk ? (ledgerBase as WdkWalletLedger) : null;
  console.log(`  Billetera         ${usaWdk ? ok("WDK @tetherto/wdk") : gris("simulada")}  ${gris(wdkLedger?.onchain ? `on-chain · ${process.env["EVM_RPC_URL"]}` : "sin RPC: WDK deriva y autoriza, el saldo se asienta local")}`);
  if (wdkLedger) {
    console.log(`  Políticas WDK     ${ok("activas")}  ${gris(`tope/op ${(Number(process.env["WDK_TOPE_OPERACION"] ?? 15_000) / 100).toFixed(2)} · tope/día ${(Number(process.env["WDK_TOPE_DIARIO"] ?? 50_000) / 100).toFixed(2)} USDT · solo a la caja`)}`);
  }
  console.log(`  Google OAuth      ${oauth.googleConfigurado() ? ok("configurado") : gris("modo demo (sin GOOGLE_CLIENT_ID)")}`);
  console.log(`  Apple             ${gris("modo demo — requiere cuenta Apple Developer paga")}`);
  console.log("");
  console.log(`  Cotización        1 USDT = $${ARS_PER_USDT.toLocaleString("es-AR")}`);
  console.log("");
  imprimirBilleteras(semilla.todas, RED, TOKEN, !usaWdk ? "simulado" : wdkLedger?.onchain ? "wdk-onchain" : "wdk");
  console.log(`  Mesa ${semilla.mesa.tableNumber} abierta · ${semilla.mesa.id}`);
  console.log("");
  if (usaWdk && !wdkLedger?.onchain) {
    console.log(`  ${ok("WDK autoriza cada cobro")} ${gris("· direcciones reales · SIN RED: el saldo se asienta en memoria")}`);
  } else if (usaWdk) {
    console.log(`  ${ok("WDK on-chain")} ${gris("· las transacciones se mandan a la red de verdad")}`);
  } else {
    console.log(`  ${mal("Pagos SIMULADOS")} ${gris("· libro contable en memoria")}`);
  }
  console.log(`  ${gris("Todo se borra al cortar el servidor.")}`);
  console.log("");
});

/**
 * Apagado ordenado.
 *
 * No es cosmética: si el proceso se muere sin bajar el worker de QVAC, queda
 * `~/.qvac/.worker.lock` apuntando a un pid muerto y el arranque siguiente se
 * cuelga 30 segundos y falla. Perder eso en medio de una demo es exactamente
 * la clase de cosa que no se puede permitir, así que Ctrl+C cierra el modelo.
 */
let cerrando = false;
for (const senal of ["SIGINT", "SIGTERM"] as const) {
  process.on(senal, () => {
    if (cerrando) return;
    cerrando = true;
    const listo = () => process.exit(0);
    server.close();
    if (recomendadorSdk) {
      recomendadorSdk.cerrar().then(listo, listo);
      // Si el worker no responde, no dejamos la terminal colgada.
      setTimeout(listo, 3_000).unref();
    } else {
      listo();
    }
  });
}
