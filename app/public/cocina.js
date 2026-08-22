import { api, el, montarBarra, avisar, reloj } from "./comun.js";

montarBarra("/cocina.html", "local");

const $ = (id) => document.getElementById(id);

let tablero = null;
/**
 * Momento en que llegó el tablero, en el reloj del NAVEGADOR.
 *
 * El cronómetro se dibuja como `esperaSegundos + (ahora - momentoDeLaCarga)`.
 * Suena rebuscado y evita un problema real: si el navegador calculara la
 * espera desde `createdAt`, cualquier diferencia entre el reloj del servidor y
 * el de la máquina que mira la pantalla se vería como minutos de más o de
 * menos. Así el número de partida siempre lo pone el servidor —una sola fuente
 * de verdad para todas las pantallas— y el navegador solo lo hace correr.
 */
let cargadoEn = 0;

async function refrescar() {
  try {
    tablero = await api("/api/kitchen/board");
    cargadoEn = Date.now();
    pintar();
  } catch (e) {
    avisar(e.message, "error");
  }
}

const transcurrido = (base) => base + (Date.now() - cargadoEn) / 1000;

function pintar() {
  const { summary, tickets } = tablero;

  $("kpis").replaceChildren(
    kpi(summary.mesas, "mesas esperando"),
    kpi(summary.platos, "platos"),
    kpi(reloj(transcurrido(summary.esperaMaximaSegundos)), "la que más espera",
      summary.esperaMaximaSegundos >= 600 ? "var(--rojo)" : summary.esperaMaximaSegundos >= 300 ? "var(--ambar)" : null),
    kpi(summary.urgentes, "urgentes", summary.urgentes ? "var(--rojo)" : null),
  );

  $("tickets").replaceChildren(
    tickets.length === 0
      ? el("div", { class: "panel vacio" }, "No hay nada pendiente. La cocina está al día.")
      : tickets.map(pintarTicket),
  );
}

function kpi(n, l, color) {
  return el("div", { class: "kpi" },
    el("div", { class: "n", style: color ? `color:${color}` : "" }, String(n)),
    el("div", { class: "l" }, l));
}

function pintarTicket(t) {
  return el("article", { class: `ticket-mesa ${t.urgencia}` },
    el("header", {},
      el("span", { class: "mesa" }, `Mesa ${t.tableNumber}`),
      el("span", { class: "chip" }, `${t.totalPlatos} plato${t.totalPlatos === 1 ? "" : "s"}`),
      t.urgente ? el("span", { class: "chip urgente" }, "URGENTE") : null,
      el("span", { class: "crono", "data-base": t.esperaSegundos }, reloj(transcurrido(t.esperaSegundos))),
    ),

    el("div", { class: "cuerpo" },
      t.pedidos.map((p) =>
        el("div", { class: "pedido" },
          el("div", { class: "quien" },
            p.dinerName,
            p.type === "ADDITIONAL" ? el("span", { class: "chip" }, "agregado") : null,
            el("span", { class: "hace", "data-base": p.esperaSegundos },
              `hace ${reloj(transcurrido(p.esperaSegundos))}`)),
          p.lines.map((l) => pintarLinea(l)),
        )),
    ),

    el("footer", {},
      el("button", {
        class: "chico",
        onclick: () => accion(`/api/kitchen/orders/${t.pedidos[0].orderId}/rush`, "POST", { rushed: !t.urgente }),
      }, t.urgente ? "Quitar urgencia" : "Marcar urgente"),
      el("button", {
        class: "verde",
        style: "margin-left:auto",
        onclick: () => accion(`/api/kitchen/tables/${t.sessionId}/deliver`, "POST"),
      }, `Entregar toda la mesa ${t.tableNumber}`),
    ),
  );
}

function pintarLinea(l) {
  return el("label", { class: "tline" },
    // Un checkbox y no un botón: el gesto de la cocina es tildar lo que ya
    // salió. Se marca y desaparece del ticket en el próximo refresco.
    el("input", {
      type: "checkbox",
      onchange: (e) => {
        e.target.disabled = true;
        accion(`/api/kitchen/orders/${l.orderId}/lines/${l.lineIndex}/deliver`, "POST");
      },
    }),
    el("span", { class: "cant" }, `${l.quantity}×`),
    el("span", { class: "txt" },
      el("div", {}, l.name),
      l.choices?.length ? el("div", { class: "mod" }, l.choices.join(" · ")) : null,
      l.note ? el("div", { class: "nota" }, `“${l.note}”`) : null),
    el("button", {
      class: "chico peligro",
      title: "Cancelar: no se le cobra a la mesa",
      onclick: (e) => {
        e.preventDefault();
        if (confirm(`¿Cancelar "${l.name}"? No se le va a cobrar a la mesa.`)) {
          accion(`/api/kitchen/orders/${l.orderId}/lines/${l.lineIndex}`, "DELETE");
        }
      },
    }, "✕"),
  );
}

async function accion(ruta, metodo, cuerpo) {
  try {
    await api(ruta, { method: metodo, ...(cuerpo ? { body: JSON.stringify(cuerpo) } : {}) });
    await refrescar();
  } catch (e) {
    avisar(e.message, "error");
    await refrescar();
  }
}

// ── Sin stock ───────────────────────────────────────────────────────────────

$("btn-stock").addEventListener("click", async () => {
  const { items } = await api("/api/menu");
  $("lista-stock").replaceChildren(...items.map((item) =>
    el("label", { class: "eleccion" },
      el("input", {
        type: "checkbox",
        checked: item.available,
        onchange: async (e) => {
          try {
            await api(`/api/menu/${item.id}/availability`, {
              method: "PATCH",
              body: JSON.stringify({ available: e.target.checked }),
            });
            avisar(`${item.name}: ${e.target.checked ? "disponible" : "SIN STOCK"}`);
          } catch (err) {
            e.target.checked = !e.target.checked;
            avisar(err.message, "error");
          }
        },
      }),
      item.name),
  ));
  $("dlg-stock").showModal();
});
$("cerrar-stock").addEventListener("click", () => $("dlg-stock").close());

// ── Arranque ────────────────────────────────────────────────────────────────

refrescar();

// Dos ritmos distintos a propósito: el cronómetro corre cada segundo sin
// pedirle nada al servidor, y los datos se traen cada tres. Si se recargara
// todo cada segundo, el tablero parpadearía y sería imposible tildar nada.
setInterval(() => {
  if (!$("chk-auto").checked) return;
  for (const nodo of document.querySelectorAll(".crono")) {
    nodo.textContent = reloj(transcurrido(Number(nodo.dataset.base)));
  }
  for (const nodo of document.querySelectorAll(".hace")) {
    nodo.textContent = `hace ${reloj(transcurrido(Number(nodo.dataset.base)))}`;
  }
}, 1000);

setInterval(() => { if ($("chk-auto").checked) refrescar(); }, 3000);
