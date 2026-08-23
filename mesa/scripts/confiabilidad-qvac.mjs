/**
 * confiabilidad-qvac.mjs — corre la MISMA consulta N veces y mide en qué
 * porcentaje sale bien.
 *
 * Existe porque el track de QVAC lo pide con todas las letras:
 *
 *   > "evidence, not vibes. Run the same task N times and show the success
 *   >  rate. Show us the failures you couldn't fix as well as the ones you
 *   >  could."
 *
 * Una corrida linda no prueba nada: los modelos chicos aciertan una vez de
 * cada tres y el que graba el video elige cuál mostrar.
 *
 * Uso:
 *   node scripts/confiabilidad-qvac.mjs                                (Qwen 4B, 15 vueltas)
 *   node scripts/confiabilidad-qvac.mjs LLAMA_3_2_1B_INST_Q4_0 20
 */
import * as qvac from "@qvac/sdk";
import { demoMenu } from "../dist/server/src/config/demo-menu.js";
import { AsistenteQvacSdk, platosElegibles } from "../dist/server/src/infrastructure/qvac-sdk-assistant.js";

const nombreModelo = process.argv[2] ?? "QWEN3_4B_INST_Q4_K_M";
const VUELTAS = Number(process.argv[3] ?? 15);
const descriptor = qvac[nombreModelo];
if (!descriptor) {
  console.error(`No existe "${nombreModelo}" en el registro de @qvac/sdk.`);
  process.exit(1);
}

// Los motivos del ejemplo del prompt. Si el modelo devuelve uno de estos tal
// cual, no razonó: copió. Es la falla que más costó ver.
const MOTIVOS_DEL_EJEMPLO = [
  "sale bien caliente y te entra liviana antes del plato.",
  "si querés algo corto para arrancar, este va.",
];

const casos = [
  {
    titulo: "consulta libre",
    pregunta: "algo liviano para arrancar, no tengo mucha hambre",
    restricciones: [],
  },
  {
    titulo: "celíaca — el caso que importa",
    pregunta: "quiero algo contundente, tengo mucha hambre",
    restricciones: ["sin-gluten"],
    // La burger tiene gluten y es EL plato contundente de la carta. Si el
    // modelo pudiera nombrarla, la nombraría.
    prohibido: ["burger"],
  },
  {
    titulo: "vegana — una sola opción elegible",
    pregunta: "quiero un plato principal bien contundente",
    restricciones: ["vegano"],
    prohibido: ["burger", "risotto", "pesca", "burrata", "papas-bravas", "volcan"],
  },
  {
    titulo: "algo que no está en la carta",
    pregunta: "¿tienen sushi o algo de comida japonesa?",
    restricciones: [],
  },
];

const asistente = new AsistenteQvacSdk(descriptor, { device: "cpu", ctxSize: 4096 });
console.log(`MODELO   ${descriptor.modelId} · ${descriptor.params} · ${descriptor.quantization}`);
console.log(`VUELTAS  ${VUELTAS} por caso · ${VUELTAS * casos.length} llamadas en total\n`);

const t0 = Date.now();
if (!(await asistente.arrancar())) {
  console.error(asistente.estado().fallo);
  process.exit(1);
}
console.log(`carga: ${((Date.now() - t0) / 1000).toFixed(1)} s\n`);

const filas = [];
const latenciasGlobales = [];
const ejemplosPorCaso = new Map();

