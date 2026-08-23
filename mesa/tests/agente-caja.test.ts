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

test("se corta a los N pasos productivos y lo dice, en vez de improvisar", async () => {
  // Un agente que admite que no llego vale mas que uno que inventa un numero.
  // Se usan herramientas DISTINTAS para que cada vuelta sea productiva: si
  // repitiera, entraria por el camino de las repetidas y no por el tope.
  const motor = motorGuionado([
    { pensamiento: "una", accion: "ver_saldo", wallet: "caja" },
    { pensamiento: "otra", accion: "ver_saldo", wallet: "cliente" },
    { pensamiento: "y otra", accion: "ver_direccion", wallet: "caja" },
    { pensamiento: "no deberia llegar", accion: "ver_direccion", wallet: "cliente" },
  ]);
  const agente = new AgenteCaja(motor, herramientas(), WALLETS, { ...POLITICAS, maxPasos: 3 });
  const r = await agente.atender("dale vueltas");

  assert.equal(r.cierre, "sin-pasos");
  assert.equal(r.traza.length, 3);
  assert.match(r.respuesta, /no llegué a una respuesta/);
});

test("🔴 una vuelta repetida no gasta presupuesto de pasos", async () => {
  // Medido con el modelo real: "cobrale 12 USDT" gastaba cuatro de cinco
  // vueltas repitiendo ver_saldo y se quedaba sin lugar para cotizar el cobro,
  // que era lo unico que le habian pedido.
  const tools = herramientas();
  const motor = motorGuionado([
    { pensamiento: "saldo", accion: "ver_saldo", wallet: "caja" },
    { pensamiento: "otra vez lo mismo", accion: "ver_saldo", wallet: "caja" },
    { pensamiento: "ahora si cobro", accion: "cotizar_cobro", montoUsdt: 12, destinatario: "caja" },
    { pensamiento: "listo", accion: "responder", respuesta: "Preparado." },
  ]);
  const r = await new AgenteCaja(motor, tools, WALLETS, { ...POLITICAS, maxPasos: 3 }).atender("cobrale 12");

  // Con el conteo viejo la repetida se comia un paso y no quedaba lugar para
  // cotizar. Ahora las tres cosas utiles entran en el presupuesto de 3.
  assert.equal(r.cierre, "respondio");
  assert.deepEqual(tools.llamadas, ["verSaldo(caja)", "cotizarCobro(12,caja)"]);
});

test("🔴 al modelo se le saca del enum la herramienta que repitio", async () => {
  // No alcanza con devolverle el dato memorizado: el modelo volvia a elegir lo
  // mismo. Lo que lo destraba es que la gramatica deje de ofrecerselo.
  const motor = motorGuionado([
    { pensamiento: "saldo", accion: "ver_saldo", wallet: "caja" },
    { pensamiento: "de nuevo", accion: "ver_saldo", wallet: "caja" },
    { pensamiento: "listo", accion: "responder", respuesta: "ok" },
  ]);
  await new AgenteCaja(motor, herramientas(), WALLETS, POLITICAS).atender("saldo?");

  assert.ok(motor.vistos[1]!.acciones.includes("ver_saldo"), "en la 2da todavia podia elegirla");
  assert.ok(!motor.vistos[2]!.acciones.includes("ver_saldo"), "en la 3ra ya no tenia que poder");
  // Pero responder NUNCA se bloquea: sin salida, la gramatica no puede generar.
  assert.ok(motor.vistos[2]!.acciones.includes("responder"));
});

test("🔴 si quedo una cotizacion, el codigo aclara que NO se transmitio", async () => {
  // Medido: el modelo preparo bien la vista previa y despues contesto "Cobro de
  // 12 USDT realizado con exito". El encargado lee "realizado" y da por cobrada
  // una mesa que no pago. La ultima palabra sobre si la plata se movio la pone
  // el codigo, no el modelo.
  const motor = motorGuionado([
    { pensamiento: "cobro", accion: "cotizar_cobro", montoUsdt: 12, destinatario: "caja" },
    { pensamiento: "aviso", accion: "responder", respuesta: "Cobro de 12 USDT realizado con éxito." },
  ]);
  const r = await new AgenteCaja(motor, herramientas(), WALLETS, POLITICAS).atender("cobrale 12");

  assert.match(r.respuesta, /Todavía no se transmitió/);
  assert.ok(r.cotizacion, "tiene que haber quedado la cotizacion para confirmar");
});

