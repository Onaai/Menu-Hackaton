import { assertDomain, DomainError } from "../domain/errors.js";
import type {
  BillSummary,
  KitchenOrderView,
  LlamadaAlMozo,
  Order,
  OrderStatus,
  PaymentMode,
  SimulatedPayment,
  TableSession,
} from "../domain/model.js";
import type { Clock, IdGenerator, MenuCatalog, SessionRepository } from "./ports.js";
import type { PaymentEvaluation, PaymentGateway, PaymentIntent } from "./payment-gateway.js";

/**
 * Cuantas comandas sin entregar puede acumular un mismo comensal.
 *
 * Tres es lo que entra en una mesa de verdad: entrada, principal y algo mas.
 * El cuarto pedido sin que llegue ninguno de los tres anteriores no es un
 * comensal con hambre, es alguien que se fue y esta jugando con la app.
 */
export const MAX_COMANDAS_PENDIENTES = 3;

/** Lista cerrada: el motivo no es texto libre que despues hay que moderar. */
export const MOTIVOS_DE_LLAMADA = ["necesito algo", "la cuenta", "una consulta", "algo se derramo"];

export interface PlaceOrderInput {
  dinerId: string;
  items: Array<{ menuItemId: string; quantity: number; note?: string }>;
  note?: string;
}

export interface SimulatedPaymentInput {
  mode: PaymentMode;
  tipPercent: number;
  dinerId?: string;
}

const nextStatus: Record<OrderStatus, OrderStatus | null> = {
  RECEIVED: "PREPARING",
  PREPARING: "READY",
  READY: "DELIVERED",
  DELIVERED: null,
};

export class RestaurantService {
  constructor(
    private readonly sessions: SessionRepository,
    private readonly menu: MenuCatalog,
    private readonly clock: Clock,
    private readonly ids: IdGenerator,
    private readonly paymentGateway: PaymentGateway,
  ) {}

  async listMenu() {
    return this.menu.list();
  }

  async openTable(tableNumber: number): Promise<TableSession> {
    assertDomain(Number.isInteger(tableNumber) && tableNumber > 0, "VALIDATION_ERROR", "El número de mesa debe ser un entero positivo.");
    const existing = (await this.sessions.list()).find((session) => session.tableNumber === tableNumber && session.status !== "CLOSED");
    assertDomain(!existing, "CONFLICT", `La mesa ${tableNumber} ya tiene una sesión activa.`);

    const now = this.clock.now().toISOString();
    const session: TableSession = {
      id: this.ids.next("session"),
      tableNumber,
      status: "OPEN",
      diners: [],
      orders: [],
      payments: [],
      llamadas: [],
      openedAt: now,
      updatedAt: now,
    };
    await this.sessions.save(session);
    return session;
  }

  async getTable(sessionId: string): Promise<TableSession> {
    return this.requireSession(sessionId);
  }

  async getActiveTableByNumber(tableNumber: number): Promise<TableSession> {
    const session = (await this.sessions.list()).find((candidate) => candidate.tableNumber === tableNumber && candidate.status !== "CLOSED");
    assertDomain(session, "NOT_FOUND", `La mesa ${tableNumber} no tiene una sesión activa.`);
    return session;
  }

  async joinTable(sessionId: string, name: string) {
    const session = await this.requireSession(sessionId);
    assertDomain(session.status === "OPEN", "INVALID_STATE", "La mesa ya no admite nuevos comensales.");
    const normalizedName = name.trim();
    assertDomain(normalizedName.length >= 2 && normalizedName.length <= 40, "VALIDATION_ERROR", "El nombre debe tener entre 2 y 40 caracteres.");
    const duplicate = session.diners.some((diner) => diner.name.toLocaleLowerCase("es") === normalizedName.toLocaleLowerCase("es"));
    assertDomain(!duplicate, "CONFLICT", "Ya existe un comensal con ese nombre en la mesa.");

    const diner = { id: this.ids.next("diner"), name: normalizedName, joinedAt: this.clock.now().toISOString() };
    session.diners.push(diner);
    await this.touchAndSave(session);
    return diner;
  }

