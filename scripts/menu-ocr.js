/**
 * menu-ocr.js — Convierte la CARTA de un restaurante (PDF o imagen) en datos
 * estructurados, con todo el reconocimiento corriendo local con QVAC.
 *
 * Por qué existe este archivo y no alcanza con batch-ocr.js
 * ────────────────────────────────────────────────────────
 * `ocr()` de QVAC recibe la RUTA DE UNA IMAGEN. Un PDF no es una imagen, así
 * que hay que rasterizarlo primero. Y con este PDF en particular hay un
 * problema extra, que verificamos con `pdfinfo` y `pdfimages`:
 *
 *     Pages:      1
 *     Page size:  619.68 x 6958.08 pts      ← una sola página altísima
 *     Fuentes:    ninguna                   ← NO hay capa de texto
 *     Imagen:     1 JPEG de 1291 x 14496 px ← la carta entera es una foto
 *
 * O sea: 14.496 píxeles de alto en una sola imagen, sin una letra
 * seleccionable. Pasarle eso al detector de una es pedirle memoria para una
 * imagen once veces más alta que ancha, y encima `magRatio: 1.5` la agranda
 * otro 50%. Por eso el script corta la página en MOSAICOS con solape, corre
 * OCR en cada uno, y después vuelve a pegar los resultados en coordenadas de
 * página.
 *
 * El solape no es un detalle de prolijidad: sin él, cualquier renglón que caiga
 * justo en el corte se pierde o se parte al medio. Con solape aparece dos veces
 * y hay que deduplicar — eso es `deduplicar()` en lib/estructura.js.
 *
 * Lo que hace, en orden
 * ─────────────────────
 *   1. PDF → PNG        (poppler si está en el PATH; si no, pdf-to-img + sharp)
 *   2. Página → mosaicos con solape
 *   3. OCR por mosaico  ← ESTA PARTE ES IDÉNTICA A batch-ocr.js, que ya corrió
 *   4. Remapear coordenadas de mosaico a coordenadas de página
 *   5. Deduplicar · columnas · clasificar · agrupar   (lib/estructura.js)
 *   6. Volcar menu.json + los CSV de revisión humana
 *
 * Uso
 * ───
 *   node menu-ocr.js ../muestras/Menu.pdf
 *   node menu-ocr.js ../muestras/Menu.pdf --dpi 200 --alto 1200 --solape 200
 *   node menu-ocr.js ./carta.jpg                        (también acepta fotos)
 *   node menu-ocr.js ../muestras/Menu.pdf --solo-mosaicos   (no llama a QVAC)
 *
 * Dependencias además de @qvac/sdk
 * ────────────────────────────────
 *   npm install pdf-to-img sharp
 *
 * Si tenés poppler en el PATH (`pdftoppm -v` responde), el script lo usa y ni
 * toca esas dos librerías: poppler recorta la región directamente desde el PDF
 * y nunca carga la página entera en memoria. En Windows es opcional.
 */

import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

import {
  normalizarBbox,
  desplazarY,
  deduplicar,
  asignarColumna,
  clasificarPorAltura,
  armarItems,
} from './lib/estructura.js';

// ────────────────────────────────────────────────────────────────────────────
// Argumentos
// ────────────────────────────────────────────────────────────────────────────

const argv = process.argv.slice(2);

function bandera(nombre, porDefecto) {
  const i = argv.indexOf(`--${nombre}`);
  if (i === -1) return porDefecto;
  const v = argv[i + 1];
  if (v === undefined || v.startsWith('--')) return true;
  return isNaN(Number(v)) ? v : Number(v);
}

const entrada = argv.find((a) => !a.startsWith('--')) || '../muestras/Menu.pdf';
const DPI = Number(bandera('dpi', 150));
const ALTO_MOSAICO = Number(bandera('alto', 1400));
const SOLAPE = Number(bandera('solape', 160));
const SALIDA = String(bandera('salida', './salida-menu'));
const UMBRAL_BAJO = Number(bandera('umbral', 0.5));
// null = modo automático (agrupa las alturas). Si pasás las dos banderas,
// pasa a modo manual con umbrales relativos al cuerpo más chico.
const _fp = bandera('factor-plato', null);
const _fc = bandera('factor-categoria', null);
const FACTOR_PLATO = _fp === null ? null : Number(_fp);
const FACTOR_CATEGORIA = _fc === null ? null : Number(_fc);
const SOLO_MOSAICOS = argv.includes('--solo-mosaicos');
const SIN_CONTRASTE = argv.includes('--no-contrast');

