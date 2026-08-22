// Modelo de dominio de Mesa Abierta.
//
// Sale del motor de Pipeballes/hackatonfeli2 y le agrega tres cosas que
// faltaban para poder mostrar el producto:
//
//   1. El producto tiene IMAGEN y ESTACIÓN de cocina.
//   2. La comanda tiene estado POR LÍNEA, no solo por comanda entera.
//   3. El pago mueve plata de verdad entre billeteras (ver wallet.ts).

import type { ModoDivision, Pago } from "./pago.js";

export type SessionStatus = "OPEN" | "BILL_REQUESTED" | "CLOSED";
export type OrderStatus = "RECEIVED" | "PREPARING" | "READY" | "DELIVERED";
export type OrderType = "INITIAL" | "ADDITIONAL";

/**
 * Estación de cocina. Es lo que permite que la comanda se PARTA: la barra
 * hace la limonada mientras la parrilla hace la burger, y ninguna de las dos
 * espera a la otra. Sin esto, una cocina real no usa el sistema.
 */
export type Station = "PARRILLA" | "FRIOS" | "BARRA" | "POSTRES";

export const STATIONS: readonly Station[] = ["PARRILLA", "FRIOS", "BARRA", "POSTRES"];

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  priceInCents: number;
  available: boolean;
  /** Estación que lo prepara. Define en qué pantalla de cocina aparece. */
  station: Station;
  /** Minutos estimados de preparación. Alimenta el semáforo de demora. */
  prepMinutes: number;
  /** Ruta de la foto, relativa a /public. Si falta, se dibuja un placeholder. */
  image?: string;
  /** Etiquetas de dieta declaradas por el local. */
  diet?: string[];
  /** Opciones de personalización: sacar aderezos, elegir base, etc. */
  options?: MenuOption[];
}

export interface MenuOption {
  id: string;
  label: string;
  /** "unica" = radio (elegí uno) · "multiple" = checkboxes (sacá lo que quieras) */
  kind: "unica" | "multiple";
  required: boolean;
  choices: MenuChoice[];
}

export interface MenuChoice {
  id: string;
  label: string;
  /** Diferencia de precio en centavos. Puede ser 0 o negativa. */
  priceDeltaInCents: number;
  /** Si viene marcada por defecto (típico de "sacar" ingredientes). */
  byDefault?: boolean;
}

export interface Diner {
  id: string;
  name: string;
  joinedAt: string;
  /** Billetera con la que va a pagar. Ver wallet.ts. */
  walletId?: string;
}

/** Estado de UNA línea de la comanda. La cocina trabaja a este nivel. */
export type LineStatus = "PENDING" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";

export interface OrderItem {
  menuItemId: string;
  name: string;
  unitPriceInCents: number;
  quantity: number;
  note?: string;
  station: Station;
  status: LineStatus;
  /** Lo que eligió el comensal, ya resuelto a texto para que cocina lo lea. */
  choices?: string[];
}

export interface Order {
  id: string;
  sessionId: string;
  dinerId: string;
  type: OrderType;
  status: OrderStatus;
  items: OrderItem[];
  note?: string;
  /** La cocina puede marcar una comanda como urgente. Sube al tope de la lista. */
  rushed?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TableSession {
  id: string;
  tableNumber: number;
  status: SessionStatus;
  diners: Diner[];
  orders: Order[];
  payments: Pago[];
  paymentMode?: ModoDivision;
  openedAt: string;
  updatedAt: string;
}

export interface DinerBill {
  dinerId: string;
  dinerName: string;
  subtotalInCents: number;
  paid: boolean;
  walletId?: string;
}

export interface BillSummary {
  sessionId: string;
  tableNumber: number;
  sessionStatus: SessionStatus;
  subtotalInCents: number;
  tipPercent: number;
  tipInCents: number;
  totalInCents: number;
  diners: DinerBill[];
}

// ────────────────────────────────────────────────────────────────────────────
// Vistas de cocina
//
// Se organizan por MESA, no por estación.
//
// La primera versión partía el tablero en parrilla / fríos / barra / postres.
// Está bien para una cocina grande con una pantalla por puesto, y está mal
// para un café: obliga a mirar cuatro listas para saber qué le falta a la
// mesa 7, y nadie despacha así cuando cocina y barra son la misma persona.
//
// Un ticket = una mesa. Adentro, lo que pidió cada uno. Y un cronómetro que
// arranca cuando entró el pedido más viejo que sigue sin salir, porque esa es
// la pregunta real de una cocina: *hace cuánto que esta mesa está esperando*.
// ────────────────────────────────────────────────────────────────────────────

export interface KitchenLine {
  orderId: string;
  lineIndex: number;
  name: string;
  quantity: number;
  station: Station;
  status: LineStatus;
  note?: string;
  choices?: string[];
}

export interface PedidoDeTicket {
  orderId: string;
  dinerName: string;
  type: OrderType;
  status: OrderStatus;
  createdAt: string;
  /** Segundos desde que entró ESTE pedido. */
  esperaSegundos: number;
  lines: KitchenLine[];
}

export interface TicketMesa {
  sessionId: string;
  tableNumber: number;
  /** Momento del pedido pendiente más viejo de la mesa. */
  desde: string;
  /** Segundos que lleva esperando la mesa. Lo cuenta el servidor. */
  esperaSegundos: number;
  /** verde < 5 min · ambar 5–10 · rojo > 10, o si está marcada urgente. */
  urgencia: "verde" | "ambar" | "rojo";
  urgente: boolean;
  totalPlatos: number;
  pedidos: PedidoDeTicket[];
}

export interface KitchenBoard {
  generatedAt: string;
  /** Un ticket por mesa con algo pendiente, del que más espera al que menos. */
  tickets: TicketMesa[];
  summary: {
    mesas: number;
    platos: number;
    esperaMaximaSegundos: number;
    urgentes: number;
  };
}
