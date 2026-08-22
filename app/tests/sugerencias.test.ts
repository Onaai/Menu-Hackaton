import assert from "node:assert/strict";
import test from "node:test";
import { validar, SugerenciasService } from "../src/application/sugerencias-service.js";
import { extraerCandidatos, RecomendadorHeuristico } from "../src/infrastructure/recomendador-qvac.js";
import { InMemoryMenuCatalog } from "../src/infrastructure/in-memory.js";
import { demoMenu } from "../src/config/demo-menu.js";
import { preferenciasVacias, type Preferencias } from "../src/domain/usuario.js";
import type { CandidatoCrudo, EntradaSugerencia, Recomendador } from "../src/application/ports.js";

const carta = demoMenu;
const prefs = (over: Partial<Preferencias> = {}): Preferencias => ({ ...preferenciasVacias(), ...over });

// ── Extracción: el envoltorio se perdona, el contenido no ────────────────────

test("lee el JSON limpio", () => {
  const r = extraerCandidatos('[{"id":"burger","motivo":"La pedís siempre."}]');
  assert.equal(r.length, 1);
  assert.equal(r[0]!.id, "burger");
});

test("lee el JSON envuelto en markdown, que es lo que hace un modelo chico", () => {
  const r = extraerCandidatos('Claro! Acá van:\n```json\n[{"id":"limonada","motivo":"Hace calor."}]\n```\nEspero que te sirva.');
  assert.equal(r.length, 1);
  assert.equal(r[0]!.id, "limonada");
});

test("prosa sin JSON devuelve vacío en vez de romper", () => {
  assert.deepEqual(extraerCandidatos("Te recomiendo la burger y la limonada."), []);
  assert.deepEqual(extraerCandidatos(""), []);
  assert.deepEqual(extraerCandidatos("[esto no es json}"), []);
});

test("un elemento sin id se marca como formato inválido, no se descarta en silencio", () => {
  const r = extraerCandidatos('[{"nombre":"Burger","motivo":"rica"},{"id":"burger","motivo":"ok"}]');
  assert.equal(r.length, 2);
  assert.equal(r[0]!.formatoInvalido, true);
  assert.equal(r[1]!.id, "burger");
});

// ── Validación: acá está el track ────────────────────────────────────────────

test("un plato inventado por el modelo NO llega al cliente", () => {
  const { sugerencias, descartadas } = validar(
    [{ id: "milanesa-napolitana", motivo: "Un clásico." }, { id: "burger", motivo: "La pedís siempre." }],
    carta,
    prefs(),
  );
  assert.deepEqual(sugerencias.map((s) => s.menuItemId), ["burger"]);
  assert.deepEqual(descartadas, [{ texto: "milanesa-napolitana", razon: "no-existe-en-la-carta" }]);
});

test("no se sugiere algo sin stock", () => {
  const sinPesca = carta.map((i) => (i.id === "pesca" ? { ...i, available: false } : i));
  const { sugerencias, descartadas } = validar([{ id: "pesca", motivo: "Está fresca." }], sinPesca, prefs());
  assert.equal(sugerencias.length, 0);
  assert.equal(descartadas[0]!.razon, "sin-stock");
});

test("🔴 a un celíaco no se le sugiere algo con gluten, lo diga el modelo o no", () => {
  const { sugerencias, descartadas } = validar(
    [{ id: "burger", motivo: "Te va a encantar." }, { id: "risotto", motivo: "Va con lo tuyo." }],
    carta,
    prefs({ dietas: ["sin-gluten"] }),
  );
  // La burger no declara sin-gluten: se cae, aunque el modelo insista.
  assert.deepEqual(sugerencias.map((s) => s.menuItemId), ["risotto"]);
  assert.deepEqual(descartadas, [{ texto: "Burger de la casa", razon: "rompe-la-dieta" }]);
});

test("no repite el mismo plato dos veces", () => {
  const { sugerencias, descartadas } = validar(
    [{ id: "burger", motivo: "Uno." }, { id: "burger", motivo: "Dos." }],
    carta,
    prefs(),
  );
  assert.equal(sugerencias.length, 1);
  assert.equal(descartadas[0]!.razon, "repetida");
});

test("corta en 3 aunque el modelo mande más", () => {
  const muchos = carta.slice(0, 6).map((i) => ({ id: i.id, motivo: "porque sí" }));
  assert.equal(validar(muchos, carta, prefs()).sugerencias.length, 3);
});

