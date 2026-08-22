import { assertDomain, DomainError } from "../domain/errors.js";
import type {
  BillSummary,
  KitchenBoard,
  KitchenTicket,
  LineStatus,
  MenuItem,
  Order,
  OrderItem,
  OrderStatus,
  PaymentMode,
  SimulatedPayment,
  Station,
  TableSession,
} from "../domain/model.js";
import { STATIONS } from "../domain/model.js";
import { arsCentsToUsdtCents } from "../config/cotizacion.js";
import type { Clock, IdGenerator, MenuCatalog, SessionRepository, WalletLedger } from "./ports.js";

export interface OrderLineInput {
  menuItemId: string;
  quantity: number;
  note?: string;
  /** ids de las opciones elegidas, p. ej. ["sin-hielo", "jarra"] */
  choiceIds?: string[];
}

export interface PlaceOrderInput {
  dinerId: string;
  items: OrderLineInput[];
  note?: string;
}

export interface WalletPaymentInput {
  mode: PaymentMode;
  tipPercent: number;
  dinerId?: string;
  /** Billetera que paga. Si se omite, se usa la del comensal. */
  walletId?: string;
  /** true = vista previa, no mueve saldo. Igual que `send_token` de WDK. */
  dryRun?: boolean;
}

export interface WalletPaymentResult {
  preview: boolean;
  arsTotalInCents: number;
  usdtTotalInCents: number;
  transfer: Awaited<ReturnType<WalletLedger["transfer"]>>;
  payment?: SimulatedPayment;
}

const nextStatus: Record<OrderStatus, OrderStatus | null> = {
  RECEIVED: "PREPARING",
  PREPARING: "READY",
  READY: "DELIVERED",
  DELIVERED: null,
};

const nextLineStatus: Record<LineStatus, LineStatus | null> = {
  PENDING: "PREPARING",
  PREPARING: "READY",
  READY: "DELIVERED",
  DELIVERED: null,
  CANCELLED: null,
};

/** Minutos de espera a partir de los cuales el ticket cambia de color. */
export const UMBRAL_AMBAR_MIN = 5;
export const UMBRAL_ROJO_MIN = 10;

export class RestaurantService {
  constructor(
    private readonly sessions: SessionRepository,
    private readonly menu: MenuCatalog,
    private readonly clock: Clock,
    private readonly ids: IdGenerator,
    private readonly wallets: WalletLedger,
  ) {}

  // ── Carta ────────────────────────────────────────────────────────────────

  async listMenu(): Promise<MenuItem[]> {
    return this.menu.list();
  }

  /** El botón "sin stock" de la cocina. */
  async setMenuAvailability(menuItemId: string, available: boolean): Promise<MenuItem> {
    return this.menu.setAvailability(menuItemId, available);
  }

  // ── Mesa y comensales ────────────────────────────────────────────────────

  async openTable(tableNumber: number): Promise<TableSession> {
    assertDomain(Number.isInteger(tableNumber) && tableNumber > 0, "VALIDATION_ERROR", "El número de mesa debe ser un entero positivo.");
    const existing = (await this.sessions.list()).find((s) => s.tableNumber === tableNumber && s.status !== "CLOSED");
    assertDomain(!existing, "CONFLICT", `La mesa ${tableNumber} ya tiene una sesión activa.`);

    const now = this.clock.now().toISOString();
    const session: TableSession = {
      id: this.ids.next("session"),
      tableNumber,
      status: "OPEN",
      diners: [],
      orders: [],
      payments: [],
      openedAt: now,
      updatedAt: now,
    };
    await this.sessions.save(session);
    return session;
  }

  async listTables(): Promise<TableSession[]> {
    return this.sessions.list();
  }

  async getTable(sessionId: string): Promise<TableSession> {
    return this.requireSession(sessionId);
  }

