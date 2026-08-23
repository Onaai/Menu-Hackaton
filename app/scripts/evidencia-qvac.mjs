/**
 * evidencia-qvac.mjs — corre el recomendador real contra la carta real y
 * escupe la evidencia que pide el track de QVAC: qué modelo, en qué máquina,
 * cuánto tardó, qué devolvió y **qué se descartó**.
 *
 * No es un test: los tests no pueden depender de que un modelo de 1B acierte.
 * Esto es la corrida que se pega en el README y se muestra en el video.
 *
 *   node scripts/evidencia-qvac.mjs
 */
import * as qvac from "@qvac/sdk";
import { SugerenciasService } from "../dist/src/application/sugerencias-service.js";
import { demoMenu } from "../dist/src/config/demo-menu.js";
import { InMemoryMenuCatalog, systemClock } from "../dist/src/infrastructure/in-memory.js";
import { RecomendadorHeuristico } from "../dist/src/infrastructure/recomendador-qvac.js";
import { RecomendadorQvacSdk } from "../dist/src/infrastructure/recomendador-qvac-sdk.js";

// node scripts/evidencia-qvac.mjs [CONSTANTE_DEL_MODELO]
const nombreModelo = process.argv[2] ?? "LLAMA_3_2_1B_INST_Q4_0";
const descriptor = qvac[nombreModelo];
if (!descriptor) {
  console.error(`No existe "${nombreModelo}" en el registro de @qvac/sdk.`);
  process.exit(1);
}
const motor = new RecomendadorQvacSdk(descriptor, { device: "cpu", ctxSize: 2048 });
const menu = new InMemoryMenuCatalog(demoMenu);
const carta = await menu.list();

console.log("MODELO      ", descriptor.modelId);
console.log("PARÁMETROS  ", descriptor.params, "·", descriptor.quantization, "·", descriptor.engine);
console.log("CARTA HOY   ", carta.filter((i) => i.available).map((i) => i.id).join(", "));
console.log();

const t0 = Date.now();
let ultimoEscalon = -1;
const ok = await motor.arrancar((pct, bajados, total) => {
  const escalon = Math.floor(pct / 5);
  if (escalon === ultimoEscalon) return;
  ultimoEscalon = escalon;
  console.log(`  bajando ${pct.toFixed(0)}% (${(bajados / 1e9).toFixed(2)}/${(total / 1e9).toFixed(2)} GB)`);
});
console.log(`carga del modelo: ${Date.now() - t0} ms · ${ok ? "listo" : "FALLÓ"}`);
if (!ok) {
  console.log(motor.estado().fallo);
  process.exit(1);
}

const casos = [
  {
    titulo: "cliente habitual, sin restricciones",
    prefs: { dietas: [], evita: [], historial: { burger: 4, "papas-bravas": 2 } },
    nombre: "Emi",
  },
  {
    titulo: "cliente celíaca — el caso que importa",
    prefs: { dietas: ["sin-gluten"], evita: [], historial: { burrata: 3, risotto: 2 } },
    nombre: "Sofía",
  },
  {
    titulo: "carta a la mitad: la cocina marcó cosas sin stock",
    prefs: { dietas: [], evita: [], historial: { risotto: 5, volcan: 1 } },
    nombre: "Nico",
    sinStock: ["risotto", "burger"],
  },
];

for (const caso of casos) {
  const catalogo = new InMemoryMenuCatalog(demoMenu);
  for (const id of caso.sinStock ?? []) await catalogo.setAvailability(id, false);

  const servicio = new SugerenciasService(catalogo, motor, new RecomendadorHeuristico(), systemClock, descriptor.modelId);
  const r = await servicio.para(caso.prefs, caso.nombre);
  const stats = motor.estado().ultimaCorrida;

  console.log(`\n${"─".repeat(70)}`);
  console.log(`  ${caso.titulo}`);
  console.log(`  historial: ${JSON.stringify(caso.prefs.historial)}${caso.prefs.dietas.length ? ` · dietas: ${caso.prefs.dietas.join(", ")}` : ""}`);
  if (caso.sinStock) console.log(`  sin stock: ${caso.sinStock.join(", ")}`);
  console.log("─".repeat(70));
  console.log(`  motor: ${r.motor}${r.degradado ? " (DEGRADADO: cayó al plan B)" : ""} · ${r.latenciaMs} ms` +
    (stats?.tokensPorSegundo ? ` · ${stats.tokensPorSegundo.toFixed(1)} tok/s · ${stats.tokensGenerados} tokens` : ""));
  for (const s of r.sugerencias) console.log(`   ✓ ${s.nombre} — "${s.motivo}"`);
  if (r.sugerencias.length === 0) console.log("   (ninguna sobrevivió la validación)");
  for (const d of r.descartadas) console.log(`   ✗ ${d.texto} → ${d.razon}`);
}

console.log(`\n${"─".repeat(70)}`);
await motor.cerrar();
