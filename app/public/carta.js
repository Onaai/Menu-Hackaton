import { api, pesos, usdt, el, fotoDe, montarBarra, avisar } from "./comun.js";

const $ = (id) => document.getElementById(id);

const estado = {
  menu: [],
  sesiones: [],
  sesion: null,
  comensalId: null,
  billeteras: [],
  config: { arsPerUsdt: 1480, googleConfigurado: false, appleConfigurado: false },
  cuenta: null,
  sugerencias: null,
  carrito: [],
};

// Chip de cuenta en la barra. La cocina NO está enlazada acá: el comensal no
// tiene por qué llegar al tablero del local desde su teléfono.
const chipCuenta = el("a", { href: "#", class: "activo", onclick: (e) => { e.preventDefault(); abrirCuenta(); } }, "…");
montarBarra("/", "cliente", chipCuenta);

// ── Carga ───────────────────────────────────────────────────────────────────

async function cargar() {
  const [menu, tablas, wallets, config, yo] = await Promise.all([
    api("/api/menu"),
    api("/api/tables"),
    api("/api/wallets"),
    api("/api/config"),
    api("/api/auth/yo"),
  ]);
  estado.menu = menu.items;
  estado.sesiones = tablas.sessions.filter((s) => s.status !== "CLOSED");
  estado.billeteras = wallets.wallets;
  estado.config = config;
  estado.cuenta = yo.cuenta;

  if (!estado.sesion || !estado.sesiones.some((s) => s.id === estado.sesion.id)) {
    estado.sesion = estado.sesiones[0] ?? null;
  } else {
    estado.sesion = estado.sesiones.find((s) => s.id === estado.sesion.id);
  }
  if (estado.sesion && !estado.sesion.diners.some((d) => d.id === estado.comensalId)) {
    estado.comensalId = estado.sesion.diners[0]?.id ?? null;
  }

  sincronizarFiltros();
  pintar();

  if (estado.cuenta.onboardingPendiente) abrirOnboarding();
}

/** Trae las sugerencias aparte: el modelo tarda y no puede frenar la carta. */
async function cargarSugerencias() {
  try {
    estado.sugerencias = await api("/api/sugerencias");
    pintarParaVos();
  } catch {
    /* si falla, la sección simplemente no aparece */
  }
}

// ── Onboarding ──────────────────────────────────────────────────────────────

function abrirOnboarding() {
  $("dlg-onboarding").showModal();
}
$("onb-listo").addEventListener("click", async () => {
  $("dlg-onboarding").close();
  try {
    const r = await api("/api/auth/onboarding-visto", { method: "POST" });
    estado.cuenta = r.cuenta;
  } catch { /* no es crítico */ }
});

// ── Cuenta ──────────────────────────────────────────────────────────────────

function abrirCuenta() {
  const c = estado.cuenta;
  const registrada = c?.tipo === "REGISTRADA";
  const cuerpo = $("cuenta-cuerpo");

  if (registrada) {
    cuerpo.replaceChildren(
      el("h3", { style: "font-size:19px" }, `Hola, ${c.nombre}`),
      el("p", { class: "sub" }, c.email ?? ""),
      el("div", { class: "aviso ok" },
        "Tu cuenta guarda lo que pedís para poder sugerirte algo la próxima vez. " +
        "Nada más: no guardamos pagos ni datos de tarjeta."),
      el("p", { class: "sub", style: "margin-top:16px" },
        `Platos distintos que pediste: ${Object.keys(c.preferencias.historial).length}`),
      el("button", {
        class: "peligro",
        style: "width:100%;margin-top:8px",
        onclick: async () => {
          await api("/api/auth/salir", { method: "POST" });
          location.reload();
        },
      }, "Cerrar sesión"),
    );
  } else {
    const entrada = el("input", { id: "reg-nombre", placeholder: "Tu nombre", style: "width:100%", value: "" });
    const nota = el("div", { class: "aviso", style: "margin-top:14px" });
    nota.append(
      el("div", {}, estado.config.googleConfigurado
        ? "Google está configurado en este servidor: el botón abre el login real."
        : "⚠️ Modo demo: no hay credenciales de Google cargadas, así que la identidad la crea este mismo servidor."),
      el("div", { style: "margin-top:6px;font-size:12px" },
        "Apple siempre corre en modo demo: “Sign in with Apple” exige una cuenta de desarrollador paga."),
    );

    cuerpo.replaceChildren(
      el("h3", { style: "font-size:19px" }, "Creá tu cuenta"),
      el("p", { class: "sub" },
        "No hace falta para pedir. Sirve para que la próxima vez que vengas, " +
        "la carta te sugiera algo con lo que ya pediste."),
      el("div", { class: "fila", style: "flex-direction:column;align-items:stretch;gap:8px;margin:16px 0" },
        el("button", {
          class: "primario",
          onclick: () => {
            if (estado.config.googleConfigurado) location.href = "/api/auth/google";
            else registrarDemo("google");
          },
        }, "Continuar con Google"),
        el("button", { onclick: () => registrarDemo("apple") }, "Continuar con Apple"),
      ),
      el("div", { class: "opcion" },
        el("label", {}, "o simplemente decinos cómo te llamás"),
        entrada,
        el("button", { style: "width:100%;margin-top:8px", onclick: () => registrarDemo("demo") }, "Guardar mis gustos")),
      nota,
    );
  }
  $("dlg-cuenta").showModal();
}
$("cuenta-cerrar").addEventListener("click", () => $("dlg-cuenta").close());