  async joinTable(sessionId: string, name: string, walletId?: string) {
    const session = await this.requireSession(sessionId);
    assertDomain(session.status === "OPEN", "INVALID_STATE", "La mesa ya no admite nuevos comensales.");
    const normalized = name.trim();
    assertDomain(normalized.length >= 2 && normalized.length <= 40, "VALIDATION_ERROR", "El nombre debe tener entre 2 y 40 caracteres.");
    const duplicate = session.diners.some((d) => d.name.toLocaleLowerCase("es") === normalized.toLocaleLowerCase("es"));
    assertDomain(!duplicate, "CONFLICT", "Ya existe un comensal con ese nombre en la mesa.");

    if (walletId) {
      const wallet = await this.wallets.getById(walletId);
      assertDomain(wallet, "NOT_FOUND", "No existe esa billetera.");
    }

    const diner = {
      id: this.ids.next("diner"),
      name: normalized,
      joinedAt: this.clock.now().toISOString(),
      ...(walletId ? { walletId } : {}),
    };
    session.diners.push(diner);
    await this.touchAndSave(session);
    return diner;
  }

  // ── Pedidos ──────────────────────────────────────────────────────────────

  async placeOrder(sessionId: string, input: PlaceOrderInput): Promise<Order> {
    const session = await this.requireSession(sessionId);
    assertDomain(session.status === "OPEN", "INVALID_STATE", "La cuenta está solicitada o cerrada; no se pueden agregar productos.");
    assertDomain(session.diners.some((d) => d.id === input.dinerId), "NOT_FOUND", "El comensal no pertenece a esta mesa.");
    assertDomain(input.items.length > 0, "VALIDATION_ERROR", "El pedido debe contener al menos un producto.");

    const items: OrderItem[] = [];
    for (const line of input.items) {
      assertDomain(
        Number.isInteger(line.quantity) && line.quantity > 0 && line.quantity <= 20,
        "VALIDATION_ERROR",
        "Cada cantidad debe ser un entero entre 1 y 20.",
      );
      const menuItem = await this.menu.getById(line.menuItemId);
      assertDomain(menuItem, "NOT_FOUND", `No existe el producto ${line.menuItemId}.`);
      assertDomain(menuItem.available, "CONFLICT", `${menuItem.name} no está disponible.`);

      const { unitPriceInCents, labels } = this.resolveChoices(menuItem, line.choiceIds ?? []);
      items.push({
        menuItemId: menuItem.id,
        name: menuItem.name,
        unitPriceInCents,
        quantity: line.quantity,
        station: menuItem.station,
        status: "PENDING",
        ...(labels.length ? { choices: labels } : {}),
        ...(line.note?.trim() ? { note: line.note.trim() } : {}),
      });
    }

    const now = this.clock.now().toISOString();
    const order: Order = {
      id: this.ids.next("order"),
      sessionId,
      dinerId: input.dinerId,
      type: session.orders.some((o) => o.dinerId === input.dinerId) ? "ADDITIONAL" : "INITIAL",
      status: "RECEIVED",
      items,
      rushed: false,
      ...(input.note?.trim() ? { note: input.note.trim() } : {}),
      createdAt: now,
      updatedAt: now,
    };
    session.orders.push(order);
    await this.touchAndSave(session);
    return order;
  }

  /**
   * Valida las opciones elegidas y devuelve el precio unitario final.
   *
   * Dos reglas que importan: una opción obligatoria de tipo "única" tiene que
   * venir elegida (o se usa la marcada por defecto), y no se puede elegir dos
   * valores de la misma opción única. Sin esto, "gaseosa con hielo y sin hielo"
   * llega a la cocina y el mozo vuelve a la mesa — que es justo lo que este
   * producto viene a evitar.
   */
  private resolveChoices(item: MenuItem, choiceIds: string[]): { unitPriceInCents: number; labels: string[] } {
    const elegidas = new Set(choiceIds);
    let price = item.priceInCents;
    const labels: string[] = [];

    for (const option of item.options ?? []) {
      const marcadas = option.choices.filter((c) => elegidas.has(c.id));

      if (option.kind === "unica") {
        assertDomain(marcadas.length <= 1, "VALIDATION_ERROR", `"${option.label}" admite una sola opción.`);
        const elegida = marcadas[0] ?? option.choices.find((c) => c.byDefault);
        if (option.required) {
          assertDomain(elegida, "VALIDATION_ERROR", `Falta elegir "${option.label}".`);
        }
        if (elegida) {
          price += elegida.priceDeltaInCents;
          labels.push(`${option.label}: ${elegida.label}`);
        }
        continue;
      }

      for (const c of marcadas) {
        price += c.priceDeltaInCents;
        labels.push(c.label);
      }
    }

    // Cualquier id que no pertenezca a este producto es un error del cliente,
    // no algo para ignorar en silencio.
    const validos = new Set((item.options ?? []).flatMap((o) => o.choices.map((c) => c.id)));
    for (const id of elegidas) {
      assertDomain(validos.has(id), "VALIDATION_ERROR", `La opción "${id}" no pertenece a ${item.name}.`);
    }

    assertDomain(price > 0, "VALIDATION_ERROR", "El precio final del producto no puede ser cero o negativo.");
    return { unitPriceInCents: price, labels };
  }

