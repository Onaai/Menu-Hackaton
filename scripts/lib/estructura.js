/**
 * estructura.js — todo lo que pasa DESPUÉS del OCR.
 *
 * Está separado de menu-ocr.js a propósito: acá no se importa @qvac/sdk, así
 * que esta lógica se puede correr y testear sin modelo, sin GPU y sin esperar
 * dos minutos de inferencia. `prueba-estructura.js` la ejercita con bloques
 * sintéticos calcados de la carta de Tienda de Café.
 *
 * La regla que ordena todo este archivo: el OCR devuelve renglones sueltos con
 * una caja y una confianza. Ninguna de las decisiones de acá se toma leyendo el
 * contenido del texto salvo donde se dice explícitamente — se toman con la
 * GEOMETRÍA, porque en esta carta los platos y las descripciones están todos en
 * mayúsculas y el texto no los distingue. Lo que los distingue es el cuerpo.
 */

// ────────────────────────────────────────────────────────────────────────────
// Bbox
//
// No verifiqué contra la documentación qué forma exacta devuelve `block.bbox`.
// EasyOCR clásicamente devuelve 4 esquinas; otros motores devuelven
// [x0,y0,x1,y1] o {x,y,width,height}. En vez de adivinar una sola y romper,
// aceptamos las cuatro formas. Si aparece una quinta, devuelve null y el
// bloque sigue vivo pero sin geometría: se ve en el JSON como bbox:null.
// ────────────────────────────────────────────────────────────────────────────

export function normalizarBbox(bbox) {
  if (!bbox) return null;

  if (Array.isArray(bbox)) {
    if (Array.isArray(bbox[0])) {
      const xs = bbox.map((p) => Number(p[0]));
      const ys = bbox.map((p) => Number(p[1]));
      if (xs.some(isNaN) || ys.some(isNaN)) return null;
      return { x0: Math.min(...xs), y0: Math.min(...ys), x1: Math.max(...xs), y1: Math.max(...ys) };
    }
    if (bbox.length === 4 && bbox.every((v) => typeof v === 'number')) {
      const [a, b, c, d] = bbox;
      return { x0: Math.min(a, c), y0: Math.min(b, d), x1: Math.max(a, c), y1: Math.max(b, d) };
    }
    return null;
  }

  const o = bbox;
  if (o.width !== undefined && o.height !== undefined) {
    const x = Number(o.x ?? o.left ?? 0);
    const y = Number(o.y ?? o.top ?? 0);
    return { x0: x, y0: y, x1: x + Number(o.width), y1: y + Number(o.height) };
  }
  if (o.x0 !== undefined) return { x0: +o.x0, y0: +o.y0, x1: +o.x1, y1: +o.y1 };
  if (o.left !== undefined && o.right !== undefined) {
    return { x0: +o.left, y0: +o.top, x1: +o.right, y1: +o.bottom };
  }
  return null;
}

export const desplazarY = (bbox, dy) =>
  bbox ? { x0: bbox.x0, y0: bbox.y0 + dy, x1: bbox.x1, y1: bbox.y1 + dy } : null;

// ────────────────────────────────────────────────────────────────────────────
// Deduplicar el solape entre mosaicos
// ────────────────────────────────────────────────────────────────────────────