async function registrarDemo(proveedor) {
  const nombre = $("reg-nombre")?.value?.trim() || estado.cuenta?.nombre || "Cliente";
  try {
    const r = await api("/api/auth/registrar", { method: "POST", body: JSON.stringify({ nombre, proveedor }) });
    estado.cuenta = r.cuenta;
    $("dlg-cuenta").close();
    avisar(`Listo, ${r.cuenta.nombre}. Tus gustos quedan guardados.`);
    await cargar();
    await cargarSugerencias();
  } catch (e) {
    avisar(e.message, "error");
  }
}

// ── Preferencias de dieta ───────────────────────────────────────────────────
//
// Se guardan en la cuenta, no solo en la pantalla: la próxima vez que vengas,
// la carta arranca filtrada. Y es lo que le da al modelo el dato más
// importante que tiene para no recomendarte algo que no podés comer.

const FILTROS = { "chk-celiaco": "sin-gluten", "chk-vegano": "vegano", "chk-vegetariano": "vegetariano" };

function sincronizarFiltros() {
  const dietas = estado.cuenta?.preferencias?.dietas ?? [];
  for (const [id, etiqueta] of Object.entries(FILTROS)) $(id).checked = dietas.includes(etiqueta);
}

for (const id of Object.keys(FILTROS)) {
  $(id).addEventListener("change", async () => {
    const dietas = Object.entries(FILTROS).filter(([k]) => $(k).checked).map(([, v]) => v);
    pintarCarta();
    try {
      const r = await api("/api/auth/preferencias", { method: "PATCH", body: JSON.stringify({ dietas }) });
      estado.cuenta = r.cuenta;
      await cargarSugerencias();
    } catch (e) {
      avisar(e.message, "error");
    }
  });
}

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
  chipCuenta.textContent = estado.cuenta
    ? (estado.cuenta.tipo === "REGISTRADA" ? `👤 ${estado.cuenta.nombre}` : `${estado.cuenta.nombre} · crear cuenta`)
    : "cuenta";
  pintarContexto();
  pintarParaVos();
  pintarCarta();
  pintarCarrito();
  pintarCuenta();
}

function pintarContexto() {
  const s = estado.sesion;
  $("contexto").textContent = s
    ? `Mesa ${s.tableNumber} · ${s.diners.length} en la mesa`
    : "No hay ninguna mesa abierta.";

  $("sel-mesa").replaceChildren(...estado.sesiones.map((x) =>
    el("option", { value: x.id, selected: x.id === s?.id }, `Mesa ${x.tableNumber}`)));
  $("sel-comensal").replaceChildren(...(s?.diners ?? []).map((d) =>
    el("option", { value: d.id, selected: d.id === estado.comensalId }, d.name)));
}

/**
 * "Para vos": lo que sugiere el modelo local.
 *
 * Muestra SIEMPRE de dónde salió cada cosa. Si el modelo no estaba levantado,
 * lo dice; y si descartó algo que el modelo inventó, también. Un producto que
 * dice "te lo recomienda la IA" cuando en realidad es una regla de tres es
 * exactamente lo que el sponsor descarta.
 */
function pintarParaVos() {
  const cont = $("para-vos");
  const c = estado.cuenta;
  const r = estado.sugerencias;

  // Cliente sin cuenta que ya pidió algo: es el momento de ofrecerle guardarlo.
  if (c && c.tipo === "ANONIMA" && Object.keys(c.preferencias.historial).length > 0) {
    return cont.replaceChildren(
      el("div", { class: "panel invitacion" },
        el("div", {},
          el("b", {}, "¿Guardamos lo que te gusta?"),
          el("div", { class: "sub", style: "margin:4px 0 0" },
            "Con una cuenta, la próxima vez la carta te sugiere algo. Los datos no salen del local.")),
        el("button", { class: "primario", style: "margin-left:auto", onclick: abrirCuenta }, "Crear cuenta")),
    );
  }

  if (!r || r.sugerencias.length === 0) return cont.replaceChildren();

  const fuente = r.motor === "qvac-local"
    ? el("span", { class: "chip dieta" }, `IA local · ${r.modelo ?? "modelo"} · ${r.latenciaMs} ms`)
    : el("span", { class: "chip", title: "El servidor de QVAC no respondió; esto sale de una regla simple." },
        "sin IA — modelo no disponible");

  cont.replaceChildren(
    el("div", { class: "fila", style: "margin:8px 0 12px" },
      el("h2", { style: "margin:0" }, `Para vos, ${c?.nombre?.split(" ")[0] ?? ""}`),
      fuente),
    el("div", { class: "grilla" }, r.sugerencias.map((s) => {
      const item = estado.menu.find((i) => i.id === s.menuItemId);
      if (!item) return null;
      const tarjetita = tarjeta(item);
      tarjetita.classList.add("sugerido");
      tarjetita.querySelector(".cuerpo").prepend(el("div", { class: "motivo" }, `“${s.motivo}”`));
      return tarjetita;
    })),
    r.descartadas.length
      ? el("details", { class: "descartes" },
          el("summary", {}, `El modelo propuso ${r.descartadas.length} que no mostramos`),
          el("ul", {}, r.descartadas.map((d) => el("li", {}, `${d.texto} — ${LEYENDA[d.razon] ?? d.razon}`))))
      : null,
  );
}

