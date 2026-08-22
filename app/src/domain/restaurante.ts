// Datos del local. Todo esto lo edita el encargado desde /admin.html.

export interface Restaurante {
  nombre: string;
  direccion: string;
  localidad: string;
  telefono: string;
  cuit: string;
  /** Dirección de la billetera del local: adonde cobra en USD₮. */
  walletAddress: string;
  /** Alias de Mercado Pago del local. */
  aliasMp: string;
  /** Cotización peso/USDT que usa el local hoy. */
  arsPorUsdt: number;
  /** Propinas que se ofrecen en la pantalla de pago. */
  propinasSugeridas: number[];
  /** Métodos habilitados. El encargado puede apagar alguno. */
  metodosHabilitados: string[];
  moneda: string;
}

export const restaurantePorDefecto: Restaurante = {
  nombre: "Mesa Abierta",
  direccion: "Av. Corrientes 1234",
  localidad: "CABA, Argentina",
  telefono: "+54 11 5555-1234",
  cuit: "30-71234567-8",
  walletAddress: "", // se completa al arrancar con la de la caja
  aliasMp: "mesa.abierta.mp",
  arsPorUsdt: 1480,
  propinasSugeridas: [0, 5, 10, 15],
  metodosHabilitados: ["WALLET", "MERCADO_PAGO", "EFECTIVO"],
  moneda: "ARS",
};
