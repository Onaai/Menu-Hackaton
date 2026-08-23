import assert from "node:assert/strict";
import { test } from "node:test";
import { esquemaDeSugerencias, explicar, leerRespuesta, recortarBien } from "../src/infrastructure/recomendador-qvac-sdk.js";
import { armarPrompt, platosElegibles, RecomendadorHeuristico } from "../src/infrastructure/recomendador-qvac.js";
import type { MenuItem } from "../src/domain/model.js";
import type { Preferencias } from "../src/domain/usuario.js";

/**
 * Tests del adaptador de QVAC.
 *
 * Ojo con lo que NO se testea acá: que el modelo acierte. Un test que dependa
 * de lo que devuelve un modelo de 1B es un test que va a fallar solo un martes
 * cualquiera. La evidencia de que el modelo anda está en
 * `scripts/evidencia-qvac.mjs`, que es una corrida de verdad y se lee a ojo.
 *
 * Acá se testea lo determinístico: el esquema que se manda, lo que se hace con
 * la respuesta, y sobre todo que la dieta se respete.
 */

function plato(id: string, name: string, opciones: Partial<MenuItem> = {}): MenuItem {
  return {
    id,
    name,
    description: "",
    category: "Principales",
    priceInCents: 100_000,
    available: true,
    prepMinutes: 10,
    ...opciones,
  } as MenuItem;
}

const carta: MenuItem[] = [
  plato("burger", "Burger de la casa"),
  plato("risotto", "Risotto de hongos", { diet: ["vegetariano", "sin-gluten"] }),
  plato("pesca", "Pesca del día", { diet: ["sin-gluten"] }),
  plato("volcan", "Volcán de chocolate", { diet: ["vegetariano"], available: false }),
];

const prefs = (parcial: Partial<Preferencias> = {}): Preferencias => ({
  dietas: [],
  evita: [],
  historial: {},
  ...parcial,
});

// ── Lo que se le ofrece al modelo ───────────────────────────────────────────

test("los elegibles sacan lo que no tiene stock", () => {
  const ids = platosElegibles(carta, prefs()).map((i) => i.id);
  assert.deepEqual(ids, ["burger", "risotto", "pesca"]);
});

test("los elegibles sacan lo que rompe la dieta", () => {
  const ids = platosElegibles(carta, prefs({ dietas: ["sin-gluten"] })).map((i) => i.id);
  assert.deepEqual(ids, ["risotto", "pesca"]);
});

test("🔴 la gramática no puede nombrar un plato con gluten si la clienta es celíaca", () => {
  // Este es EL test. El enum del esquema es la lista de ids que el modelo puede
  // escribir; si "burger" aparece acá, un modelo de 1B puede recomendárselo a
  // alguien que marcó sin TACC. No es una recomendación fea: es una internación.
  const ids = platosElegibles(carta, prefs({ dietas: ["sin-gluten"] })).map((i) => i.id);
  const esquema = esquemaDeSugerencias(ids);
  const props = (esquema["properties"] as Record<string, Record<string, Record<string, Record<string, Record<string, unknown>>>>>);
  const enumerado = props["sugerencias"]!["items"]!["properties"]!["id"]!["enum"] as string[];

  assert.ok(!enumerado.includes("burger"), "burger tiene gluten y está en el enum");
  assert.deepEqual(enumerado, ["risotto", "pesca"]);
});

test("el prompt le muestra exactamente los mismos platos que el enum", () => {
  // Si se separan, el modelo lee un plato que la gramática no lo deja escribir.
  const p = prefs({ dietas: ["sin-gluten"], historial: { burger: 3 } });
  const texto = armarPrompt({ carta, preferencias: p, nombre: "Sofía" });
  const ids = platosElegibles(carta, p).map((i) => i.id);

  for (const id of ids) assert.ok(texto.includes(`id=${id}`), `falta ${id} en el prompt`);
  assert.ok(!texto.includes("id=burger"), "el prompt ofrece un plato que el enum prohíbe");
  // Pero el historial sí lo menciona: que lo haya pedido antes es contexto útil.
  assert.ok(texto.includes("Burger de la casa (3 veces)"));
});

test("el esquema limita a 3 sugerencias y exige los dos campos", () => {
  const esquema = esquemaDeSugerencias(["risotto"]);
  const lista = (esquema["properties"] as Record<string, Record<string, unknown>>)["sugerencias"]!;
  assert.equal(lista["maxItems"], 3);
  const items = lista["items"] as Record<string, unknown>;
  assert.deepEqual(items["required"], ["id", "motivo"]);
});

// ── Lo que se hace con la respuesta ─────────────────────────────────────────

test("lee la respuesta normal del modelo", () => {
  const texto = JSON.stringify({ sugerencias: [{ id: "risotto", motivo: "Te gusta el hongo." }] });
  assert.deepEqual(leerRespuesta(texto), [{ id: "risotto", motivo: "Te gusta el hongo." }]);
});

test("un JSON cortado a la mitad no rompe el request", () => {
  // Pasa si la generación se corta por límite de tokens.
  assert.deepEqual(leerRespuesta('{"sugerencias":[{"id":"risotto","mot'), []);
  assert.deepEqual(leerRespuesta(""), []);
  assert.deepEqual(leerRespuesta("no soy JSON"), []);
});

