import assert from "node:assert/strict";
import test from "node:test";
import {
  armarPrompt,
  esquemaDeSugerencias,
  explicar,
  leerRespuesta,
  limpiarLockHuerfano,
  platosElegibles,
  recortarBien,
  validar,
} from "../src/infrastructure/qvac-sdk-assistant.js";
import { demoMenu } from "../src/config/demo-menu.js";
import type { MenuItem } from "../src/domain/model.js";

/**
 * Tests del asistente con el SDK de QVAC.
 *
 * Lo que NO se testea acá: que el modelo acierte. Un test que dependa de lo que
 * devuelve un modelo de 4B es un test que va a fallar solo un martes
 * cualquiera. La evidencia de que el modelo anda está en
 * `scripts/confiabilidad-qvac.mjs`, que corre la misma consulta 15 veces por
 * caso y reporta el porcentaje.
 *
 * Acá se testea lo determinístico: qué se le ofrece al modelo, qué se hace con
 * lo que devuelve, y sobre todo que la restricción alimentaria se respete.
 */

const carta = demoMenu;
const burger = carta.find((i) => i.id === "burger")!;
const risotto = carta.find((i) => i.id === "risotto")!;

// ── Lo que el modelo puede nombrar ──────────────────────────────────────────

test("🔴 la gramática no puede nombrar un plato con gluten si la comensal es celíaca", () => {
  // Este es EL test. El enum del esquema es la lista de ids que el modelo puede
  // escribir. Si "burger" aparece acá, un modelo chico puede recomendárselo a
  // alguien que marcó sin TACC. No es una recomendación fea: es una internación.
  const ids = platosElegibles(carta, ["sin-gluten"]).map((i) => i.id);
  const esquema = esquemaDeSugerencias(ids);
  const props = esquema["properties"] as Record<string, Record<string, Record<string, Record<string, Record<string, unknown>>>>>;
  const enumerado = props["sugerencias"]!["items"]!["properties"]!["id"]!["enum"] as string[];

  assert.ok(!enumerado.includes("burger"), "burger tiene gluten y quedó en el enum");
  assert.deepEqual(enumerado, ["risotto", "pesca", "limonada"]);
});

test("una carta sin restricciones ofrece todo lo que tiene stock", () => {
  const ids = platosElegibles(carta, []).map((i) => i.id);
  assert.equal(ids.length, carta.filter((i) => i.available).length);
  assert.ok(ids.includes("burger"));
});

test("lo que no tiene stock no llega ni al prompt ni al enum", () => {
  const sinStock: MenuItem[] = carta.map((i) => (i.id === "risotto" ? { ...i, available: false } : i));
  const ids = platosElegibles(sinStock, ["sin-gluten"]).map((i) => i.id);
  assert.ok(!ids.includes("risotto"));
});

test("el prompt le muestra exactamente los mismos platos que el enum", () => {
  // Si se separan, el modelo lee un plato que la gramática no lo deja escribir
  // y se traba generando cualquier cosa.
  const elegibles = platosElegibles(carta, ["sin-gluten"]);
  const texto = armarPrompt("algo rico", elegibles, ["sin-gluten"]);
  for (const item of elegibles) assert.ok(texto.includes(`id=${item.id}`), `falta ${item.id}`);
  assert.ok(!texto.includes("id=burger"), "el prompt ofrece un plato que el enum prohíbe");
  assert.ok(texto.includes("sin-gluten"), "no le avisa al modelo que la carta viene filtrada");
});

test("la consulta del cliente viaja textual al prompt", () => {
  const texto = armarPrompt("¿tienen algo sin picante?", platosElegibles(carta, []), []);
  assert.ok(texto.includes("¿tienen algo sin picante?"));
});

test("el esquema limita a 3 y exige los dos campos", () => {
  const esquema = esquemaDeSugerencias(["risotto"]);
  const lista = (esquema["properties"] as Record<string, Record<string, unknown>>)["sugerencias"]!;
  assert.equal(lista["maxItems"], 3);
  assert.deepEqual((lista["items"] as Record<string, unknown>)["required"], ["id", "motivo"]);
});

// ── Lo que se hace con la respuesta ─────────────────────────────────────────

test("lee la respuesta normal del modelo", () => {
  const texto = JSON.stringify({ sugerencias: [{ id: "risotto", motivo: "Te va a gustar." }] });
  assert.deepEqual(leerRespuesta(texto), [{ id: "risotto", motivo: "Te va a gustar." }]);
});

test("un JSON cortado a la mitad no rompe el request", () => {
  assert.deepEqual(leerRespuesta('{"sugerencias":[{"id":"risotto","mot'), []);
  assert.deepEqual(leerRespuesta(""), []);
  assert.deepEqual(leerRespuesta("no soy JSON"), []);
});

