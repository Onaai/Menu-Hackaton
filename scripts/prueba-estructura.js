/**
 * prueba-estructura.js — ejercita lib/estructura.js sin QVAC.
 *
 * Por qué existe: la parte del OCR no la puedo probar sin el modelo, pero la
 * parte de "qué hago con lo que devuelve el OCR" sí, y es donde están los bugs
 * que después cuestan una hora a las 4 de la mañana. Los bloques de acá abajo
 * están calcados de la carta real de Tienda de Café: dos columnas, categorías
 * en cuerpo grande, platos en cuerpo mediano, descripciones en cuerpo chico, y
 * un renglón repetido a propósito para simular el solape entre mosaicos.
 *
 *   node prueba-estructura.js
 */

import {
  normalizarBbox, desplazarY, deduplicar, asignarColumna,
  clasificarPorAltura, armarItems, detectarDieta, detectarOpciones,
} from './lib/estructura.js';

let ok = 0;
let fallos = 0;

function comprobar(nombre, condicion, detalle = '') {
  if (condicion) { ok++; console.log(`  ✅ ${nombre}`); }
  else { fallos++; console.log(`  ❌ ${nombre}${detalle ? `\n       ${detalle}` : ''}`); }
}

const ANCHO = 1291; // el ancho real de la página a 150 dpi

// ── 1 · normalizarBbox acepta las cuatro formas ────────────────────────────
console.log('\n── normalizarBbox ──');
{
  const esperado = { x0: 10, y0: 20, x1: 110, y1: 50 };
  const iguales = (a, b) => a && b && a.x0 === b.x0 && a.y0 === b.y0 && a.x1 === b.x1 && a.y1 === b.y1;

  comprobar('4 esquinas [[x,y]...]',
    iguales(normalizarBbox([[10, 20], [110, 20], [110, 50], [10, 50]]), esperado));
  comprobar('[x0,y0,x1,y1]', iguales(normalizarBbox([10, 20, 110, 50]), esperado));
  comprobar('{x,y,width,height}', iguales(normalizarBbox({ x: 10, y: 20, width: 100, height: 30 }), esperado));
  comprobar('{left,top,right,bottom}', iguales(normalizarBbox({ left: 10, top: 20, right: 110, bottom: 50 }), esperado));
  comprobar('esquinas al revés se normalizan', iguales(normalizarBbox([110, 50, 10, 20]), esperado));
  comprobar('null / basura devuelven null',
    normalizarBbox(null) === null && normalizarBbox({ raro: 1 }) === null && normalizarBbox(['a', 'b']) === null);
  comprobar('desplazarY suma solo en y',
    iguales(desplazarY(esperado, 1000), { x0: 10, y0: 1020, x1: 110, y1: 1050 }));
}

// ── 2 · Carta sintética ────────────────────────────────────────────────────
// Alturas: descripción 18 px · plato 30 px · categoría 62 px
// Columna izquierda x≈90..600 · derecha x≈700..1200

const b = (texto, x0, y0, ancho, alto, confianza = 0.92, mosaico = 0) => ({
  texto, confianza, mosaico,
  bboxPagina: { x0, y0, x1: x0 + ancho, y1: y0 + alto },
});