  // ── Cocina ───────────────────────────────────────────────────────────────

  /**
   * El tablero de cocina.
   *
   * Está agrupado por ESTACIÓN y no por mesa a propósito: el de la parrilla
   * mira una pantalla y el de la barra otra. Cada ticket trae los minutos que
   * lleva esperando —calculados en el servidor, no en el navegador, para que
   * dos pantallas muestren lo mismo— y el color que le corresponde.
   *
   * El orden dentro de cada estación es: primero lo marcado urgente, después lo
   * más viejo. Es el orden en el que una cocina despacha de verdad.
   */
  async getKitchenBoard(): Promise<KitchenBoard> {
    const ahora = this.clock.now();
    const sessions = await this.sessions.list();

    const todos: KitchenTicket[] = [];
    for (const session of sessions) {
      for (const order of session.orders) {
        const activos = order.items.filter((i) => i.status !== "CANCELLED" && i.status !== "DELIVERED");
        if (activos.length === 0) continue;

        const ageMinutes = Math.max(0, Math.floor((ahora.getTime() - new Date(order.createdAt).getTime()) / 60_000));
        todos.push({
          orderId: order.id,
          sessionId: session.id,
          tableNumber: session.tableNumber,
          dinerName: session.diners.find((d) => d.id === order.dinerId)?.name ?? "Comensal",
          type: order.type,
          status: order.status,
          rushed: order.rushed ?? false,
          createdAt: order.createdAt,
          ageMinutes,
          urgency: order.rushed ? "rojo" : ageMinutes >= UMBRAL_ROJO_MIN ? "rojo" : ageMinutes >= UMBRAL_AMBAR_MIN ? "ambar" : "verde",
          lines: order.items.map((item, lineIndex) => ({
            orderId: order.id,
            lineIndex,
            name: item.name,
            quantity: item.quantity,
            station: item.station,
            status: item.status,
            ...(item.note ? { note: item.note } : {}),
            ...(item.choices ? { choices: item.choices } : {}),
          })),
        });
      }
    }

    const stations = STATIONS.map((station) => {
      const tickets = todos
        .map((ticket) => ({
          ...ticket,
          lines: ticket.lines.filter((l) => l.station === station && l.status !== "CANCELLED" && l.status !== "DELIVERED"),
        }))
        .filter((ticket) => ticket.lines.length > 0)
        .sort((a, b) => Number(b.rushed) - Number(a.rushed) || a.createdAt.localeCompare(b.createdAt));

      return {
        station,
        pending: tickets.reduce((sum, t) => sum + t.lines.reduce((s, l) => s + l.quantity, 0), 0),
        tickets,
      };
    });

    return {
      generatedAt: ahora.toISOString(),
      stations,
      summary: {
        openTickets: todos.length,
        lines: todos.reduce((sum, t) => sum + t.lines.filter((l) => l.status !== "CANCELLED" && l.status !== "DELIVERED").length, 0),
        oldestMinutes: todos.reduce((max, t) => Math.max(max, t.ageMinutes), 0),
        rushed: todos.filter((t) => t.rushed).length,
      },
    };
  }