const LEYENDA = {
  "no-existe-en-la-carta": "no existe en la carta (el modelo lo inventó)",
  "sin-stock": "hoy no hay",
  "repetida": "estaba repetida",
  "rompe-la-dieta": "no cumple tu dieta",
  "formato-invalido": "el modelo no respetó el formato",
};

function pintarCarta() {
  const cont = $("carta");
  const activos = Object.entries(FILTROS).filter(([k]) => $(k).checked).map(([, v]) => v);
  const visibles = estado.menu.filter((i) => activos.every((f) => (i.diet ?? []).includes(f)));

  if (visibles.length === 0) {
    return cont.replaceChildren(el("p", { class: "vacio" }, "Con esos filtros no queda nada. Sacá alguno."));
  }

  const categorias = [...new Set(visibles.map((i) => i.category))];
  cont.replaceChildren(...categorias.flatMap((cat) => [
    el("h2", {}, cat),
    el("div", { class: "grilla" }, visibles.filter((i) => i.category === cat).map(tarjeta)),
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

// ── Opciones ────────────────────────────────────────────────────────────────

let pendiente = null;

function abrirOpciones(item) {
  pendiente = { item, seleccion: new Set() };
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
            if (input.checked) pendiente.seleccion.add(c.id); else pendiente.seleccion.delete(c.id);
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
      el("span", { id: "dlg-precio", style: "margin-left:auto;font-weight:700;color:var(--acento)" }, pesos(item.priceInCents))),
  );
  $("dlg").showModal();
}

function precioPendiente() {
  let precio = pendiente.item.priceInCents;
  for (const opcion of pendiente.item.options ?? []) {
    for (const c of opcion.choices) if (pendiente.seleccion.has(c.id)) precio += c.priceDeltaInCents;
  }
  return precio;
}

function etiquetasPendientes() {
  const labels = [];
  for (const opcion of pendiente.item.options ?? []) {
    const marcadas = opcion.choices.filter((c) => pendiente.seleccion.has(c.id));
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
    avisar("Pedido enviado a cocina.");
    await cargar();
    await cargarSugerencias();
  } catch (e) {
    avisar(e.message, "error");
  }
});

// ── Cuenta de la mesa y pago ────────────────────────────────────────────────

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
        entregado ? "Todo entregado. Ya pueden pedir la cuenta." : "Se puede pedir la cuenta cuando la cocina entregue todo."),
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
    );
  }

  cont.replaceChildren(el("h3", {}, "Pagar"), formularioPago(s));
}

function formularioPago(s) {
  const caja = el("div");
  const selModo = el("select", {},
    el("option", { value: "INDIVIDUAL" }, "Cada uno lo suyo"),
    el("option", { value: "TABLE" }, "Uno paga todo"));
  const selPropina = el("select", {},
    ...[0, 5, 10, 15].map((p) => el("option", { value: p, selected: p === 10 }, `${p}% de propina`)));
  const selBillet = el("select", {},
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
            el("div", {}, `= ${usdt(r.usdtTotalInCents)}  (1 USDT = $${estado.config.arsPerUsdt.toLocaleString("es-AR")})`),
            el("div", { style: "color:var(--tenue);font-size:12px;margin-top:6px" },
              `comisión de red ${usdt(r.transfer.feeInCents)} · sale de tu billetera ${usdt(r.transfer.debitedInCents)}`),
            el("div", { style: "color:var(--tenue);font-size:12px" }, `te queda ${usdt(r.transfer.balancesAfter.from)}`)),
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
      "Pagos simulados. Se muestra el detalle antes de mover un centavo, igual que exige send_token de WDK con dryRun."),
  );
  return caja;
}

// ── Arranque ────────────────────────────────────────────────────────────────

if (new URLSearchParams(location.search).has("bienvenida")) {
  avisar("Sesión iniciada. Tus gustos quedan guardados.");
  history.replaceState(null, "", "/");
}

cargar().then(cargarSugerencias).catch((e) => avisar(e.message, "error"));
setInterval(() => cargar().catch(() => {}), 5000);
