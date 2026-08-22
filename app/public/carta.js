import { api, pesos, usdt, el, fotoDe, montarBarra, avisar } from "./comun.js";

montarBarra("/");

const estado = {
  menu: [],
  sesiones: [],
  sesion: null,
  comensalId: null,
  billeteras: [],
  arsPerUsdt: 1480,
  carrito: [], // { item, quantity, choiceIds, choiceLabels, unitPriceInCents }
  filtros: new Set(),
};

const $ = (id) => document.getElementById(id);

// ── Carga inicial ───────────────────────────────────────────────────────────

async function cargar() {
  const [menu, tablas, wallets, config] = await Promise.all([
    api("/api/menu"),
    api("/api/tables"),
    api("/api/wallets"),
    api("/api/config"),
  ]);
  estado.menu = menu.items;
  estado.sesiones = tablas.sessions.filter((s) => s.status !== "CLOSED");
  estado.billeteras = wallets.wallets;
  estado.arsPerUsdt = config.arsPerUsdt;

  if (!estado.sesion || !estado.sesiones.some((s) => s.id === estado.sesion.id)) {
    estado.sesion = estado.sesiones[0] ?? null;
  } else {
    estado.sesion = estado.sesiones.find((s) => s.id === estado.sesion.id);
  }
  if (estado.sesion && !estado.sesion.diners.some((d) => d.id === estado.comensalId)) {
    estado.comensalId = estado.sesion.diners[0]?.id ?? null;
  }
  pintar();
}

// ── Filtros de dieta ────────────────────────────────────────────────────────
//
// Es el diferenciador del producto y por eso vive arriba de la carta y no
// escondido en un menú. Un celíaco no tiene que preguntarle a nadie.

$("chk-celiaco").addEventListener("change", (e) => {
  e.target.checked ? estado.filtros.add("sin-gluten") : estado.filtros.delete("sin-gluten");
  pintarCarta();
});
$("chk-vegano").addEventListener("change", (e) => {
  e.target.checked ? estado.filtros.add("vegano") : estado.filtros.delete("vegano");
  pintarCarta();
});

$("sel-mesa").addEventListener("change", (e) => {
  estado.sesion = estado.sesiones.find((s) => s.id === e.target.value) ?? null;
  estado.comensalId = estado.sesion?.diners[0]?.id ?? null;
  estado.carrito = [];
  pintar();
});
$("sel-comensal").addEventListener("change", (e) => {
  estado.comensalId = e.target.value;
  estado.carrito = [];
  pintar();
});

// ── Pintado ─────────────────────────────────────────────────────────────────

function pintar() {
  pintarContexto();
  pintarCarta();
  pintarCarrito();
  pintarCuenta();
}

function pintarContexto() {
  const s = estado.sesion;
  $("contexto").textContent = s
    ? `Mesa ${s.tableNumber} · ${s.diners.length} en la mesa · estado ${s.status}`
    : "No hay ninguna mesa abierta.";

  const selMesa = $("sel-mesa");
  selMesa.replaceChildren(...estado.sesiones.map((x) => el("option", { value: x.id, selected: x.id === s?.id }, `Mesa ${x.tableNumber}`)));

  const selCom = $("sel-comensal");
  selCom.replaceChildren(...(s?.diners ?? []).map((d) => el("option", { value: d.id, selected: d.id === estado.comensalId }, d.name)));
}

function pintarCarta() {
  const cont = $("carta");
  const visibles = estado.menu.filter((i) => [...estado.filtros].every((f) => (i.diet ?? []).includes(f)));

  if (visibles.length === 0) {
    cont.replaceChildren(el("p", { class: "vacio" }, "Con esos filtros no queda nada. Sacá alguno."));
    return;
  }

  const categorias = [...new Set(visibles.map((i) => i.category))];
  cont.replaceChildren(...categorias.flatMap((cat) => [
    el("h2", {}, cat),
    el("div", { class: "grilla" },
      visibles.filter((i) => i.category === cat).map(tarjeta)),
  ]));
}

