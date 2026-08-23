import { useCallback, useEffect, useMemo, useState } from "react";
import { api, ApiError, patch, post } from "./api";
import type { BillSummary, CheckoutPreviewResponse, Diner, EstadoAgente, FinancialSummary, KitchenOrder, LlamadaPendiente, MenuAssistantResponse, MenuItem, OrderStatus, PaymentMode, RespuestaAgente, TableSession, WalletPair, WdkCliPayment } from "./types";

/**
 * Maximo por producto en un mismo pedido.
 *
 * Tiene que coincidir con el que valida `placeOrder` en el servidor. Si se
 * separan, la pantalla deja armar un pedido que la API va a rechazar entero.
 */
const MAX_POR_PRODUCTO = 20;

const money = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
const statusLabel: Record<OrderStatus, string> = { RECEIVED: "Recibido", PREPARING: "En preparación", READY: "Listo", DELIVERED: "Entregado" };
const nextStatus: Record<OrderStatus, OrderStatus | null> = { RECEIVED: "PREPARING", PREPARING: "READY", READY: "DELIVERED", DELIVERED: null };

function tableNumberFromPath(path: string) {
  const parsed = Number(path.match(/^\/mesa\/(\d+)/)?.[1] ?? 12);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 12;
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => { const onPop = () => setPath(window.location.pathname); window.addEventListener("popstate", onPop); return () => window.removeEventListener("popstate", onPop); }, []);
  const navigate = (next: string) => { window.history.pushState({}, "", next); setPath(next); };
  const kitchen = path.startsWith("/cocina");
  const tableNumber = tableNumberFromPath(path);
  const orderView = !kitchen && path.endsWith("/pedido");
  return <div className="app"><Header kitchen={kitchen} orderView={orderView} tableNumber={tableNumber} navigate={navigate} />{kitchen ? <KitchenView navigate={navigate} /> : <DinerView tableNumber={tableNumber} orderView={orderView} navigate={navigate} />}</div>;
}

function Header({ kitchen, orderView, tableNumber, navigate }: { kitchen: boolean; orderView: boolean; tableNumber: number; navigate: (path: string) => void }) {
  return <header className="topbar"><button className="brand" onClick={() => navigate(`/mesa/${tableNumber}`)}><span className="brand-mark">M</span><span>Mesa Abierta</span></button><div className="table-pill">Mesa {tableNumber}</div>{kitchen ? <div className="staff-label">Vista interna · cocina</div> : <nav><button className={!orderView ? "active" : ""} onClick={() => navigate(`/mesa/${tableNumber}`)}>Menú</button><button className={orderView ? "active" : ""} onClick={() => navigate(`/mesa/${tableNumber}/pedido`)}>Mi pedido</button></nav>}</header>;
}

