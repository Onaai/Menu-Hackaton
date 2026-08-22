import { assertDomain, DomainError } from "../domain/errors.js";
import type {
  BillSummary,
  KitchenBoard,
  TicketMesa,
  PedidoDeTicket,
  LineStatus,
  MenuItem,
  Order,
  OrderItem,
  OrderStatus,
  Station,
  TableSession,
} from "../domain/model.js";
import { calcularVuelto, METODOS, NOMBRE_METODO, type CorteDeCaja, type MetodoPago, type ModoDivision, type Pago } from "../domain/pago.js";
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

export interface PagoInput {
  metodo: MetodoPago;
  modo: ModoDivision;
  tipPercent: number;
  dinerId?: string;
  /** Billetera que paga. Si se omite, se usa la del comensal. */
  walletId?: string;
  /** Solo EFECTIVO: con cuánto paga, para calcular el vuelto. */
  recibidoInCents?: number;
  /** true = vista previa. Solo cambia algo con WALLET y con EFECTIVO. */
  dryRun?: boolean;
}

export interface ResultadoPago {
  preview: boolean;
  totalInCents: number;
  usdtTotalInCents?: number;
  transfer?: Awaited<ReturnType<WalletLedger["transfer"]>>;
  recibidoInCents?: number;
  vueltoInCents?: number;
  pago?: Pago;
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

  /**
   * Edición de la carta por el encargado.
   *
   * Solo se pisan los campos que vienen. Un PATCH parcial que borrara lo que
   * no mandaste sería una forma muy rápida de perder la carta entera por
   * tocar un precio.
   */
  async editarProducto(id: string, cambios: Partial<MenuItem>): Promise<MenuItem> {
    const actual = await this.menu.getById(id);
    assertDomain(actual, "NOT_FOUND", `No existe el producto ${id}.`);
    const item: MenuItem = { ...actual };

    if (typeof cambios.name === "string" && cambios.name.trim()) item.name = cambios.name.trim().slice(0, 80);
    if (typeof cambios.description === "string") item.description = cambios.description.trim().slice(0, 240);
    if (typeof cambios.category === "string" && cambios.category.trim()) item.category = cambios.category.trim().slice(0, 40);
    if (typeof cambios.priceInCents === "number") {
      assertDomain(Number.isInteger(cambios.priceInCents) && cambios.priceInCents > 0, "VALIDATION_ERROR", "El precio debe ser un entero positivo en centavos.");
      item.priceInCents = cambios.priceInCents;
    }
    if (typeof cambios.available === "boolean") item.available = cambios.available;
    if (typeof cambios.prepMinutes === "number" && cambios.prepMinutes >= 0) item.prepMinutes = cambios.prepMinutes;
    if (typeof cambios.image === "string") item.image = cambios.image.trim();
    if (Array.isArray(cambios.diet)) item.diet = cambios.diet.map(String).slice(0, 5);
    if (typeof cambios.station === "string") item.station = cambios.station as Station;

    return this.menu.upsert(item);
  }

  async crearProducto(datos: Partial<MenuItem> & { name: string }): Promise<MenuItem> {
    const nombre = String(datos.name ?? "").trim();
    assertDomain(nombre.length >= 2, "VALIDATION_ERROR", "El nombre del producto es obligatorio.");
    const id = (datos.id ?? nombre)
      .toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
    assertDomain(id.length >= 2, "VALIDATION_ERROR", "No se pudo derivar un identificador del nombre.");
    assertDomain(!(await this.menu.getById(id)), "CONFLICT", `Ya existe un producto con el id ${id}.`);

    return this.menu.upsert({
      id,
      name: nombre,
      description: String(datos.description ?? "").slice(0, 240),
      category: String(datos.category ?? "Otros").slice(0, 40),
      priceInCents: Number.isInteger(datos.priceInCents) && (datos.priceInCents as number) > 0 ? (datos.priceInCents as number) : 100_000,
      available: datos.available ?? true,
      station: (datos.station as Station) ?? "PARRILLA",
      prepMinutes: typeof datos.prepMinutes === "number" ? datos.prepMinutes : 10,
      ...(datos.image ? { image: String(datos.image) } : {}),
      ...(Array.isArray(datos.diet) ? { diet: datos.diet.map(String) } : {}),
    });
  }