test("el motivo se recorta a una sola oración y se limpia", () => {
  const { sugerencias } = validar(
    [{ id: "burger", motivo: '  "La pedís siempre. Y además hoy tenemos panceta fresca del proveedor nuevo."  ' }],
    carta,
    prefs(),
  );
  assert.equal(sugerencias[0]!.motivo, "La pedís siempre.");
});

test("si el motivo viene vacío se pone uno por defecto, no un renglón en blanco", () => {
  const { sugerencias } = validar([{ id: "burger", motivo: "" }], carta, prefs());
  assert.equal(sugerencias[0]!.motivo, "Va con lo que solés pedir.");
});

test("el orden de los descartes reporta el PRIMER problema, no el último", () => {
  const sinBurger = carta.map((i) => (i.id === "burger" ? { ...i, available: false } : i));
  // Sin stock Y rompe la dieta: tiene que decir sin-stock, que es lo que se chequea antes.
  const { descartadas } = validar([{ id: "burger", motivo: "x" }], sinBurger, prefs({ dietas: ["sin-gluten"] }));
  assert.equal(descartadas[0]!.razon, "sin-stock");
});

// ── El servicio, con motores falsos ──────────────────────────────────────────

function motorFalso(nombre: Recomendador["nombre"], salida: CandidatoCrudo[], disponible = true): Recomendador {
  return {
    nombre,
    disponible: async () => disponible,
    sugerir: async (_e: EntradaSugerencia) => salida,
  };
}

const reloj = { now: () => new Date("2026-08-22T22:00:00.000Z") };
const menu = () => new InMemoryMenuCatalog(demoMenu);

test("sin historial no molesta con sugerencias", async () => {
  const s = new SugerenciasService(menu(), motorFalso("qvac-local", [{ id: "burger", motivo: "x" }]), new RecomendadorHeuristico(), reloj);
  const r = await s.para(prefs(), "Sofía");
  assert.deepEqual(r.sugerencias, []);
});

test("con historial usa el modelo local y lo dice", async () => {
  const s = new SugerenciasService(
    menu(),
    motorFalso("qvac-local", [{ id: "burger", motivo: "La pedís siempre." }]),
    new RecomendadorHeuristico(),
    reloj,
    "qwen3-4b-q4",
  );
  const r = await s.para(prefs({ historial: { burger: 3 } }), "Sofía");
  assert.equal(r.motor, "qvac-local");
  assert.equal(r.modelo, "qwen3-4b-q4");
  assert.equal(r.degradado, false);
  assert.equal(r.sugerencias.length, 1);
});

test("si el modelo no está levantado, cae al plan B y lo MARCA como degradado", async () => {
  const s = new SugerenciasService(
    menu(),
    motorFalso("qvac-local", [], false), // no disponible
    new RecomendadorHeuristico(),
    reloj,
  );
  const r = await s.para(prefs({ historial: { burger: 2 } }), "Sofía");
  assert.equal(r.motor, "heuristico");
  assert.equal(r.degradado, true);
  assert.equal(r.modelo, undefined, "sin modelo no se puede decir que hubo IA");
  assert.ok(r.sugerencias.length > 0, "el plan B igual sugiere algo");
});

test("si el modelo responde basura, cae al plan B en vez de mostrar nada", async () => {
  const s = new SugerenciasService(
    menu(),
    motorFalso("qvac-local", []), // disponible pero no devolvió nada usable
    new RecomendadorHeuristico(),
    reloj,
  );
  const r = await s.para(prefs({ historial: { limonada: 4 } }), "Emi");
  assert.equal(r.motor, "heuristico");
  assert.equal(r.degradado, true);
});

test("los descartes viajan hasta la pantalla: son la evidencia", async () => {
  const s = new SugerenciasService(
    menu(),
    motorFalso("qvac-local", [{ id: "sushi-de-salmon", motivo: "rico" }, { id: "burger", motivo: "La pedís siempre." }]),
    new RecomendadorHeuristico(),
    reloj,
  );
  const r = await s.para(prefs({ historial: { burger: 1 } }), "Sofía");
  assert.equal(r.sugerencias.length, 1);
  assert.deepEqual(r.descartadas, [{ texto: "sushi-de-salmon", razon: "no-existe-en-la-carta" }]);
});

test("el plan B no inventa: todo lo que sugiere está en la carta y disponible", async () => {
  const heuristico = new RecomendadorHeuristico();
  const salida = await heuristico.sugerir({ carta, preferencias: prefs({ historial: { limonada: 5 } }), nombre: "Emi" });
  assert.ok(salida.length > 0);
  for (const c of salida) {
    const item = carta.find((i) => i.id === c.id);
    assert.ok(item, `${c.id} tiene que existir en la carta`);
    assert.equal(item!.available, true);
  }
});
