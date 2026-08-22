/**
 * Conversión peso ↔ USDT.
 *
 * La carta está en pesos porque un restaurante argentino cobra en pesos. Las
 * billeteras están en USDT porque es lo que mueve WDK. Alguien tiene que
 * convertir, y ese alguien tiene que ser EXPLÍCITO: si la interfaz te muestra
 * un total en pesos y te descuenta USDT sin decirte a qué cambio, el producto
 * no es creíble.
 *
 * En producción esto sale de un oráculo o del propio módulo de swap de WDK.
 * Acá es un número fijo y **se muestra en pantalla en el momento de pagar**,
 * igual que hace cualquier casa de cambio.
 */
export const ARS_PER_USDT = 1_480;

/** Pesos en centavos → USDT en centavos. Redondea a favor del que cobra. */
export function arsCentsToUsdtCents(arsCents: number): number {
  return Math.ceil(arsCents / ARS_PER_USDT);
}

/** USDT en centavos → pesos en centavos. Para mostrar el equivalente. */
export function usdtCentsToArsCents(usdtCents: number): number {
  return Math.round(usdtCents * ARS_PER_USDT);
}
