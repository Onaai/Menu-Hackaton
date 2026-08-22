import { api, usdt, pesos, el, montarBarra, avisar } from "./comun.js";

montarBarra("/billeteras.html", "local");

const $ = (id) => document.getElementById(id);

let billeteras = [];
let arsPerUsdt = 1480;
const saldosPrevios = new Map();

async function cargar() {
  const [w, movs, config] = await Promise.all([
    api("/api/wallets"),
    api("/api/wallets/transfers"),
    api("/api/config"),
  ]);
  billeteras = w.wallets;
  arsPerUsdt = config.arsPerUsdt;
  pintarBilleteras();
  pintarSelectores();
  pintarMovimientos(movs.transfers);
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