if (!fs.existsSync(entrada)) {
  console.error(`✖ No existe el archivo: ${entrada}`);
  process.exit(1);
}
if (ALTO_MOSAICO - SOLAPE <= 0) {
  console.error('✖ El solape tiene que ser menor que el alto del mosaico');
  process.exit(1);
}

fs.mkdirSync(SALIDA, { recursive: true });
const DIR_MOSAICOS = path.join(SALIDA, 'mosaicos');
fs.rmSync(DIR_MOSAICOS, { recursive: true, force: true });
fs.mkdirSync(DIR_MOSAICOS, { recursive: true });

// ────────────────────────────────────────────────────────────────────────────
// 1 · Rasterizar y cortar en mosaicos
// ────────────────────────────────────────────────────────────────────────────

function hayPoppler() {
  try {
    execFileSync('pdftoppm', ['-v'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function medirPaginaPoppler(pdf) {
  const salida = execFileSync('pdfinfo', [pdf], { encoding: 'utf8' });
  const m = salida.match(/Page size:\s+([\d.]+)\s+x\s+([\d.]+)\s+pts/);
  if (!m) throw new Error('pdfinfo no devolvió el tamaño de página');
  return { anchoPt: Number(m[1]), altoPt: Number(m[2]) };
}

/** Camino A — poppler. Recorta cada mosaico directamente del PDF. */
function mosaicosConPoppler(pdf) {
  const { anchoPt, altoPt } = medirPaginaPoppler(pdf);
  const anchoPx = Math.round((anchoPt / 72) * DPI);
  const altoPx = Math.round((altoPt / 72) * DPI);

  console.log(`▸ Página: ${anchoPt.toFixed(0)} x ${altoPt.toFixed(0)} pts`);
  console.log(`▸ A ${DPI} dpi: ${anchoPx} x ${altoPx} px`);

  const paso = ALTO_MOSAICO - SOLAPE;
  const mosaicos = [];
  for (let y = 0, i = 0; y < altoPx; y += paso, i++) {
    const alto = Math.min(ALTO_MOSAICO, altoPx - y);
    if (alto < 40) break; // una sobra de menos de 40 px no tiene renglones
    const prefijo = path.join(DIR_MOSAICOS, `m${String(i).padStart(3, '0')}`);
    execFileSync('pdftoppm', [
      '-png', '-r', String(DPI),
      '-f', '1', '-l', '1',
      '-x', '0', '-y', String(y),
      '-W', String(anchoPx), '-H', String(alto),
      pdf, prefijo,
    ]);
    // pdftoppm agrega sufijo de página: m000-1.png / m000-01.png / m000-001.png
    const base = path.basename(prefijo);
    const generado = fs.readdirSync(DIR_MOSAICOS)
      .filter((f) => f.startsWith(base) && f.endsWith('.png'))
      .sort()[0];
    if (!generado) throw new Error(`pdftoppm no generó salida para y=${y}`);
    mosaicos.push({ ruta: path.join(DIR_MOSAICOS, generado), offsetY: y, alto, ancho: anchoPx });
  }
  return { mosaicos, anchoPx, altoPx };
}

/** Camino B — pdf-to-img + sharp. Todo npm, sin dependencias de sistema. */
async function mosaicosConPdfjs(pdf) {
  const { pdf: pdfToImg } = await import('pdf-to-img');
  const sharp = (await import('sharp')).default;

  // pdf-to-img mide en px CSS a 72 dpi, así que la escala es dpi/72.
  const escala = DPI / 72;
  const doc = await pdfToImg(pdf, { scale: escala });

  const paginaPath = path.join(SALIDA, 'pagina-completa.png');
  let n = 0;
  for await (const imagen of doc) {
    n++;
    fs.writeFileSync(paginaPath, imagen);
    break; // esta carta es una sola página altísima
  }
  if (n === 0) throw new Error('pdf-to-img no devolvió páginas');

  const meta = await sharp(paginaPath).metadata();
  console.log(`▸ Página rasterizada: ${meta.width} x ${meta.height} px (escala ${escala.toFixed(2)})`);
  return cortarImagen(paginaPath, meta.width, meta.height, sharp);
}

async function cortarImagen(img, anchoPx, altoPx, sharp) {
  if (altoPx <= ALTO_MOSAICO) {
    return { mosaicos: [{ ruta: img, offsetY: 0, alto: altoPx, ancho: anchoPx }], anchoPx, altoPx };
  }
  const paso = ALTO_MOSAICO - SOLAPE;
  const mosaicos = [];
  for (let y = 0, i = 0; y < altoPx; y += paso, i++) {
    const alto = Math.min(ALTO_MOSAICO, altoPx - y);
    if (alto < 40) break;
    const ruta = path.join(DIR_MOSAICOS, `m${String(i).padStart(3, '0')}.png`);
    await sharp(img).extract({ left: 0, top: y, width: anchoPx, height: alto }).png().toFile(ruta);
    mosaicos.push({ ruta, offsetY: y, alto, ancho: anchoPx });
  }
  return { mosaicos, anchoPx, altoPx };
}

async function mosaicosDeImagen(img) {
  const sharp = (await import('sharp')).default;
  const meta = await sharp(img).metadata();
  console.log(`▸ Imagen: ${meta.width} x ${meta.height} px`);
  return cortarImagen(img, meta.width, meta.height, sharp);
}

async function prepararMosaicos() {
  const esPdf = entrada.toLowerCase().endsWith('.pdf');
  const rasterizador = String(bandera('rasterizador', 'auto'));

  if (!esPdf) return mosaicosDeImagen(entrada);
  if (rasterizador === 'pdfjs') return mosaicosConPdfjs(entrada);
  if (rasterizador === 'poppler') return mosaicosConPoppler(entrada);

  if (hayPoppler()) {
    console.log('▸ Rasterizador: poppler (pdftoppm)');
    return mosaicosConPoppler(entrada);
  }
  console.log('▸ Rasterizador: pdf-to-img + sharp  (poppler no está en el PATH)');
  return mosaicosConPdfjs(entrada);
}

// ────────────────────────────────────────────────────────────────────────────
// Salidas
// ────────────────────────────────────────────────────────────────────────────

const csvEscapar = (v) => {
  const s = v === null || v === undefined ? '' : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

function escribirSalidas(items, bloques, meta) {
  const jsonPath = path.join(SALIDA, 'menu.json');
  fs.writeFileSync(jsonPath, JSON.stringify({ meta, items }, null, 2));

  // Planilla de precios: esta carta no los trae. Los carga el local una vez.
  const precios = ['categoria,nombre,precio,dieta,dieta_verificada,opciones,confianza,revisar'];
  for (const it of items) {
    precios.push([
      it.categoria, it.nombre, '',
      it.dieta.join('|'),
      it.dietaVerificada ? 'SI' : 'NO',
      it.opciones.map((o) => `${o.tipo}:${o.valores.join('/')}`).join('|'),
      it.confianzaMinima !== null ? it.confianzaMinima.toFixed(3) : '',
      it.revisar ? 'SI' : '',
    ].map(csvEscapar).join(','));
  }
  const preciosPath = path.join(SALIDA, 'menu-precios.csv');
  fs.writeFileSync(preciosPath, precios.join('\n'));

  // Cola de revisión: SOLO lo que el modelo marcó dudoso.
  const dudosos = items.filter((i) => i.revisar);
  const revisar = ['categoria,nombre,descripcion,confianza_minima,bbox_y'];
  for (const it of dudosos) {
    revisar.push([
      it.categoria, it.nombre, it.descripcion,
      it.confianzaMinima !== null ? it.confianzaMinima.toFixed(3) : '',
      it.bboxPagina ? Math.round(it.bboxPagina.y0) : '',
    ].map(csvEscapar).join(','));
  }
  const revisarPath = path.join(SALIDA, 'menu-revisar.csv');
  fs.writeFileSync(revisarPath, revisar.join('\n'));

  const crudoPath = path.join(SALIDA, 'bloques-crudos.json');
  fs.writeFileSync(crudoPath, JSON.stringify(bloques, null, 2));

  return { jsonPath, preciosPath, revisarPath, crudoPath, dudosos: dudosos.length };
}

// ────────────────────────────────────────────────────────────────────────────
// Principal
// ────────────────────────────────────────────────────────────────────────────

const t0Global = Date.now();

const { mosaicos, anchoPx, altoPx } = await prepararMosaicos();
console.log(`▸ ${mosaicos.length} mosaicos de ${ALTO_MOSAICO} px con ${SOLAPE} px de solape\n`);

if (SOLO_MOSAICOS) {
  console.log(`▸ --solo-mosaicos: no llamo a QVAC. Los PNG están en ${DIR_MOSAICOS}`);
  process.exit(0);
}

// A partir de acá es el mismo código que batch-ocr.js, que ya corrió bien.
const { close, loadModel, ocr, OCR_LATIN, unloadModel } = await import('@qvac/sdk');

try {
  console.log('▸ Cargando modelo OCR (OCR_LATIN)...');
  const modelId = await loadModel({
    modelSrc: OCR_LATIN,
    modelConfig: {
      // NO CAMBIAR A 'es'. latin_g2 rechaza 'es' con MODEL_LOAD_FAILED.
      // OCR_LATIN reconoce el ALFABETO latino, no un idioma.
      langList: ['en'],
      magRatio: 1.5,
      defaultRotationAngles: [90, 180, 270],
      contrastRetry: !SIN_CONTRASTE,
      lowConfidenceThreshold: UMBRAL_BAJO,
      recognizerBatchSize: 1,
    },
  });
  console.log(`▸ Modelo cargado. ID: ${modelId}\n`);

  const bloques = [];
  let msMotor = 0;

  for (const [i, m] of mosaicos.entries()) {
    const t0 = Date.now();
    const { blocks, stats } = ocr({ modelId, image: m.ruta, options: { paragraph: false } });
    const resultado = await blocks;
    const wallMs = Date.now() - t0;

    let s = null;
    try { s = await stats; } catch { s = null; }
    if (s?.totalTime) msMotor += s.totalTime;

    for (const b of resultado) {
      const bboxLocal = normalizarBbox(b.bbox);
      bloques.push({
        texto: b.text,
        confianza: b.confidence ?? null,
        mosaico: i,
        bboxLocal,
        bboxPagina: desplazarY(bboxLocal, m.offsetY),
      });
    }

    const bajos = resultado.filter((b) => (b.confidence ?? 1) < UMBRAL_BAJO).length;
    console.log(
      `  m${String(i).padStart(3, '0')}  y=${String(m.offsetY).padStart(6)}  ` +
      `${String(resultado.length).padStart(3)} bloques  ${String(bajos).padStart(3)} dudosos  ` +
      `${s?.totalTime ?? wallMs} ms`
    );
  }

  console.log(`\n▸ ${bloques.length} bloques crudos (con los repetidos del solape)`);
  const unicos = deduplicar(bloques, SOLAPE);
  console.log(`▸ ${unicos.length} bloques únicos  (−${bloques.length - unicos.length} duplicados)`);

  if (unicos.length && !unicos.some((b) => b.bboxPagina)) {
    console.warn(
      '\n⚠ Ningún bloque trajo bbox reconocible. La reconstrucción por columnas y\n' +
      '  cuerpo tipográfico no va a funcionar: revisá la forma real de block.bbox\n' +
      '  en bloques-crudos.json y agregá ese caso a normalizarBbox().\n'
    );
  }

  asignarColumna(unicos, anchoPx);
  const { escalones, base, modo } = clasificarPorAltura(unicos, FACTOR_PLATO, FACTOR_CATEGORIA);
  console.log(
    `▸ Cuerpos tipográficos (${modo}): ` +
    (escalones.length ? escalones.map((e) => `${e.toFixed(1)}px`).join(' · ') : '—')
  );

  const conteo = unicos.reduce((a, b) => ((a[b.rol] = (a[b.rol] || 0) + 1), a), {});
  console.log(`▸ Roles: ${Object.entries(conteo).map(([k, v]) => `${k}=${v}`).join('  ')}`);

  const items = armarItems(unicos, UMBRAL_BAJO);

  const conf = unicos.map((b) => b.confianza).filter((v) => v !== null);
  const confPromedio = conf.length ? conf.reduce((a, b) => a + b, 0) / conf.length : null;

  const meta = {
    corridaISO: new Date().toISOString(),
    entrada,
    dpi: DPI,
    paginaPx: { ancho: anchoPx, alto: altoPx },
    mosaicos: mosaicos.length,
    altoMosaico: ALTO_MOSAICO,
    solape: SOLAPE,
    config: {
      langList: ['en'], magRatio: 1.5,
      contrastRetry: !SIN_CONTRASTE, lowConfidenceThreshold: UMBRAL_BAJO,
      modoClasificacion: modo, escalonesPx: escalones, cuerpoBasePx: base,
      factorPlato: FACTOR_PLATO, factorCategoria: FACTOR_CATEGORIA,
    },
    bloquesCrudos: bloques.length,
    bloquesUnicos: unicos.length,
    confianzaPromedio: confPromedio,
    msMotor,
    msTotales: Date.now() - t0Global,
  };

  const rutas = escribirSalidas(items, unicos, meta);

  console.log(`\n${'='.repeat(72)}`);
  console.log('  CARTA RECONSTRUIDA');
  console.log('='.repeat(72));
  let categoria = null;
  for (const it of items) {
    if (it.categoria !== categoria) {
      categoria = it.categoria;
      console.log(`\n  ── ${categoria ?? '(sin categoría)'} ──`);
    }
    const marca = it.revisar ? '⚠' : ' ';
    const dieta = it.dieta.length ? `  [${it.dieta.join(', ')}]` : '';
    const ops = it.opciones.length ? `  {${it.opciones.map((o) => o.tipo).join(', ')}}` : '';
    console.log(`  ${marca} ${it.nombre}${dieta}${ops}`);
    if (it.descripcion) console.log(`      ${it.descripcion.slice(0, 96)}`);
  }

  console.log(`\n${'='.repeat(72)}`);
  console.log('  AGREGADO');
  console.log('='.repeat(72));
  console.log(`  Ítems detectados:        ${items.length}`);
  console.log(`  Marcados para revisar:   ${rutas.dudosos}  (${items.length ? ((rutas.dudosos / items.length) * 100).toFixed(1) : '0'}%)`);
  console.log(`  Con opciones detectadas: ${items.filter((i) => i.opciones.length).length}`);
  console.log(`  Con dieta verificada:    ${items.filter((i) => i.dietaVerificada).length}`);
  console.log(`  Confianza promedio:      ${confPromedio !== null ? confPromedio.toFixed(3) : '—'}`);
  console.log(`  Tiempo del motor:        ${msMotor} ms   ·   total ${meta.msTotales} ms`);

  console.log(`\n▸ Salidas:`);
  console.log(`    ${rutas.jsonPath}          ← la carta, para la app`);
  console.log(`    ${rutas.preciosPath}   ← se la pasás al local para que ponga precios`);
  console.log(`    ${rutas.revisarPath}   ← SOLO lo que el modelo marcó dudoso`);
  console.log(`    ${rutas.crudoPath}  ← bloque por bloque con bbox, evidencia para el video\n`);

  await unloadModel({ modelId, clearStorage: false });
  process.exit(0);
} catch (error) {
  console.error('\n✖', error);
  console.error('\n💡 Si es MODEL_LOAD_FAILED por configuración, probá:  --no-contrast');
  console.error('💡 Si se queda sin memoria, achicá el mosaico:        --alto 900 --solape 120');
  console.error('💡 Para ver los mosaicos sin llamar a QVAC:           --solo-mosaicos\n');
  await close();
  process.exit(1);
}
