import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, isAbsolute, relative, resolve } from "node:path";
import { HackathonExtensionsService } from "./application/hackathon-extensions-service.js";
import { RestaurantService } from "./application/restaurant-service.js";
import { createApiHandler } from "./api/handler.js";
import { demoMenu } from "./config/demo-menu.js";
import { InMemoryMenuCatalog, InMemorySessionRepository, systemClock, uuidGenerator } from "./infrastructure/in-memory.js";
import { WdkCliCheckoutGateway } from "./infrastructure/wdk-cli-checkout-gateway.js";
import { crearWdkCliSimulado } from "./infrastructure/wdk-cli-simulado.js";
import { ResilientPaymentGateway, SimulatedFallbackGateway, WdkPolicySimulationGateway } from "./infrastructure/wdk-policy-gateway.js";
import { AsistenteQvacSdk, type DescriptorModelo } from "./infrastructure/qvac-sdk-assistant.js";
import { AgenteCaja, type PoliticasAgente } from "./application/agente-caja.js";
import { MotorAgenteQvac } from "./infrastructure/motor-agente-qvac.js";
import { HerramientasWdkCli } from "./infrastructure/herramientas-wdk-cli.js";

const arsPerUsdt = Number(process.env.DEMO_ARS_PER_USDT ?? 1_000);
const paymentGateway = new ResilientPaymentGateway(
  new WdkPolicySimulationGateway({
    merchantAddress: process.env.WDK_DEMO_MERCHANT_ADDRESS ?? "0x1111111111111111111111111111111111111111",
    tokenAddress: "0xd077a400968890eacc75cdc901f0356c943e4fdb",
    arsPerUsdt,
    // Tope por pago de la politica del SDK de WDK, en unidades base (6
    // decimales), o sea 1_000_000_000 = 1000 USDT.
    //
    // Estaba en 25 USDT y frenaba cuentas normales: una mesa de cuatro da 47
    // USDT y el pago se rechazaba con "supera el limite permitido". Un tope que
    // se dispara con una cuenta comun no es una politica, es un estorbo.
    //
    // No se saca del todo a proposito: la evaluacion ALLOW/DENY del SDK es la
    // integracion de WDK y sacarla dejaria `wdk-policy-gateway.ts` sin sentido.
    // Queda alta, donde solo atrapa un monto absurdo. Con
    // WDK_DEMO_MAX_USDT_BASE_UNITS se cambia sin tocar codigo.
    maxUsdtInBaseUnits: BigInt(process.env.WDK_DEMO_MAX_USDT_BASE_UNITS ?? 1_000_000_000),
  }),
  new SimulatedFallbackGateway(),
);

const sessions = new InMemorySessionRepository();
const menu = new InMemoryMenuCatalog(demoMenu);
const service = new RestaurantService(sessions, menu, systemClock, uuidGenerator, paymentGateway);
const walletCliente = process.env.WDK_CLIENT_WALLET ?? "mesa-cliente-demo";
const walletNegocio = process.env.WDK_BUSINESS_WALLET ?? "mesa-negocio-demo";

// WDK_CLI_MODE=simulado enchufa un CLI de mentira para poder demostrar el
// recorrido sin fondear Sepolia. NO es el valor por defecto, y cuando esta
// activo se grita: en la terminal, en GET /api/config y en la pantalla del
// checkout. Ver wdk-cli-simulado.ts.
// `.trim()` y no una comparacion pelada: en cmd de Windows,
// `set WDK_CLI_MODE=simulado && npm start` guarda "simulado " CON el espacio
// de antes del &&, y la comparacion exacta daba false. El modo simulado no se
// activaba y no habia forma de darse cuenta mirando el comando.
const wdkSimulado = (process.env.WDK_CLI_MODE ?? "").trim() === "simulado";
const runnerSimulado = wdkSimulado
  ? crearWdkCliSimulado({
      saldos: {
        [walletCliente]: Number(process.env.WDK_SALDO_CLIENTE ?? 100),
        [walletNegocio]: Number(process.env.WDK_SALDO_NEGOCIO ?? 0),
      },
    })
  : undefined;

const checkoutWallet = new WdkCliCheckoutGateway({
  clientWallet: walletCliente,
  businessWallet: walletNegocio,
  arsPerUsdt,
  ...(process.env.WDK_CLI_BIN ? { executable: process.env.WDK_CLI_BIN } : {}),
  ...(process.env.WDK_CLI_TOKEN ? { tokenTicker: process.env.WDK_CLI_TOKEN } : {}),
}, runnerSimulado);
const extensions = new HackathonExtensionsService(sessions, menu, systemClock, uuidGenerator, paymentGateway, checkoutWallet);