const bloques = [
  // Categoría de ancho completo
  b('DESAYUNOS', 90, 1000, 900, 62),

  // Columna izquierda
  b('DESAYUNO APTO CELIACOS', 90, 1100, 420, 30),
  b('INFUSION, JUGO DE NARANJA, TOSTADAS DE TRIGO SARRACENO,', 90, 1140, 500, 18),
  b('QUESO Y MERMELADA DE FRUTOS ROJOS. SIN GLUTEN', 90, 1162, 500, 18),

  b('AVOCADO TOAST', 90, 1240, 300, 30),
  b('INFUSION, JUGO DE NARANJA, TOSTON MULTICEREAL', 90, 1280, 500, 18),

  // Columna derecha, con su propia categoría
  b('ME TIENDA ESTE TOSTADO', 700, 1080, 480, 62),
  b('TOSTADO CLASICO', 700, 1200, 320, 30),
  b('DE JAMON Y QUESO.', 700, 1240, 260, 18),
  b('TOSTADO SIN GLUTEN', 700, 1300, 360, 30),
  b('A BASE DE HARINA DE MANDIOCA, RELLENO CON JAMON', 700, 1340, 500, 18),

  // Bebidas con opciones escritas en la propia descripción
  b('QUE TOMAMOS', 90, 2000, 900, 62),
  b('LIMONADAS 500 CC', 90, 2100, 340, 30),
  b('MENTA Y JENGIBRE', 90, 2140, 280, 18),
  b('LICUADOS FRUTA A ELECCION', 700, 2100, 420, 30),
  b('BANANA. FRUTILLA. DURAZNO. MANZANA', 700, 2140, 460, 18),
  b('ELEGILO CON BASE DE LECHE, AGUA O NARANJA.', 700, 2162, 480, 18),

  // Un plato de baja confianza: tiene que quedar marcado para revisar
  b('TARTAS', 90, 2260, 160, 30, 0.31),
  b('CONSULTA POR LA TARTA DEL DIA.', 90, 2300, 400, 18, 0.88),
];

// El mismo renglón visto desde el mosaico siguiente (simula el solape).
const duplicados = [
  b('AVOCADO TOAST', 90, 1243, 300, 30, 0.85, 1),
  b('TOSTADO CLASICO', 700, 1198, 320, 30, 0.97, 1),
];

console.log('\n── deduplicar ──');
{
  const todos = [...bloques, ...duplicados];
  const unicos = deduplicar(todos, 160);
  comprobar(`saca los 2 duplicados del solape (${todos.length} → ${unicos.length})`,
    unicos.length === bloques.length, `esperaba ${bloques.length}, obtuve ${unicos.length}`);

  const clasico = unicos.find((x) => x.texto === 'TOSTADO CLASICO');
  comprobar('se queda con la lectura de MAYOR confianza (0.97 sobre 0.92)',
    clasico && Math.abs(clasico.confianza - 0.97) < 1e-9,
    `confianza = ${clasico?.confianza}`);

  // Dos platos que de verdad se llaman igual, lejos entre sí, NO se fusionan.
  const lejanos = [b('CROISSANT', 90, 1500, 200, 30), b('CROISSANT', 700, 4000, 200, 30)];
  comprobar('dos platos homónimos en secciones distintas sobreviven los dos',
    deduplicar(lejanos, 160).length === 2);
}

console.log('\n── columnas ──');
{
  const copia = bloques.map((x) => ({ ...x }));
  asignarColumna(copia, ANCHO);
  const porRol = (t) => copia.find((x) => x.texto === t)?.columna;
  comprobar('"DESAYUNO APTO CELIACOS" cae en la izquierda', porRol('DESAYUNO APTO CELIACOS') === 'izq');
  comprobar('"TOSTADO CLASICO" cae en la derecha', porRol('TOSTADO CLASICO') === 'der');
  comprobar('"DESAYUNOS" (900 px de ancho) es ancho-completo', porRol('DESAYUNOS') === 'ancho-completo');
}

console.log('\n── clasificar por cuerpo ──');
{
  const copia = bloques.map((x) => ({ ...x }));
  asignarColumna(copia, ANCHO);
  const { escalones, base } = clasificarPorAltura(copia);
  const rol = (t) => copia.find((x) => x.texto === t)?.rol;

  comprobar(`los escalones detectados son 18 / 30 / 62 (base ${base})`, escalones.length === 3 && base === 18, JSON.stringify(escalones));
  comprobar('"DESAYUNOS" (62 px) → categoría', rol('DESAYUNOS') === 'categoria');
  comprobar('"AVOCADO TOAST" (30 px) → plato', rol('AVOCADO TOAST') === 'plato');
  comprobar('"DE JAMON Y QUESO." (18 px) → descripción', rol('DE JAMON Y QUESO.') === 'descripcion');
}