function tarjeta(item) {
  const agotado = !item.available;
  return el("article", { class: `plato ${agotado ? "agotado" : ""}`, style: "position:relative" },
    agotado ? el("div", { class: "cinta" }, "SIN STOCK") : null,
    fotoDe(item),
    el("div", { class: "cuerpo" },
      el("div", { class: "nombre" }, item.name),
      el("div", { class: "desc" }, item.description),
      el("div", { class: "fila", style: "gap:5px" },
        (item.diet ?? []).map((d) => el("span", { class: "chip dieta" }, d)),
        item.options?.length ? el("span", { class: "chip" }, "personalizable") : null),
      el("div", { class: "fila" },
        el("span", { class: "precio" }, pesos(item.priceInCents)),
        el("button", {
          class: "primario chico",
          style: "margin-left:auto",
          disabled: agotado || !estado.comensalId,
          onclick: () => abrirOpciones(item),
        }, "Agregar")),
    ),
  );
}

// ── Modal de opciones ───────────────────────────────────────────────────────

let pendiente = null;

function abrirOpciones(item) {
  pendiente = { item, seleccion: new Set(), cantidad: 1, nota: "" };

  // Las marcadas por defecto arrancan puestas: si el producto pide "punto de
  // la carne" y hay un default, no obligamos a elegir algo obvio.
  for (const opcion of item.options ?? []) {
    for (const c of opcion.choices) if (c.byDefault) pendiente.seleccion.add(c.id);
  }

  $("dlg-cuerpo").replaceChildren(
    el("h3", { style: "font-size:17px" }, item.name),
    el("p", { class: "sub" }, item.description),
    ...(item.options ?? []).map((opcion) =>
      el("div", { class: "opcion" },
        el("label", {}, opcion.label + (opcion.required ? " *" : "")),
        ...opcion.choices.map((c) => {
          const input = el("input", {
            type: opcion.kind === "unica" ? "radio" : "checkbox",
            name: opcion.id,
            checked: pendiente.seleccion.has(c.id),
          });
          input.addEventListener("change", () => {
            if (opcion.kind === "unica") for (const otra of opcion.choices) pendiente.seleccion.delete(otra.id);
            input.checked ? pendiente.seleccion.add(c.id) : pendiente.seleccion.delete(c.id);
            $("dlg-precio").textContent = pesos(precioPendiente());
          });
          return el("label", { class: "eleccion" }, input, c.label,
            c.priceDeltaInCents ? el("span", { class: "delta" }, `+${pesos(c.priceDeltaInCents)}`) : null);
        }),
      )),
    el("div", { class: "opcion" },
      el("label", {}, "Nota para la cocina"),
      el("input", { id: "dlg-nota", placeholder: "sin sal, bien caliente…", style: "width:100%" })),
    el("div", { class: "fila", style: "margin-top:16px" },
      el("label", {}, "Cantidad "),
      el("input", { id: "dlg-cant", type: "number", min: "1", max: "20", value: "1", style: "width:74px" }),
      el("span", { id: "dlg-precio", class: "precio", style: "margin-left:auto;font-weight:700;color:var(--acento)" }, pesos(item.priceInCents))),
  );
  $("dlg").showModal();
}

function precioPendiente() {
  const { item, seleccion } = pendiente;
  let precio = item.priceInCents;
  for (const opcion of item.options ?? []) {
    for (const c of opcion.choices) if (seleccion.has(c.id)) precio += c.priceDeltaInCents;
  }
  return precio;
}

function etiquetasPendientes() {
  const { item, seleccion } = pendiente;
  const labels = [];
  for (const opcion of item.options ?? []) {
    const marcadas = opcion.choices.filter((c) => seleccion.has(c.id));
    if (opcion.kind === "unica" && marcadas[0]) labels.push(`${opcion.label}: ${marcadas[0].label}`);
    else for (const c of marcadas) labels.push(c.label);
  }
  return labels;
}