for (const caso of casos) {
  const elegibles = new Set(platosElegibles(demoMenu, caso.restricciones).map((i) => i.id));
  const cuenta = {
    devolvioAlgo: 0,
    idsValidos: 0,
    restriccionOk: 0,
    sinRepetir: 0,
    sinCopiar: 0,
    sinTruncar: 0,
    itemsTotales: 0,
    descartadasTotales: 0,
    latencias: [],
  };

  process.stdout.write(`  ${caso.titulo.padEnd(34)}`);

  for (let v = 0; v < VUELTAS; v++) {
    const r = await asistente.sugerir(caso.pregunta, demoMenu, caso.restricciones);
    const stats = asistente.estado().ultimaCorrida;
    if (stats) { cuenta.latencias.push(stats.latenciaMs); latenciasGlobales.push(stats.latenciaMs); }

    const ids = r ? r.items.map((i) => i.id) : [];
    const motivos = r ? Object.values(r.motivos) : [];

    if (r && ids.length > 0) cuenta.devolvioAlgo++;
    if (r && ids.length > 0 && ids.every((id) => elegibles.has(id))) cuenta.idsValidos++;
    // La restricción es la métrica de seguridad: ningún id prohibido, nunca.
    if (!ids.some((id) => (caso.prohibido ?? []).includes(id))) cuenta.restriccionOk++;
    if (new Set(ids).size === ids.length) cuenta.sinRepetir++;
    if (!motivos.some((m) => MOTIVOS_DEL_EJEMPLO.includes(m.toLowerCase().trim()))) cuenta.sinCopiar++;
    if (!motivos.some((m) => m.endsWith("…"))) cuenta.sinTruncar++;
    cuenta.itemsTotales += ids.length;
    cuenta.descartadasTotales += r?.descartadas.length ?? 0;

    if (v === 0 && r) ejemplosPorCaso.set(caso.titulo, r.items.map((i) => `${i.name} — "${r.motivos[i.id]}"`));
    process.stdout.write(ids.length > 0 ? "." : "x");
  }

  console.log("");
  filas.push({ caso: caso.titulo, ...cuenta });
}

await asistente.cerrar();

// ── La tabla ────────────────────────────────────────────────────────────────
const pct = (n) => `${((n / VUELTAS) * 100).toFixed(0)}%`;
const mediana = (xs) => { const o = [...xs].sort((a, b) => a - b); return o.length ? o[Math.floor(o.length / 2)] : 0; };

console.log(`\n${"═".repeat(104)}`);
console.log(`  ${descriptor.modelId}  ·  ${VUELTAS} vueltas por caso`);
console.log("═".repeat(104));
console.log(
  "caso".padEnd(34) + "devolvió".padEnd(10) + "id en carta".padEnd(13) +
  "restricción".padEnd(13) + "sin repetir".padEnd(13) + "sin copiar".padEnd(12) +
  "sin cortar".padEnd(12) + "mediana",
);
console.log("─".repeat(104));
for (const f of filas) {
  console.log(
    f.caso.padEnd(34) + pct(f.devolvioAlgo).padEnd(10) + pct(f.idsValidos).padEnd(13) +
    pct(f.restriccionOk).padEnd(13) + pct(f.sinRepetir).padEnd(13) + pct(f.sinCopiar).padEnd(12) +
    pct(f.sinTruncar).padEnd(12) + `${mediana(f.latencias)} ms`,
  );
}
console.log("─".repeat(104));
const sum = (k) => filas.reduce((a, f) => a + f[k], 0);
const total = VUELTAS * filas.length;
const p = (k) => `${((sum(k) / total) * 100).toFixed(0)}%`;
console.log(
  "TOTAL".padEnd(34) + p("devolvioAlgo").padEnd(10) + p("idsValidos").padEnd(13) +
  p("restriccionOk").padEnd(13) + p("sinRepetir").padEnd(13) + p("sinCopiar").padEnd(12) +
  p("sinTruncar").padEnd(12) + `${mediana(latenciasGlobales)} ms`,
);
console.log("═".repeat(104));
const ordenadas = [...latenciasGlobales].sort((a, b) => a - b);
console.log(`  platos ofrecidos: ${sum("itemsTotales")} · descartados por el validador: ${sum("descartadasTotales")}`);
console.log(`  latencia p95: ${ordenadas[Math.floor(ordenadas.length * 0.95)]} ms`);

console.log(`\n  Una respuesta de cada caso, sin elegir:`);
for (const [titulo, items] of ejemplosPorCaso) {
  console.log(`\n  ${titulo}`);
  for (const linea of items) console.log(`    · ${linea}`);
}