function DinerView({ tableNumber, orderView, navigate }: { tableNumber: number; orderView: boolean; navigate: (path: string) => void }) {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [session, setSession] = useState<TableSession | null>(null);
  const [diner, setDiner] = useState<Diner | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Todos");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [llamarOpen, setLlamarOpen] = useState(false);
  /**
   * Saca el producto del carrito de una.
   *
   * Antes la unica forma era apretar el menos hasta llegar a cero: con tres
   * unidades son tres toques, y en el medio la linea sigue ahi. Tambien se
   * borra la aclaracion, porque una nota de un plato que ya no esta en el
   * pedido no tiene a que referirse — y si la persona lo vuelve a agregar,
   * heredar en silencio un "sin cebolla" que escribio hace diez minutos es
   * peor que pedirselo de nuevo.
   */
  const quitarDelCarrito = (menuItemId: string) => {
    setCart((actual) => {
      const copia = { ...actual };
      delete copia[menuItemId];
      return copia;
    });
    setNotes((actuales) => {
      if (!(menuItemId in actuales)) return actuales;
      const copia = { ...actuales };
      delete copia[menuItemId];
      return copia;
    });
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [billOpen, setBillOpen] = useState(false);

  const refreshSession = useCallback(async (id: string) => { const next = await api<TableSession>(`/api/tables/${id}`); setSession(next); return next; }, []);
  useEffect(() => { setLoading(true); void (async () => { try { const menuResponse = await api<{ items: MenuItem[] }>("/api/menu"); setMenu(menuResponse.items.filter((item) => item.available)); let table: TableSession; try { table = await api<TableSession>(`/api/tables/by-number/${tableNumber}`); } catch (cause) { if (!(cause instanceof ApiError) || cause.status !== 404) throw cause; table = await post<TableSession>("/api/tables", { tableNumber }); } setSession(table); const savedId = window.localStorage.getItem(`mesa-abierta-diner-${table.id}`); setDiner(table.diners.find((candidate) => candidate.id === savedId) ?? null); if (table.status === "BILL_REQUESTED") setBillOpen(true); } catch (cause) { setError(messageOf(cause)); } finally { setLoading(false); } })(); }, [tableNumber]);
  useEffect(() => { if (!session || session.status === "CLOSED") return; const timer = window.setInterval(() => void refreshSession(session.id), 3_000); return () => window.clearInterval(timer); }, [session?.id, session?.status, refreshSession]);

  const join = async () => { if (!session) return; setError(""); try { const joined = await post<Diner>(`/api/tables/${session.id}/diners`, { name }); window.localStorage.setItem(`mesa-abierta-diner-${session.id}`, joined.id); setDiner(joined); await refreshSession(session.id); } catch (cause) { setError(messageOf(cause)); } };
    /**
   * Suma o resta unidades de un producto.
   *
   * El tope de 20 lo valida el servidor desde siempre, pero la pantalla no lo
   * conocia: te dejaba llegar a 21 y recien al confirmar te rebotaba el pedido
   * ENTERO con "cada cantidad debe ser un entero entre 1 y 20". Perdias todo
   * lo que habias armado por un toque de mas en un solo plato.
   *
   * Ahora se topea acá y se avisa en el momento. El servidor sigue validando
   * igual — la pantalla no es la que manda — pero deja de ser la que te mete
   * en un estado que la API va a rechazar.
   */
  const change = (id: string, delta: number) => setCart((current) => {
    const pedido = (current[id] ?? 0) + delta;
    if (pedido > MAX_POR_PRODUCTO) {
      setToast("");
      setError(`Son ${MAX_POR_PRODUCTO} por producto como máximo. Si necesitás más, llamá al mozo.`);
      return current;
    }
    const quantity = Math.max(0, pedido);
    const next = { ...current };
    if (quantity) next[id] = quantity;
    else {
      delete next[id];
      setNotes((currentNotes) => { const copy = { ...currentNotes }; delete copy[id]; return copy; });
    }
    return next;
  });
  const sendOrder = async () => { if (!session || !diner) return; const selected = Object.entries(cart).filter(([, quantity]) => quantity > 0); if (!selected.length) return; try { await post(`/api/tables/${session.id}/orders`, { dinerId: diner.id, items: selected.map(([menuItemId, quantity]) => ({ menuItemId, quantity, ...(notes[menuItemId]?.trim() ? { note: notes[menuItemId].trim() } : {}) })) }); setCart({}); setNotes({}); setToast("Pedido enviado. Ya podés seguirlo desde Mi pedido."); await refreshSession(session.id); navigate(`/mesa/${tableNumber}/pedido`); window.setTimeout(() => setToast(""), 3500); } catch (cause) { setError(messageOf(cause)); } };

  if (loading) return <StateCard title={`Abriendo Mesa ${tableNumber}…`} text="Estamos cargando el menú de tu mesa." />;
  if (!session) return <StateCard title="No pudimos abrir la mesa" text={error || "Reintentá en unos segundos."} />;
  if (!diner) return <main className="join-wrap"><section className="join-card"><span className="eyebrow">QR · MESA {tableNumber}</span><h1>Ya estás en tu mesa.</h1><p>Decinos tu nombre para asociar este teléfono a tus pedidos y mostrarte solamente lo que vos consumís.</p><label>¿Quién está usando este teléfono?<input autoFocus value={name} maxLength={40} placeholder="Ej. Felipe" onChange={(event) => setName(event.target.value)} onKeyDown={(event) => event.key === "Enter" && void join()} /></label>{error && <p className="error-text">{error}</p>}<button className="primary" disabled={name.trim().length < 2} onClick={() => void join()}>Ver menú <span>→</span></button><small>No necesitás registrarte ni descargar una app.</small></section></main>;

  const cartCount = Object.values(cart).reduce((sum, value) => sum + value, 0);
  const cartTotal = menu.reduce((sum, item) => sum + item.priceInCents * (cart[item.id] ?? 0), 0);
  const categories = ["Todos", ...new Set(menu.map((item) => item.category))];
  const visibleMenu = category === "Todos" ? menu : menu.filter((item) => item.category === category);
  const myOrders = session.orders.filter((order) => order.dinerId === diner.id);
  const myConsumed = myOrders.reduce((sum, order) => sum + order.items.reduce((subtotal, item) => subtotal + item.unitPriceInCents * item.quantity, 0), 0);
  const canRequestBill = session.orders.length > 0 && session.orders.every((order) => order.status === "DELIVERED");
  const removeOrderedItem = async (orderId: string, menuItemId: string) => { if (!window.confirm("¿Querés quitar este producto del pedido? Sólo se puede mientras el restaurante todavía no empezó a prepararlo.")) return; try { await post(`/api/tables/${session.id}/orders/${orderId}/items/${menuItemId}/remove`, { dinerId: diner.id }); await refreshSession(session.id); setToast("Producto eliminado del pedido."); window.setTimeout(() => setToast(""), 3000); } catch (cause) { setError(messageOf(cause)); } };

  if (orderView) return <><main className="my-order-page"><section className="profile-banner"><div className="avatar">{diner.name.slice(0, 1).toUpperCase()}</div><div><span>Este teléfono</span><h1>{diner.name}</h1><p>Mesa {tableNumber} · {myOrders.length} {myOrders.length === 1 ? "pedido" : "pedidos"}</p></div><button className="outline" onClick={() => navigate(`/mesa/${tableNumber}`)}>＋ Pedir algo más</button></section><div className="order-summary-grid"><section className="summary-card"><span>Tu consumo</span><strong>{money.format(myConsumed / 100)}</strong><small>Sin propina</small></section><section className="summary-card"><span>Estado</span><strong>{myOrders.length ? statusLabel[myOrders[myOrders.length - 1].status] : "Sin pedidos"}</strong><small>Se actualiza automáticamente</small></section><section className="summary-card"><span>Cuenta</span><strong>{session.status === "OPEN" ? "Abierta" : session.status === "BILL_REQUESTED" ? "Solicitada" : "Cerrada"}</strong><small>Mesa {tableNumber}</small></section></div><section className="orders-panel"><div className="panel-title"><div><span className="eyebrow">MI PEDIDO</span><h2>Lo que pediste</h2></div>{session.status !== "CLOSED" && <button className="primary compact" disabled={!canRequestBill && session.status === "OPEN"} onClick={() => setBillOpen(true)}>{session.status === "OPEN" ? "Pedir la cuenta" : "Ver cuenta"}</button>}</div>{myOrders.length ? <div className="order-list">{[...myOrders].reverse().map((order) => <article className="my-order-card" key={order.id}><div className="my-order-head"><div><strong>{order.type === "INITIAL" ? "Pedido inicial" : "Pedido adicional"}</strong><time>{new Date(order.createdAt).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}</time></div><span className={`status ${order.status.toLowerCase()}`}>{statusLabel[order.status]}</span></div><ul>{order.items.map((item) => <li key={`${order.id}-${item.menuItemId}`}><div><strong>{item.quantity}× {item.name}</strong>{item.note && <small>{item.note}</small>}{order.status === "RECEIVED" && session.status === "OPEN" && <button className="remove-ordered-item" onClick={() => void removeOrderedItem(order.id, item.menuItemId)}>Quitar del pedido</button>}</div><span>{money.format(item.unitPriceInCents * item.quantity / 100)}</span></li>)}</ul>{order.status === "RECEIVED" && <p className="editable-hint">Todavía podés corregir este pedido. Cuando pase a “En preparación”, queda bloqueado.</p>}</article>)}</div> : <div className="empty-order"><h3>Todavía no pediste nada</h3><p>Elegí tus platos desde el menú.</p><button className="primary" onClick={() => navigate(`/mesa/${tableNumber}`)}>Ir al menú</button></div>}</section></main>{billOpen && <BillDialog session={session} diner={diner} tableNumber={tableNumber} canRequest={canRequestBill} onClose={() => setBillOpen(false)} onRefresh={() => refreshSession(session.id)} />}{error && <div className="toast error">{error}</div>}{toast && <div className="toast success">✓ {toast}</div>}</>;

  return <><main className="customer-layout"><section className="menu-column"><div className="welcome-row"><div><span className="eyebrow">MESA {tableNumber} · {diner.name.toUpperCase()}</span><h1>¿Qué vas a pedir?</h1><p>Elegí, personalizá y enviá. Todo queda asociado a tu nombre y a esta mesa.</p></div><div className="welcome-actions"><button className="llamar-mozo" onClick={() => setLlamarOpen(true)}>🔔 Llamar al mozo</button><button className="assistant-launch" onClick={() => setAssistantOpen(true)}>✦ Asistente del menú</button><button className="order-shortcut" onClick={() => navigate(`/mesa/${tableNumber}/pedido`)}><span>Mi pedido</span><strong>{myOrders.length}</strong></button></div></div><div className="categories">{categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="section-title"><h2>{category === "Todos" ? "Menú" : category}</h2><span>{visibleMenu.length} opciones</span></div><div className="menu-grid">{visibleMenu.map((item) => <article className="menu-card" key={item.id}><div className="dish-visual"><span>{item.name.slice(0, 1)}</span></div><div className="dish-copy"><div><span className="dish-category">{item.category}</span><h3>{item.name}</h3><p>{item.description}</p></div><div className="dish-action"><strong>{money.format(item.priceInCents / 100)}</strong>{cart[item.id] ? <div className="counter"><button onClick={() => change(item.id, -1)}>−</button><span>{cart[item.id]}</span><button onClick={() => change(item.id, 1)}>+</button></div> : <button onClick={() => change(item.id, 1)}>Agregar</button>}</div>{cart[item.id] ? <button className="edit-food" onClick={() => setEditingItemId(item.id)}>{notes[item.id] ? "✓ Personalizado" : "Editar / aclarar"}</button> : null}</div></article>)}</div></section><aside className="cart"><div className="cart-head"><div><span>Tu selección</span><h2>Pedido de {diner.name}</h2></div><b>{cartCount}</b></div>{cartCount ? <><div className="cart-lines">{menu.filter((item) => cart[item.id]).map((item) => <div className="cart-line" key={item.id}><div><span>{cart[item.id]}× {item.name}</span>{notes[item.id] && <small>{notes[item.id]}</small>}<button onClick={() => setEditingItemId(item.id)}>Editar</button></div><strong>{money.format(item.priceInCents * cart[item.id] / 100)}</strong><button className="quitar-linea" aria-label={`Quitar ${item.name} del pedido`} title="Quitar del pedido" onClick={() => quitarDelCarrito(item.id)}>×</button></div>)}</div><div className="total"><span>Total de este envío</span><strong>{money.format(cartTotal / 100)}</strong></div><button className="primary" disabled={session.status !== "OPEN"} onClick={() => void sendOrder()}>Confirmar pedido <span>→</span></button><small>Podés volver a pedir más adelante.</small></> : <div className="empty"><span>＋</span><h3>Tu pedido está vacío</h3><p>Agregá algo del menú para empezar.</p></div>}</aside></main>{editingItemId && <EditFoodDialog item={menu.find((item) => item.id === editingItemId)!} quantity={cart[editingItemId] ?? 1} note={notes[editingItemId] ?? ""} onClose={() => setEditingItemId(null)} onQuantity={(quantity) => setCart((current) => ({ ...current, [editingItemId]: Math.min(MAX_POR_PRODUCTO, quantity) }))} onSave={(note) => { setNotes((current) => ({ ...current, [editingItemId]: note })); setEditingItemId(null); }} />}{assistantOpen && <MenuAssistant onClose={() => setAssistantOpen(false)} onAdd={(item) => { change(item.id, 1); setAssistantOpen(false); }} />}{llamarOpen && <LlamarMozoDialog sessionId={session.id} dinerId={diner.id} onClose={() => setLlamarOpen(false)} />}{cartCount > 0 && <button className="mobile-cart" onClick={() => document.querySelector(".cart")?.scrollIntoView({ behavior: "smooth" })}><span>Ver mi pedido · {cartCount}</span><strong>{money.format(cartTotal / 100)}</strong></button>}{error && <div className="toast error">{error}</div>}{toast && <div className="toast success">✓ {toast}</div>}</>;
}

function EditFoodDialog({ item, quantity, note, onClose, onQuantity, onSave }: { item: MenuItem; quantity: number; note: string; onClose: () => void; onQuantity: (quantity: number) => void; onSave: (note: string) => void }) {
  const [draft, setDraft] = useState(note);
  return <div className="modal-backdrop"><section className="food-dialog"><button className="close" onClick={onClose}>×</button><span className="eyebrow">PERSONALIZAR</span><h2>{item.name}</h2><p>{item.description}</p><div className="quantity-row"><span>Cantidad</span><div className="counter large"><button onClick={() => onQuantity(Math.max(1, quantity - 1))}>−</button><span>{quantity}</span><button onClick={() => onQuantity(Math.min(MAX_POR_PRODUCTO, quantity + 1))}>+</button></div></div><label>Aclaraciones para cocina<textarea value={draft} maxLength={180} placeholder="Ej. sin cebolla, salsa aparte…" onChange={(event) => setDraft(event.target.value)} /></label><div className="quick-notes">{["Sin cebolla", "Sin sal", "Salsa aparte", "Bien cocido"].map((text) => <button key={text} onClick={() => setDraft((current) => current ? `${current}, ${text.toLowerCase()}` : text)}>{text}</button>)}</div><button className="primary full" onClick={() => onSave(draft)}>Guardar cambios</button></section></div>;
}

/**
 * El asistente del menu.
 *
 * Antes eran tres botones fijos ("plato del dia", "sugerencias", "mas
 * recomendado") porque el motor de atras era un regex sobre esas tres frases.
 * Con el modelo local de QVAC contestando, la caja de texto libre es lo que
 * muestra que hay un modelo: preguntarle "algo liviano, no tengo mucha hambre"
 * no lo puede resolver un `if`.
 *
 * Las restricciones no son un filtro de la interfaz: viajan al backend y
 * definen el `enum` de la gramatica que restringe al modelo. Con "sin gluten"
 * tildado, el modelo NO PUEDE escribir el id de la burger.
 */
const RESTRICCIONES = [
  { id: "sin-gluten", etiqueta: "Sin gluten" },
  { id: "vegetariano", etiqueta: "Vegetariano" },
  { id: "vegano", etiqueta: "Vegano" },
];

const SUGERIDAS = [
  "algo liviano para arrancar",
  "tengo mucha hambre",
  "algo para compartir",
];

function MenuAssistant({ onClose, onAdd }: { onClose: () => void; onAdd: (item: MenuItem) => void }) {
  const [answer, setAnswer] = useState<MenuAssistantResponse | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [texto, setTexto] = useState("");
  const [restricciones, setRestricciones] = useState<string[]>([]);

  const ask = async (question: string) => {
    const consulta = question.trim();
    if (!consulta || busy) return;
    setBusy(true); setError(""); setAnswer(null);
    try {
      setAnswer(await post<MenuAssistantResponse>("/api/menu/assistant", { question: consulta, restricciones }));
    } catch (cause) { setError(messageOf(cause)); } finally { setBusy(false); }
  };

  const alternar = (id: string) => setRestricciones((actuales) =>
    actuales.includes(id) ? actuales.filter((r) => r !== id) : [...actuales, id]);

  const conModelo = answer?.engine === "QVAC_LOCAL";

  return <div className="modal-backdrop"><section className="assistant-dialog">
    <button className="close" onClick={onClose}>x</button>
    <span className="eyebrow">ASISTENTE DEL MENU · IA LOCAL</span>
    <h2>Contame que tenes ganas</h2>
    <p>El modelo corre en la maquina del restaurante. Ni tu consulta ni tus restricciones salen de aca.</p>

    <div className="assistant-diets">
      {RESTRICCIONES.map((r) => <button key={r.id} type="button"
        className={restricciones.includes(r.id) ? "diet on" : "diet"}
        onClick={() => alternar(r.id)}>{r.etiqueta}</button>)}
    </div>

    <form className="assistant-ask" onSubmit={(event) => { event.preventDefault(); void ask(texto); }}>
      <input value={texto} maxLength={240} disabled={busy}
        placeholder="algo liviano, no tengo mucha hambre..."
        onChange={(event) => setTexto(event.target.value)} />
      <button className="primary" type="submit" disabled={busy || !texto.trim()}>Preguntar</button>
    </form>

    <div className="assistant-prompts">
      {SUGERIDAS.map((s) => <button key={s} disabled={busy} onClick={() => { setTexto(s); void ask(s); }}>{s}</button>)}
    </div>

    {busy && <div className="notice">Pensando en la maquina del local...</div>}
    {error && <div className="notice warn">{error}</div>}

    {answer && <div className="assistant-answer">
      <div className="assistant-engine">
        {conModelo
          ? <span className="badge ia">IA local</span>
          : <span className="badge reglas" title="El modelo local no contesto; esto sale de una regla determinista.">sin IA - reglas locales</span>}
        <strong>{answer.title}</strong>
      </div>

      {answer.items.length === 0 && <p>No encontre nada de la carta que responda a eso.</p>}

      <div className="assistant-items">{answer.items.map((item) => <button key={item.id} onClick={() => onAdd(item)}>
        <span>{item.name}</span>
        {answer.motivos?.[item.id] && <em className="motivo">&ldquo;{answer.motivos[item.id]}&rdquo;</em>}
        <small>{money.format(item.priceInCents / 100)} · agregar</small>
      </button>)}</div>

      {/* Lo que el modelo propuso y no se muestra, con el motivo. El track pide
          mostrar las fallas, no solo los aciertos. */}
      {answer.descartadas && answer.descartadas.length > 0 && <details className="assistant-descartes">
        <summary>El modelo propuso {answer.descartadas.length} que no te mostramos</summary>
        <ul>{answer.descartadas.map((d, n) => <li key={n}>{d.texto} - {LEYENDA_DESCARTE[d.razon] ?? d.razon}</li>)}</ul>
      </details>}

      <small>{answer.note}</small>
    </div>}
  </section></div>;
}

const LEYENDA_DESCARTE: Record<string, string> = {
  "no-existe-en-la-carta": "ya no esta disponible",
  "repetida": "lo habia recomendado dos veces",
  "formato-invalido": "la respuesta vino mal formada",
};

function BillDialog({ session, diner, tableNumber, canRequest, onClose, onRefresh }: { session: TableSession; diner: Diner; tableNumber: number; canRequest: boolean; onClose: () => void; onRefresh: () => Promise<TableSession> }) {

  /**
   * El metodo elegido.
   *
   * Arranca en efectivo y no en billetera a proposito: en un restaurante de
   * verdad es lo que mas se usa, y ademas es el unico camino que funciona sin
   * tener las wallets desbloqueadas. Que la pantalla no dependa de un paso de
   * terminal para mostrar algo es lo que la hace demostrable siempre.
   */
  const [metodo, setMetodo] = useState<"WALLET" | "EFECTIVO" | "MERCADO_PAGO">("EFECTIVO");
  const [conCuanto, setConCuanto] = useState("");
  /** El pago local ya hecho. Mientras no sea null, el dialogo muestra el cierre. */
  const [cobrado, setCobrado] = useState<{ vueltoInCents?: number; metodo: string } | null>(null);
  const [wdkSimulado, setWdkSimulado] = useState(false);
  const [arsPorUsdt, setArsPorUsdt] = useState<number | null>(null);
  useEffect(() => {
    void api<{ wdkSimulado: boolean; arsPorUsdt: number }>("/api/config")
      .then((c) => { setWdkSimulado(c.wdkSimulado); setArsPorUsdt(c.arsPorUsdt); })
      .catch(() => {});
  }, []);
  const [confirmed, setConfirmed] = useState(session.status !== "OPEN");
  const [bill, setBill] = useState<BillSummary | null>(null);
  const [mode, setMode] = useState<PaymentMode>("INDIVIDUAL");
  const [tip, setTip] = useState(10);
  const [wallets, setWallets] = useState<WalletPair | null>(null);
  const [preview, setPreview] = useState<CheckoutPreviewResponse | null>(null);
  const [receipt, setReceipt] = useState<WdkCliPayment | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const loadBill = useCallback(async () => setBill(await api<BillSummary>(`/api/tables/${session.id}/bill?tipPercent=${tip}`)), [session.id, tip]);
  const loadWallets = useCallback(async () => { try { setWallets(await api<WalletPair>("/api/wdk/wallets")); } catch (cause) { setMessage(messageOf(cause)); } }, []);
  useEffect(() => { if (confirmed) { void loadBill(); void loadWallets(); } }, [confirmed, loadBill, loadWallets]);
  useEffect(() => { if (confirmed) { setPreview(null); setReceipt(null); void loadBill(); } }, [tip, mode, confirmed, loadBill]);
  const requestBill = async () => { setBusy(true); setMessage(""); try { await post(`/api/tables/${session.id}/bill/request`, { confirmed: true }); setConfirmed(true); await onRefresh(); await loadBill(); await loadWallets(); } catch (cause) { setMessage(messageOf(cause)); } finally { setBusy(false); } };
  const paymentInput = { mode, tipPercent: tip, ...(mode === "INDIVIDUAL" ? { dinerId: diner.id } : {}) };
  const createPreview = async () => { setBusy(true); setMessage(""); setReceipt(null); try { setPreview(await post<CheckoutPreviewResponse>(`/api/tables/${session.id}/payments/wdk/preview`, paymentInput)); } catch (cause) { setPreview(null); setMessage(messageOf(cause)); } finally { setBusy(false); } };
  const execute = async () => { if (!preview) return; setBusy(true); setMessage(""); try { const paid = await post<WdkCliPayment>(`/api/tables/${session.id}/payments/wdk/execute`, { ...paymentInput, previewId: preview.preview.previewId }); setReceipt(paid); setPreview(null); setMessage("Pago enviado por WDK CLI en Sepolia. La app registró el flujo cliente → negocio."); await onRefresh(); await loadWallets(); await loadBill(); } catch (cause) { setMessage(messageOf(cause)); } finally { setBusy(false); } };
  const personal = bill?.diners.find((item) => item.dinerId === diner.id)?.subtotalInCents ?? 0;
  const payable = mode === "TABLE" ? bill?.subtotalInCents ?? 0 : personal;
  const total = Math.round(payable * (1 + tip / 100));
  /**
   * El vuelto, en centavos. `null` mientras no escriba nada; negativo si no le
   * alcanza — y ahi la pantalla dice "Falta" en vez de "Vuelto", que es la
   * diferencia entre un numero util y un numero confuso.
   */
  const vuelto = conCuanto === "" ? null : Math.round(Number(conCuanto) * 100) - total;
  /**
   * El total en USD₮, para escribirlo en el boton.
   *
   * Se muestra la moneda con la que va a salir la plata y no los pesos: es el
   * numero que despues aparece en el recibo y en la billetera, y si el boton
   * dice una cosa y el recibo otra, el que paga desconfia con razon.
   */
  const enUsdt = arsPorUsdt ? (total / 100 / arsPorUsdt).toFixed(2) : null;
  /**
   * Pagar con la billetera, en un solo toque.
   *
   * Antes eran dos botones: "Previsualizar con WDK" y despues "Confirmar y
   * enviar". A un comensal "previsualizar con WDK" no le dice nada, y el
   * segundo boton quedaba gris hasta que apretaba el primero — que se leia
   * como que la app estaba rota.
   *
   * EL DRY-RUN NO SE FUE, dejo de ser un boton. Sigue corriendo antes de cada
   * envio y sigue siendo lo que WDK usa para validar; lo que cambia es que
   * corre adentro de la misma accion. Y la confirmacion humana tampoco se fue:
   * es este boton, que muestra el monto exacto en USD₮ antes de que lo
   * aprietes. El preview de un solo uso y atado al monto sigue igual en el
   * gateway, con sus tests.
   */
  const pagarConBilletera = async () => {
    setBusy(true); setMessage(""); setReceipt(null);
    try {
      const p = await post<CheckoutPreviewResponse>(`/api/tables/${session.id}/payments/wdk/preview`, paymentInput);
      setPreview(p);
      const r = await post<WdkCliPayment>(`/api/tables/${session.id}/payments/wdk/execute`, { ...paymentInput, previewId: p.preview.previewId });
      setReceipt(r);
      await onRefresh();
    } catch (cause) { setMessage(messageOf(cause)); }
    finally { setBusy(false); }
  };

  /** Cobro local: efectivo o Mercado Pago. Ninguno sale a internet. */
  const cobrarLocal = async () => {
    setBusy(true); setMessage("");
    try {
      const cuerpo: Record<string, unknown> = { metodo, mode, tipPercent: tip };
      if (mode === "INDIVIDUAL") cuerpo["dinerId"] = diner.id;
      if (metodo === "EFECTIVO") cuerpo["recibidoInCents"] = Math.round(Number(conCuanto || 0) * 100);
      const pago = await post<{ vueltoInCents?: number; metodo: string }>(`/api/tables/${session.id}/pagos/local`, cuerpo);
      // Antes esto solo dejaba un mensaje y el dialogo seguia abierto mostrando
      // los botones de cobrar. La mesa ya estaba cerrada por atras, asi que
      // cualquier cosa que tocaras despues fallaba con "primero se debe
      // solicitar la cuenta" — y parecia un bug de WDK cuando en realidad el
      // cobro ya habia salido bien.
      setCobrado(pago);
      await onRefresh();
    } catch (cause) { setMessage(messageOf(cause)); }
    finally { setBusy(false); }
  };

  return <div className="modal-backdrop"><section className="bill-dialog"><button className="close" onClick={onClose}>×</button>{cobrado ? <>
    <span className="eyebrow">LISTO</span>
    <h2>{cobrado.metodo === "EFECTIVO" ? "Cobrado en efectivo" : "Pago registrado"}</h2>
    {cobrado.metodo === "EFECTIVO" && cobrado.vueltoInCents
      ? <div className="vuelto ok grande"><span>Dale de vuelto</span><strong>{money.format(cobrado.vueltoInCents / 100)}</strong></div>
      : <p>{cobrado.metodo === "MERCADO_PAGO" ? "Registrado como pago de demostración: no se conectó con Mercado Pago." : "Sin vuelto: pagó justo."}</p>}
    <p>{session.status === "CLOSED" ? "La mesa quedó cerrada y libre para la próxima." : "Todavía falta que paguen los demás comensales."}</p>
    <div className="dialog-actions"><button className="primary" onClick={onClose}>Listo</button></div>
  </> : receipt ? <>
    {/* El recibo va ANTES del "ya esta paga": al cobrar con la billetera la
        sesion queda CLOSED en el mismo instante, asi que la pantalla de cuenta
        cerrada se le adelantaba y se comia el hash de la transaccion — que es
        justamente lo que hay que poder mostrar. */}
    <span className="eyebrow">PAGO ENVIADO · SEPOLIA</span>
    <h2>{wdkSimulado ? "Cobrado (simulado)" : "Cobrado en la red"}</h2>
    <div className="recibo-monto"><strong>{receipt.amount}</strong><span>USD₮</span></div>
    <div className="recibo-ruta">{shortAddress(receipt.fromAddress)} → {shortAddress(receipt.toAddress)}</div>
    {receipt.transactionHash
      ? <div className="recibo-hash"><span>Transacción</span><code>{receipt.transactionHash}</code></div>
      : <p>WDK CLI no devolvió hash en el campo esperado; revisá la salida del CLI.</p>}
    {wdkSimulado && <div className="notice warn">Checkout simulado: no hubo transacción on-chain.</div>}
    <p>{session.status === "CLOSED" ? "La mesa quedó cerrada y libre para la próxima." : "Todavía falta que paguen los demás comensales."}</p>
    <div className="dialog-actions"><button className="primary" onClick={onClose}>Listo</button></div>
  </> : session.status === "CLOSED" ? <>
    <span className="eyebrow">MESA {tableNumber}</span>
    <h2>Esta cuenta ya está paga</h2>
    <p>La mesa se cerró. No queda nada por cobrar.</p>
    <div className="dialog-actions"><button className="primary" onClick={onClose}>Cerrar</button></div>
  </> : !confirmed ? <><span className="eyebrow">CUENTA · MESA {tableNumber}</span><h2>¿Pedimos la cuenta?</h2><p>Al confirmar, nadie podrá agregar productos. Sólo se habilita cuando todo fue entregado.</p>{!canRequest && <div className="notice warn">Todavía hay pedidos sin entregar.</div>}<div className="dialog-actions"><button className="outline" onClick={onClose}>Seguir pidiendo</button><button className="primary" disabled={!canRequest || busy} onClick={() => void requestBill()}>Sí, pedir la cuenta</button></div></> : <><span className="eyebrow">WDK CLI CHECKOUT · SEPOLIA</span><h2>Cliente → negocio</h2><div className="pay-modes"><button className={mode === "INDIVIDUAL" ? "active" : ""} onClick={() => setMode("INDIVIDUAL")}>Pago lo mío<small>{money.format(personal / 100)}</small></button><button className={mode === "TABLE" ? "active" : ""} onClick={() => setMode("TABLE")}>Pago toda la mesa<small>{money.format((bill?.subtotalInCents ?? 0) / 100)}</small></button></div><label className="tip-label">Propina<div className="tips">{[0, 5, 10, 15].map((value) => <button className={tip === value ? "active" : ""} key={value} onClick={() => setTip(value)}>{value === 0 ? "Sin" : `${value}%`}</button>)}</div></label><div className="bill-total"><span>Total</span><strong>{money.format(total / 100)}</strong></div><div className="metodos-pago">
      <span className="metodos-titulo">¿Cómo pagás?</span>
      <div className="metodos-grid">
        <button className={metodo === "WALLET" ? "metodo activo" : "metodo"} onClick={() => setMetodo("WALLET")}>
          <span className="metodo-icono">₮</span>
          <b>Billetera</b>
          <small>USD₮ · Sepolia</small>
        </button>
        <button className={metodo === "EFECTIVO" ? "metodo activo" : "metodo"} onClick={() => setMetodo("EFECTIVO")}>
          <span className="metodo-icono">$</span>
          <b>Efectivo</b>
          <small>con vuelto</small>
        </button>
        <button className={metodo === "MERCADO_PAGO" ? "metodo activo" : "metodo"} onClick={() => setMetodo("MERCADO_PAGO")}>
          <LogoMercadoPago />
          <small>demo</small>
        </button>
      </div>
    </div>

    {metodo === "EFECTIVO" && <div className="efectivo-panel">
      <label>¿Con cuánto pagás?
        <input inputMode="numeric" value={conCuanto} placeholder={String(Math.ceil(total / 100))}
          onChange={(e) => setConCuanto(e.target.value.replace(/[^0-9]/g, ""))} />
      </label>
      {/* Los billetes que existen de verdad. Escribir "20000" con el teclado
          numerico en un celu es incomodo y ademas es la plata que la persona
          tiene en la mano: se toca el billete y listo. */}
      <div className="billetes">
        {[2000, 5000, 10000, 20000].filter((b) => b * 100 >= total).slice(0, 3).map((b) =>
          <button key={b} onClick={() => setConCuanto(String(b))}>{money.format(b)}</button>)}
        <button onClick={() => setConCuanto(String(Math.ceil(total / 100)))}>Justo</button>
      </div>
      {vuelto !== null && (vuelto >= 0
        ? <div className="vuelto ok"><span>Vuelto</span><strong>{money.format(vuelto / 100)}</strong></div>
        : <div className="vuelto falta"><span>Falta</span><strong>{money.format(Math.abs(vuelto) / 100)}</strong></div>)}
    </div>}

    {metodo === "MERCADO_PAGO" && <div className="mp-panel">
      <LogoMercadoPago grande />
      {/* Se dice en la pantalla, no solo en el README: no hay API detras. */}
      <p>Botón de demostración. No se conecta con Mercado Pago: no hay API, ni credenciales, ni webhook. Registra el cobro y cierra la mesa.</p>
    </div>}

    {metodo === "WALLET" && wdkSimulado && <div className="aviso-simulado">
      <b>Checkout simulado</b>
      <span>No se ejecuta el binario <code>wdk</code> y no hay transacción on-chain. El recorrido —saldo, dry-run, confirmación, transferencia— es el mismo. Para el cobro real: sacar <code>WDK_CLI_MODE</code> y desbloquear las wallets.</span>
    </div>}
    {metodo === "WALLET" && wallets && <div className="wallet-flow"><WalletMini title="Tu billetera" wallet={wallets.client} /><span className="wallet-arrow">→</span><WalletMini title="Pagás a" wallet={wallets.business} mostrarSaldo={false} /></div>}{metodo === "WALLET" && preview && <div className="checkout-preview"><div><span>PREVIEW WDK CLI</span><strong>{preview.policyEvaluation.decision}</strong></div><p>{preview.preview.amount} USD₮ · dry-run · sin broadcast</p><small>{shortAddress(preview.preview.fromAddress)} → {shortAddress(preview.preview.toAddress)}</small></div>}{message && <div className="notice">{message}</div>}{metodo === "WALLET"
      ? <>
          <div className="dialog-actions">
            <button className="primary grande" disabled={busy || Boolean(receipt)} onClick={() => void pagarConBilletera()}>
              {busy ? "Cobrando…" : receipt ? "Pagado" : `Pagar ${enUsdt !== null ? `${enUsdt} USD₮` : money.format(total / 100)}`}
            </button>
          </div>
          <p className="security-copy">Wallets de prueba únicamente. La seed y la contraseña nunca pasan por la web ni se guardan en el repositorio.</p>
        </>
      : <div className="dialog-actions">
          <button className="primary" disabled={busy || (metodo === "EFECTIVO" && (vuelto === null || vuelto < 0))}
            onClick={() => void cobrarLocal()}>
            {metodo === "EFECTIVO"
              ? (vuelto && vuelto > 0 ? `Cobrar y dar ${money.format(vuelto / 100)} de vuelto` : "Cobrar en efectivo")
              : "Marcar como pagado"}
          </button>
        </div>}</>}</section></div>;
}

/**
 * La billetera, en la pantalla del comensal.
 *
 * `mostrarSaldo` existe por una razon de producto, no tecnica: al cliente se le
 * muestra CUANTO TIENE EL —lo necesita para saber si le alcanza— y A QUIEN le
 * esta por pagar —lo necesita para verificar que no lo esten estafando—, pero
 * NO cuanta plata tiene el restaurante. Eso es informacion del local y no tiene
 * por que estar en el telefono de un desconocido.
 *
 * En la pantalla de caja se muestra completa: ahi el que mira es el dueno.
 */
function WalletMini({ title, wallet, mostrarSaldo = true }: { title: string; wallet: WalletPair["client"]; mostrarSaldo?: boolean }) {
  return <div className="wallet-mini">
    <span>{title}</span>
    <strong>{wallet.walletName}</strong>
    <small>{shortAddress(wallet.address) || "Bloqueada / sin dirección"}</small>
    {mostrarSaldo
      ? <b>{wallet.balance ?? "—"} USD₮</b>
      : <b className="destino">destinatario</b>}
  </div>;
}

function KitchenView({ navigate }: { navigate: (path: string) => void }) {
  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [filter, setFilter] = useState<"ACTIVE" | OrderStatus>("ACTIVE");
  const [financials, setFinancials] = useState<FinancialSummary | null>(null);
  const [wallets, setWallets] = useState<WalletPair | null>(null);
  const [error, setError] = useState("");
  const [llamadas, setLlamadas] = useState<LlamadaPendiente[]>([]);
  // Cuanto adelanta o atrasa el reloj de ESTA pantalla contra el del servidor.
  const [desfasaje, setDesfasaje] = useState(0);
  const refresh = useCallback(async () => {
    try {
      const response = await api<{ orders: KitchenOrder[]; ahora: string; llamadas: LlamadaPendiente[] }>("/api/kitchen/orders");
      setOrders(response.orders);
      setLlamadas(response.llamadas ?? []);
      if (response.ahora) setDesfasaje(Date.now() - Date.parse(response.ahora));
      setError("");
    } catch (cause) { setError(messageOf(cause)); }
  }, []);
  const atenderLlamada = useCallback(async (llamada: LlamadaPendiente) => {
    try { await post(`/api/tables/${llamada.sessionId}/llamadas/${llamada.id}/atender`, {}); await refresh(); }
    catch (cause) { setError(messageOf(cause)); }
  }, [refresh]);
  const refreshMoney = useCallback(async () => { try { setFinancials(await api<FinancialSummary>("/api/wdk/financials")); setWallets(await api<WalletPair>("/api/wdk/wallets")); } catch { /* wallet may be locked before demo setup */ } }, []);
  useEffect(() => { void refresh(); void refreshMoney(); const timer = window.setInterval(() => { void refresh(); void refreshMoney(); }, 2500); return () => window.clearInterval(timer); }, [refresh, refreshMoney]);
  const visible = useMemo(() => orders.filter((order) => filter === "ACTIVE" ? order.status !== "DELIVERED" : order.status === filter), [orders, filter]);
  const advance = async (order: KitchenOrder) => { const next = nextStatus[order.status]; if (!next) return; try { await patch(`/api/kitchen/orders/${order.id}/status`, { status: next }); await refresh(); } catch (cause) { setError(messageOf(cause)); } };
  return <main className="kitchen-page"><div className="kitchen-intro"><div><span className="eyebrow">PANEL INTERNO</span><h1>Cocina + caja</h1><p>Comandas y cobros WDK CLI en una sola demo.</p></div><div className="kitchen-stat"><strong>{orders.filter((order) => order.status !== "DELIVERED").length}</strong><span>activas</span></div></div><LlamadasPendientes llamadas={llamadas} onAtender={atenderLlamada} /><div className="kitchen-filters">{(["ACTIVE", "RECEIVED", "PREPARING", "READY", "DELIVERED"] as const).map((item) => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item === "ACTIVE" ? "Activas" : statusLabel[item]}</button>)}</div>{error && <div className="notice warn">{error}</div>}{visible.length ? <div className="ticket-grid">{visible.map((order) => <article className="ticket" key={order.id}><div className="ticket-head"><div><span>MESA {order.tableNumber}</span><h2>{order.dinerName}</h2></div><div className="ticket-tiempo"><Cronometro desde={order.createdAt} hasta={order.updatedAt} desfasaje={desfasaje} detenido={order.status === "DELIVERED"} /><time>{new Date(order.createdAt).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}</time></div></div>{order.type === "ADDITIONAL" && <div className="additional">＋ PEDIDO ADICIONAL</div>}<ul>{order.items.map((item) => <li key={item.menuItemId}><strong>{item.quantity}×</strong><span>{item.name}{item.note && <small>{item.note}</small>}</span></li>)}</ul><div className="ticket-foot"><span className={`status ${order.status.toLowerCase()}`}>{statusLabel[order.status]}</span>{nextStatus[order.status] && <button onClick={() => void advance(order)}>Marcar {statusLabel[nextStatus[order.status]!].toLowerCase()} →</button>}</div></article>)}</div> : <div className="empty-order"><h3>No hay comandas en esta vista</h3><button className="primary" onClick={() => navigate("/mesa/12")}>Abrir mesa demo</button></div>}{financials && <div className="finance-strip"><div><span>Ingresos cobrados</span><strong>{money.format(financials.businessRevenueInCents / 100)}</strong></div><div><span>Propinas</span><strong>{money.format(financials.tipsInCents / 100)}</strong></div><div><span>USD₮ recibido</span><strong>{financials.usdtReceived ?? "0"}</strong></div><div><span>Wallet negocio</span><strong>{wallets?.business.balance ?? "—"} USD₮</strong></div><small>{financials.profitReason}</small></div>}{financials?.porMetodo && <div className="corte-caja"><span className="corte-titulo">CORTE DE CAJA</span><div className="corte-grid"><div><b>Billetera</b><span>{financials.porMetodo.wallet.cantidad} · {money.format(financials.porMetodo.wallet.totalInCents / 100)}</span></div><div><b>Efectivo</b><span>{financials.porMetodo.efectivo.cantidad} · {money.format(financials.porMetodo.efectivo.totalInCents / 100)}</span></div><div><b>Mercado Pago</b><span>{financials.porMetodo.mercadoPago.cantidad} · {money.format(financials.porMetodo.mercadoPago.totalInCents / 100)}<em> demo</em></span></div><div className="cajon"><b>En el cajón</b><span>{money.format(financials.porMetodo.efectivo.enElCajon / 100)}</span></div></div><small>En el cajón va lo <b>cobrado</b> en efectivo, no lo recibido: entraron {money.format(financials.porMetodo.efectivo.recibidoInCents / 100)} y salieron {money.format(financials.porMetodo.efectivo.vueltoInCents / 100)} de vuelto.</small></div>}<AgentePanel /></main>;
}

/**
 * El panel del agente de caja.
 *
 * Lo que hace que esto sea auditable y no una caja negra que mueve plata es la
 * TRAZA: cada paso muestra que penso el modelo, que herramienta llamo, con que
 * argumentos y que le contesto. El track pide que un humano pueda revisar lo
 * que hizo el agente en cinco segundos.
 *
 * Los pasos que una politica freno se pintan distinto y dicen "bloqueado". Que
 * el rechazo se vea es la mitad del punto: un agente que falla en silencio es
 * peor que uno que no existe.
 */
function AgentePanel() {
  const [consulta, setConsulta] = useState("");
  const [resultado, setResultado] = useState<RespuestaAgente | null>(null);
  const [estado, setEstado] = useState<EstadoAgente | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { void api<EstadoAgente>("/api/agente").then(setEstado).catch(() => setEstado(null)); }, []);

  const preguntar = async (texto: string) => {
    const q = texto.trim();
    if (!q || busy) return;
    setBusy(true); setError(""); setResultado(null);
    try { setResultado(await post<RespuestaAgente>("/api/agente", { consulta: q })); }
    catch (cause) { setError(messageOf(cause)); }
    finally { setBusy(false); }
  };

  const disponible = Boolean(estado?.politicas);

  return <section className="agente-panel">
    <div className="agente-head">
      <div>
        <span className="eyebrow">AGENTE DE CAJA · MODELO LOCAL</span>
        <h2>Preguntale a la caja</h2>
      </div>
      {disponible
        ? <span className="badge ia">IA local</span>
        : <span className="badge reglas">modelo no cargado</span>}
    </div>

    {/* Los topes y la allowlist NO se muestran como chips fijos.
        Eran ruido: un encargado no necesita ver "tope/dia 100 USDT" todo el
        tiempo, y encima se leia como si le estuviera limitando el consumo al
        cliente, que no es lo que hacen. Siguen existiendo, se siguen
        evaluando, y aparecen donde importan: en el paso de la traza que
        bloquean, con el motivo. Evidencia en accion en vez de un cartel. */}
    <p className="agente-alcance">
      Preguntas sobre la caja, las mesas y las billeteras. Puede <b>preparar</b> un
      cobro pero no transmitirlo: <code>wdk send</code> no está entre sus acciones.
    </p>

    <form className="agente-ask" onSubmit={(e) => { e.preventDefault(); void preguntar(consulta); }}>
      <input value={consulta} maxLength={300} disabled={busy || !disponible}
        placeholder="¿cuánto llevamos cobrado hoy?"
        onChange={(e) => setConsulta(e.target.value)} />
      <button className="primary" type="submit" disabled={busy || !disponible || !consulta.trim()}>Preguntar</button>
    </form>

    <div className="agente-sugeridas">
      {/* Preguntas de operacion, no de cobro.
          Antes decian "cobrale 500 USDT a la mesa" y eso no lo pide nadie: para
          cobrar esta el boton de la cuenta, y el monto lo pone el pedido, no
          una persona escribiendo un numero. Y "la direccion del local" se leia
          como la direccion de la calle cuando era la de la billetera. */}
      {["¿cuánto llevamos cobrado hoy?", "¿qué mesas faltan pagar?", "¿cuánto tenemos en la billetera del local?", "¿cuánta propina juntamos?"].map((q) =>
        <button key={q} disabled={busy || !disponible} onClick={() => { setConsulta(q); void preguntar(q); }}>{q}</button>)}
    </div>

    {busy && <div className="notice">El modelo esta decidiendo que herramienta usar...</div>}
    {error && <div className="notice warn">{error}</div>}

    {resultado && <div className="agente-resultado">
      <div className="agente-respuesta">{resultado.respuesta}</div>

      <details className="agente-traza" open>
        <summary>Que hizo, paso por paso ({resultado.traza.length} · {resultado.latenciaTotalMs} ms)</summary>
        <ol>
          {resultado.traza.map((paso) => <li key={paso.numero} className={paso.bloqueado ? "bloqueado" : ""}>
            <div className="paso-accion">
              <code>{paso.accion}</code>
              {Object.keys(paso.argumentos).length > 0 && <small>{JSON.stringify(paso.argumentos)}</small>}
              {paso.bloqueado && <span className="chip-bloqueado">bloqueado por politica</span>}
            </div>
            <div className="paso-pensamiento">{paso.pensamiento}</div>
            <div className="paso-resultado">{paso.resultado}</div>
          </li>)}
        </ol>
      </details>

      {resultado.cierre !== "respondio" && <div className="notice warn">
        {resultado.cierre === "sin-pasos"
          ? "Se quedo sin pasos. Prefiere decirlo antes que inventar un numero."
          : "El modelo local no esta disponible."}
      </div>}
    </div>}
  </section>;
}

