import type { Transfer, Wallet } from "../domain/wallet.js";
import { formatUsdt } from "../domain/wallet.js";

/**
 * Log de pagos en la terminal.
 *
 * Existe porque un saldo que cambia en una pantalla no prueba nada: podría
 * ser un número escrito a mano. La terminal muestra el movimiento completo —
 * direcciones, importe, comisión, saldos antes y después — y **el comando de
 * `wdk` que haría exactamente lo mismo contra una red real**.
 *
 * Ese último renglón es el que importa para el video: deja ver de un vistazo
 * que la simulación no es una maqueta con forma libre, sino la misma
 * operación que ejecutaría la billetera de verdad, con los mismos campos.
 */

const ANCHO = 74;

const c = {
  gris: (s: string) => `\x1b[90m${s}\x1b[0m`,
  verde: (s: string) => `\x1b[32m${s}\x1b[0m`,
  rojo: (s: string) => `\x1b[31m${s}\x1b[0m`,
  ambar: (s: string) => `\x1b[33m${s}\x1b[0m`,
  cian: (s: string) => `\x1b[36m${s}\x1b[0m`,
  fuerte: (s: string) => `\x1b[1m${s}\x1b[0m`,
};

const linea = (ch = "─") => c.gris(ch.repeat(ANCHO));

/** Recorta una dirección larga a `0x1234…cdef`, como hace cualquier explorer. */
export function abreviar(address: string): string {
  return address.length <= 16 ? address : `${address.slice(0, 10)}…${address.slice(-6)}`;
}

export interface ContextoPago {
  /** "vista previa" o "confirmado" */
  fase: "PREVIEW" | "CONFIRMED" | "RECHAZADO";
  transfer: Transfer;
  origen: Wallet;
  destino: Wallet;
  arsTotalInCents?: number;
  arsPerUsdt?: number;
  motivoRechazo?: string;
  /** Red y token que se usarían en la versión real. */
  red: string;
  token: string;
}

export function imprimirPago(ctx: ContextoPago): void {
  const { transfer: t, origen, destino } = ctx;

  const titulo =
    ctx.fase === "PREVIEW" ? c.ambar("VISTA PREVIA — no se movió nada")
    : ctx.fase === "CONFIRMED" ? c.verde("TRANSFERENCIA CONFIRMADA")
    : c.rojo("TRANSFERENCIA RECHAZADA");

  console.log("");
  console.log(linea("━"));
  console.log(`  ${c.fuerte("PAGO")}   ${titulo}`);
  console.log(linea("━"));

  console.log(`  ${c.gris("id".padEnd(14))} ${t.id}`);
  console.log(`  ${c.gris("concepto".padEnd(14))} ${t.concept}`);
  console.log(`  ${c.gris("cuándo".padEnd(14))} ${t.createdAt}`);
  console.log(`  ${c.gris("red".padEnd(14))} ${ctx.red}   ${c.gris("token")} ${ctx.token}   ${c.ambar("SIMULADO")}`);
  console.log(linea());

  console.log(`  ${c.gris("DE")}    ${origen.label}`);
  console.log(`        ${c.cian(origen.address)}`);
  console.log(`  ${c.gris("A")}     ${destino.label}`);
  console.log(`        ${c.cian(destino.address)}`);
  console.log(linea());

  if (ctx.arsTotalInCents !== undefined && ctx.arsPerUsdt) {
    const ars = (ctx.arsTotalInCents / 100).toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
    console.log(`  ${"cuenta".padEnd(22)} ${ars.padStart(16)}   ${c.gris(`(1 USDT = $${ctx.arsPerUsdt.toLocaleString("es-AR")})`)}`);
  }
  console.log(`  ${"importe al destino".padEnd(22)} ${formatUsdt(t.amountInCents).padStart(16)}`);
  console.log(`  ${"comisión de red".padEnd(22)} ${formatUsdt(t.feeInCents).padStart(16)}   ${c.gris("pagada en USDT, no en gas nativo")}`);
  console.log(`  ${c.fuerte("débito total".padEnd(22))} ${c.fuerte(formatUsdt(t.debitedInCents).padStart(16))}`);

  if (ctx.fase === "RECHAZADO") {
    console.log(linea());
    console.log(`  ${c.rojo("✖")} ${ctx.motivoRechazo ?? "sin motivo"}`);
    console.log(`  ${c.gris("no se debitó nada: el saldo quedó como estaba")}`);
    console.log(linea("━"));
    console.log("");
    return;
  }

  if (t.balancesAfter) {
    console.log(linea());
    const flecha = ctx.fase === "PREVIEW" ? c.gris("quedaría en") : c.gris("queda en");
    console.log(`  ${origen.label.padEnd(22)} ${formatUsdt(origen.balanceInCents).padStart(16)}  →  ${formatUsdt(t.balancesAfter.from).padStart(16)}  ${flecha}`);
    console.log(`  ${destino.label.padEnd(22)} ${formatUsdt(destino.balanceInCents).padStart(16)}  →  ${c.verde(formatUsdt(t.balancesAfter.to).padStart(16))}  ${flecha}`);
  }

  console.log(linea());
  console.log(`  ${c.gris("equivalente real con la CLI de WDK:")}`);
  console.log(`  ${c.gris("$")} ${comandoWdk(ctx)}`);
  console.log(linea("━"));
  console.log("");
}

/**
 * El comando `wdk send` equivalente.
 *
 * Los nombres de las banderas salen de la documentación de la CLI. **No los
 * verifiqué contra `wdk send --help` en esta máquina**, así que tomalo como lo
 * que es: una traducción legible de lo que haría la operación, no una línea
 * para copiar y pegar a ciegas. Antes de usarla en serio, corré
 * `wdk send --help` y ajustá.
 */
function comandoWdk(ctx: ContextoPago): string {
  const monto = (ctx.transfer.amountInCents / 100).toFixed(2);
  const dry = ctx.fase === "PREVIEW" ? " --dry-run" : "";
  return `wdk send --network ${ctx.red} --token ${ctx.token} --to ${ctx.destino.address} --amount ${monto}${dry} --json`;
}

/**
 * Cabecera de la sesión de billeteras al arrancar.
 *
 * La etiqueta no es decorativa: hay tres estados distintos y confundirlos sería
 * mentir en el video.
 *
 *   simulado          → direcciones inventadas, sin WDK.
 *   WDK sin red       → direcciones derivadas de verdad y políticas de WDK
 *                       autorizando, pero el saldo se asienta en memoria.
 *   WDK on-chain      → la transacción se manda a la red.
 */
export function imprimirBilleteras(wallets: Wallet[], red: string, token: string, modo: "simulado" | "wdk" | "wdk-onchain" = "simulado"): void {
  const etiqueta =
    modo === "wdk-onchain" ? c.verde("WDK · ON-CHAIN")
    : modo === "wdk" ? c.verde("WDK · derivadas BIP-44") + c.gris("  saldo en memoria (sin RPC)")
    : c.ambar("SIMULADAS");
  console.log(linea("━"));
  console.log(`  ${c.fuerte("BILLETERAS")}   ${etiqueta}   ${c.gris(`red ${red} · token ${token}`)}`);
  console.log(linea("━"));
  for (const w of wallets) {
    const tipo = w.kind === "BUSINESS" ? c.verde("negocio") : c.gris("cliente");
    console.log(`  ${w.label.padEnd(22)} ${tipo.padEnd(18)} ${formatUsdt(w.balanceInCents).padStart(14)}`);
    console.log(`  ${" ".repeat(22)} ${c.cian(w.address)}`);
  }
  console.log(linea("━"));
}