// ── QVAC: la IA local ───────────────────────────────────────────────────────
//
//   QVAC_MODE=sdk       (por defecto) el modelo lo carga esta misma app con
//                       @qvac/sdk. No hay servidor que levantar aparte.
//   QVAC_MODE=http      el adaptador contra `qvac serve openai`.
//   QVAC_MODE=apagado   sin IA: el asistente responde con el motor
//                       determinista y la pantalla lo aclara.
//
// Cual modelo: se midieron dos con 60 llamadas cada uno
// (scripts/confiabilidad-qvac.mjs):
//
//                        dieta ok  sin repetir  sin copiar  mediana
//   LLAMA_3_2_1B_INST     100%        92%          93%       3,4 s
//   QWEN3_4B_INST_Q4_K_M  100%       100%         100%      10,4 s
//
// Va el 4B: 60 de 60 en todas las de confiabilidad. Con
// QVAC_MODELO_SDK=LLAMA_3_2_1B_INST_Q4_0 se vuelve al chico, que sigue siendo
// 100% seguro en restricciones y va tres veces mas rapido.
const qvacMode = (process.env.QVAC_MODE ?? "sdk").trim();
const qvacModelo = (process.env.QVAC_MODELO_SDK ?? "QWEN3_4B_INST_Q4_K_M").trim();

let asistente: AsistenteQvacSdk | null = null;
if (qvacMode === "sdk") {
  const registro = (await import("@qvac/sdk")) as unknown as Record<string, DescriptorModelo>;
  const descriptor = registro[qvacModelo];
  if (!descriptor) {
    console.error(`
  QVAC_MODELO_SDK="${qvacModelo}" no existe en el registro de @qvac/sdk.`);
    process.exit(1);
  }
  asistente = new AsistenteQvacSdk(descriptor, {
    device: process.env.QVAC_DEVICE ?? "cpu",
    // 4096 y no 2048: el prompt lleva la carta entera mas un ejemplo de dos
    // turnos. Con la carta de demo sobra, pero una carta de restaurante real
    // tiene cincuenta platos y desborda el contexto.
    ctxSize: Number(process.env.QVAC_CTX ?? 4096),
  });

  // Se carga ANTES de escuchar: si el arranque dice "cargado", es verdad.
  // Con el modelo ya en ~/.qvac/models son ~10 s; la primera vez lo baja, y por
  // eso se avisa el progreso: 2,5 GB en silencio parece que se colgo.
  console.log(`Cargando modelo local (${asistente.modeloUsado})...`);
  let ultimoAviso = -1;
  const listo = await asistente.arrancar((pct, bajados, total) => {
    const escalon = Math.floor(pct / 10);
    if (escalon === ultimoAviso) return;
    ultimoAviso = escalon;
    console.log(`  bajando ${pct.toFixed(0)}% (${(bajados / 1e6).toFixed(0)}/${(total / 1e6).toFixed(0)} MB)`);
  });
  if (!listo) {
    console.warn(`QVAC no cargo: ${asistente.estado().fallo}`);
    console.warn("El asistente responde con el motor determinista y la pantalla lo aclara.");
    asistente = null;
  }
}

// ── El agente de caja ───────────────────────────────────────────────────────
//
// El mismo modelo que responde el asistente del menu, operando la billetera
// del local por WDK CLI. Los topes y la allowlist salen del entorno: son
// "user-defined guardrails" de verdad, no constantes escondidas en el codigo.
//
// El agente NO puede transmitir. `wdk send` no esta en su enum de acciones;
// llega hasta el dry-run y ahi lo toma una persona. Ver agente-caja.ts.
const politicasAgente: PoliticasAgente = {
  topePorOperacion: Number(process.env.AGENTE_TOPE_OPERACION ?? 25),
  topeDiario: Number(process.env.AGENTE_TOPE_DIARIO ?? 100),
  destinatariosPermitidos: (process.env.AGENTE_DESTINATARIOS ?? "caja").split(",").map((d) => d.trim()).filter(Boolean),
  maxPasos: Number(process.env.AGENTE_MAX_PASOS ?? 5),
};
const agente = asistente
  ? new AgenteCaja(
      new MotorAgenteQvac(asistente),
      new HerramientasWdkCli(checkoutWallet, arsPerUsdt, extensions, sessions),
      ["caja", "cliente"],
      politicasAgente,
    )
  : null;

