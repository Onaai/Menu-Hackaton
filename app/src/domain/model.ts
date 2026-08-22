// Modelo de dominio de Mesa Abierta.
//
// Sale del motor de Pipeballes/hackatonfeli2 y le agrega tres cosas que
// faltaban para poder mostrar el producto:
//
//   1. El producto tiene IMAGEN y ESTACIÓN de cocina.
//   2. La comanda tiene estado POR LÍNEA, no solo por comanda entera.
//   3. El pago mueve plata de verdad entre billeteras (ver wallet.ts).

export type SessionStatus = "OPEN" | "BILL_REQUESTED" | "CLOSED";
export type OrderStatus = "RECEIVED" | "PREPARING" | "READY" | "DELIVERED";
export type OrderType = "INITIAL" | "ADDITIONAL";
export type PaymentMode = "INDIVIDUAL" | "TABLE";

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
  payments: SimulatedPayment[];
  paymentMode?: PaymentMode;
  openedAt: string;
  updatedAt: string;
}

export interface SimulatedPayment {
  id: string;
  mode: PaymentMode;
  dinerId?: string;
  subtotalInCents: number;
  tipPercent: number;
  tipInCents: number;
  totalInCents: number;
  status: "SIMULATED_APPROVED";
  createdAt: string;
  /** Si se pagó con billetera, el id del movimiento. Ver wallet.ts. */
  transferId?: string;
  /** Billetera que pagó y billetera que cobró. */
  fromWalletId?: string;
  toWalletId?: string;
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

/**
 * Un ticket de cocina. Es una comanda vista desde la cocina: con el número de
 * mesa, el nombre del comensal, cuántos minutos lleva esperando y de qué color
 * tiene que aparecer en pantalla.
 */
export interface KitchenTicket {
  orderId: string;
  sessionId: string;
  tableNumber: number;
  dinerName: string;
  type: OrderType;
  status: OrderStatus;
  rushed: boolean;
  createdAt: string;
  /** Minutos desde que entró la comanda. Lo calcula el servidor, no el navegador. */
  ageMinutes: number;
  /** verde < 5 min · ambar 5–10 · rojo > 10, o si está marcada urgente. */
  urgency: "verde" | "ambar" | "rojo";
  lines: KitchenLine[];
}

export interface KitchenBoard {
  generatedAt: string;
  /** Tickets agrupados por estación, ya ordenados por prioridad. */
  stations: Array<{
    station: Station;
    pending: number;
    tickets: KitchenTicket[];
  }>;
  /** Resumen para la barra de arriba de la pantalla de cocina. */
  summary: {
    openTickets: number;
    lines: number;
    oldestMinutes: number;
    rushed: number;
  };
}
