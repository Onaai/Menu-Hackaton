/**
 * depurar-agente.mjs — una sola consulta, con el JSON crudo del modelo a la
 * vista. Para cuando el arnes dice que falla y hay que ver por que.
 *
 *   node scripts/depurar-agente.mjs "¿cuánto tenemos en la caja?"
 */
import * as qvac from "@qvac/sdk";
import { AgenteCaja } from "../dist/server/src/application/agente-caja.js";
import { AsistenteQvacSdk } from "../dist/server/src/infrastructure/qvac-sdk-assistant.js";
import { esquemaDePaso, armarPrompt, leerPaso } from "../dist/server/src/infrastructure/motor-agente-qvac.js";

const consulta = process.argv[2] ?? "¿cuánto tenemos en la caja?";
const asistente = new AsistenteQvacSdk(qvac.QWEN3_4B_INST_Q4_K_M, { device: "cpu", ctxSize: 4096 });
if (!(await asistente.arrancar())) { console.error(asistente.estado().fallo); process.exit(1); }

const SALDO = "37.42";
const tools = {
  llamadas: [],
  async verSaldo(w) { tools.llamadas.push(`verSaldo(${w})`); return { ok: true, texto: `${SALDO} USDT en mesa-negocio-demo (red sepolia)` }; },
  async verDireccion(w) { tools.llamadas.push(`verDireccion(${w})`); return { ok: true, texto: `0x9f2C41aB (mesa-negocio-demo, sepolia)` }; },
  async cotizarCobro(m, d) { tools.llamadas.push(`cotizarCobro(${m},${d})`); return { ok: true, texto: `vista previa lista: ${m} USDT a mesa-negocio-demo. NO se transmitio: falta que una persona confirme.` }; },
};

// Motor que ademas imprime el JSON crudo, para ver que emitio la gramatica.
const motorEspia = {
  async siguientePaso(contexto) {
    const texto = await asistente.completarConEsquema(
      SISTEMA_DE(contexto), armarPrompt(contexto), esquemaDePaso(contexto),
    );
    console.log(`\n  ── vuelta ${contexto.historial.length + 1} ──`);
    console.log(`  prompt: ${armarPrompt(contexto).replace(/\n/g, "\n          ")}`);
    console.log(`  CRUDO:  ${texto}`);
    return texto === null ? null : leerPaso(texto);
  },
};

// Se reimplementa el sistema porque no se exporta; con que sea el mismo texto
// alcanza para depurar.
const SISTEMA_DE = (contexto) => `Sos el asistente de caja de un restaurante. Operás la billetera del local con las herramientas que tenés, una por vez.

HERRAMIENTAS
- ver_saldo(wallet): cuánto USDT tiene esa billetera. wallet: ${contexto.wallets.join(" | ")}
- ver_direccion(wallet): la dirección pública de esa billetera.
- cotizar_cobro(montoUsdt, destinatario): prepara un cobro y devuelve la vista previa. NO cobra: la confirma una persona.
- responder(respuesta): cuando ya sabés la respuesta, contestale al encargado.

REGLAS
- Una acción por vez. Primero averiguás, después respondés.
- Los números los sacás de lo que devolvió la herramienta. Nunca de tu memoria.
- Si una herramienta devuelve ERROR o RECHAZADO, no lo escondas: respondé explicando qué pasó.
- El tope por operación es ${contexto.politicas.topePorOperacion} USDT y el diario ${contexto.politicas.topeDiario} USDT.
- Solo podés cobrar a: ${contexto.destinatarios.join(", ")}.
- En "pensamiento" escribí en una línea por qué elegís esa acción.`;

const agente = new AgenteCaja(motorEspia, tools, ["caja", "cliente"], {
  topePorOperacion: 25, topeDiario: 100, destinatariosPermitidos: ["caja"], maxPasos: 5,
});

console.log(`\nCONSULTA: "${consulta}"`);
const r = await agente.atender(consulta);

console.log(`\n${"─".repeat(70)}`);
console.log(`herramientas llamadas: ${tools.llamadas.join(", ") || "(ninguna)"}`);
console.log(`cierre: ${r.cierre} · ${r.latenciaTotalMs} ms`);
console.log(`respuesta: ${JSON.stringify(r.respuesta)}`);
console.log(`contiene "${SALDO}": ${r.respuesta.includes(SALDO)}`);
await asistente.cerrar();