/**
 * El cronometro de una comanda.
 *
 * Cuenta desde `createdAt` y se congela en `updatedAt` cuando la comanda ya se
 * entrego: lo que le interesa a la cocina no es "hace cuanto existe" sino
 * cuanto tardo.
 *
 * `desfasaje` es la diferencia entre el reloj del navegador y el del servidor,
 * calculada una sola vez con el `ahora` que viene junto a las comandas. Sin eso,
 * una tablet de cocina atrasada dos minutos mostraria dos minutos de mas en
 * TODAS las comandas, y nadie se daria cuenta de que el problema es el reloj.
 */
function Cronometro({ desde, hasta, desfasaje, detenido }: { desde: string; hasta: string; desfasaje: number; detenido: boolean }) {
  const [, redibujar] = useState(0);
  useEffect(() => {
    if (detenido) return;
    // De a un segundo, aparte del refresco de comandas: si el cronometro
    // dependiera del fetch, saltaria de a 2,5 segundos y se veria roto.
    const timer = window.setInterval(() => redibujar((n) => n + 1), 1000);
    return () => window.clearInterval(timer);
  }, [detenido]);

  const inicio = Date.parse(desde);
  const fin = detenido ? Date.parse(hasta) : Date.now() - desfasaje;
  const segundos = Math.max(0, Math.floor((fin - inicio) / 1000));
  const mm = Math.floor(segundos / 60);
  const ss = segundos % 60;

  // Los umbrales son de cocina, no de diseno: a los 10 minutos una comanda
  // empieza a estar demorada y a los 20 hay que ir a ver que paso.
  const nivel = detenido ? "listo" : mm >= 20 ? "tarde" : mm >= 10 ? "demorado" : "";

  return <span className={`cronometro ${nivel}`} title={detenido ? "Tiempo total hasta la entrega" : "Desde que entro la comanda"}>
    {String(mm).padStart(2, "0")}:{String(ss).padStart(2, "0")}
  </span>;
}

