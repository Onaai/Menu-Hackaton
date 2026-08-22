// Billeteras simuladas.
//
// QUÉ ES ESTO Y QUÉ NO ES
// ───────────────────────
// Esto es un LIBRO CONTABLE en memoria. No hay blockchain, no hay claves
// privadas, no hay frase semilla y no se mueve un centavo de verdad. Es la
// pieza que permite ver en pantalla el flujo completo: dos clientes pagan y
// la plata aparece en la billetera del negocio.
//
// Está escrito a propósito con la MISMA FORMA que tiene el MCP de WDK, para
// que reemplazar la simulación por la billetera real sea cambiar el adaptador
// y nada más. Verificado leyendo el código de `@tetherto/wdk-cli@1.0.0-beta.2`
// (`src/mcp/server.js`), que expone nueve herramientas; las que importan acá:
//
//     get_address   → Wallet.address
//     get_balance   → Wallet.balances
//     send_token    → transfer({ ..., dryRun })
//
// El `dryRun` de acá abajo NO es un capricho: es literalmente el parámetro que
// tiene `send_token` en WDK, y su descripción en el código fuente dice
// "Always call with dryRun=true first to preview fees and amounts, show the
// preview to the user, and only call again with dryRun=false after user
// confirms". Lo replicamos igual para que el botón de la interfaz muestre la
// vista previa antes de mover nada.

import { assertDomain } from "./errors.js";

export type WalletKind = "CLIENT" | "BUSINESS";

/** Único activo de la simulación. USDT en centavos, como todo el resto. */
export type Asset = "USDT";

export interface Wallet {
  id: string;
  /** Nombre visible: "Emi", "Cocina Mesa Abierta". */
  label: string;
  kind: WalletKind;
  /** Dirección de fantasía, con la forma de una dirección EVM. */
  address: string;
  balanceInCents: number;
  createdAt: string;
}

export type TransferStatus = "PREVIEW" | "CONFIRMED" | "REJECTED";

export interface Transfer {
  id: string;
  fromWalletId: string;
  toWalletId: string;
  /** Lo que recibe el destinatario. */
  amountInCents: number;
  /** Comisión de red. En la simulación la paga quien envía, en USDT. */
  feeInCents: number;
  /** amount + fee: lo que sale de la billetera de origen. */
  debitedInCents: number;
  concept: string;
  status: TransferStatus;
  createdAt: string;
  /** Saldos después del movimiento, para poder mostrar el antes y el después. */
  balancesAfter?: { from: number; to: number };
  /** Quién autorizó: el libro simulado o WDK de verdad. Se muestra en pantalla. */
  motor?: "simulado" | "wdk";
  /** true solo si la transacción se mandó a una red real. */
  onchain?: boolean;
  /** Hash de la transacción, cuando hubo red. */
  txHash?: string;
}

/**
 * Comisión de red simulada.
 *
 * Es un 0,5% con un piso de 2 centavos, y se cobra en el MISMO activo que se
 * envía. Eso no es un detalle de color: es exactamente lo que resuelven los
 * módulos *gasless* de WDK, y es la razón número uno por la que la gente
 * abandona una billetera cripto —te mandan dólares y no los podés mover porque
 * no tenés la moneda nativa para pagar la comisión—. Acá la comisión sale de
 * los mismos USDT, así que un cliente que nunca tocó cripto puede pagar la
 * cena sin comprar nada antes.
 */
export const FEE_BPS = 50; // 0,50 %
export const FEE_FLOOR_IN_CENTS = 2;

export function calculateFee(amountInCents: number): number {
  return Math.max(FEE_FLOOR_IN_CENTS, Math.round((amountInCents * FEE_BPS) / 10_000));
}

export function assertPositiveAmount(amountInCents: number): void {
  assertDomain(
    Number.isInteger(amountInCents) && amountInCents > 0,
    "VALIDATION_ERROR",
    "El importe debe ser un entero positivo en centavos.",
  );
}

/** Formatea centavos como USDT legible. Se usa en logs y en la interfaz. */
export function formatUsdt(cents: number): string {
  const signo = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  return `${signo}${(abs / 100).toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} USDT`;
}
