import type { WalletLedger } from "../application/ports.js";
import type { RestaurantService } from "../application/restaurant-service.js";
import { formatUsdt } from "../domain/wallet.js";

/**
 * Siembra la demo: crea las billeteras y deja una mesa abierta con dos
 * comensales, cada uno con la suya.
 *
 * Las billeteras se crean acá y no en un archivo de constantes porque las
 * direcciones se generan al arrancar. No hay frase semilla, no hay clave
 * privada y no hay nada que proteger: son un libro contable en memoria que se
 * borra cuando apagás el servidor.
 *
 * Los saldos están elegidos a propósito para que la demo muestre las dos
 * cosas que importan:
 *
 *   Sofía  200 USDT  → paga sin problema
 *   Emi     12 USDT  → NO le alcanza para la mesa entera, y el sistema lo
 *                      dice con un error claro en vez de dejar saldo negativo
 */
export async function seedDemo(service: RestaurantService, wallets: WalletLedger) {
  const negocio = await wallets.create({
    label: "Mesa Abierta · caja",
    kind: "BUSINESS",
    initialBalanceInCents: 0,
  });

  const sofia = await wallets.create({
    label: "Sofía",
    kind: "CLIENT",
    initialBalanceInCents: 20_000, // 200,00 USDT
  });

  const emi = await wallets.create({
    label: "Emi",
    kind: "CLIENT",
    initialBalanceInCents: 1_200, // 12,00 USDT — a propósito, poco
  });

  const mesa = await service.openTable(7);
  const dinerSofia = await service.joinTable(mesa.id, "Sofía", sofia.id);
  const dinerEmi = await service.joinTable(mesa.id, "Emi", emi.id);

  return {
    negocio,
    clientes: [sofia, emi],
    mesa,
    comensales: { sofia: dinerSofia, emi: dinerEmi },
    resumen: [
      `Mesa ${mesa.tableNumber} abierta · ${mesa.id}`,
      `  ${negocio.label.padEnd(22)} ${negocio.address}  ${formatUsdt(negocio.balanceInCents)}`,
      `  ${sofia.label.padEnd(22)} ${sofia.address}  ${formatUsdt(sofia.balanceInCents)}`,
      `  ${emi.label.padEnd(22)} ${emi.address}  ${formatUsdt(emi.balanceInCents)}`,
    ],
  };
}