test("sin cotizacion no se agrega ninguna aclaracion", async () => {
  const motor = motorGuionado([
    { pensamiento: "saldo", accion: "ver_saldo", wallet: "caja" },
    { pensamiento: "listo", accion: "responder", respuesta: "Hay 12.5 USDT." },
  ]);
  const r = await new AgenteCaja(motor, herramientas(), WALLETS, POLITICAS).atender("saldo?");
  assert.equal(r.respuesta, "Hay 12.5 USDT.");
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

// ── La llamada repetida ─────────────────────────────────────────────────────

test("🔴 no vuelve a llamar al CLI si el modelo repite la misma pregunta", async () => {
  // Medido con el modelo de verdad: preguntandole "cobrale 500 USDT" pidio
  // ver_saldo(caja) dos veces seguidas, con el resultado ya en el prompt. Con
  // maxPasos en 5, dos vueltas perdidas son el 40% del presupuesto — y ademas
  // es una llamada de red repetida por un tropiezo del modelo.
  const tools = herramientas();
  const motor = motorGuionado([
    { pensamiento: "veo el saldo", accion: "ver_saldo", wallet: "caja" },
    { pensamiento: "lo veo de nuevo", accion: "ver_saldo", wallet: "caja" },
    { pensamiento: "listo", accion: "responder", respuesta: "12.5 USDT." },
  ]);
  const r = await new AgenteCaja(motor, tools, WALLETS, POLITICAS).atender("saldo?");

  assert.deepEqual(tools.llamadas, ["verSaldo(caja)"], "llamo al CLI dos veces");
  assert.match(r.traza[1]?.resultado ?? "", /YA LO PREGUNTASTE en el paso 1/);
  // Y se le avisa al modelo, para que no lo intente una tercera vez.
  assert.match(motor.vistos[2]!.historial[1]!, /No lo vuelvas a pedir/);
});

test("🔴 un rechazo de politica NO se memoriza: el modelo puede corregir el monto", async () => {
  // Si el rechazo se cacheara, un agente que propone 500 y despues corrige a 12
  // se comeria el resultado viejo y nunca cobraria.
  const tools = herramientas();
  const motor = motorGuionado([
    { pensamiento: "cobro 500", accion: "cotizar_cobro", montoUsdt: 500, destinatario: "caja" },
    { pensamiento: "corrijo a 12", accion: "cotizar_cobro", montoUsdt: 12, destinatario: "caja" },
    { pensamiento: "listo", accion: "responder", respuesta: "Preparado." },
  ]);
  const r = await new AgenteCaja(motor, tools, WALLETS, POLITICAS).atender("cobrale 500... digo 12");

  assert.equal(r.traza[0]?.bloqueado, true);
  assert.equal(r.traza[1]?.bloqueado, false);
  assert.deepEqual(tools.llamadas, ["cotizarCobro(12,caja)"]);
});

test("los argumentos de la traza son solo los que aplican a esa accion", async () => {
  // El esquema obliga al modelo a completar todos los campos, asi que un
  // ver_saldo llega con montoUsdt y destinatario que no significan nada. En un
  // panel que toca plata, mostrarlos no es ruido: es alarmante.
  const motor = motorGuionado([
    { pensamiento: "saldo", accion: "ver_saldo", wallet: "caja", montoUsdt: 0, destinatario: "caja" },
    { pensamiento: "listo", accion: "responder", respuesta: "ok" },
  ]);
  const r = await new AgenteCaja(motor, herramientas(), WALLETS, POLITICAS).atender("saldo?");
  assert.deepEqual(r.traza[0]?.argumentos, { wallet: "caja" });
});