export const normalizarTexto = (t) =>
  String(t || '')
    .toUpperCase()
    .replace(/[^A-ZÁÉÍÓÚÜÑ0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Dos bloques son el mismo si dicen lo mismo y caen a menos de `tolerancia`
 * píxeles de distancia vertical en coordenadas de PÁGINA.
 *
 * La tolerancia importa: si es muy chica, el mismo renglón leído en dos
 * mosaicos queda duplicado; si es muy grande, dos platos que de verdad se
 * llaman igual en secciones distintas ("CROISSANT" en desayunos y en
 * tostados) se fusionan y se pierde uno. Por eso el default es el solape,
 * no un número inventado más grande.
 */
export function deduplicar(bloques, tolerancia) {
  const vistos = [];
  const salida = [];
  for (const b of bloques) {
    const clave = normalizarTexto(b.texto);
    if (!clave) continue;
    const y = b.bboxPagina ? b.bboxPagina.y0 : null;
    const repetido = vistos.find(
      (v) => v.clave === clave && (y === null || v.y === null || Math.abs(v.y - y) <= tolerancia)
    );
    if (repetido) {
      if ((b.confianza ?? 0) > (repetido.ref.confianza ?? 0)) {
        Object.assign(repetido.ref, b);
        repetido.y = y;
      }
      continue;
    }
    vistos.push({ clave, y, ref: b });
    salida.push(b);
  }
  return salida;
}

// ────────────────────────────────────────────────────────────────────────────
// Columnas
// ────────────────────────────────────────────────────────────────────────────

export function asignarColumna(bloques, anchoPx, umbralAncho = 0.6) {
  const mitad = anchoPx / 2;
  for (const b of bloques) {
    if (!b.bboxPagina) { b.columna = 'desconocida'; continue; }
    const { x0, x1 } = b.bboxPagina;
    if (x1 - x0 > anchoPx * umbralAncho) { b.columna = 'ancho-completo'; continue; }
    b.columna = (x0 + x1) / 2 < mitad ? 'izq' : 'der';
  }
  return bloques;
}

// ────────────────────────────────────────────────────────────────────────────
// Clasificación por cuerpo tipográfico
// ────────────────────────────────────────────────────────────────────────────

/**
 * k-means en una dimensión sobre las alturas de renglón.
 *
 * Primera versión de esto usaba la MEDIANA de altura como base y umbrales
 * relativos. El test la tumbó y con razón: la mediana de una carta no es la
 * altura de las descripciones, es la que le toque según cuántos renglones
 * tenga cada plato. En la carta sintética había 9 descripciones y 7 nombres,
 * y la mediana cayó justo en los nombres — con lo cual NINGÚN bloque quedaba
 * clasificado como plato y salían cero ítems.
 *
 * Agrupar es lo correcto porque no supone proporciones: busca los escalones
 * que hay, estén donde estén. Determinístico, sin dependencias, ~25 líneas.
 */
export function agruparAlturas(alturas, k = 3, iteraciones = 30) {
  const unicas = [...new Set(alturas)].sort((a, b) => a - b);
  if (unicas.length === 0) return [];
  k = Math.min(k, unicas.length);

  // Semillas en percentiles equiespaciados de los valores únicos: estable,
  // sin azar, y reproducible entre corridas (importante para la evidencia).
  let centros = Array.from({ length: k }, (_, i) => unicas[Math.floor(((i + 0.5) / k) * unicas.length)]);

  for (let it = 0; it < iteraciones; it++) {
    const grupos = Array.from({ length: k }, () => []);
    for (const h of alturas) {
      let mejor = 0;
      let dist = Infinity;
      for (let i = 0; i < k; i++) {
        const d = Math.abs(h - centros[i]);
        if (d < dist) { dist = d; mejor = i; }
      }
      grupos[mejor].push(h);
    }
    const nuevos = grupos.map((g, i) => (g.length ? g.reduce((a, b) => a + b, 0) / g.length : centros[i]));
    const estable = nuevos.every((c, i) => Math.abs(c - centros[i]) < 0.01);
    centros = nuevos;
    if (estable) break;
  }

  // Fusionar escalones que en realidad son el mismo cuerpo tipográfico:
  // 29,8 y 30,2 no son dos niveles, es ruido del detector.
  const ordenados = centros.sort((a, b) => a - b);
  const fusionados = [ordenados[0]];
  for (const c of ordenados.slice(1)) {
    if (c / fusionados[fusionados.length - 1] < 1.2) fusionados[fusionados.length - 1] = (fusionados[fusionados.length - 1] + c) / 2;
    else fusionados.push(c);
  }
  return fusionados;
}

/**
 * Clasifica cada renglón en categoría / plato / descripción por su cuerpo.
 *
 * Modo automático (default): agrupa las alturas y asigna por cercanía al
 * escalón. Con 3 escalones → descripción, plato, categoría. Con 2 → el chico
 * es descripción y el grande plato. Con 1 → todo plato (una carta de puros
 * nombres, sin descripciones, es un caso real).
 *
 * Modo manual: si pasás factorPlato/factorCategoria, los umbrales se aplican
 * relativos al escalón MÁS CHICO. Está para poder desempantanarse a mano a
 * las 4 de la mañana si el agrupamiento sale raro con una carta rara.
 */
export function clasificarPorAltura(bloques, factorPlato = null, factorCategoria = null) {
  const alturas = bloques
    .map((b) => (b.bboxPagina ? b.bboxPagina.y1 - b.bboxPagina.y0 : null))
    .filter((h) => h !== null && h > 0);

  if (alturas.length === 0) {
    for (const b of bloques) { b.rol = 'desconocido'; b.alturaRelativa = null; }
    return { escalones: [], base: null, modo: 'sin-datos' };
  }

  const escalones = agruparAlturas(alturas, 3);
  const base = escalones[0];
  const manual = factorPlato !== null && factorCategoria !== null;

  const rolPorAltura = (h) => {
    if (manual) {
      const rel = h / base;
      if (rel >= factorCategoria) return 'categoria';
      if (rel >= factorPlato) return 'plato';
      return 'descripcion';
    }
    // Automático: al escalón más cercano.
    let mejor = 0;
    let dist = Infinity;
    for (let i = 0; i < escalones.length; i++) {
      const d = Math.abs(h - escalones[i]);
      if (d < dist) { dist = d; mejor = i; }
    }
    if (escalones.length >= 3) return ['descripcion', 'plato', 'categoria'][Math.min(mejor, 2)];
    if (escalones.length === 2) return mejor === 0 ? 'descripcion' : 'plato';
    return 'plato';
  };

  for (const b of bloques) {
    const h = b.bboxPagina ? b.bboxPagina.y1 - b.bboxPagina.y0 : null;
    if (h === null || h <= 0) { b.rol = 'desconocido'; b.alturaRelativa = null; continue; }
    b.alturaRelativa = h / base;
    b.rol = rolPorAltura(h);
  }

  return { escalones, base, modo: manual ? 'manual' : 'automatico' };
}

// ────────────────────────────────────────────────────────────────────────────
// Dieta
//
// Acá es donde es fácil mentirse. Los símbolos ⓥ / sin TACC de la carta son
// ICONOS, no texto: un reconocedor de alfabeto latino no los va a leer. Lo
// único honesto es detectar lo que SÍ está escrito con palabras y dejar el
// resto marcado como NO VERIFICADO para que lo confirme una persona.
//
// Eso no es una limitación a esconder. El sponsor de QVAC pide textualmente
// que el agente señale lo que no sabe en vez de afirmar con demasiada
// confianza — y acá el costo de equivocarse es que un celíaco coma gluten.
// ────────────────────────────────────────────────────────────────────────────

export const REGLAS_DIETA = [
  { etiqueta: 'sin-gluten', re: /\bSIN\s+GLUTEN\b|\bSIN\s+TACC\b|\bCEL[IÍ]ACO/i },
  { etiqueta: 'vegano', re: /\bVEGAN[OA]?\b/i },
  { etiqueta: 'vegetariano', re: /\bVEGETARIAN[OA]\b/i },
];

export const detectarDieta = (texto) =>
  REGLAS_DIETA.filter((r) => r.re.test(texto)).map((r) => r.etiqueta);

// ────────────────────────────────────────────────────────────────────────────
// Opciones de personalización
//
// Muchas cartas traen las opciones escritas adentro de la descripción:
//   "LICUADOS  FRUTA A ELECCIÓN — BANANA. FRUTILLA. DURAZNO. MANZANA.
//    ELEGILO CON BASE DE LECHE, AGUA O NARANJA."
// Eso ya es un selector de personalización esperando a ser leído, y es
// exactamente lo que convierte una carta en una comanda sin errores.
// ────────────────────────────────────────────────────────────────────────────

const partirValores = (s) =>
  s
    .split(/[.,]|\s\bO\b\s|\s\bY\b\s/i)
    .map((v) => v.trim())
    .filter((v) => v.length > 1 && v.length < 40);

export function detectarOpciones(texto) {
  const t = String(texto || '').replace(/\s+/g, ' ');
  const opciones = [];

  const conBase = t.match(/CON BASE DE ([^.;]+)/i);
  if (conBase) opciones.push({ tipo: 'base', valores: partirValores(conBase[1]), obligatoria: true });

  const aEleccion = t.match(/A ELECCI[OÓ]N[:\s-]*([^.;]+)/i);
  if (aEleccion) opciones.push({ tipo: 'eleccion', valores: partirValores(aEleccion[1]), obligatoria: true });

  if (/CONSULT[AÁ]/i.test(t)) opciones.push({ tipo: 'consultar-al-mozo', valores: [], obligatoria: false });

  const medida = t.match(/\b(\d{3,4})\s*CC\b/i);
  if (medida) opciones.push({ tipo: 'medida', valores: [`${medida[1]} cc`], obligatoria: false });

  return opciones;
}

// ────────────────────────────────────────────────────────────────────────────
// Agrupar renglones en ítems
// ────────────────────────────────────────────────────────────────────────────

/**
 * Agrupa renglones en ítems, en UNA sola pasada ordenada por y.
 *
 * La primera versión de esto recorría columna por columna y el test la tumbó.
 * El problema: en una carta a dos columnas las categorías vienen de dos
 * clases distintas y hay que tratarlas distinto.
 *
 *   · "DESAYUNOS" ocupa el ancho de la página y manda sobre LAS DOS columnas.
 *   · "ME TIENDA ESTE TOSTADO" y "TORTAS" son títulos de UNA columna y no
 *     tienen que pisar lo que pasa en la de al lado.
 *
 * Si recorrés columna por columna, cuando terminás la izquierda la categoría
 * vigente es la última de abajo de todo, y con esa arrancás la derecha. Todos
 * los platos de la derecha quedan bajo la categoría equivocada. Se ve enseguida
 * en un test y no se ve nunca mirando un JSON de 80 ítems a las 5 de la mañana.
 *
 * La forma correcta: una pasada por y, con categoría global para los títulos
 * de ancho completo, categoría por columna para los títulos de columna, y un
 * ítem "en curso" por columna para que las descripciones se peguen al plato
 * de SU columna aunque en el medio haya pasado un renglón de la otra.
 */
export function armarItems(bloques, umbralBajo = 0.5) {
  const ordenColumna = { 'ancho-completo': 0, izq: 1, der: 2, desconocida: 3 };
  const ordenados = [...bloques].sort((a, b) => {
    const dy = (a.bboxPagina?.y0 ?? 0) - (b.bboxPagina?.y0 ?? 0);
    if (dy !== 0) return dy;
    return (ordenColumna[a.columna] ?? 3) - (ordenColumna[b.columna] ?? 3);
  });

  const items = [];
  let categoriaGlobal = null;
  const categoriaColumna = { izq: null, der: null, 'ancho-completo': null, desconocida: null };
  const enCurso = { izq: null, der: null, 'ancho-completo': null, desconocida: null };

  // Orden de aparición de cada categoría, para poder ordenar la salida como
  // se lee la carta y no saltando de sección en sección.
  const ordenCategoria = new Map();
  const registrarCategoria = (nombre, y) => {
    if (nombre !== null && !ordenCategoria.has(nombre)) ordenCategoria.set(nombre, y);
  };

  const cerrar = (col) => {
    if (enCurso[col]) { items.push(enCurso[col]); enCurso[col] = null; }
  };

  for (const b of ordenados) {
    const col = b.columna ?? 'desconocida';
    const y = b.bboxPagina?.y0 ?? 0;

    if (b.rol === 'categoria') {
      if (col === 'ancho-completo') {
        // Empieza una sección nueva de toda la página: cierra lo abierto en
        // ambas columnas y borra las categorías de columna anteriores.
        for (const c of Object.keys(enCurso)) cerrar(c);
        categoriaGlobal = b.texto.trim();
        categoriaColumna.izq = null;
        categoriaColumna.der = null;
        registrarCategoria(categoriaGlobal, y);
      } else {
        cerrar(col);
        categoriaColumna[col] = b.texto.trim();
        registrarCategoria(categoriaColumna[col], y);
      }
      continue;
    }

    if (b.rol === 'plato') {
      cerrar(col);
      const categoria = categoriaColumna[col] ?? categoriaGlobal;
      registrarCategoria(categoria, y);
      enCurso[col] = {
        categoria,
        nombre: b.texto.trim(),
        descripcion: '',
        dieta: [],
        dietaVerificada: false,
        opciones: [],
        precio: null, // esta carta NO trae precios. Ver README.
        confianzaNombre: b.confianza ?? null,
        confianzaMinima: b.confianza ?? null,
        revisar: (b.confianza ?? 1) < umbralBajo,
        columna: col,
        bboxPagina: b.bboxPagina,
      };
      continue;
    }

    // descripción (o desconocido): se pega al plato en curso de SU columna
    const actual = enCurso[col];
    if (actual) {
      actual.descripcion = `${actual.descripcion} ${b.texto.trim()}`.trim();
      if (b.confianza !== null && b.confianza !== undefined) {
        actual.confianzaMinima = Math.min(actual.confianzaMinima ?? 1, b.confianza);
        if (b.confianza < umbralBajo) actual.revisar = true;
      }
    }
  }

  for (const c of Object.keys(enCurso)) cerrar(c);

  for (const it of items) {
    const todo = `${it.nombre} ${it.descripcion}`;
    it.dieta = detectarDieta(todo);
    it.dietaVerificada = it.dieta.length > 0;
    it.opciones = detectarOpciones(todo);
  }

  // Orden de lectura: por sección tal como aparece, y adentro por altura.
  items.sort((a, b) => {
    const ca = ordenCategoria.get(a.categoria) ?? -1;
    const cb = ordenCategoria.get(b.categoria) ?? -1;
    if (ca !== cb) return ca - cb;
    return (a.bboxPagina?.y0 ?? 0) - (b.bboxPagina?.y0 ?? 0);
  });

  return items;
}