  /** Avanza UNA línea. Es como trabaja una cocina: plato por plato. */
  async advanceLine(orderId: string, lineIndex: number, requested: LineStatus) {
    const { session, order } = await this.locateOrder(orderId);
    const item = order.items[lineIndex];
    assertDomain(item, "NOT_FOUND", "No existe esa línea en la comanda.");
    assertDomain(item.status !== "CANCELLED", "INVALID_STATE", "La línea está cancelada.");
    assertDomain(
      nextLineStatus[item.status] === requested,
      "INVALID_STATE",
      `La línea debe avanzar de ${item.status} a ${nextLineStatus[item.status] ?? "ningún otro estado"}.`,
    );
    item.status = requested;
    this.syncOrderStatus(order);
    order.updatedAt = this.clock.now().toISOString();
    await this.touchAndSave(session);
    return order;
  }

  /**
   * Deshacer. En una cocina real alguien toca el botón de más y hay que poder
   * volver atrás sin reiniciar el sistema. Retrocede exactamente un paso.
   */
  async rollbackLine(orderId: string, lineIndex: number) {
    const { session, order } = await this.locateOrder(orderId);
    const item = order.items[lineIndex];
    assertDomain(item, "NOT_FOUND", "No existe esa línea en la comanda.");
    const anterior: Record<LineStatus, LineStatus | null> = {
      PENDING: null,
      PREPARING: "PENDING",
      READY: "PREPARING",
      DELIVERED: "READY",
      CANCELLED: null,
    };
    const destino = anterior[item.status];
    assertDomain(destino, "INVALID_STATE", "La línea ya está en el primer estado.");
    item.status = destino;
    this.syncOrderStatus(order);
    order.updatedAt = this.clock.now().toISOString();
    await this.touchAndSave(session);
    return order;
  }

  /** Cancela una línea. No se puede cancelar algo ya entregado. */
  async cancelLine(orderId: string, lineIndex: number) {
    const { session, order } = await this.locateOrder(orderId);
    const item = order.items[lineIndex];
    assertDomain(item, "NOT_FOUND", "No existe esa línea en la comanda.");
    assertDomain(item.status !== "DELIVERED", "INVALID_STATE", "No se puede cancelar algo que ya se entregó.");
    item.status = "CANCELLED";
    this.syncOrderStatus(order);
    order.updatedAt = this.clock.now().toISOString();
    await this.touchAndSave(session);
    return order;
  }

  async rushOrder(orderId: string, rushed: boolean) {
    const { session, order } = await this.locateOrder(orderId);
    order.rushed = rushed;
    order.updatedAt = this.clock.now().toISOString();
    await this.touchAndSave(session);
    return order;
  }

  /** Compatibilidad con el motor original: mueve la comanda entera de golpe. */
  async updateOrderStatus(orderId: string, requested: OrderStatus): Promise<Order> {
    const { session, order } = await this.locateOrder(orderId);
    assertDomain(
      nextStatus[order.status] === requested,
      "INVALID_STATE",
      `La comanda debe avanzar de ${order.status} a ${nextStatus[order.status] ?? "ningún otro estado"}.`,
    );
    const destinoLinea: Record<OrderStatus, LineStatus> = {
      RECEIVED: "PENDING",
      PREPARING: "PREPARING",
      READY: "READY",
      DELIVERED: "DELIVERED",
    };
    for (const item of order.items) {
      if (item.status !== "CANCELLED") item.status = destinoLinea[requested];
    }
    order.status = requested;
    order.updatedAt = this.clock.now().toISOString();
    await this.touchAndSave(session);
    return order;
  }

  /**
   * El estado de la comanda se DEDUCE de sus líneas, nunca se escribe a mano
   * en paralelo. Si se guardaran los dos por separado, tarde o temprano dicen
   * cosas distintas y la mesa ve "listo" mientras la cocina ve "pendiente".
   */
  private syncOrderStatus(order: Order): void {
    const activos = order.items.filter((i) => i.status !== "CANCELLED");
    if (activos.length === 0) {
      order.status = "DELIVERED";
      return;
    }
    if (activos.every((i) => i.status === "DELIVERED")) order.status = "DELIVERED";
    else if (activos.every((i) => i.status === "READY" || i.status === "DELIVERED")) order.status = "READY";
    else if (activos.every((i) => i.status === "PENDING")) order.status = "RECEIVED";
    else order.status = "PREPARING";
  }

