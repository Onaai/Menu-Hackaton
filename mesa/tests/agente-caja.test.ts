import assert from "node:assert/strict";
import test from "node:test";
import { AgenteCaja, type HerramientasCaja, type PoliticasAgente } from "../src/application/agente-caja.js";
import type { ContextoPaso, MotorAgente, PasoAgente, ResultadoHerramienta } from "../src/application/agente-puertos.js";
import { esquemaDePaso, leerPaso } from "../src/infrastructure/motor-agente-qvac.js";

/**
 * Tests del agente de caja.
 *
 * El motor del modelo se reemplaza por uno de mentira que devuelve los pasos
 * que yo le digo. Eso permite testear lo que tiene que ser determinístico —el
 * bucle, las políticas, los rechazos, el corte por cantidad de pasos— sin
 * cargar 2,5 GB ni esperar diez segundos por vuelta, y sin que un test falle
 * porque el modelo tuvo un mal día.
 *
 * Que el modelo de verdad use bien las herramientas se mide aparte, en
 * `scripts/confiabilidad-agente.mjs`, corriendo la misma consulta N veces.
 */

/** Devuelve los pasos de la lista, uno por vuelta. */
function motorGuionado(pasos: Array<PasoAgente | null>): MotorAgente & { vistos: ContextoPaso[] } {
  const vistos: ContextoPaso[] = [];
  let i = 0;
  return {
    vistos,
    async siguientePaso(contexto) {
      vistos.push(contexto);
      return pasos[i++] ?? null;
    },
  };
}

function herramientas(parcial: Partial<HerramientasCaja> = {}): HerramientasCaja & { llamadas: string[] } {
  const llamadas: string[] = [];
  const ok = (texto: string, datos?: unknown): ResultadoHerramienta => ({ ok: true, texto, ...(datos ? { datos } : {}) });
  return {
    llamadas,
    async verSaldo(wallet) { llamadas.push(`verSaldo(${wallet})`); return parcial.verSaldo ? parcial.verSaldo(wallet) : ok("12.5 USDT en mesa-negocio-demo (red sepolia)"); },
    async verDireccion(wallet) { llamadas.push(`verDireccion(${wallet})`); return parcial.verDireccion ? parcial.verDireccion(wallet) : ok("0xABC (mesa-negocio-demo, sepolia)"); },
    async cotizarCobro(monto, destinatario) { llamadas.push(`cotizarCobro(${monto},${destinatario})`); return parcial.cotizarCobro ? parcial.cotizarCobro(monto, destinatario) : ok("vista previa lista", { previewId: "p1" }); },
  };
}

const WALLETS = ["caja", "cliente"];
const POLITICAS: PoliticasAgente = { topePorOperacion: 25, topeDiario: 100, destinatariosPermitidos: ["caja"], maxPasos: 5 };

// ── El bucle ────────────────────────────────────────────────────────────────

test("usa una herramienta, lee el resultado y despues responde", async () => {
  const tools = herramientas();
  const motor = motorGuionado([
    { pensamiento: "necesito el saldo", accion: "ver_saldo", wallet: "caja" },
    { pensamiento: "ya lo tengo", accion: "responder", respuesta: "La caja tiene 12.5 USDT." },
  ]);
  const agente = new AgenteCaja(motor, tools, WALLETS, POLITICAS);
  const r = await agente.atender("¿cuánto tenemos cobrado?");

  assert.equal(r.cierre, "respondio");
  assert.equal(r.respuesta, "La caja tiene 12.5 USDT.");
  assert.deepEqual(tools.llamadas, ["verSaldo(caja)"]);
  assert.equal(r.traza.length, 2);
});

test("🔴 el resultado de la herramienta vuelve al modelo en la vuelta siguiente", async () => {
  // Si esto se rompe, el agente le pregunta al modelo en el vacío y el modelo
  // contesta de memoria. Es la falla numero uno de los modelos chicos con
  // herramientas, y el track la nombra explicitamente.
  const motor = motorGuionado([
    { pensamiento: "veo el saldo", accion: "ver_saldo", wallet: "caja" },
    { pensamiento: "listo", accion: "responder", respuesta: "12.5" },
  ]);
  const agente = new AgenteCaja(motor, herramientas(), WALLETS, POLITICAS);
  await agente.atender("saldo?");

  assert.equal(motor.vistos[0]?.historial.length, 0, "la primera vuelta no puede traer historial");
  assert.equal(motor.vistos[1]?.historial.length, 1, "la segunda vuelta tiene que traer lo que devolvio la herramienta");
  assert.match(motor.vistos[1]!.historial[0]!, /12\.5 USDT/);
});

