/**
 * confiabilidad-qvac.mjs — corre la MISMA tarea N veces y mide en qué
 * porcentaje sale bien.
 *
 * Existe porque el track lo pide con todas las letras:
 *
 *   > "evidence, not vibes. Run the same task N times and show the success
 *   >  rate. Show us the failures you couldn't fix as well as the ones you
 *   >  could."
 *
 * Una corrida linda no prueba nada: los modelos chicos aciertan una vez de
 * cada tres y el que graba el video elige cuál mostrar. Esto corre 20 veces
 * cada caso y cuenta.
 *
 * Uso:
 *   node scripts/confiabilidad-qvac.mjs                                 (Llama 1B, 20 vueltas)
 *   node scripts/confiabilidad-qvac.mjs QWEN3_4B_INST_Q4_K_M 20
 */
import * as qvac from "@qvac/sdk";
import { validar } from "../dist/src/application/sugerencias-service.js";
import { demoMenu } from "../dist/src/config/demo-menu.js";
import { InMemoryMenuCatalog } from "../dist/src/infrastructure/in-memory.js";
import { platosElegibles } from "../dist/src/infrastructure/recomendador-qvac.js";
import { RecomendadorQvacSdk } from "../dist/src/infrastructure/recomendador-qvac-sdk.js";

const nombreModelo = process.argv[2] ?? "LLAMA_3_2_1B_INST_Q4_0";
const VUELTAS = Number(process.argv[3] ?? 20);
const descriptor = qvac[nombreModelo];
if (!descriptor) {
  console.error(`No existe "${nombreModelo}" en el registro de @qvac/sdk.`);
  process.exit(1);
}

// Los motivos del ejemplo del prompt. Si el modelo devuelve uno de estos
// tal cual, no razonó: copió. Es la falla que más costó ver.
const MOTIVOS_DEL_EJEMPLO = [
  "el de siempre, ya te lo vamos preparando.",
  "nunca la probaste y sale bien con el café.",
];

const casos = [
  { titulo: "habitual sin restricciones", prefs: { dietas: [], evita: [], historial: { burger: 4, "papas-bravas": 2 } }, nombre: "Emi" },
  { titulo: "celíaca (sin-gluten)", prefs: { dietas: ["sin-gluten"], evita: [], historial: { burrata: 3, risotto: 2 } }, nombre: "Sofía" },
  { titulo: "media carta sin stock", prefs: { dietas: [], evita: [], historial: { risotto: 5, volcan: 1 } }, nombre: "Nico", sinStock: ["risotto", "burger"] },
];

const motor = new RecomendadorQvacSdk(descriptor, { device: "cpu", ctxSize: 2048 });
console.log(`MODELO   ${descriptor.modelId} · ${descriptor.params} · ${descriptor.quantization}`);
console.log(`VUELTAS  ${VUELTAS} por caso · ${VUELTAS * casos.length} llamadas en total\n`);

const t0 = Date.now();
if (!(await motor.arrancar())) {
  console.error(motor.estado().fallo);
  process.exit(1);
}
console.log(`carga: ${((Date.now() - t0) / 1000).toFixed(1)} s\n`);

const global = { vueltas: 0, latencias: [] };
const filas = [];

