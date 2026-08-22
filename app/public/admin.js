import { api, pesos, usdt, el, montarBarra, avisar } from "./comun.js";

montarBarra("/admin.html", "local");
const $ = (id) => document.getElementById(id);

const NOMBRE_METODO = { WALLET: "💳 Billetera USD₮", MERCADO_PAGO: "🔵 Mercado Pago", EFECTIVO: "💵 Efectivo" };

async function cargar() {
  const [r, menu, caja] = await Promise.all([
    api("/api/admin/restaurante"),
    api("/api/menu"),
    api("/api/admin/caja"),
  ]);
  pintarLocal(r);
  pintarMenu(menu.items);
  pintarCaja(caja);
}

// ── Datos del local ─────────────────────────────────────────────────────────

function pintarLocal(r) {
  const campos = [
    ["nombre", "Nombre"], ["direccion", "Dirección"], ["localidad", "Localidad"],
    ["telefono", "Teléfono"], ["cuit", "CUIT"], ["aliasMp", "Alias de Mercado Pago"],
    ["walletAddress", "Dirección de la billetera (cobra acá)"],
  ];
  const inputs = {};
  const cotiz = el("input", { type: "number", min: "1", value: r.arsPorUsdt, style: "width:140px" });
  const propinas = el("input", { value: (r.propinasSugeridas ?? []).join(", "), style: "width:140px" });

  const metodos = ["WALLET", "MERCADO_PAGO", "EFECTIVO"].map((m) =>
    el("label", { class: "chip" },
      el("input", { type: "checkbox", checked: (r.metodosHabilitados ?? []).includes(m), "data-m": m }),
      NOMBRE_METODO[m]));

  $("local").replaceChildren(
    el("div", { class: "grilla-admin" },
      ...campos.map(([k, etiqueta]) => {
        inputs[k] = el("input", { value: r[k] ?? "", style: "width:100%" });
        return el("div", { class: "opcion" }, el("label", {}, etiqueta), inputs[k]);
      })),
    el("div", { class: "fila", style: "margin-top:8px" },
      el("div", { class: "opcion" }, el("label", {}, "1 USDT = $"), cotiz),
      el("div", { class: "opcion" }, el("label", {}, "Propinas (%)"), propinas)),
    el("div", { class: "opcion" }, el("label", {}, "Métodos habilitados"), el("div", { class: "fila" }, ...metodos)),
    el("button", {
      class: "primario", style: "margin-top:8px",
      onclick: async () => {
        const cambios = Object.fromEntries(Object.entries(inputs).map(([k, i]) => [k, i.value]));
        cambios.arsPorUsdt = Number(cotiz.value);
        cambios.propinasSugeridas = propinas.value.split(",").map((x) => Number(x.trim())).filter((n) => !isNaN(n));
        cambios.metodosHabilitados = metodos
          .map((l) => l.querySelector("input"))
          .filter((i) => i.checked).map((i) => i.dataset.m);
        try {
          await api("/api/admin/restaurante", { method: "PATCH", body: JSON.stringify(cambios) });
          avisar("Guardado. La carta ya lo muestra.");
          await cargar();
        } catch (e) { avisar(e.message, "error"); }
      },
    }, "Guardar cambios"),
  );
}

// ── Carta ───────────────────────────────────────────────────────────────────