console.log('\n── dieta y opciones ──');
{
  comprobar('"SIN GLUTEN" se detecta', detectarDieta('TOSTADO SIN GLUTEN').includes('sin-gluten'));
  comprobar('"CELIACOS" se detecta como sin-gluten', detectarDieta('DESAYUNO APTO CELIACOS').includes('sin-gluten'));
  comprobar('un plato común no inventa dieta', detectarDieta('TOSTADO CLASICO DE JAMON Y QUESO').length === 0);

  const ops = detectarOpciones('LICUADOS FRUTA A ELECCION BANANA. FRUTILLA. DURAZNO. MANZANA ELEGILO CON BASE DE LECHE, AGUA O NARANJA.');
  const base = ops.find((o) => o.tipo === 'base');
  comprobar('detecta la opción "base"', !!base);
  comprobar('la base tiene leche / agua / naranja',
    base && ['LECHE', 'AGUA', 'NARANJA'].every((v) => base.valores.some((x) => x.toUpperCase().includes(v))),
    `valores = ${JSON.stringify(base?.valores)}`);
  comprobar('detecta la medida 500 cc',
    detectarOpciones('LIMONADAS 500 CC').some((o) => o.tipo === 'medida'));
  comprobar('detecta "consultá al mozo"',
    detectarOpciones('CONSULTA POR LA TARTA DEL DIA.').some((o) => o.tipo === 'consultar-al-mozo'));
}

console.log('\n── armar ítems ──');
{
  const copia = [...bloques, ...duplicados].map((x) => ({ ...x }));
  const unicos = deduplicar(copia, 160);
  asignarColumna(unicos, ANCHO);
  clasificarPorAltura(unicos);
  const items = armarItems(unicos, 0.5);

  const nombre = (n) => items.find((i) => i.nombre === n);

  comprobar(`se arman 7 ítems (obtuve ${items.length})`, items.length === 7,
    items.map((i) => i.nombre).join(' · '));

  const celiacos = nombre('DESAYUNO APTO CELIACOS');
  comprobar('el desayunо celíaco junta sus DOS renglones de descripción',
    celiacos && celiacos.descripcion.includes('TRIGO SARRACENO') && celiacos.descripcion.includes('FRUTOS ROJOS'),
    celiacos?.descripcion);
  comprobar('y queda marcado sin-gluten', celiacos?.dieta.includes('sin-gluten'));

  const clasico = nombre('TOSTADO CLASICO');
  comprobar('"TOSTADO CLASICO" hereda la categoría de SU columna, no la de la izquierda',
    clasico?.categoria === 'ME TIENDA ESTE TOSTADO', `categoria = ${clasico?.categoria}`);

  const avocado = nombre('AVOCADO TOAST');
  comprobar('"AVOCADO TOAST" hereda "DESAYUNOS"', avocado?.categoria === 'DESAYUNOS',
    `categoria = ${avocado?.categoria}`);

  const licuados = nombre('LICUADOS FRUTA A ELECCION');
  comprobar('"LICUADOS" arrastra la opción de base leída de la descripción',
    licuados?.opciones.some((o) => o.tipo === 'base'));

  const tartas = nombre('TARTAS');
  comprobar('el plato de confianza 0.31 queda marcado para revisar', tartas?.revisar === true);
  comprobar('la confianza mínima del ítem es la del renglón peor, no la del nombre',
    tartas && Math.abs(tartas.confianzaMinima - 0.31) < 1e-9, `min = ${tartas?.confianzaMinima}`);

  comprobar('ningún ítem sale con precio inventado', items.every((i) => i.precio === null));
  comprobar('los ítems sin palabra de dieta quedan como NO verificados',
    nombre('TOSTADO CLASICO')?.dietaVerificada === false);
}

// ── Casos borde ────────────────────────────────────────────────────────────
console.log('\n── casos borde ──');
{
  comprobar('sin bloques no explota', armarItems([], 0.5).length === 0);

  const sinBbox = [{ texto: 'ALGO', confianza: 0.9, bboxPagina: null }];
  const r = clasificarPorAltura(sinBbox);
  comprobar('bloques sin bbox no rompen la clasificación',
    r.base === null && sinBbox[0].rol === 'desconocido');

  comprobar('texto vacío se descarta al deduplicar',
    deduplicar([{ texto: '   ', confianza: 0.9, bboxPagina: null }], 160).length === 0);
}

console.log(`\n${'='.repeat(60)}`);
console.log(`  ${ok} pasaron · ${fallos} fallaron`);
console.log('='.repeat(60));
process.exit(fallos === 0 ? 0 : 1);