  async placeOrder(sessionId: string, input: PlaceOrderInput): Promise<Order> {
    const session = await this.requireSession(sessionId);
    assertDomain(session.status === "OPEN", "INVALID_STATE", "La cuenta está solicitada o cerrada; no se pueden agregar productos.");
    assertDomain(session.diners.some((diner) => diner.id === input.dinerId), "NOT_FOUND", "El comensal no pertenece a esta mesa.");
    assertDomain(input.items.length > 0, "VALIDATION_ERROR", "El pedido debe contener al menos un producto.");

    // Tope de comandas sin entregar por comensal.
    //
    // El caso que esto ataja: alguien escanea el QR, se va del restaurante y
    // desde su casa manda cuarenta pedidos. La mesa sigue abierta —el local
    // todavia no la cerro— asi que el chequeo de `status` no lo frena.
    //
    // Un link dinamico que vence NO resuelve esto: el QR apunta a /mesa/12, y
    // volver a abrir esa URL entrega un token nuevo. Sirve para que un link
    // reenviado por WhatsApp no viva para siempre, no para el que ya entro.
    //
    // Lo que si lo resuelve es que la autorizacion no sea el QR sino la
    // sesion de mesa, que abre y cierra el local, mas este tope: no podes
    // encolar mas de N comandas sin que la cocina te vaya entregando. Ademas
    // de frenar el abuso, refleja como funciona un restaurante de verdad.
    const pendientes = session.orders.filter(
      (order) => order.dinerId === input.dinerId && order.status !== "DELIVERED",
    ).length;
    assertDomain(
      pendientes < MAX_COMANDAS_PENDIENTES,
      "CONFLICT",
      `Tenés ${pendientes} pedidos todavía sin entregar. Esperá a que la cocina te los traiga, o llamá al mozo.`,
    );

    const consolidated = new Map<string, { quantity: number; note?: string }>();
    for (const item of input.items) {
      assertDomain(Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 20, "VALIDATION_ERROR", "Cada cantidad debe ser un entero entre 1 y 20.");
      const previous = consolidated.get(item.menuItemId);
      const quantity = (previous?.quantity ?? 0) + item.quantity;
      assertDomain(quantity <= 20, "VALIDATION_ERROR", "No se pueden pedir más de 20 unidades del mismo producto.");
      consolidated.set(item.menuItemId, { quantity, ...(item.note?.trim() ? { note: item.note.trim() } : {}) });
    }

    const items = await Promise.all([...consolidated.entries()].map(async ([menuItemId, requested]) => {
      const menuItem = await this.menu.getById(menuItemId);
      assertDomain(menuItem, "NOT_FOUND", `No existe el producto ${menuItemId}.`);
      assertDomain(menuItem.available, "CONFLICT", `${menuItem.name} no está disponible.`);
      return {
        menuItemId: menuItem.id,
        name: menuItem.name,
        unitPriceInCents: menuItem.priceInCents,
        quantity: requested.quantity,
        ...(requested.note ? { note: requested.note } : {}),
      };
    }));

    const now = this.clock.now().toISOString();
    const order: Order = {
      id: this.ids.next("order"),
      sessionId,
      dinerId: input.dinerId,
      type: session.orders.some((existing) => existing.dinerId === input.dinerId) ? "ADDITIONAL" : "INITIAL",
      status: "RECEIVED",
      items,
      ...(input.note?.trim() ? { note: input.note.trim() } : {}),
      createdAt: now,
      updatedAt: now,
    };
    session.orders.push(order);
    await this.touchAndSave(session);
    return order;
  }

  /**
   * El comensal pide que venga alguien.
   *
   * Existe porque hay cosas que una app no resuelve —un vaso roto, una
   * consulta sobre un plato, pedir la cuenta en efectivo— y porque sin esto la
   * unica forma de llamar a alguien es levantar la mano y esperar.
   *
   * Una llamada activa por comensal: si toca el boton diez veces, sigue
   * habiendo una sola. No es solo anti-abuso, es que diez avisos identicos en
   * la pantalla del local son diez avisos que nadie mira.
   */
  async llamarAlMozo(sessionId: string, dinerId: string, motivo: string) {
    const session = await this.requireSession(sessionId);
    assertDomain(session.status !== "CLOSED", "INVALID_STATE", "La mesa ya está cerrada.");
    const diner = session.diners.find((candidate) => candidate.id === dinerId);
    assertDomain(diner, "NOT_FOUND", "El comensal no pertenece a esta mesa.");
    assertDomain(MOTIVOS_DE_LLAMADA.includes(motivo), "VALIDATION_ERROR", "Ese motivo no está en la lista.");

    const yaLlamo = session.llamadas.find((llamada) => llamada.dinerId === dinerId && !llamada.atendidaEn);
    if (yaLlamo) return { llamada: yaLlamo, yaEstaba: true };

    const llamada: LlamadaAlMozo = {
      id: this.ids.next("llamada"),
      dinerId,
      dinerName: diner.name,
      motivo,
      creadaEn: this.clock.now().toISOString(),
    };
    session.llamadas.push(llamada);
    await this.touchAndSave(session);
    return { llamada, yaEstaba: false };
  }

