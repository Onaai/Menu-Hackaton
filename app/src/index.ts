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

// QVAC: servidor local compatible con OpenAI. Se levanta aparte con
//   qvac serve openai --preload <modelo>
const QVAC_URL = process.env["QVAC_URL"] ?? "http://localhost:11434";
const QVAC_MODELO = process.env["QVAC_MODEL"] ?? "qvac-local";

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

const recomendadorQvac = new RecomendadorQvac(QVAC_URL, QVAC_MODELO);
const sugerencias = new SugerenciasService(menu, recomendadorQvac, new RecomendadorHeuristico(), systemClock, QVAC_MODELO);

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
const qvacArriba = await recomendadorQvac.disponible();

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
  console.log(`  IA local (QVAC)   ${qvacArriba ? ok("conectada") : mal("NO responde")}  ${gris(`${QVAC_URL} · modelo ${QVAC_MODELO}`)}`);
  if (!qvacArriba) {
    console.log(`  ${gris("    levantala con:  qvac serve openai --preload <modelo>")}`);
    console.log(`  ${gris("    sin ella las sugerencias salen del plan B, y se avisa en pantalla")}`);
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