test("marca formato inválido en vez de tirar el elemento sin decir nada", () => {
  const r = leerRespuesta(JSON.stringify({ sugerencias: [{ motivo: "sin id" }, "una cadena suelta"] }));
  assert.equal(r.length, 2);
  assert.ok(r.every((c) => c.formatoInvalido));
});

// ── La validación después de la gramática ───────────────────────────────────

test("🔴 el validador ataja lo que la gramática no puede: el plato repetido", () => {
  // Un `enum` no expresa unicidad y GBNF tampoco. Medido: al 4B no le pasa,
  // al 1B le pasa el 8% de las veces.
  const elegibles = platosElegibles(carta, []);
  const { elegidos, descartadas } = validar(
    [{ id: "risotto", motivo: "uno" }, { id: "risotto", motivo: "dos" }],
    elegibles,
  );
  assert.equal(elegidos.length, 1);
  assert.deepEqual(descartadas, [{ texto: risotto.name, razon: "repetida" }]);
});

test("🔴 el validador ataja un plato que dejó de estar elegible", () => {
  // La carta puede cambiar entre que se armó el prompt y volvió la respuesta:
  // son diez segundos y la cocina marca sin stock en vivo.
  const { elegidos, descartadas } = validar(
    [{ id: "burger", motivo: "contundente" }],
    platosElegibles(carta, ["sin-gluten"]),
  );
  assert.equal(elegidos.length, 0);
  assert.deepEqual(descartadas, [{ texto: "burger", razon: "no-existe-en-la-carta" }]);
});

test("lo válido pasa con su motivo intacto", () => {
  const { elegidos } = validar([{ id: "burger", motivo: "Es la que más sale." }], platosElegibles(carta, []));
  assert.equal(elegidos[0]?.item.id, burger.id);
  assert.equal(elegidos[0]?.motivo, "Es la que más sale.");
});

// ── El recorte ──────────────────────────────────────────────────────────────

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

test("🔴 una oración que entra completa no se toca", () => {
  // Este empezó fallando: la gramática topeaba en 90 y el recorte en 80, así
  // que TODA oración de entre 81 y 90 salía con puntos suspensivos aunque
  // estuviera perfecta. Los dos números tienen que estar coordinados.
  const noventa = "a".repeat(88) + " b";
  assert.equal(recortarBien(noventa, 90), noventa);
  assert.equal(recortarBien("Te va a gustar.", 90), "Te va a gustar.");
});

// ── Operación ───────────────────────────────────────────────────────────────

test("🔴 borra el lock si el worker que lo dejó ya está muerto", async () => {
  // Verificado a mano: matando el proceso con Stop-Process -Force el lock queda
  // apuntando a un pid muerto y el arranque siguiente se cuelga 30 s. Es la
  // clase de cosa que aparece cinco minutos antes de grabar el video.
  const fs = await import("node:fs");
  const os = await import("node:os");
  const nodePath = await import("node:path");

  const casa = fs.mkdtempSync(nodePath.join(os.tmpdir(), "qvac-test-"));
  const antesUser = process.env["USERPROFILE"];
  const antesHome = process.env["HOME"];
  fs.mkdirSync(nodePath.join(casa, ".qvac"));
  const lock = nodePath.join(casa, ".qvac", ".worker.lock");
  process.env["USERPROFILE"] = casa;
  process.env["HOME"] = casa;

  try {
    // Un pid altísimo que no puede estar en uso.
    fs.writeFileSync(lock, JSON.stringify({ pid: 4_194_303 }));
    limpiarLockHuerfano();
    assert.ok(!fs.existsSync(lock), "no borró el lock huérfano");

    // Y el caso que NO hay que romper: si el worker vive, el archivo se respeta.
    // Otra instancia de la app puede estar usándolo.
    fs.writeFileSync(lock, JSON.stringify({ pid: process.pid }));
    limpiarLockHuerfano();
    assert.ok(fs.existsSync(lock), "borró el lock de un worker VIVO");
  } finally {
    if (antesUser === undefined) delete process.env["USERPROFILE"]; else process.env["USERPROFILE"] = antesUser;
    if (antesHome === undefined) delete process.env["HOME"]; else process.env["HOME"] = antesHome;
    fs.rmSync(casa, { recursive: true, force: true });
  }
});

test("el lock viejo del worker se explica con todas las letras", () => {
  // 30 segundos colgado y un código numérico es lo peor que te puede pasar
  // cinco minutos antes de grabar.
  assert.match(explicar({ code: 50204, message: "RPC initialization timed out after 30000ms" }), /worker\.lock/);
});

test("un error que no conozco se pasa tal cual, sin disfrazarlo", () => {
  assert.equal(explicar(new Error("se quedó sin memoria")), "se quedó sin memoria");
});