const port = Number(process.env.PORT ?? 3000);
const apiHandler = createApiHandler(service, extensions, asistente, agente);
const server = createServer(async (request, response) => {
  const pathname = new URL(request.url ?? "/", "http://localhost").pathname;
  if (pathname === "/health" || pathname.startsWith("/api/")) return apiHandler(request, response);
  const requested = pathname === "/" ? "index.html" : pathname.slice(1);
  const filePath = resolve(process.cwd(), "dist/web", requested);
  const webRoot = resolve(process.cwd(), "dist/web");
  try {
    // Contencion de la ruta, cross-platform.
    //
    // Antes esto era `filePath.startsWith(webRoot + "/")`. En Windows
    // `resolve()` devuelve la ruta con la barra invertida de Windows como
    // separador, asi que comparar contra una ruta terminada en barra normal
    // NUNCA daba true: todos los assets caian al fallback de index.html y el
    // navegador
    // rechazaba el modulo por MIME type ("Expected a JavaScript-or-Wasm module
    // script but the server responded with text/html"). O sea: `npm start` no
    // podia servir su propio frontend en Windows. En dev no se notaba porque
    // los assets los sirve Vite.
    //
    // `relative()` normaliza los separadores; si el resultado sale del arbol
    // empieza con ".." o es absoluto.
    const dentro = relative(webRoot, filePath);
    if (dentro !== "" && (dentro.startsWith("..") || isAbsolute(dentro))) throw new Error("Ruta inválida");
    const file = await readFile(filePath);
    response.writeHead(200, { "content-type": contentType(extname(filePath)) });
    response.end(file);
  } catch {
    try {
      const index = await readFile(resolve(webRoot, "index.html"));
      response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      response.end(index);
    } catch {
      response.writeHead(503, { "content-type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({ error: { code: "WEB_NOT_BUILT", message: "Ejecutá npm run build:web." } }));
    }
  }
});

server.listen(port, () => {
  console.log(`Al Toque · API disponible en http://localhost:${port}`);
  console.log("Datos de pedidos en memoria: se reinician al detener el servidor.");
  console.log(`WDK CLI: cliente=${walletCliente} negocio=${walletNegocio} red=Sepolia`);
  if (wdkSimulado) {
    console.log("  [33m*** WDK CLI SIMULADO ***[0m no se ejecuta el binario wdk y NO hay transaccion on-chain.");
    console.log(`  saldo inicial: cliente ${process.env.WDK_SALDO_CLIENTE ?? 100} USDT · negocio ${process.env.WDK_SALDO_NEGOCIO ?? 0} USDT`);
    console.log("  para el cobro de verdad: sacar WDK_CLI_MODE y desbloquear las wallets con wdk wallet unlock");
  }
  if (asistente) {
    const e = asistente.estado();
    console.log(`QVAC local: ${e.modelo} · ${e.parametros} · ${e.cuantizacion} · ${e.device} · ctx ${e.ctxSize}`);
    console.log("  salida restringida por gramatica: el modelo NO puede nombrar un plato fuera de la carta");
    console.log(`Agente de caja: activo · tope/op ${politicasAgente.topePorOperacion} USDT · tope/dia ${politicasAgente.topeDiario} USDT · solo a: ${politicasAgente.destinatariosPermitidos.join(", ")}`);
    console.log("  el agente llega hasta el dry-run: transmitir lo dispara una persona");
  } else {
    console.log(`QVAC local: apagado (QVAC_MODE=${qvacMode}) · el asistente usa el motor determinista`);
  }
});

/**
 * Apagado ordenado.
 *
 * No es cosmetica: si el proceso se muere sin bajar el worker de QVAC queda
 * ~/.qvac/.worker.lock apuntando a un pid muerto y el arranque siguiente se
 * cuelga 30 segundos. Perder eso en medio de una demo no se puede permitir.
 */
let cerrando = false;
for (const senal of ["SIGINT", "SIGTERM"] as const) {
  process.on(senal, () => {
    if (cerrando) return;
    cerrando = true;
    const salir = () => process.exit(0);
    server.close();
    if (asistente) {
      asistente.cerrar().then(salir, salir);
      setTimeout(salir, 3_000).unref();
    } else salir();
  });
}

function contentType(extension: string) {
  const types: Record<string, string> = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".ico": "image/x-icon",
  };
  return types[extension] ?? "application/octet-stream";
}