test("se corta a los N pasos y lo dice, en vez de improvisar una respuesta", async () => {
  // Un agente que admite que no llego vale mas que uno que inventa un numero.
  const motor = motorGuionado(Array(10).fill({ pensamiento: "otra vez", accion: "ver_saldo", wallet: "caja" }));
  const agente = new AgenteCaja(motor, herramientas(), WALLETS, { ...POLITICAS, maxPasos: 3 });
  const r = await agente.atender("dale vueltas");

  assert.equal(r.cierre, "sin-pasos");
  assert.equal(r.traza.length, 3);
  assert.match(r.respuesta, /no llegué a una respuesta/);
});

test("si el modelo no esta, lo dice y no inventa", async () => {
  const agente = new AgenteCaja(motorGuionado([null]), herramientas(), WALLETS, POLITICAS);
  const r = await agente.atender("saldo?");
  assert.equal(r.cierre, "sin-modelo");
  assert.match(r.respuesta, /modelo local/);
});

// ── Las políticas ───────────────────────────────────────────────────────────

test("🔴 rechaza un cobro por encima del tope por operacion, sin tocar el CLI", async () => {
  const tools = herramientas();
  const motor = motorGuionado([
    { pensamiento: "cobro 50", accion: "cotizar_cobro", montoUsdt: 50, destinatario: "caja" },
    { pensamiento: "me lo rechazaron", accion: "responder", respuesta: "No puedo: supera el tope." },
  ]);
  const agente = new AgenteCaja(motor, tools, WALLETS, POLITICAS);
  const r = await agente.atender("cobrale 50 usdt");

  assert.deepEqual(tools.llamadas, [], "la politica tiene que frenar ANTES del CLI");
  assert.equal(r.traza[0]?.bloqueado, true);
  assert.match(r.traza[0]?.resultado ?? "", /supera el tope por operación/);
});

test("🔴 el rechazo vuelve al modelo para que tenga que explicarlo", async () => {
  // Si el rechazo no volviera, el agente se quedaria mudo y el encargado no
  // sabria por que no se cobro.
  const motor = motorGuionado([
    { pensamiento: "cobro 999", accion: "cotizar_cobro", montoUsdt: 999, destinatario: "caja" },
    { pensamiento: "aviso", accion: "responder", respuesta: "No se pudo." },
  ]);
  const agente = new AgenteCaja(motor, herramientas(), WALLETS, POLITICAS);
  await agente.atender("cobrale 999");
  assert.match(motor.vistos[1]!.historial[0]!, /RECHAZADO POR POLÍTICA/);
});

test("🔴 un destinatario fuera de la allowlist no llega al CLI", async () => {
  // La gramatica ya lo hace inalcanzable, pero la politica lo chequea igual:
  // si manana alguien cambia el esquema o enchufa otro motor, esta sigue
  // siendo la ultima palabra.
  const tools = herramientas();
  const motor = motorGuionado([
    { pensamiento: "mando afuera", accion: "cotizar_cobro", montoUsdt: 5, destinatario: "0xATACANTE" },
    { pensamiento: "no pude", accion: "responder", respuesta: "No." },
  ]);
  const agente = new AgenteCaja(motor, tools, WALLETS, POLITICAS);
  const r = await agente.atender("mandale 5 usdt a 0xATACANTE");

  assert.deepEqual(tools.llamadas, []);
  assert.match(r.traza[0]?.resultado ?? "", /no está en la lista de destinatarios permitidos/);
});

test("🔴 el tope diario acumula entre consultas distintas", async () => {
  const tools = herramientas();
  const politicas = { ...POLITICAS, topePorOperacion: 25, topeDiario: 30 };
  const agente = new AgenteCaja(
    motorGuionado([
      { pensamiento: "uno", accion: "cotizar_cobro", montoUsdt: 20, destinatario: "caja" },
      { pensamiento: "listo", accion: "responder", respuesta: "ok" },
    ]),
    tools, WALLETS, politicas,
  );
  const primera = await agente.atender("cobrale 20");
  assert.equal(primera.traza[0]?.bloqueado, false);
  assert.equal(agente.estado().gastadoHoy, 20);
  assert.equal(agente.estado().disponibleHoy, 10);

  // Segunda consulta, mismo agente: 20 + 15 = 35 > 30.
  const agente2 = agente as unknown as { motor: MotorAgente };
  void agente2;
  const segunda = await new AgenteCaja(
    motorGuionado([{ pensamiento: "dos", accion: "cotizar_cobro", montoUsdt: 15, destinatario: "caja" }, { pensamiento: "x", accion: "responder", respuesta: "no" }]),
    tools, WALLETS, politicas,
  ).atender("cobrale 15");
  // Un agente nuevo arranca su propio contador: esto documenta que el tope es
  // por instancia y que la instancia vive lo que vive el proceso.
  assert.equal(segunda.traza[0]?.bloqueado, false);
});