/**
 * Las llamadas al mozo sin atender, arriba de todo y por mesa.
 *
 * Van primero en la pantalla a proposito: una comanda demorada se ve en la
 * grilla, pero alguien esperando con la mano levantada no aparece en ningun
 * lado si esto no esta.
 */
function LlamadasPendientes({ llamadas, onAtender }: { llamadas: LlamadaPendiente[]; onAtender: (l: LlamadaPendiente) => void }) {
  if (llamadas.length === 0) return null;
  return <div className="llamadas-strip">
    <span className="llamadas-titulo">🔔 {llamadas.length === 1 ? "Una mesa llama" : `${llamadas.length} mesas llaman`}</span>
    <div className="llamadas-lista">
      {llamadas.map((llamada) => <button key={llamada.id} onClick={() => onAtender(llamada)}>
        <strong>Mesa {llamada.tableNumber}</strong>
        <span>{llamada.dinerName} · {llamada.motivo}</span>
        <small>voy →</small>
      </button>)}
    </div>
  </div>;
}

/**
 * Llamar al mozo.
 *
 * Los motivos son una lista cerrada y no un campo de texto: en la pantalla del
 * local se lee de un vistazo, no hay que moderar nada, y el comensal resuelve
 * en un toque en vez de escribir.
 */
const MOTIVOS_MOZO = ["necesito algo", "la cuenta", "una consulta", "algo se derramo"];