function pintarMenu(items) {
  const cabecera = el("tr", {},
    ...["Producto", "Categoría", "Precio", "Prep.", "Stock", ""].map((h) => el("th", {}, h)));

  const filas = items.map((it) => {
    const nombre = el("input", { value: it.name, style: "width:100%;min-width:150px" });
    const cat = el("input", { value: it.category, style: "width:120px" });
    // El precio se edita en PESOS aunque adentro viajen centavos: nadie carga
    // "1790000" en una carta.
    const precio = el("input", { type: "number", min: "1", value: Math.round(it.priceInCents / 100), style: "width:110px" });
    const prep = el("input", { type: "number", min: "0", value: it.prepMinutes, style: "width:70px" });
    const stock = el("input", { type: "checkbox", checked: it.available });

    const guardar = async () => {
      try {
        await api(`/api/admin/menu/${it.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            name: nombre.value, category: cat.value,
            priceInCents: Math.round(Number(precio.value) * 100),
            prepMinutes: Number(prep.value), available: stock.checked,
          }),
        });
        avisar(`${nombre.value} actualizado.`);
      } catch (e) { avisar(e.message, "error"); await cargar(); }
    };
    for (const campo of [nombre, cat, precio, prep, stock]) campo.addEventListener("change", guardar);

    return el("tr", {},
      el("td", {}, nombre), el("td", {}, cat), el("td", {}, precio), el("td", {}, prep),
      el("td", {}, stock),
      el("td", {}, el("button", {
        class: "chico peligro",
        onclick: async () => {
          if (!confirm(`¿Borrar "${it.name}" de la carta?`)) return;
          try { await api(`/api/admin/menu/${it.id}`, { method: "DELETE" }); await cargar(); }
          catch (e) { avisar(e.message, "error"); }
        },
      }, "Borrar")));
  });

  $("tabla-menu").replaceChildren(el("thead", {}, cabecera), el("tbody", {}, ...filas));
}

$("btn-nuevo").addEventListener("click", async () => {
  const name = prompt("Nombre del producto nuevo");
  if (!name) return;
  try {
    await api("/api/admin/menu", { method: "POST", body: JSON.stringify({ name, priceInCents: 100_000 }) });
    await cargar();
  } catch (e) { avisar(e.message, "error"); }
});

// ── Caja ────────────────────────────────────────────────────────────────────

function pintarCaja(c) {
  $("caja-kpis").replaceChildren(
    kpi(pesos(c.totalInCents), "cobrado"),
    kpi(pesos(c.propinasInCents), "propinas"),
    kpi(String(c.cantidad), "operaciones"),
    kpi(pesos(c.efectivoEnCajaInCents), "debe haber en el cajón", "var(--verde)"),
    ...c.porMetodo.filter((m) => m.cantidad > 0).map((m) => kpi(pesos(m.totalInCents), `${NOMBRE_METODO[m.metodo]} (${m.cantidad})`)),
  );

  const cabecera = el("tr", {}, ...["Hora", "Mesa/Quién", "Método", "Subtotal", "Propina", "Total", "Detalle"].map((h) => el("th", {}, h)));
  const filas = c.movimientos.map((p) => el("tr", {},
    el("td", { class: "mono" }, new Date(p.createdAt).toLocaleTimeString("es-AR")),
    el("td", {}, p.dinerName ?? (p.modo === "TABLE" ? "toda la mesa" : "—")),
    el("td", {}, NOMBRE_METODO[p.metodo] ?? p.metodo),
    el("td", { style: "text-align:right" }, pesos(p.subtotalInCents)),
    el("td", { style: "text-align:right" }, pesos(p.tipInCents)),
    el("td", { class: "monto-entra", style: "text-align:right" }, pesos(p.totalInCents)),
    el("td", { class: "mono" }, detalle(p)),
  ));

  $("tabla-caja").replaceChildren(
    el("thead", {}, cabecera),
    el("tbody", {}, ...(filas.length ? filas : [el("tr", {}, el("td", { colspan: "7", class: "vacio" }, "Todavía no se cobró nada."))])),
  );
}

const detalle = (p) => {
  if (p.metodo === "EFECTIVO") return `recibido ${pesos(p.recibidoInCents ?? 0)} · vuelto ${pesos(p.vueltoInCents ?? 0)}`;
  if (p.metodo === "MERCADO_PAGO") return p.referenciaMp ?? "";
  return `${usdt(p.usdtTotalInCents ?? 0)}${p.motor === "wdk" ? " · WDK" : ""}`;
};

function kpi(n, l, color) {
  return el("div", { class: "kpi" },
    el("div", { class: "n", style: `font-size:17px${color ? `;color:${color}` : ""}` }, n),
    el("div", { class: "l" }, l));
}

cargar().catch((e) => avisar(e.message, "error"));
setInterval(() => cargar().catch(() => {}), 5000);