$("dlg-cancelar").addEventListener("click", () => $("dlg").close());
$("dlg-agregar").addEventListener("click", () => {
  const cantidad = Math.max(1, Math.min(20, Number($("dlg-cant").value) || 1));
  estado.carrito.push({
    item: pendiente.item,
    quantity: cantidad,
    choiceIds: [...pendiente.seleccion],
    choiceLabels: etiquetasPendientes(),
    unitPriceInCents: precioPendiente(),
    note: $("dlg-nota").value.trim(),
  });
  $("dlg").close();
  pintarCarrito();
});

// ── Carrito ─────────────────────────────────────────────────────────────────

function pintarCarrito() {
  const cont = $("lineas");
  if (estado.carrito.length === 0) {
    cont.replaceChildren(el("p", { class: "vacio" }, "Todavía no elegiste nada."));
    $("totales").replaceChildren();
    $("btn-enviar").disabled = true;
    return;
  }

  cont.replaceChildren(...estado.carrito.map((linea, i) =>
    el("div", { class: "linea" },
      el("span", { style: "font-weight:700;min-width:20px" }, `${linea.quantity}×`),
      el("span", { class: "info" },
        el("div", {}, linea.item.name),
        linea.choiceLabels.length ? el("div", { class: "opciones" }, linea.choiceLabels.join(" · ")) : null,
        linea.note ? el("div", { class: "opciones", style: "color:var(--acento)" }, `“${linea.note}”`) : null),
      el("span", {}, pesos(linea.unitPriceInCents * linea.quantity)),
      el("button", { class: "chico peligro", onclick: () => { estado.carrito.splice(i, 1); pintarCarrito(); } }, "×"),
    )));

  const total = estado.carrito.reduce((s, l) => s + l.unitPriceInCents * l.quantity, 0);
  $("totales").replaceChildren(el("div", { class: "total grande" }, el("span", {}, "Total"), el("span", {}, pesos(total))));
  $("btn-enviar").disabled = !estado.comensalId;
}

$("btn-enviar").addEventListener("click", async () => {
  try {
    await api(`/api/tables/${estado.sesion.id}/orders`, {
      method: "POST",
      body: JSON.stringify({
        dinerId: estado.comensalId,
        items: estado.carrito.map((l) => ({
          menuItemId: l.item.id,
          quantity: l.quantity,
          choiceIds: l.choiceIds,
          ...(l.note ? { note: l.note } : {}),
        })),
      }),
    });
    estado.carrito = [];
    avisar("Pedido enviado a cocina. Miralo en la pestaña Cocina.");
    await cargar();
  } catch (e) {
    avisar(e.message, "error");
  }
});

// ── Cuenta y pago ───────────────────────────────────────────────────────────

function pintarCuenta() {
  const cont = $("cuenta");
  const s = estado.sesion;
  if (!s) return cont.replaceChildren();

  const entregado = s.orders.length > 0 && s.orders.every((o) => o.status === "DELIVERED");
  const consumo = s.orders.reduce((sum, o) =>
    sum + o.items.filter((i) => i.status !== "CANCELLED").reduce((x, i) => x + i.unitPriceInCents * i.quantity, 0), 0);

  if (s.status === "OPEN") {
    return cont.replaceChildren(
      el("h3", {}, "Cuenta de la mesa"),
      el("div", { class: "total" }, el("span", {}, "Consumido"), el("span", {}, pesos(consumo))),
      el("p", { class: "sub", style: "margin:10px 0" },
        entregado ? "Todo entregado. Ya pueden pedir la cuenta."
                  : "Se puede pedir la cuenta cuando cocina entregue todo."),
      el("button", {
        style: "width:100%",
        disabled: !entregado,
        onclick: async () => {
          try {
            await api(`/api/tables/${s.id}/bill/request`, { method: "POST", body: JSON.stringify({ confirmed: true }) });
            await cargar();
          } catch (e) { avisar(e.message, "error"); }
        },
      }, "Pedir la cuenta"),
    );
  }

  if (s.status === "CLOSED") {
    return cont.replaceChildren(
      el("h3", {}, "Cuenta cerrada"),
      el("div", { class: "aviso ok" }, `Pagado. ${s.payments.length} movimiento(s).`),
      el("p", { class: "sub", style: "margin-top:10px" }, "El detalle está en la pestaña Billeteras."),
    );
  }

  cont.replaceChildren(el("h3", {}, "Pagar"), formularioPago(s));
}