for (const caso of casos) {
  const catalogo = new InMemoryMenuCatalog(demoMenu);
  for (const id of caso.sinStock ?? []) await catalogo.setAvailability(id, false);
  const carta = await catalogo.list();
  const elegibles = new Set(platosElegibles(carta, caso.prefs).map((i) => i.id));

  const cuenta = {
    devolvioAlgo: 0,
    idsValidos: 0,
    dietaOk: 0,
    sinRepetir: 0,
    sinCopiar: 0,
    tresSugerencias: 0,
    sugerenciasTotales: 0,
    descartadasTotales: 0,
    latencias: [],
  };

  process.stdout.write(`  ${caso.titulo.padEnd(28)}`);

  for (let v = 0; v < VUELTAS; v++) {
    const candidatos = await motor.sugerir({ carta, preferencias: caso.prefs, nombre: caso.nombre });
    const stats = motor.estado().ultimaCorrida;
    if (stats) {
      cuenta.latencias.push(stats.latenciaMs);
      global.latencias.push(stats.latenciaMs);
    }
    global.vueltas++;

    const ids = candidatos.map((c) => c.id);
    if (candidatos.length > 0) cuenta.devolvioAlgo++;
    if (candidatos.length > 0 && ids.every((id) => elegibles.has(id))) cuenta.idsValidos++;
    // dietaOk se mide igual que idsValidos porque `elegibles` YA filtra por
    // dieta: si un id sobrevive, es porque no le rompe la dieta a esta persona.
    if (candidatos.length > 0 && ids.every((id) => elegibles.has(id))) cuenta.dietaOk++;
    if (new Set(ids).size === ids.length) cuenta.sinRepetir++;
    if (!candidatos.some((c) => MOTIVOS_DEL_EJEMPLO.includes(c.motivo.toLowerCase().trim()))) cuenta.sinCopiar++;

    const { sugerencias, descartadas } = validar(candidatos, carta, caso.prefs);
    if (sugerencias.length === 3) cuenta.tresSugerencias++;
    cuenta.sugerenciasTotales += sugerencias.length;
    cuenta.descartadasTotales += descartadas.length;

    process.stdout.write(sugerencias.length > 0 ? "." : "x");
  }

  console.log("");
  filas.push({ caso: caso.titulo, ...cuenta });
}

await motor.cerrar();

// ── La tabla ────────────────────────────────────────────────────────────────
const pct = (n) => `${((n / VUELTAS) * 100).toFixed(0)}%`;
const mediana = (xs) => {
  const o = [...xs].sort((a, b) => a - b);
  return o.length ? o[Math.floor(o.length / 2)] : 0;
};

console.log(`\n${"═".repeat(96)}`);
console.log(`  ${descriptor.modelId}  ·  ${VUELTAS} vueltas por caso`);
console.log("═".repeat(96));
console.log(
  "caso".padEnd(28) + "devolvió".padEnd(10) + "id en carta".padEnd(13) +
  "dieta ok".padEnd(10) + "sin repetir".padEnd(13) + "sin copiar".padEnd(12) +
  "3 de 3".padEnd(9) + "mediana",
);
console.log("─".repeat(96));
for (const f of filas) {
  console.log(
    f.caso.padEnd(28) +
    pct(f.devolvioAlgo).padEnd(10) +
    pct(f.idsValidos).padEnd(13) +
    pct(f.dietaOk).padEnd(10) +
    pct(f.sinRepetir).padEnd(13) +
    pct(f.sinCopiar).padEnd(12) +
    pct(f.tresSugerencias).padEnd(9) +
    `${mediana(f.latencias)} ms`,
  );
}
console.log("─".repeat(96));

const sum = (k) => filas.reduce((a, f) => a + f[k], 0);
const total = VUELTAS * filas.length;
console.log(
  "TOTAL".padEnd(28) +
  `${((sum("devolvioAlgo") / total) * 100).toFixed(0)}%`.padEnd(10) +
  `${((sum("idsValidos") / total) * 100).toFixed(0)}%`.padEnd(13) +
  `${((sum("dietaOk") / total) * 100).toFixed(0)}%`.padEnd(10) +
  `${((sum("sinRepetir") / total) * 100).toFixed(0)}%`.padEnd(13) +
  `${((sum("sinCopiar") / total) * 100).toFixed(0)}%`.padEnd(12) +
  `${((sum("tresSugerencias") / total) * 100).toFixed(0)}%`.padEnd(9) +
  `${mediana(global.latencias)} ms`,
);
console.log("═".repeat(96));
console.log(`  sugerencias mostradas: ${sum("sugerenciasTotales")} · descartadas por el validador: ${sum("descartadasTotales")}`);
console.log(`  latencia p95: ${[...global.latencias].sort((a, b) => a - b)[Math.floor(global.latencias.length * 0.95)]} ms`);