  /** Desde la pantalla del local: alguien fue a la mesa. */
  async atenderLlamada(sessionId: string, llamadaId: string) {
    const session = await this.requireSession(sessionId);
    const llamada = session.llamadas.find((candidate) => candidate.id === llamadaId);
    assertDomain(llamada, "NOT_FOUND", "No se encontró la llamada.");
    if (!llamada.atendidaEn) {
      llamada.atendidaEn = this.clock.now().toISOString();
      await this.touchAndSave(session);
    }
    return llamada;
  }

  /** Las llamadas sin atender de todas las mesas, la mas vieja primero. */
  async listarLlamadasPendientes() {
    const sessions = await this.sessions.list();
    return sessions
      .flatMap((session) => session.llamadas
        .filter((llamada) => !llamada.atendidaEn)
        .map((llamada) => ({ ...llamada, sessionId: session.id, tableNumber: session.tableNumber })))
      .sort((a, b) => a.creadaEn.localeCompare(b.creadaEn));
  }

  async listKitchenOrders(status?: OrderStatus): Promise<KitchenOrderView[]> {
    const sessions = await this.sessions.list();
    return sessions
      .flatMap((session) => session.orders.map((order) => ({
        ...order,
        tableNumber: session.tableNumber,
        dinerName: session.diners.find((diner) => diner.id === order.dinerId)?.name ?? "Comensal",
      })))
      .filter((order) => !status || order.status === status)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }

  async updateOrderStatus(orderId: string, requestedStatus: OrderStatus): Promise<Order> {
    const sessions = await this.sessions.list();
    const session = sessions.find((candidate) => candidate.orders.some((order) => order.id === orderId));
    assertDomain(session, "NOT_FOUND", "No se encontró la comanda.");
    const order = session.orders.find((candidate) => candidate.id === orderId);
    assertDomain(order, "NOT_FOUND", "No se encontró la comanda.");
    assertDomain(nextStatus[order.status] === requestedStatus, "INVALID_STATE", `La comanda debe avanzar de ${order.status} a ${nextStatus[order.status] ?? "ningún otro estado"}.`);
    order.status = requestedStatus;
    order.updatedAt = this.clock.now().toISOString();
    await this.touchAndSave(session);
    return order;
  }

  async requestBill(sessionId: string, confirmed: boolean): Promise<BillSummary> {
    const session = await this.requireSession(sessionId);
    assertDomain(confirmed, "VALIDATION_ERROR", "La solicitud de la cuenta requiere confirmación explícita.");
    assertDomain(session.status === "OPEN", "INVALID_STATE", "La cuenta ya fue solicitada o cerrada.");
    assertDomain(session.orders.length > 0, "INVALID_STATE", "No se puede pedir una cuenta sin consumos.");
    assertDomain(session.orders.every((order) => order.status === "DELIVERED"), "INVALID_STATE", "Todavía hay pedidos sin entregar.");
    session.status = "BILL_REQUESTED";
    await this.touchAndSave(session);
    return this.buildBill(session, 0);
  }

  async reopenTable(sessionId: string): Promise<TableSession> {
    const session = await this.requireSession(sessionId);
    assertDomain(session.status === "BILL_REQUESTED", "INVALID_STATE", "La cuenta no está esperando pago.");
    assertDomain(session.payments.length === 0, "INVALID_STATE", "No se puede reabrir una mesa que ya tiene pagos registrados.");
    session.status = "OPEN";
    delete session.paymentMode;
    await this.touchAndSave(session);
    return session;
  }

  async getBill(sessionId: string, tipPercent = 0): Promise<BillSummary> {
    const session = await this.requireSession(sessionId);
    return this.buildBill(session, tipPercent);
  }

  async paySimulated(sessionId: string, input: SimulatedPaymentInput): Promise<SimulatedPayment> {
    const session = await this.requireSession(sessionId);
    assertDomain(session.status === "BILL_REQUESTED", "INVALID_STATE", "Primero se debe solicitar la cuenta.");
    this.validateTip(input.tipPercent);
    assertDomain(!session.paymentMode || session.paymentMode === input.mode, "CONFLICT", "No se pueden mezclar formas de división en la misma cuenta.");
    session.paymentMode = input.mode;

    const prepared = this.preparePayment(session, input);
    const policyEvaluation = await this.paymentGateway.evaluate(prepared.intent);
    assertDomain(policyEvaluation.decision === "ALLOW", "INVALID_STATE", `WDK rechazó el pago: ${policyEvaluation.reason}`);
    const payment: SimulatedPayment = {
      id: this.ids.next("payment"),
      mode: input.mode,
      ...(input.mode === "INDIVIDUAL" && input.dinerId ? { dinerId: input.dinerId } : {}),
      subtotalInCents: prepared.subtotalInCents,
      tipPercent: input.tipPercent,
      tipInCents: prepared.tipInCents,
      totalInCents: prepared.subtotalInCents + prepared.tipInCents,
      status: "SIMULATED_APPROVED",
      policyEvaluation: policyEvaluation as SimulatedPayment["policyEvaluation"],
      createdAt: this.clock.now().toISOString(),
    };
    session.payments.push(payment);

    const dinersWithConsumption = this.buildBill(session, 0).diners.filter((diner) => diner.subtotalInCents > 0);
    const allIndividualsPaid = input.mode === "INDIVIDUAL" && dinersWithConsumption.every((diner) => session.payments.some((payment) => payment.mode === "INDIVIDUAL" && payment.dinerId === diner.dinerId));
    if (input.mode === "TABLE" || allIndividualsPaid) session.status = "CLOSED";
    await this.touchAndSave(session);
    return payment;
  }