  // ── Cuenta ───────────────────────────────────────────────────────────────

  async requestBill(sessionId: string, confirmed: boolean): Promise<BillSummary> {
    const session = await this.requireSession(sessionId);
    assertDomain(confirmed, "VALIDATION_ERROR", "La solicitud de la cuenta requiere confirmación explícita.");
    assertDomain(session.status === "OPEN", "INVALID_STATE", "La cuenta ya fue solicitada o cerrada.");
    assertDomain(session.orders.length > 0, "INVALID_STATE", "No se puede pedir una cuenta sin consumos.");
    assertDomain(session.orders.every((o) => o.status === "DELIVERED"), "INVALID_STATE", "Todavía hay pedidos sin entregar.");
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

  // ── Pago con billetera ───────────────────────────────────────────────────

  /**
   * Paga con billetera.
   *
   * El flujo copia el de `send_token` de WDK a propósito:
   *
   *   1. `dryRun: true`  → devuelve la vista previa con la comisión calculada
   *                        y NO mueve un centavo.
   *   2. la persona ve el importe, la comisión y el total.
   *   3. `dryRun: false` → recién ahí se mueve la plata.
   *
   * La descripción de `send_token` en el código de WDK dice textualmente que
   * hay que hacer eso. Nosotros lo hacemos cumplir con el tipo, no con una
   * frase amable: la vista previa devuelve `payment: undefined`, así que un
   * cliente que se saltee el paso 3 no registra ningún cobro.
   */
  async payWithWallet(sessionId: string, input: WalletPaymentInput): Promise<WalletPaymentResult> {
    const session = await this.requireSession(sessionId);
    assertDomain(session.status === "BILL_REQUESTED", "INVALID_STATE", "Primero se debe solicitar la cuenta.");
    this.validateTip(input.tipPercent);
    assertDomain(!session.paymentMode || session.paymentMode === input.mode, "CONFLICT", "No se pueden mezclar formas de división en la misma cuenta.");

    const bill = this.buildBill(session, input.tipPercent);
    let subtotalInCents = bill.subtotalInCents;
    let walletId = input.walletId;

    if (input.mode === "INDIVIDUAL") {
      assertDomain(input.dinerId, "VALIDATION_ERROR", "El pago individual requiere un comensal.");
      const dinerBill = bill.diners.find((d) => d.dinerId === input.dinerId);
      assertDomain(dinerBill && dinerBill.subtotalInCents > 0, "NOT_FOUND", "El comensal no tiene consumos pendientes.");
      assertDomain(!dinerBill.paid, "CONFLICT", "El comensal ya pagó su consumo.");
      subtotalInCents = dinerBill.subtotalInCents;
      walletId = walletId ?? dinerBill.walletId;
    } else {
      assertDomain(session.payments.length === 0, "CONFLICT", "La mesa ya tiene un pago registrado.");
    }

    assertDomain(walletId, "VALIDATION_ERROR", "Hace falta indicar con qué billetera se paga.");

    const business = (await this.wallets.list()).find((w) => w.kind === "BUSINESS");
    assertDomain(business, "NOT_FOUND", "No hay una billetera de negocio configurada.");

    const tipInCents = this.calculateTip(subtotalInCents, input.tipPercent);
    const arsTotalInCents = subtotalInCents + tipInCents;
    const usdtTotalInCents = arsCentsToUsdtCents(arsTotalInCents);

    const dryRun = input.dryRun ?? true;
    const transfer = await this.wallets.transfer({
      fromWalletId: walletId,
      toWalletId: business.id,
      amountInCents: usdtTotalInCents,
      concept: `Mesa ${session.tableNumber} · ${input.mode === "TABLE" ? "cuenta completa" : bill.diners.find((d) => d.dinerId === input.dinerId)?.dinerName ?? "comensal"}`,
      dryRun,
    });

    if (dryRun) {
      return { preview: true, arsTotalInCents, usdtTotalInCents, transfer };
    }

    session.paymentMode = input.mode;
    const payment: SimulatedPayment = {
      id: this.ids.next("payment"),
      mode: input.mode,
      ...(input.mode === "INDIVIDUAL" && input.dinerId ? { dinerId: input.dinerId } : {}),
      subtotalInCents,
      tipPercent: input.tipPercent,
      tipInCents,
      totalInCents: arsTotalInCents,
      status: "SIMULATED_APPROVED",
      createdAt: this.clock.now().toISOString(),
      transferId: transfer.id,
      fromWalletId: walletId,
      toWalletId: business.id,
    };
    session.payments.push(payment);

    const conConsumo = this.buildBill(session, 0).diners.filter((d) => d.subtotalInCents > 0);
    const todosPagaron =
      input.mode === "INDIVIDUAL" &&
      conConsumo.every((d) => session.payments.some((p) => p.mode === "INDIVIDUAL" && p.dinerId === d.dinerId));
    if (input.mode === "TABLE" || todosPagaron) session.status = "CLOSED";

    await this.touchAndSave(session);
    return { preview: false, arsTotalInCents, usdtTotalInCents, transfer, payment };
  }

  // ── Internos ─────────────────────────────────────────────────────────────

  private async requireSession(sessionId: string): Promise<TableSession> {
    const session = await this.sessions.getById(sessionId);
    if (!session) throw new DomainError("NOT_FOUND", "No se encontró la sesión de la mesa.");
    return session;
  }

  private async locateOrder(orderId: string): Promise<{ session: TableSession; order: Order }> {
    const sessions = await this.sessions.list();
    const session = sessions.find((s) => s.orders.some((o) => o.id === orderId));
    assertDomain(session, "NOT_FOUND", "No se encontró la comanda.");
    const order = session.orders.find((o) => o.id === orderId);
    assertDomain(order, "NOT_FOUND", "No se encontró la comanda.");
    return { session, order };
  }

  private buildBill(session: TableSession, tipPercent: number): BillSummary {
    this.validateTip(tipPercent);
    const subtotalByDiner = new Map<string, number>();
    for (const order of session.orders) {
      // Las líneas canceladas NO se cobran. Es la razón de tener estado por línea.
      const total = order.items
        .filter((i) => i.status !== "CANCELLED")
        .reduce((sum, i) => sum + i.unitPriceInCents * i.quantity, 0);
      subtotalByDiner.set(order.dinerId, (subtotalByDiner.get(order.dinerId) ?? 0) + total);
    }
    const diners = session.diners.map((diner) => ({
      dinerId: diner.id,
      dinerName: diner.name,
      subtotalInCents: subtotalByDiner.get(diner.id) ?? 0,
      paid: session.payments.some((p) => p.mode === "TABLE" || p.dinerId === diner.id),
      ...(diner.walletId ? { walletId: diner.walletId } : {}),
    }));
    const subtotalInCents = diners.reduce((sum, d) => sum + d.subtotalInCents, 0);
    const tipInCents = this.calculateTip(subtotalInCents, tipPercent);
    return {
      sessionId: session.id,
      tableNumber: session.tableNumber,
      sessionStatus: session.status,
      subtotalInCents,
      tipPercent,
      tipInCents,
      totalInCents: subtotalInCents + tipInCents,
      diners,
    };
  }

  private validateTip(tipPercent: number) {
    assertDomain(
      Number.isFinite(tipPercent) && tipPercent >= 0 && tipPercent <= 100,
      "VALIDATION_ERROR",
      "La propina debe ser un porcentaje entre 0 y 100.",
    );
  }

  private calculateTip(subtotalInCents: number, tipPercent: number) {
    return Math.round((subtotalInCents * tipPercent) / 100);
  }

  private async touchAndSave(session: TableSession) {
    session.updatedAt = this.clock.now().toISOString();
    await this.sessions.save(session);
  }
}

export type { Station };
