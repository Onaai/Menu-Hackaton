// Utilidades compartidas por las tres pantallas.

/** Llama a la API y convierte el error del dominio en una excepción legible. */
export async function api(ruta, opciones = {}) {
  const respuesta = await fetch(ruta, {
    ...opciones,
    headers: opciones.body ? { "content-type": "application/json", ...(opciones.headers ?? {}) } : opciones.headers,
  });
  const texto = await respuesta.text();
  const cuerpo = texto ? JSON.parse(texto) : null;
  if (!respuesta.ok) {
    const mensaje = cuerpo?.error?.message ?? `Error ${respuesta.status}`;
    const error = new Error(mensaje);
    error.code = cuerpo?.error?.code;
    throw error;
  }
  return cuerpo;
}

/** Centavos de peso → "$13.800,00". Toda la plata del sistema va en centavos. */
export function pesos(centavos) {
  return (centavos / 100).toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
}

export function usdt(centavos) {
  return `${(centavos / 100).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT`;
}

export function el(tag, props = {}, ...hijos) {
  const nodo = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === "class") nodo.className = v;
    else if (k === "html") nodo.innerHTML = v;
    else if (k.startsWith("on")) nodo.addEventListener(k.slice(2), v);
    else if (v !== null && v !== undefined && v !== false) nodo.setAttribute(k, v);
  }
  for (const hijo of hijos.flat()) {
    if (hijo === null || hijo === undefined || hijo === false) continue;
    nodo.append(hijo instanceof Node ? hijo : document.createTextNode(String(hijo)));
  }
  return nodo;
}

/**
 * Foto del plato, con reserva generada.
 *
 * Si el archivo de /public/img no está —y hoy no está ninguno— el navegador
 * dispara `error` y ponemos en su lugar un SVG dibujado a partir del NOMBRE del
 * plato: siempre el mismo color para el mismo nombre, con su inicial y un ícono
 * según la categoría.
 *
 * Es a propósito: la carta se ve completa desde el minuto cero, sin descargar
 * nada de internet y sin un solo recuadro roto. Cuando el local suba sus fotos
 * a /public/img, aparecen solas sin tocar una línea de código.
 */
export function fotoDe(item) {
  const img = el("img", { class: "foto", alt: item.name, loading: "lazy" });
  img.addEventListener("error", () => { img.src = reservaSvg(item); }, { once: true });
  img.src = item.image ?? reservaSvg(item);
  return img;
}

const ICONOS = {
  "Para empezar": "🥗",
  "Principales": "🍽️",
  "Postres": "🍰",
  "Bebidas": "🍹",
};

function reservaSvg(item) {
  const h = [...item.name].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 360, 7);
  const icono = ICONOS[item.category] ?? "🍴";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${h},38%,26%)"/>
      <stop offset="1" stop-color="hsl(${(h + 40) % 360},42%,15%)"/>
    </linearGradient></defs>
    <rect width="400" height="300" fill="url(#g)"/>
    <text x="200" y="168" font-size="86" text-anchor="middle">${icono}</text>
    <text x="200" y="228" font-size="17" fill="rgba(255,255,255,.62)" text-anchor="middle"
      font-family="Segoe UI,system-ui,sans-serif">${escapar(item.name)}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const escapar = (s) => String(s).replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));

/**
 * Barra superior.
 *
 * Hay DOS barras distintas y eso es a propósito: **el cliente no ve la
 * cocina**. Alguien que escanea el QR de la mesa 7 no tiene por qué poder
 * abrir el tablero del local, marcar platos como entregados ni mirar la caja.
 *
 * Las pantallas del local no están protegidas con contraseña —es una demo—
 * pero al menos no están enlazadas desde la vista del comensal, que es la
 * diferencia entre "no se muestra" y "se muestra y encima invita".
 */
const NAV = {
  cliente: [["/", "Carta"]],
  local: [["/cocina.html", "Cocina"], ["/billeteras.html", "Billeteras"], ["/admin.html", "Administración"]],
};

export function montarBarra(activa, zona = "cliente", extra = null) {
  const paginas = NAV[zona] ?? NAV.cliente;
  document.body.prepend(
    el("header", { class: "barra" },
      el("div", { class: "marca", html: "MESA <span>ABIERTA</span>" }),
      zona === "local" ? el("span", { class: "chip" }, "pantalla del local") : null,
      el("nav", { class: "tabs" },
        paginas.map(([href, texto]) =>
          el("a", { href, class: href === activa ? "activo" : "" }, texto)),
        extra),
    ),
  );
}

/** mm:ss a partir de segundos. Para el cronómetro de cocina. */
export function reloj(segundos) {
  const s = Math.max(0, Math.floor(segundos));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

/** Muestra un mensaje arriba de todo y lo saca solo. */
export function avisar(texto, tipo = "ok") {
  document.querySelectorAll(".aviso.flotante").forEach((n) => n.remove());
  const nodo = el("div", { class: `aviso flotante ${tipo}`, style: "position:fixed;top:66px;left:50%;transform:translateX(-50%);z-index:99;max-width:min(560px,92vw);box-shadow:var(--sombra)" }, texto);
  document.body.append(nodo);
  setTimeout(() => nodo.remove(), tipo === "error" ? 6000 : 3500);
}