  /** Borrar no puede romper una comanda viva: se chequea antes. */
  async borrarProducto(id: string): Promise<{ ok: true }> {
    const enUso = (await this.sessions.list()).some((s) =>
      s.status !== "CLOSED" && s.orders.some((o) => o.items.some((i) => i.menuItemId === id && i.status !== "CANCELLED")));
    assertDomain(!enUso, "CONFLICT", "Ese producto está en un pedido abierto. Marcalo sin stock en vez de borrarlo.");
    await this.menu.remove(id);
    return { ok: true };
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
   * El tablero de cocina, un ticket por MESA.
   *
   * La versión anterior partía el tablero por estación (parrilla, fríos,
   * barra, postres). Sirve en una cocina grande con una pantalla por puesto y
   * estorba en un café: para saber qué le falta a la mesa 7 había que mirar
   * cuatro listas, y cuando cocina y barra son la misma persona eso es pura
   * fricción. `station` sigue en los datos —no cuesta nada y sirve más
   * adelante— pero ya no organiza la pantalla.
   *
   * El cronómetro arranca en el pedido pendiente MÁS VIEJO de la mesa, porque
   * esa es la pregunta que se hace una cocina: hace cuánto que esta mesa está
   * esperando. Y lo cuenta el servidor, así que dos pantallas muestran lo
   * mismo aunque una tenga el reloj corrido.
   */
  async getKitchenBoard(): Promise<KitchenBoard> {
    const ahora = this.clock.now();
    const sessions = await this.sessions.list();
    const tickets: TicketMesa[] = [];

    for (const session of sessions) {
      const pedidos: PedidoDeTicket[] = [];
      let urgente = false;

      for (const order of session.orders) {
        const pendientes = order.items
          .map((item, lineIndex) => ({ item, lineIndex }))
          .filter(({ item }) => item.status !== "CANCELLED" && item.status !== "DELIVERED");
        if (pendientes.length === 0) continue;

        if (order.rushed) urgente = true;
        pedidos.push({
          orderId: order.id,
          dinerName: session.diners.find((d) => d.id === order.dinerId)?.name ?? "Comensal",
          type: order.type,
          status: order.status,
          createdAt: order.createdAt,
          esperaSegundos: segundosDesde(order.createdAt, ahora),
          lines: pendientes.map(({ item, lineIndex }) => ({
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

      if (pedidos.length === 0) continue;

      pedidos.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
      const desde = pedidos[0]!.createdAt;
      const esperaSegundos = segundosDesde(desde, ahora);
      const minutos = esperaSegundos / 60;

      tickets.push({
        sessionId: session.id,
        tableNumber: session.tableNumber,
        desde,
        esperaSegundos,
        urgente,
        urgencia: urgente || minutos >= UMBRAL_ROJO_MIN ? "rojo" : minutos >= UMBRAL_AMBAR_MIN ? "ambar" : "verde",
        totalPlatos: pedidos.reduce((s, p) => s + p.lines.reduce((x, l) => x + l.quantity, 0), 0),
        pedidos,
      });
    }

    // Primero lo urgente, después lo que más espera. Es el orden en el que se
    // despacha de verdad.
    tickets.sort((a, b) => Number(b.urgente) - Number(a.urgente) || b.esperaSegundos - a.esperaSegundos);

    return {
      generatedAt: ahora.toISOString(),
      tickets,
      summary: {
        mesas: tickets.length,
        platos: tickets.reduce((s, t) => s + t.totalPlatos, 0),
        esperaMaximaSegundos: tickets.reduce((m, t) => Math.max(m, t.esperaSegundos), 0),
        urgentes: tickets.filter((t) => t.urgente).length,
      },
    };
  }

  /** Marca TODO lo pendiente de una mesa como entregado, de una. */
  async entregarMesa(sessionId: string): Promise<TableSession> {
    const session = await this.requireSession(sessionId);
    let tocado = false;
    for (const order of session.orders) {
      for (const item of order.items) {
        if (item.status !== "CANCELLED" && item.status !== "DELIVERED") {
          item.status = "DELIVERED";
          tocado = true;
        }
      }
      this.syncOrderStatus(order);
      order.updatedAt = this.clock.now().toISOString();
    }
    assertDomain(tocado, "INVALID_STATE", "Esta mesa no tiene nada pendiente.");
    await this.touchAndSave(session);
    return session;
  }

  /** Marca un pedido entero como entregado. */
  async entregarPedido(orderId: string): Promise<Order> {
    const { session, order } = await this.locateOrder(orderId);
    let tocado = false;
    for (const item of order.items) {
      if (item.status !== "CANCELLED" && item.status !== "DELIVERED") {
        item.status = "DELIVERED";
        tocado = true;
      }
    }
    assertDomain(tocado, "INVALID_STATE", "Este pedido ya está entregado.");
    this.syncOrderStatus(order);
    order.updatedAt = this.clock.now().toISOString();
    await this.touchAndSave(session);
    return order;
  }

  /**
   * Marca UNA línea como entregada, sin obligar a pasar por los estados
   * intermedios. En un café nadie toca "empezar" y después "listo": sale y se
   * entrega. Los pasos intermedios siguen existiendo para quien los quiera.
   */
  async entregarLinea(orderId: string, lineIndex: number): Promise<Order> {
    const { session, order } = await this.locateOrder(orderId);
    const item = order.items[lineIndex];
    assertDomain(item, "NOT_FOUND", "No existe esa línea en la comanda.");
    assertDomain(item.status !== "CANCELLED", "INVALID_STATE", "La línea está cancelada.");
    assertDomain(item.status !== "DELIVERED", "INVALID_STATE", "La línea ya está entregada.");
    item.status = "DELIVERED";
    this.syncOrderStatus(order);
    order.updatedAt = this.clock.now().toISOString();
    await this.touchAndSave(session);
    return order;
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

  // ── Pago ─────────────────────────────────────────────────────────────────

  /**
   * Cobra. Tres métodos, un solo camino.
   *
   * Los tres comparten cómo se calcula qué se debe (subtotal + propina, del
   * comensal o de toda la mesa) y en qué queda la mesa después. Lo único que
   * cambia es cómo entra la plata:
   *
   *   WALLET        → WDK. La transferencia la autoriza el motor de políticas.
   *   MERCADO_PAGO  → aprobación simulada, con referencia.
   *   EFECTIVO      → se declara con cuánto paga y se calcula el vuelto.
   *
   * `dryRun` solo tiene sentido para WALLET, porque es el único que puede
   * previsualizar una comisión antes de mover nada — y lo hace porque
   * `send_token`/`transfer` de WDK está pensado así.
   */
  async pagar(sessionId: string, input: PagoInput): Promise<ResultadoPago> {
    const session = await this.requireSession(sessionId);
    assertDomain(session.status === "BILL_REQUESTED", "INVALID_STATE", "Primero se debe solicitar la cuenta.");
    this.validateTip(input.tipPercent);
    assertDomain(METODOS.includes(input.metodo), "VALIDATION_ERROR", "Método de pago desconocido.");
    assertDomain(!session.paymentMode || session.paymentMode === input.modo, "CONFLICT", "No se pueden mezclar formas de división en la misma cuenta.");

    const bill = this.buildBill(session, input.tipPercent);
    let subtotalInCents = bill.subtotalInCents;
    let dinerName: string | undefined;
    let walletId = input.walletId;

    if (input.modo === "INDIVIDUAL") {
      assertDomain(input.dinerId, "VALIDATION_ERROR", "El pago individual requiere un comensal.");
      const suyo = bill.diners.find((d) => d.dinerId === input.dinerId);
      assertDomain(suyo && suyo.subtotalInCents > 0, "NOT_FOUND", "El comensal no tiene consumos pendientes.");
      assertDomain(!suyo.paid, "CONFLICT", `${suyo.dinerName} ya pagó lo suyo.`);
      subtotalInCents = suyo.subtotalInCents;
      dinerName = suyo.dinerName;
      walletId = walletId ?? suyo.walletId;
    } else {
      const faltantes = bill.diners.filter((d) => d.subtotalInCents > 0 && !d.paid);
      assertDomain(faltantes.length > 0, "CONFLICT", "La cuenta ya está saldada.");
      subtotalInCents = faltantes.reduce((s, d) => s + d.subtotalInCents, 0);
    }

    const tipInCents = this.calculateTip(subtotalInCents, input.tipPercent);
    const totalInCents = subtotalInCents + tipInCents;

    const base = {
      metodo: input.metodo,
      modo: input.modo,
      ...(input.dinerId ? { dinerId: input.dinerId } : {}),
      ...(dinerName ? { dinerName } : {}),
      subtotalInCents,
      tipPercent: input.tipPercent,
      tipInCents,
      totalInCents,
    };

    if (input.metodo === "EFECTIVO") {
      const recibido = input.recibidoInCents ?? totalInCents;
      const vuelto = calcularVuelto(totalInCents, recibido);
      assertDomain(
        vuelto !== null,
        "VALIDATION_ERROR",
        `No alcanza: la cuenta es ${(totalInCents / 100).toLocaleString("es-AR")} y entregó ${(recibido / 100).toLocaleString("es-AR")}.`,
      );
      if (input.dryRun) {
        return { preview: true, totalInCents, vueltoInCents: vuelto, recibidoInCents: recibido };
      }
      const pago = this.asentar(session, { ...base, id: this.ids.next("pago"), createdAt: this.clock.now().toISOString(), recibidoInCents: recibido, vueltoInCents: vuelto });
      return { preview: false, totalInCents, vueltoInCents: vuelto, recibidoInCents: recibido, pago: await this.cerrarSiCorresponde(session, pago) };
    }

    if (input.metodo === "MERCADO_PAGO") {
      if (input.dryRun) return { preview: true, totalInCents };
      const pago = this.asentar(session, {
        ...base,
        id: this.ids.next("pago"),
        createdAt: this.clock.now().toISOString(),
        referenciaMp: `MP-${this.ids.next("op").slice(-12).toUpperCase()}`,
      });
      return { preview: false, totalInCents, pago: await this.cerrarSiCorresponde(session, pago) };
    }

    // WALLET
    assertDomain(walletId, "VALIDATION_ERROR", "Hace falta indicar con qué billetera se paga.");
    const caja = (await this.wallets.list()).find((w) => w.kind === "BUSINESS");
    assertDomain(caja, "NOT_FOUND", "No hay una billetera de caja configurada.");

    const usdtTotalInCents = arsCentsToUsdtCents(totalInCents);
    const transfer = await this.wallets.transfer({
      fromWalletId: walletId,
      toWalletId: caja.id,
      amountInCents: usdtTotalInCents,
      concept: `Mesa ${session.tableNumber} · ${dinerName ?? "cuenta completa"}`,
      dryRun: input.dryRun ?? true,
    });

    if (input.dryRun ?? true) {
      return { preview: true, totalInCents, usdtTotalInCents, transfer };
    }

    const origen = await this.wallets.getById(walletId);
    const pago = this.asentar(session, {
      ...base,
      id: this.ids.next("pago"),
      createdAt: this.clock.now().toISOString(),
      usdtTotalInCents,
      transferId: transfer.id,
      fromWalletId: walletId,
      ...(origen ? { fromAddress: origen.address } : {}),
      toAddress: caja.address,
      feeUsdtInCents: transfer.feeInCents,
      ...(transfer.motor ? { motor: transfer.motor } : {}),
    });
    return { preview: false, totalInCents, usdtTotalInCents, transfer, pago: await this.cerrarSiCorresponde(session, pago) };
  }

  private asentar(session: TableSession, pago: Pago): Pago {
    session.paymentMode = pago.modo;
    session.payments.push(pago);
    return pago;
  }

  /** Cierra la mesa cuando ya no queda nadie con consumo sin pagar. */
  private async cerrarSiCorresponde(session: TableSession, pago: Pago): Promise<Pago> {
    const pendientes = this.buildBill(session, 0).diners.filter((d) => d.subtotalInCents > 0 && !d.paid);
    if (pago.modo === "TABLE" || pendientes.length === 0) session.status = "CLOSED";
    await this.touchAndSave(session);
    return pago;
  }

  /** Todos los cobros del turno, para el corte de caja. */
  async corteDeCaja(): Promise<CorteDeCaja> {
    const sessions = await this.sessions.list();
    const movimientos = sessions.flatMap((s) => s.payments).sort((a, b) => a.createdAt.localeCompare(b.createdAt));

    const porMetodo = METODOS.map((metodo) => {
      const propios = movimientos.filter((p) => p.metodo === metodo);
      return {
        metodo,
        nombre: NOMBRE_METODO[metodo],
        cantidad: propios.length,
        totalInCents: propios.reduce((s, p) => s + p.totalInCents, 0),
        propinasInCents: propios.reduce((s, p) => s + p.tipInCents, 0),
      };
    });

    // Lo que tiene que haber en el cajón: lo cobrado en efectivo menos los
    // vueltos que se dieron. Si se sumara el "recibido" a secas, la caja
    // cerraría de más todas las noches.
    const efectivoEnCajaInCents = movimientos
      .filter((p) => p.metodo === "EFECTIVO")
      .reduce((s, p) => s + p.totalInCents, 0);

    return {
      desde: movimientos[0]?.createdAt ?? this.clock.now().toISOString(),
      hasta: this.clock.now().toISOString(),
      totalInCents: movimientos.reduce((s, p) => s + p.totalInCents, 0),
      propinasInCents: movimientos.reduce((s, p) => s + p.tipInCents, 0),
      cantidad: movimientos.length,
      porMetodo,
      efectivoEnCajaInCents,
      movimientos: movimientos.slice().reverse(),
    };
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
      paid: session.payments.some((p) => p.modo === "TABLE" || p.dinerId === diner.id),
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

/** Segundos enteros entre un ISO y un momento dado. Nunca negativo. */
function segundosDesde(iso: string, ahora: Date): number {
  return Math.max(0, Math.floor((ahora.getTime() - new Date(iso).getTime()) / 1000));
}

export type { Station };