  async evaluatePayment(sessionId: string, input: SimulatedPaymentInput): Promise<PaymentEvaluation> {
    const session = await this.requireSession(sessionId);
    assertDomain(session.status === "BILL_REQUESTED", "INVALID_STATE", "Primero se debe solicitar la cuenta.");
    this.validateTip(input.tipPercent);
    return this.paymentGateway.evaluate(this.preparePayment(session, input).intent);
  }

  private preparePayment(session: TableSession, input: SimulatedPaymentInput) {
    const bill = this.buildBill(session, input.tipPercent);
    let subtotalInCents = bill.subtotalInCents;
    if (input.mode === "INDIVIDUAL") {
      assertDomain(input.dinerId, "VALIDATION_ERROR", "El pago individual requiere un comensal.");
      const dinerBill = bill.diners.find((diner) => diner.dinerId === input.dinerId);
      assertDomain(dinerBill && dinerBill.subtotalInCents > 0, "NOT_FOUND", "El comensal no tiene consumos pendientes.");
      assertDomain(!dinerBill.paid, "CONFLICT", "El comensal ya pagó su consumo.");
      subtotalInCents = dinerBill.subtotalInCents;
    } else {
      assertDomain(session.payments.length === 0, "CONFLICT", "La mesa ya tiene un pago registrado.");
    }
    const tipInCents = this.calculateTip(subtotalInCents, input.tipPercent);
    const intent: PaymentIntent = {
      sessionId: session.id,
      tableNumber: session.tableNumber,
      paymentMode: input.mode,
      ...(input.dinerId ? { dinerId: input.dinerId } : {}),
      subtotalInCents,
      tipInCents,
      totalInCents: subtotalInCents + tipInCents,
    };
    return { subtotalInCents, tipInCents, intent };
  }

  private async requireSession(sessionId: string): Promise<TableSession> {
    const session = await this.sessions.getById(sessionId);
    if (!session) throw new DomainError("NOT_FOUND", "No se encontró la sesión de la mesa.");
    return session;
  }

  private buildBill(session: TableSession, tipPercent: number): BillSummary {
    this.validateTip(tipPercent);
    const subtotalByDiner = new Map<string, number>();
    for (const order of session.orders) {
      const orderTotal = order.items.reduce((sum, item) => sum + item.unitPriceInCents * item.quantity, 0);
      subtotalByDiner.set(order.dinerId, (subtotalByDiner.get(order.dinerId) ?? 0) + orderTotal);
    }
    const diners = session.diners.map((diner) => ({
      dinerId: diner.id,
      dinerName: diner.name,
      subtotalInCents: subtotalByDiner.get(diner.id) ?? 0,
      paid: session.payments.some((payment) => payment.mode === "TABLE" || payment.dinerId === diner.id),
    }));
    const subtotalInCents = diners.reduce((sum, diner) => sum + diner.subtotalInCents, 0);
    const tipInCents = this.calculateTip(subtotalInCents, tipPercent);
    return { sessionId: session.id, tableNumber: session.tableNumber, sessionStatus: session.status, subtotalInCents, tipPercent, tipInCents, totalInCents: subtotalInCents + tipInCents, diners };
  }

  private validateTip(tipPercent: number) {
    assertDomain(Number.isFinite(tipPercent) && tipPercent >= 0 && tipPercent <= 100, "VALIDATION_ERROR", "La propina debe ser un porcentaje entre 0 y 100.");
  }

  private calculateTip(subtotalInCents: number, tipPercent: number) {
    return Math.round((subtotalInCents * tipPercent) / 100);
  }

  private async touchAndSave(session: TableSession) {
    session.updatedAt = this.clock.now().toISOString();
    await this.sessions.save(session);
  }
}