function LlamarMozoDialog({ sessionId, dinerId, onClose }: { sessionId: string; dinerId: string; onClose: () => void }) {
  const [enviado, setEnviado] = useState<string | null>(null);
  const [yaEstaba, setYaEstaba] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const llamar = async (motivo: string) => {
    if (busy) return;
    setBusy(true); setError("");
    try {
      const r = await post<{ yaEstaba: boolean }>(`/api/tables/${sessionId}/llamadas`, { dinerId, motivo });
      setEnviado(motivo);
      setYaEstaba(Boolean(r.yaEstaba));
    } catch (cause) { setError(messageOf(cause)); }
    finally { setBusy(false); }
  };

  return <div className="modal-backdrop"><section className="food-dialog">
    <button className="close" onClick={onClose}>x</button>
    <span className="eyebrow">TU MESA</span>
    <h2>{enviado ? "Ya avisamos" : "¿Con qué te ayudamos?"}</h2>
    {enviado
      ? <>
          <p>{yaEstaba
            ? "Ya habías llamado y todavía no llegaron. No hace falta que toques de nuevo: van en camino."
            : "Alguien del local ya lo ve en su pantalla y va para tu mesa."}</p>
          <button className="primary" onClick={onClose}>Listo</button>
        </>
      : <>
          <p>Tocá el motivo y alguien se acerca. No hace falta levantar la mano.</p>
          <div className="motivos-mozo">
            {MOTIVOS_MOZO.map((motivo) => <button key={motivo} disabled={busy} onClick={() => void llamar(motivo)}>{motivo}</button>)}
          </div>
          {error && <div className="notice warn">{error}</div>}
        </>}
  </section></div>;
}