function formularioPago(s) {
  const caja = el("div");
  const selModo = el("select", { id: "pg-modo" },
    el("option", { value: "INDIVIDUAL" }, "Cada uno lo suyo"),
    el("option", { value: "TABLE" }, "Uno paga todo"));
  const selPropina = el("select", { id: "pg-propina" },
    ...[0, 5, 10, 15].map((p) => el("option", { value: p, selected: p === 10 }, `${p}% de propina`)));
  const selBillet = el("select", { id: "pg-billetera" },
    ...estado.billeteras.filter((w) => w.kind === "CLIENT")
      .map((w) => el("option", { value: w.id }, `${w.label} — ${usdt(w.balanceInCents)}`)));

  const comensal = s.diners.find((d) => d.id === estado.comensalId);
  if (comensal?.walletId) selBillet.value = comensal.walletId;

  const salida = el("div", { style: "margin-top:12px" });

  async function preparar(dryRun) {
    const cuerpo = {
      mode: selModo.value,
      tipPercent: Number(selPropina.value),
      walletId: selBillet.value,
      dryRun,
      ...(selModo.value === "INDIVIDUAL" ? { dinerId: estado.comensalId } : {}),
    };
    try {
      const r = await api(`/api/tables/${s.id}/payments/wallet`, { method: "POST", body: JSON.stringify(cuerpo) });
      if (r.preview) {
        salida.replaceChildren(
          el("div", { class: "aviso" },
            el("div", {}, `Total: ${pesos(r.arsTotalInCents)}`),
            el("div", {}, `= ${usdt(r.usdtTotalInCents)}  (1 USDT = $${estado.arsPerUsdt.toLocaleString("es-AR")})`),
            el("div", { style: "color:var(--tenue);font-size:12px;margin-top:6px" },
              `comisión de red ${usdt(r.transfer.feeInCents)} · sale de tu billetera ${usdt(r.transfer.debitedInCents)}`),
            el("div", { style: "color:var(--tenue);font-size:12px" },
              `te queda ${usdt(r.transfer.balancesAfter.from)}`)),
          el("button", { class: "verde", style: "width:100%;margin-top:10px", onclick: () => preparar(false) },
            `Confirmar y pagar ${usdt(r.usdtTotalInCents)}`),
        );
      } else {
        avisar(`Pagado. ${usdt(r.transfer.amountInCents)} llegaron a la caja.`);
        await cargar();
      }
    } catch (e) {
      salida.replaceChildren(el("div", { class: "aviso error" }, e.message));
    }
  }

  caja.append(
    el("div", { class: "fila", style: "margin:10px 0" }, selModo),
    el("div", { class: "fila", style: "margin:10px 0" }, selPropina),
    el("div", { class: "fila", style: "margin:10px 0" }, selBillet),
    el("button", { class: "primario", style: "width:100%", onclick: () => preparar(true) }, "Ver el detalle antes de pagar"),
    salida,
    el("p", { class: "sub", style: "margin-top:14px;font-size:11.5px" },
      "Se muestra el detalle antes de mover un centavo, igual que exige send_token de WDK con dryRun."),
  );
  return caja;
}

// ── Arranque ────────────────────────────────────────────────────────────────

cargar().catch((e) => avisar(e.message, "error"));
setInterval(() => cargar().catch(() => {}), 4000);
