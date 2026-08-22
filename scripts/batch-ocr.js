/**
 * batch-ocr.js — corre OCR sobre todas las imágenes de una carpeta y arma
 * un resumen comparativo + un archivo de evidencia.
 *
 * Basado en el ejemplo oficial de la documentación de QVAC (ai-capabilities/ocr),
 * extendido para procesar un lote, medir con los tiempos que reporta el motor,
 * y volcar los resultados a disco como evidencia para el Premio 2 de QVAC.
 *
 * Uso:
 *   node batch-ocr.js                        (usa ./tickets)
 *   node batch-ocr.js ./otra-carpeta
 *   node batch-ocr.js ./tickets --no-contrast   (si contrastRetry:true da problemas)
 */
import { close, loadModel, ocr, OCR_LATIN, unloadModel } from '@qvac/sdk';
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const carpeta = args.find(a => !a.startsWith('--')) || './tickets';
const usarContraste = !args.includes('--no-contrast');

if (!fs.existsSync(carpeta)) {
  console.error(`✖ No existe la carpeta: ${carpeta}`);
  process.exit(1);
}

const archivos = fs.readdirSync(carpeta)
  .filter(f => /\.(jpg|jpeg|png|bmp)$/i.test(f))
  .sort();

if (archivos.length === 0) {
  console.error(`✖ No encontré imágenes (.jpg/.png/.bmp) en ${carpeta}`);
  process.exit(1);
}

console.log(`▸ Encontré ${archivos.length} imágenes en ${carpeta}`);
console.log(`▸ contrastRetry: ${usarContraste}\n`);

