import { api, usdt, pesos, el, montarBarra, avisar } from "./comun.js";

montarBarra("/billeteras.html", "local");

const $ = (id) => document.getElementById(id);

let billeteras = [];
let arsPerUsdt = 1480;
const saldosPrevios = new Map();

let wdk = null;

async function cargar() {
  const [w, movs, config, estadoWdk] = await Promise.all([
    api("/api/wallets"),
    api("/api/wallets/transfers"),
    api("/api/config"),
    api("/api/wdk").catch(() => null),
  ]);
  billeteras = w.wallets;
  arsPerUsdt = config.arsPerUsdt;
  wdk = estadoWdk;
  pintarWdk();
  pintarBilleteras();
  pintarSelectores();
  pintarMovimientos(movs.transfers);
}

/**
 * Estado de WDK.
 *
 * Está arriba de todo y no escondido porque es la evidencia de la
 * integración: qué paquete, qué reglas están activas, y cuánto lleva gastado
 * cada cuenta contra el tope diario. En el video, esta tarjeta es la que
 * respalda la frase "las políticas de WDK autorizan cada cobro".
 */
function pintarWdk() {
  const cont = $("wdk");
  if (!cont) return;
  if (!wdk?.activo) {
    return cont.replaceChildren(el("div", { class: "panel" },
      el("b", {}, "Billetera simulada"),
      el("div", { class: "sub", style: "margin:4px 0 0" }, "WDK_MODE=simulado. Sin derivación ni políticas.")));
  }

  cont.replaceChildren(el("div", { class: "panel wdk-panel" },
    el("div", { class: "fila" },
      el("b", {}, `🔐 ${wdk.paquete}`),
      el("span", { class: "chip dieta" }, wdk.onchain ? `on-chain · ${wdk.chain}` : `${wdk.chain} · firma y política local`),
      el("span", { class: "chip", style: "margin-left:auto" }, `token ${wdk.tokenAddress.slice(0, 10)}… · ${wdk.tokenDecimals} dec`)),

    el("div", { class: "sub", style: "margin:12px 0 6px" }, "Políticas activas — evaluadas antes de mover un centavo"),
    el("div", { class: "politicas" }, ...wdk.politicas.map((p) =>
      el("div", { class: `politica ${p.nombre === "permitir-el-resto" ? "allow" : "deny"}` },
        el("code", {}, p.nombre),
        el("span", {}, p.detalle)))),

    el("div", { class: "sub", style: "margin:14px 0 6px" }, "Cuentas derivadas (BIP-44) y gasto del día"),
    el("table", { class: "movimientos" },
      el("thead", {}, el("tr", {},
        ...["Cuenta", "Derivación", "Dirección", "Gastado hoy"].map((h) => el("th", {}, h)))),
      el("tbody", {}, ...wdk.cuentas.map((c) => {
        const pct = Math.min(100, (c.gastadoHoyInCents / wdk.topeDiarioInCents) * 100);
        return el("tr", {},
          el("td", {}, c.label),
          el("td", { class: "mono" }, c.path),
          el("td", { class: "mono" }, `${c.address.slice(0, 12)}…${c.address.slice(-6)}`),
          el("td", {},
            el("div", { class: "fila", style: "gap:6px" },
              el("span", { class: "mono" }, `${usdt(c.gastadoHoyInCents)} / ${usdt(wdk.topeDiarioInCents)}`)),
            el("div", { class: "barra" }, el("i", { style: `width:${pct}%` }))));
      }))),
  ));
}

function pintarBilleteras() {
  // El negocio va primero: es donde tiene que mirar el ojo cuando llega la plata.
  const orden = [...billeteras].sort((a, b) => (a.kind === "BUSINESS" ? -1 : 0) - (b.kind === "BUSINESS" ? -1 : 0));

  $("billeteras").replaceChildren(...orden.map((w) => {
    const previo = saldosPrevios.get(w.id);
    const subio = previo !== undefined && w.balanceInCents > previo;
    saldosPrevios.set(w.id, w.balanceInCents);

    return el("div", { class: `billetera ${w.kind === "BUSINESS" ? "negocio" : ""}` },
      el("div", { class: "quien" },
        w.kind === "BUSINESS" ? "🏪" : "👤",
        w.label,
        el("span", { class: "chip", style: "margin-left:auto" }, w.kind === "BUSINESS" ? "negocio" : "cliente")),
      el("div", { class: "dir" }, w.address),
      el("div", { class: `saldo ${subio ? "sube" : ""}` },
        usdt(w.balanceInCents),
        el("small", { style: "display:block" }, `≈ ${pesos(w.balanceInCents * arsPerUsdt)}`)),
      el("div", { class: "fila", style: "margin-top:12px" },
        el("button", {
          class: "chico",
          title: "Cargar saldo de la nada. Solo existe en la simulación.",
          onclick: async () => {
            try {
              await api(`/api/wallets/${w.id}/fund`, { method: "POST", body: JSON.stringify({ amountInCents: 5_000 }) });
              avisar(`+50,00 USDT a ${w.label}`);
              await cargar();
            } catch (e) { avisar(e.message, "error"); }
          },
        }, "+50 USDT")),
    );
  }));
}