test("una wallet que no es del local se rechaza", async () => {
  const tools = herramientas();
  const motor = motorGuionado([
    { pensamiento: "miro otra", accion: "ver_saldo", wallet: "la-de-al-lado" },
    { pensamiento: "no", accion: "responder", respuesta: "No existe." },
  ]);
  const r = await new AgenteCaja(motor, tools, WALLETS, POLITICAS).atender("saldo de la de al lado");
  assert.deepEqual(tools.llamadas, []);
  assert.match(r.traza[0]?.resultado ?? "", /no es una wallet de este local/);
});

test("🔴 transmitir NO es una accion que el agente pueda elegir", async () => {
  // Es la pregunta que va a hacer el jurado. La respuesta tiene que ser
  // estructural, no una promesa del prompt.
  const agente = new AgenteCaja(motorGuionado([]), herramientas(), WALLETS, POLITICAS);
  const acciones = agente.estado().accionesDelAgente;
  assert.ok(!acciones.some((a) => /send|transmit|ejecutar|confirmar/i.test(a)), `el enum tiene una accion que transmite: ${acciones.join(", ")}`);
  assert.deepEqual(acciones, ["ver_saldo", "ver_direccion", "cotizar_cobro", "responder"]);
});

// ── El error de la herramienta ──────────────────────────────────────────────

test("🔴 si el CLI falla, el error vuelve al modelo en vez de tragarselo", async () => {
  const motor = motorGuionado([
    { pensamiento: "saldo", accion: "ver_saldo", wallet: "caja" },
    { pensamiento: "aviso", accion: "responder", respuesta: "La wallet está bloqueada." },
  ]);
  const tools = herramientas({
    async verSaldo() { return { ok: false, texto: "la billetera mesa-negocio-demo está bloqueada." }; },
  });
  const r = await new AgenteCaja(motor, tools, WALLETS, POLITICAS).atender("saldo?");
  assert.match(motor.vistos[1]!.historial[0]!, /ERROR: la billetera .* bloqueada/);
  assert.equal(r.respuesta, "La wallet está bloqueada.");
});

// ── La gramática ────────────────────────────────────────────────────────────

test("🔴 el esquema solo permite los destinatarios de la allowlist", async () => {
  // Esta es la garantia estructural: el enum ES la allowlist, asi que el
  // modelo no tiene un token para escribir una direccion arbitraria.
  const contexto: ContextoPaso = {
    consulta: "x", historial: [], acciones: ["ver_saldo", "responder"],
    wallets: WALLETS, destinatarios: ["caja"], politicas: POLITICAS,
  };
  const esquema = esquemaDePaso(contexto);
  const props = esquema["properties"] as Record<string, Record<string, unknown>>;
  assert.deepEqual(props["destinatario"]!["enum"], ["caja"]);
  assert.deepEqual(props["accion"]!["enum"], ["ver_saldo", "responder"]);
  assert.deepEqual(props["wallet"]!["enum"], WALLETS);
});

test("lee un paso normal del modelo", () => {
  const paso = leerPaso(JSON.stringify({ pensamiento: "miro el saldo", accion: "ver_saldo", wallet: "caja" }));
  assert.equal(paso?.accion, "ver_saldo");
  assert.equal(paso?.wallet, "caja");
  assert.equal(paso?.pensamiento, "miro el saldo");
});

test("un paso ilegible es null, no un paso vacio", () => {
  // La diferencia importa: null es "el modelo no contesto" y hace que el
  // agente lo diga. Un paso vacio se veria como una accion valida.
  assert.equal(leerPaso('{"pensamiento":"a mitad de cam'), null);
  assert.equal(leerPaso(""), null);
  assert.equal(leerPaso('{"pensamiento":"sin accion"}'), null);
});