/**
 * El logo de Mercado Pago.
 *
 * Sale de `web/public/mercado-pago.png`, o sea del disco: la app no pide una
 * imagen a internet. Es coherente con el resto —el modelo corre local, la
 * billetera corre local— y ademas en el wifi de un evento un logo hotlinkeado
 * es exactamente lo que no carga en el momento de grabar.
 *
 * Si el archivo no esta, cae a la marca escrita en la tipografia y el azul de
 * la marca. Se ve bien igual y no deja un icono roto en la pantalla.
 */
function LogoMercadoPago({ grande = false }: { grande?: boolean }) {
  // Dos intentos y una red: primero el PNG oficial si alguien lo dejo en
  // web/public/, despues el SVG dibujado a mano que viene en el repo, y por
  // ultimo la marca escrita. Nunca queda un icono roto en la pantalla.
  const [intento, setIntento] = useState(0);
  const fuentes = ["/mercado-pago.png", "/mercado-pago.svg"];
  if (intento >= fuentes.length) return <b className={grande ? "mp-texto grande" : "mp-texto"}>mercado pago</b>;
  return <img src={fuentes[intento]} alt="Mercado Pago"
    className={grande ? "mp-logo grande" : "mp-logo"}
    onError={() => setIntento((n) => n + 1)} />;
}

function StateCard({ title, text }: { title: string; text: string }) { return <main className="state-wrap"><section><span className="brand-mark">M</span><h1>{title}</h1><p>{text}</p></section></main>; }
function shortAddress(value: string) { return value ? `${value.slice(0, 6)}…${value.slice(-4)}` : ""; }
function messageOf(cause: unknown) { return cause instanceof Error ? cause.message : "Ocurrió un error inesperado."; }