function pintarSelectores() {
  const opciones = () => billeteras.map((w) => el("option", { value: w.id }, `${w.label} — ${usdt(w.balanceInCents)}`));
  const desde = $("tx-desde");
  const hacia = $("tx-hacia");
  const valorDesde = desde.value;
  const valorHacia = hacia.value;
  desde.replaceChildren(...opciones());
  hacia.replaceChildren(...opciones());
  desde.value = valorDesde || billeteras.find((w) => w.kind === "CLIENT")?.id || "";
  hacia.value = valorHacia || billeteras.find((w) => w.kind === "BUSINESS")?.id || "";
}

// ── Transferencia manual: detalle primero, confirmación después ─────────────

async function transferir(dryRun) {
  const montoUsdt = Number($("tx-monto").value);
  if (!Number.isFinite(montoUsdt) || montoUsdt <= 0) {
    return avisar("El importe tiene que ser mayor que cero.", "error");
  }
  const cuerpo = {
    fromWalletId: $("tx-desde").value,
    toWalletId: $("tx-hacia").value,
    amountInCents: Math.round(montoUsdt * 100),
    concept: $("tx-concepto").value.trim() || "Transferencia manual",
    dryRun,
  };

  try {
    const t = await api("/api/wallets/transfer", { method: "POST", body: JSON.stringify(cuerpo) });
    if (t.status === "PREVIEW") {
      $("tx-salida").replaceChildren(
        el("div", { class: "aviso" },
          el("div", {}, `Recibe: ${usdt(t.amountInCents)}`),
          el("div", {}, `Comisión de red: ${usdt(t.feeInCents)}`),
          el("div", { style: "font-weight:700;margin-top:4px" }, `Sale de origen: ${usdt(t.debitedInCents)}`),
          el("div", { style: "color:var(--tenue);font-size:12px;margin-top:6px" },
            `saldos después → origen ${usdt(t.balancesAfter.from)} · destino ${usdt(t.balancesAfter.to)}`)),
        el("button", { class: "verde", style: "margin-top:10px", onclick: () => transferir(false) }, "Confirmar envío"),
      );
    } else {
      $("tx-salida").replaceChildren(el("div", { class: "aviso ok" }, `Enviado. ${usdt(t.amountInCents)} → ${nombre(t.toWalletId)}`));
      await cargar();
    }
  } catch (e) {
    $("tx-salida").replaceChildren(el("div", { class: "aviso error" }, e.message));
  }
}

$("tx-ver").addEventListener("click", () => transferir(true));

const nombre = (id) => billeteras.find((w) => w.id === id)?.label ?? id;

function pintarMovimientos(transfers) {
  const cuerpo = $("movimientos");
  if (transfers.length === 0) {
    cuerpo.replaceChildren(el("tr", {}, el("td", { colspan: "6", class: "vacio" }, "Todavía no se movió plata.")));
    return;
  }
  cuerpo.replaceChildren(...transfers.map((t) =>
    el("tr", {},
      el("td", { class: "mono" }, new Date(t.createdAt).toLocaleTimeString("es-AR")),
      el("td", {}, nombre(t.fromWalletId)),
      el("td", {}, nombre(t.toWalletId)),
      el("td", { style: "color:var(--tenue)" }, t.concept),
      el("td", { class: "monto-entra", style: "text-align:right" }, usdt(t.amountInCents)),
      el("td", { class: "monto-sale", style: "text-align:right" }, usdt(t.feeInCents)),
    )));
}

cargar().catch((e) => avisar(e.message, "error"));
setInterval(() => cargar().catch(() => {}), 3000);
