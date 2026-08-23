export type SessionStatus = "OPEN" | "BILL_REQUESTED" | "CLOSED";
export type OrderStatus = "RECEIVED" | "PREPARING" | "READY" | "DELIVERED";
export type OrderType = "INITIAL" | "ADDITIONAL";
export type PaymentMode = "INDIVIDUAL" | "TABLE";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  priceInCents: number;
  available: boolean;
  /**
   * Restricciones que este plato SI cumple: "sin-gluten", "vegetariano",
   * "vegano". No es decoracion: es lo que filtra el enum de la gramatica que
   * restringe al modelo local, en `qvac-sdk-assistant.ts`. Si un plato con
   * gluten queda en esa lista, el modelo puede recomendarselo a una comensal
   * celiaca. El costo de ese error no es una recomendacion fea.
   */
  diet?: string[];
}

export interface Diner {
  id: string;
  name: string;
  joinedAt: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  unitPriceInCents: number;
  quantity: number;
  note?: string;
}

export interface Order {
  id: string;
  sessionId: string;
  dinerId: string;
  type: OrderType;
  status: OrderStatus;
  items: OrderItem[];
  note?: string;
  createdAt: string;
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
  policyEvaluation: {
    provider: "WDK" | "SIMULATED_FALLBACK";
    decision: "ALLOW";
    reason: string;
    policyId: string;
    matchedRule: string;
    network: "ethereum-sepolia";
    asset: "USDt-testnet";
    amountInBaseUnits: string;
    broadcast: false;
  };
  createdAt: string;
}

export interface WdkCliPayment {
  id: string;
  mode: PaymentMode;
  dinerId?: string;
  subtotalInCents: number;
  tipPercent: number;
  tipInCents: number;
  totalInCents: number;
  status: "WDK_CLI_BROADCAST";
  network: "sepolia";
  asset: "USDT";
  fromWallet: string;
  fromAddress: string;
  toWallet: string;
  toAddress: string;
  amount: string;
  transactionHash: string | null;
  balanceBefore: { client: string | null; business: string | null };
  balanceAfter: { client: string | null; business: string | null };
  createdAt: string;
}

/**
 * Pago que no toca la blockchain: efectivo en el mostrador o Mercado Pago.
 *
 * MERCADO PAGO ES SOLO VISUAL Y ESO SE DECLARA EN EL TIPO.
 * No hay llamada a la API de Mercado Pago, ni credenciales, ni webhook. El
 * boton registra el cobro y listo. `simulado: true` no es un comentario que se
 * puede desactualizar: viaja en la respuesta de la API y la pantalla lo usa
 * para poner el cartel. Si algun dia se conecta de verdad, el compilador
 * obliga a pasar por aca.
 */
export interface PagoLocal {
  id: string;
  metodo: MetodoLocal;
  mode: PaymentMode;
  dinerId?: string;
  subtotalInCents: number;
  tipPercent: number;
  tipInCents: number;
  totalInCents: number;
  /** Solo efectivo: con cuanto pago la persona. */
  recibidoInCents?: number;
  /** Solo efectivo: lo que hay que devolverle. */
  vueltoInCents?: number;
  /** true en Mercado Pago: no se llamo a ninguna API. */
  simulado: boolean;
  createdAt: string;
}

export type MetodoLocal = "EFECTIVO" | "MERCADO_PAGO";

export type PaymentRecord = SimulatedPayment | WdkCliPayment | PagoLocal;

export interface TableSession {
  id: string;
  tableNumber: number;
  status: SessionStatus;
  diners: Diner[];
  orders: Order[];
  payments: PaymentRecord[];
  paymentMode?: PaymentMode;
  /** Pedidos de atencion humana. Se atienden desde la pantalla del local. */
  llamadas: LlamadaAlMozo[];
  openedAt: string;
  updatedAt: string;
}

export interface LlamadaAlMozo {
  id: string;
  dinerId: string;
  dinerName: string;
  /** "la cuenta", "una consulta", "algo mas". Corto y de una lista cerrada. */
  motivo: string;
  creadaEn: string;
  /** Cuando alguien del local la marco como atendida. */
  atendidaEn?: string;
}

export interface DinerBill {
  dinerId: string;
  dinerName: string;
  subtotalInCents: number;
  paid: boolean;
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

export interface KitchenOrderView extends Order {
  tableNumber: number;
  dinerName: string;
}
