import { api, el, montarBarra, avisar } from "./comun.js";

montarBarra("/cocina.html");

const $ = (id) => document.getElementById(id);

const NOMBRE_ESTACION = {
  PARRILLA: "🔥 Parrilla",
  FRIOS: "🥗 Fríos",
  BARRA: "🍹 Barra",
  POSTRES: "🍰 Postres",
};

// El botón que corresponde a cada estado de una línea. La cocina avanza de a
// un paso y en un solo sentido; para volver atrás está "deshacer", que es otra
// acción distinta y a propósito no se confunde con esta.
const SIGUIENTE = {
  PENDING: { destino: "PREPARING", texto: "Empezar", clase: "chico" },
  PREPARING: { destino: "READY", texto: "Listo", clase: "chico verde" },
  READY: { destino: "DELIVERED", texto: "Entregado", clase: "chico primario" },
};

let tablero = null;

async function refrescar() {
  try {
    tablero = await api("/api/kitchen/board");
    pintar();
  } catch (e) {
    avisar(e.message, "error");
  }
}

function pintar() {
  const { summary, stations } = tablero;

  $("kpis").replaceChildren(
    kpi(summary.openTickets, "comandas"),
    kpi(summary.lines, "platos"),
    kpi(`${summary.oldestMinutes}′`, "la más vieja", summary.oldestMinutes >= 10 ? "var(--rojo)" : summary.oldestMinutes >= 5 ? "var(--ambar)" : null),
    kpi(summary.rushed, "urgentes", summary.rushed ? "var(--rojo)" : null),
  );

  $("estaciones").replaceChildren(...stations.map(pintarEstacion));
}

function kpi(n, l, color) {
  return el("div", { class: "kpi" },
    el("div", { class: "n", style: color ? `color:${color}` : "" }, String(n)),
    el("div", { class: "l" }, l));
}

function pintarEstacion(est) {
  return el("section", { class: "estacion" },
    el("header", {},
      el("span", {}, NOMBRE_ESTACION[est.station] ?? est.station),
      el("span", { class: "cuenta" }, `${est.pending} plato${est.pending === 1 ? "" : "s"}`)),
    el("div", { class: "lista" },
      est.tickets.length === 0
        ? el("p", { class: "vacio" }, "Nada pendiente.")
        : est.tickets.map(pintarTicket)),
  );
}

function pintarTicket(t) {
  return el("article", { class: `ticket ${t.urgency}` },
    el("div", { class: "cab" },
      el("span", { class: "mesa" }, `Mesa ${t.tableNumber}`),
      el("span", {}, t.dinerName),
      t.type === "ADDITIONAL" ? el("span", { class: "chip" }, "agregado") : null,
      t.rushed ? el("span", { class: "chip", style: "border-color:var(--rojo);color:var(--rojo)" }, "URGENTE") : null,
      el("span", { class: "edad" }, `${t.ageMinutes}′`)),

    ...t.lines.map((l) => pintarLinea(t, l)),

    el("div", { class: "fila", style: "margin-top:9px;justify-content:flex-end" },
      el("button", {
        class: "chico",
        onclick: () => accion(`/api/kitchen/orders/${t.orderId}/rush`, "POST", { rushed: !t.rushed }),
      }, t.rushed ? "Quitar urgencia" : "Marcar urgente")),
  );
}

function pintarLinea(t, l) {
  const paso = SIGUIENTE[l.status];
  return el("div", { class: `tline ${l.status}` },
    el("span", { class: "cant" }, `${l.quantity}×`),
    el("span", { class: "txt" },
      el("div", {}, l.name),
      l.choices?.length ? el("div", { class: "mod" }, l.choices.join(" · ")) : null,
      l.note ? el("div", { class: "nota" }, `“${l.note}”`) : null),
    el("span", { class: "acciones" },
      paso ? el("button", {
        class: paso.clase,
        onclick: () => accion(`/api/kitchen/orders/${l.orderId}/lines/${l.lineIndex}`, "PATCH", { status: paso.destino }),
      }, paso.texto) : null,
      l.status !== "PENDING" ? el("button", {
        class: "chico",
        title: "Deshacer un paso",
        onclick: () => accion(`/api/kitchen/orders/${l.orderId}/lines/${l.lineIndex}/rollback`, "POST"),
      }, "↶") : null,
      el("button", {
        class: "chico peligro",
        title: "Cancelar este plato: no se cobra",
        onclick: () => {
          if (confirm(`¿Cancelar "${l.name}"? No se le va a cobrar a la mesa.`)) {
            accion(`/api/kitchen/orders/${l.orderId}/lines/${l.lineIndex}`, "DELETE");
          }
        },
      }, "✕"),
    ),
  );
}

async function accion(ruta, metodo, cuerpo) {
  try {
    await api(ruta, { method: metodo, ...(cuerpo ? { body: JSON.stringify(cuerpo) } : {}) });
    await refrescar();
  } catch (e) {
    avisar(e.message, "error");
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
      item.name,
      el("span", { class: "delta" }, item.station)),
  ));
  $("dlg-stock").showModal();
});
$("cerrar-stock").addEventListener("click", () => $("dlg-stock").close());

// ── Arranque ────────────────────────────────────────────────────────────────

refrescar();
setInterval(() => { if ($("chk-auto").checked) refrescar(); }, 3000);