try {
  console.log('▸ Cargando modelo OCR (OCR_LATIN)...');
  const modelId = await loadModel({
    modelSrc: OCR_LATIN,
    modelConfig: {
      // ⚠️ NO CAMBIAR A 'es'. El modelo latin_g2 rechaza 'es' y tira
      // MODEL_LOAD_FAILED: Unsupported language(s). Ya nos pasó.
      // OCR_LATIN es un reconocedor de ALFABETO latino, no de idioma:
      // lee las formas de las letras. Los números —lo que importa en un
      // ticket— son idénticos en inglés y castellano.
      langList: ['en'],
      magRatio: 1.5,
      defaultRotationAngles: [90, 180, 270],
      contrastRetry: usarContraste,   // la doc oficial lo trae en false
      lowConfidenceThreshold: 0.5,
      recognizerBatchSize: 1
    }
  });
  console.log(`▸ Modelo cargado. ID: ${modelId}\n`);

  const resumen = [];

  for (const archivo of archivos) {
    const imagePath = path.join(carpeta, archivo);
    console.log(`\n${'='.repeat(56)}`);
    console.log(`  ${archivo}`);
    console.log('='.repeat(56));

    const t0 = Date.now();
    const { blocks, stats } = ocr({
      modelId,
      image: imagePath,
      options: { paragraph: false }
    });

    const result = await blocks;
    const wallMs = Date.now() - t0;

    // stats lo reporta el motor: detectionTime / recognitionTime / totalTime.
    // Si por alguna razón no viene, seguimos con el reloj de pared.
    let s = null;
    try { s = await stats; } catch { s = null; }

    let sumaConf = 0, conConf = 0;
    const bloquesDetalle = [];

    for (const block of result) {
      const conf = block.confidence !== undefined ? block.confidence : null;
      const marca = conf !== null && conf < 0.5 ? '⚠' : ' ';
      console.log(`  ${marca}[${conf !== null ? conf.toFixed(2) : '—'}] ${block.text}`);
      if (conf !== null) { sumaConf += conf; conConf++; }
      bloquesDetalle.push({ texto: block.text, confianza: conf, bbox: block.bbox ?? null });
    }

    const promedio = conConf ? sumaConf / conConf : null;
    const bajaConf = result.filter(b => (b.confidence ?? 1) < 0.5).length;

    resumen.push({
      archivo,
      bloques: result.length,
      confianzaPromedio: promedio,
      bloquesBajaConfianza: bajaConf,
      wallMs,
      detectionMs: s?.detectionTime ?? null,
      recognitionMs: s?.recognitionTime ?? null,
      totalMs: s?.totalTime ?? null,
      bloquesDetalle
    });

    const tiempoMotor = s?.totalTime != null ? `${s.totalTime} ms (motor)` : `${wallMs} ms (reloj)`;
    console.log(`  → ${result.length} bloques · confianza ${promedio !== null ? promedio.toFixed(2) : '—'} · ${bajaConf} bajo umbral · ${tiempoMotor}`);
  }

  // ── Tabla 1: resumen general ────────────────────────────────────────
  console.log(`\n\n${'='.repeat(78)}`);
  console.log('  RESUMEN COMPARATIVO');
  console.log('='.repeat(78));
  console.log(
    'archivo'.padEnd(24) +
    'bloques'.padEnd(9) +
    'confianza'.padEnd(11) +
    'baja'.padEnd(7) +
    'detec.'.padEnd(9) +
    'recon.'.padEnd(9) +
    'total'
  );
  console.log('-'.repeat(78));
  for (const r of resumen) {
    console.log(
      r.archivo.padEnd(24) +
      String(r.bloques).padEnd(9) +
      (r.confianzaPromedio !== null ? r.confianzaPromedio.toFixed(2) : '—').padEnd(11) +
      String(r.bloquesBajaConfianza).padEnd(7) +
      String(r.detectionMs ?? '—').padEnd(9) +
      String(r.recognitionMs ?? '—').padEnd(9) +
      String(r.totalMs ?? r.wallMs)
    );
  }

  // ── Tabla 2: impacto de la mala luz, por par ────────────────────────
  console.log(`\n${'='.repeat(78)}`);
  console.log('  IMPACTO DE LA MALA LUZ (por par)');
  console.log('='.repeat(78));

  let paresEncontrados = 0;
  for (const r of resumen) {
    if (r.archivo.includes('_malaluz')) continue;
    const base = r.archivo.replace(/\.(jpg|jpeg|png|bmp)$/i, '');
    const par = resumen.find(x => x.archivo.startsWith(base + '_malaluz'));
    if (!par) continue;
    paresEncontrados++;

    const cn = r.confianzaPromedio, cm = par.confianzaPromedio;
    const delta = cn !== null && cm !== null ? (cm - cn) : null;
    const pct = delta !== null && cn ? ((delta / cn) * 100).toFixed(1) : null;

    console.log(
      `${base.padEnd(12)} normal ${cn?.toFixed(2) ?? '—'}  →  mala luz ${cm?.toFixed(2) ?? '—'}   ` +
      `Δ ${delta !== null ? (delta >= 0 ? '+' : '') + delta.toFixed(2) : '—'}` +
      `${pct !== null ? ` (${pct}%)` : ''}   ` +
      `bloques ${r.bloques}→${par.bloques}`
    );
  }
  if (paresEncontrados === 0) {
    console.log('  (no encontré pares Nombre.jpg / Nombre_malaluz.jpg)');
  }

  // ── Agregados globales ──────────────────────────────────────────────
  const conf = resumen.map(r => r.confianzaPromedio).filter(v => v !== null);
  const promedioGlobal = conf.length ? conf.reduce((a, b) => a + b, 0) / conf.length : null;
  const totalBloques = resumen.reduce((a, r) => a + r.bloques, 0);
  const totalBajos = resumen.reduce((a, r) => a + r.bloquesBajaConfianza, 0);

  console.log(`\n${'='.repeat(78)}`);
  console.log('  AGREGADO');
  console.log('='.repeat(78));
  console.log(`  Imágenes procesadas:    ${resumen.length}`);
  console.log(`  Bloques totales:        ${totalBloques}`);
  console.log(`  Bloques bajo 0.5:       ${totalBajos} (${totalBloques ? ((totalBajos / totalBloques) * 100).toFixed(1) : '0'}%)`);
  console.log(`  Confianza promedio:     ${promedioGlobal !== null ? promedioGlobal.toFixed(3) : '—'}`);

  // ── Evidencia a disco ───────────────────────────────────────────────
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const jsonPath = `ocr-evidencia-${stamp}.json`;
  const csvPath = `ocr-evidencia-${stamp}.csv`;

  fs.writeFileSync(jsonPath, JSON.stringify({
    corridaISO: new Date().toISOString(),
    carpeta,
    config: { langList: ['en'], magRatio: 1.5, contrastRetry: usarContraste, lowConfidenceThreshold: 0.5 },
    agregado: { imagenes: resumen.length, bloquesTotales: totalBloques, bloquesBajos: totalBajos, confianzaPromedio: promedioGlobal },
    resultados: resumen
  }, null, 2));

  const filas = ['archivo,bloques,confianza_promedio,bloques_baja_confianza,detection_ms,recognition_ms,total_ms'];
  for (const r of resumen) {
    filas.push([
      r.archivo,
      r.bloques,
      r.confianzaPromedio !== null ? r.confianzaPromedio.toFixed(4) : '',
      r.bloquesBajaConfianza,
      r.detectionMs ?? '',
      r.recognitionMs ?? '',
      r.totalMs ?? r.wallMs
    ].join(','));
  }
  fs.writeFileSync(csvPath, filas.join('\n'));

  console.log(`\n▸ Evidencia guardada:`);
  console.log(`    ${jsonPath}   (bloque por bloque, con bbox — para el informe)`);
  console.log(`    ${csvPath}   (tabla plana — para el gráfico del video)\n`);

  await unloadModel({ modelId, clearStorage: false });
  process.exit(0);
} catch (error) {
  console.error('\n✖', error);
  console.error('\n💡 Si el error dice MODEL_LOAD_FAILED por configuración, probá:');
  console.error('   node batch-ocr.js ./tickets --no-contrast\n');
  await close();
}