test("marca formato inválido en vez de tirar el elemento sin decir nada", () => {
  const texto = JSON.stringify({ sugerencias: [{ motivo: "sin id" }, "una cadena suelta"] });
  const r = leerRespuesta(texto);
  assert.equal(r.length, 2);
  assert.ok(r.every((c) => c.formatoInvalido));
});

test("🔴 recorta sin partir la palabra por la mitad", () => {
  // La gramática corta contando caracteres. Salió al aire un "...que esté
  // sin-gl": una oración mutilada que se lee como un error de la app.
  const largo = "Te gusta el sabor de la menta y no te gusta la idea de que esté sin-gluten hoy";
  const r = recortarBien(largo, 40);
  assert.ok(r.length <= 41, `quedó en ${r.length}`);
  assert.ok(!r.includes("sin-gl…"), "cortó la palabra al medio");
  assert.ok(r.endsWith("…"));
  assert.ok(!r.includes(" …"), "quedó un espacio colgado antes de los puntos");
});

test("lo que entra corto sale igual, sin puntos suspensivos", () => {
  assert.equal(recortarBien("Te gusta el hongo.", 80), "Te gusta el hongo.");
});

// ── El plan B ───────────────────────────────────────────────────────────────

test("🔴 el plan B tampoco le ofrece gluten a una celíaca", () => {
  // Este agujero era real: QVAC devolvía lista vacía, la app caía al plan B, y
  // el plan B recomendaba burger. El validador lo frenaba, pero la clienta se
  // quedaba con la pantalla vacía.
  const heuristico = new RecomendadorHeuristico();
  return heuristico
    .sugerir({ carta, preferencias: prefs({ dietas: ["sin-gluten"], historial: { burger: 5 } }), nombre: "Sofía" })
    .then((r) => {
      assert.ok(r.length > 0, "se quedó sin nada que ofrecer");
      assert.ok(!r.some((c) => c.id === "burger"), "el plan B ofreció un plato con gluten");
    });
});

test("el plan B sigue repitiendo lo que la persona pide seguido", () => {
  const heuristico = new RecomendadorHeuristico();
  return heuristico
    .sugerir({ carta, preferencias: prefs({ historial: { burger: 5 } }), nombre: "Emi" })
    .then((r) => assert.equal(r[0]?.id, "burger"));
});

// ── Diagnóstico ─────────────────────────────────────────────────────────────

test("el lock viejo del worker se explica con todas las letras", () => {
  // 30 segundos colgado y un código numérico es lo peor que te puede pasar
  // cinco minutos antes de grabar el video.
  const mensaje = explicar({ code: 50204, message: "RPC initialization timed out after 30000ms" });
  assert.match(mensaje, /worker\.lock/);
});

test("un error que no conozco se pasa tal cual, sin disfrazarlo", () => {
  assert.equal(explicar(new Error("se quedó sin memoria")), "se quedó sin memoria");
});

// ── El lock del worker ──────────────────────────────────────────────────────

test("🔴 borra el lock si el worker que lo dejó ya está muerto", async () => {
  // Verificado a mano: matando el server con Stop-Process -Force, el lock queda
  // apuntando a un pid muerto y el arranque siguiente se cuelga 30 s. Es la
  // clase de cosa que aparece cinco minutos antes de grabar el video.
  const { limpiarLockHuerfano } = await import("../src/infrastructure/recomendador-qvac-sdk.js");
  const fs = await import("node:fs");
  const os = await import("node:os");
  const path = await import("node:path");

  const casa = fs.mkdtempSync(path.join(os.tmpdir(), "qvac-test-"));
  const antes = process.env["USERPROFILE"];
  const antesHome = process.env["HOME"];
  fs.mkdirSync(path.join(casa, ".qvac"));
  const lock = path.join(casa, ".qvac", ".worker.lock");
  process.env["USERPROFILE"] = casa;
  process.env["HOME"] = casa;

  try {
    // Un pid altísimo que no puede estar en uso.
    fs.writeFileSync(lock, JSON.stringify({ pid: 4_194_303, startedAt: "2026-08-22T12:16:25.950Z" }));
    limpiarLockHuerfano();
    assert.ok(!fs.existsSync(lock), "no borró el lock huérfano");

    // Y el caso que NO hay que romper: si el worker vive, el archivo se respeta.
    // Otra instancia de la app puede estar usándolo.
    fs.writeFileSync(lock, JSON.stringify({ pid: process.pid }));
    limpiarLockHuerfano();
    assert.ok(fs.existsSync(lock), "borró el lock de un worker VIVO");
  } finally {
    if (antes === undefined) delete process.env["USERPROFILE"];
    else process.env["USERPROFILE"] = antes;
    if (antesHome === undefined) delete process.env["HOME"];
    else process.env["HOME"] = antesHome;
    fs.rmSync(casa, { recursive: true, force: true });
  }
});

test("un lock ilegible no rompe el arranque", async () => {
  const { limpiarLockHuerfano } = await import("../src/infrastructure/recomendador-qvac-sdk.js");
  // Sin archivo, con basura adentro, o sin HOME: ninguna tira excepción.
  assert.doesNotThrow(() => limpiarLockHuerfano());
});
