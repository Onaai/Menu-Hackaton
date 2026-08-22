// Métodos de pago.

export type MetodoPago = "WALLET" | "MERCADO_PAGO" | "EFECTIVO";

export const METODOS: readonly MetodoPago[] = ["WALLET", "MERCADO_PAGO", "EFECTIVO"];

export const NOMBRE_METODO: Record<MetodoPago, string> = {
  WALLET: "Billetera USD₮",
  MERCADO_PAGO: "Mercado Pago",
  EFECTIVO: "Efectivo",
};

export type ModoDivision = "INDIVIDUAL" | "TABLE";

export interface Pago {
  id: string;
  metodo: MetodoPago;
  modo: ModoDivision;
  dinerId?: string;
  dinerName?: string;
  subtotalInCents: number;
  tipPercent: number;
  tipInCents: number;
  totalInCents: number;
  createdAt: string;

  // WALLET
  usdtTotalInCents?: number;
  transferId?: string;
  fromWalletId?: string;
  fromAddress?: string;
  toAddress?: string;
  feeUsdtInCents?: number;
  /** "simulado" o "wdk". Se muestra en pantalla: no se disfraza nada. */
  motor?: "simulado" | "wdk";

  // MERCADO_PAGO
  referenciaMp?: string;

  // EFECTIVO
  recibidoInCents?: number;
  vueltoInCents?: number;
}

/** Vuelto. Devuelve null si no alcanza, para que el llamador tire el error. */
export function calcularVuelto(totalInCents: number, recibidoInCents: number): number | null {
  if (!Number.isInteger(recibidoInCents) || recibidoInCents < totalInCents) return null;
  return recibidoInCents - totalInCents;
}

export interface CorteDeCaja {
  desde: string;
  hasta: string;
  totalInCents: number;
  propinasInCents: number;
  cantidad: number;
  porMetodo: Array<{
    metodo: MetodoPago;
    nombre: string;
    cantidad: number;
    totalInCents: number;
    propinasInCents: number;
  }>;
  /** Lo que hay que tener en la caja física al cerrar. */
  efectivoEnCajaInCents: number;
  movimientos: Pago[];
}
