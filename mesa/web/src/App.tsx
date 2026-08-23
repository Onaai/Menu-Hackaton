import { useCallback, useEffect, useMemo, useState } from "react";
import { api, ApiError, patch, post } from "./api";
import type { BillSummary, CheckoutPreviewResponse, Diner, EstadoAgente, FinancialSummary, KitchenOrder, LlamadaPendiente, MenuAssistantResponse, MenuItem, OrderStatus, PaymentMode, RespuestaAgente, TableSession, WalletPair, WdkCliPayment } from "./types";

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
  const change = (id: string, delta: number) => setCart((current) => { const quantity = Math.max(0, (current[id] ?? 0) + delta); const next = { ...current }; if (quantity) next[id] = quantity; else { delete next[id]; setNotes((currentNotes) => { const copy = { ...currentNotes }; delete copy[id]; return copy; }); } return next; });
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

  return <><main className="customer-layout"><section className="menu-column"><div className="welcome-row"><div><span className="eyebrow">MESA {tableNumber} · {diner.name.toUpperCase()}</span><h1>¿Qué vas a pedir?</h1><p>Elegí, personalizá y enviá. Todo queda asociado a tu nombre y a esta mesa.</p></div><div className="welcome-actions"><button className="llamar-mozo" onClick={() => setLlamarOpen(true)}>🔔 Llamar al mozo</button><button className="assistant-launch" onClick={() => setAssistantOpen(true)}>✦ Asistente del menú</button><button className="order-shortcut" onClick={() => navigate(`/mesa/${tableNumber}/pedido`)}><span>Mi pedido</span><strong>{myOrders.length}</strong></button></div></div><div className="categories">{categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="section-title"><h2>{category === "Todos" ? "Menú" : category}</h2><span>{visibleMenu.length} opciones</span></div><div className="menu-grid">{visibleMenu.map((item) => <article className="menu-card" key={item.id}><div className="dish-visual"><span>{item.name.slice(0, 1)}</span></div><div className="dish-copy"><div><span className="dish-category">{item.category}</span><h3>{item.name}</h3><p>{item.description}</p></div><div className="dish-action"><strong>{money.format(item.priceInCents / 100)}</strong>{cart[item.id] ? <div className="counter"><button onClick={() => change(item.id, -1)}>−</button><span>{cart[item.id]}</span><button onClick={() => change(item.id, 1)}>+</button></div> : <button onClick={() => change(item.id, 1)}>Agregar</button>}</div>{cart[item.id] ? <button className="edit-food" onClick={() => setEditingItemId(item.id)}>{notes[item.id] ? "✓ Personalizado" : "Editar / aclarar"}</button> : null}</div></article>)}</div></section><aside className="cart"><div className="cart-head"><div><span>Tu selección</span><h2>Pedido de {diner.name}</h2></div><b>{cartCount}</b></div>{cartCount ? <><div className="cart-lines">{menu.filter((item) => cart[item.id]).map((item) => <div className="cart-line" key={item.id}><div><span>{cart[item.id]}× {item.name}</span>{notes[item.id] && <small>{notes[item.id]}</small>}<button onClick={() => setEditingItemId(item.id)}>Editar</button></div><strong>{money.format(item.priceInCents * cart[item.id] / 100)}</strong><button className="quitar-linea" aria-label={`Quitar ${item.name} del pedido`} title="Quitar del pedido" onClick={() => quitarDelCarrito(item.id)}>×</button></div>)}</div><div className="total"><span>Total de este envío</span><strong>{money.format(cartTotal / 100)}</strong></div><button className="primary" disabled={session.status !== "OPEN"} onClick={() => void sendOrder()}>Confirmar pedido <span>→</span></button><small>Podés volver a pedir más adelante.</small></> : <div className="empty"><span>＋</span><h3>Tu pedido está vacío</h3><p>Agregá algo del menú para empezar.</p></div>}</aside></main>{editingItemId && <EditFoodDialog item={menu.find((item) => item.id === editingItemId)!} quantity={cart[editingItemId] ?? 1} note={notes[editingItemId] ?? ""} onClose={() => setEditingItemId(null)} onQuantity={(quantity) => setCart((current) => ({ ...current, [editingItemId]: quantity }))} onSave={(note) => { setNotes((current) => ({ ...current, [editingItemId]: note })); setEditingItemId(null); }} />}{assistantOpen && <MenuAssistant onClose={() => setAssistantOpen(false)} onAdd={(item) => { change(item.id, 1); setAssistantOpen(false); }} />}{llamarOpen && <LlamarMozoDialog sessionId={session.id} dinerId={diner.id} onClose={() => setLlamarOpen(false)} />}{cartCount > 0 && <button className="mobile-cart" onClick={() => document.querySelector(".cart")?.scrollIntoView({ behavior: "smooth" })}><span>Ver mi pedido · {cartCount}</span><strong>{money.format(cartTotal / 100)}</strong></button>}{error && <div className="toast error">{error}</div>}{toast && <div className="toast success">✓ {toast}</div>}</>;
}

function EditFoodDialog({ item, quantity, note, onClose, onQuantity, onSave }: { item: MenuItem; quantity: number; note: string; onClose: () => void; onQuantity: (quantity: number) => void; onSave: (note: string) => void }) {
  const [draft, setDraft] = useState(note);
  return <div className="modal-backdrop"><section className="food-dialog"><button className="close" onClick={onClose}>×</button><span className="eyebrow">PERSONALIZAR</span><h2>{item.name}</h2><p>{item.description}</p><div className="quantity-row"><span>Cantidad</span><div className="counter large"><button onClick={() => onQuantity(Math.max(1, quantity - 1))}>−</button><span>{quantity}</span><button onClick={() => onQuantity(Math.min(20, quantity + 1))}>+</button></div></div><label>Aclaraciones para cocina<textarea value={draft} maxLength={180} placeholder="Ej. sin cebolla, salsa aparte…" onChange={(event) => setDraft(event.target.value)} /></label><div className="quick-notes">{["Sin cebolla", "Sin sal", "Salsa aparte", "Bien cocido"].map((text) => <button key={text} onClick={() => setDraft((current) => current ? `${current}, ${text.toLowerCase()}` : text)}>{text}</button>)}</div><button className="primary full" onClick={() => onSave(draft)}>Guardar cambios</button></section></div>;
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
  return <div className="modal-backdrop"><section className="bill-dialog"><button className="close" onClick={onClose}>×</button>{!confirmed ? <><span className="eyebrow">CUENTA · MESA {tableNumber}</span><h2>¿Pedimos la cuenta?</h2><p>Al confirmar, nadie podrá agregar productos. Sólo se habilita cuando todo fue entregado.</p>{!canRequest && <div className="notice warn">Todavía hay pedidos sin entregar.</div>}<div className="dialog-actions"><button className="outline" onClick={onClose}>Seguir pidiendo</button><button className="primary" disabled={!canRequest || busy} onClick={() => void requestBill()}>Sí, pedir la cuenta</button></div></> : <><span className="eyebrow">WDK CLI CHECKOUT · SEPOLIA</span><h2>Cliente → negocio</h2><div className="pay-modes"><button className={mode === "INDIVIDUAL" ? "active" : ""} onClick={() => setMode("INDIVIDUAL")}>Pago lo mío<small>{money.format(personal / 100)}</small></button><button className={mode === "TABLE" ? "active" : ""} onClick={() => setMode("TABLE")}>Pago toda la mesa<small>{money.format((bill?.subtotalInCents ?? 0) / 100)}</small></button></div><label className="tip-label">Propina<div className="tips">{[0, 5, 10, 15].map((value) => <button className={tip === value ? "active" : ""} key={value} onClick={() => setTip(value)}>{value === 0 ? "Sin" : `${value}%`}</button>)}</div></label><div className="bill-total"><span>Total</span><strong>{money.format(total / 100)}</strong></div>{wallets && <div className="wallet-flow"><WalletMini title="Cliente" wallet={wallets.client} /><span className="wallet-arrow">→</span><WalletMini title="Negocio" wallet={wallets.business} /></div>}{preview && <div className="checkout-preview"><div><span>PREVIEW WDK CLI</span><strong>{preview.policyEvaluation.decision}</strong></div><p>{preview.preview.amount} USD₮ · dry-run · sin broadcast</p><small>{shortAddress(preview.preview.fromAddress)} → {shortAddress(preview.preview.toAddress)}</small></div>}{receipt && <div className="checkout-receipt"><strong>✓ Pago transmitido en Sepolia</strong><p>{receipt.amount} USD₮</p><small>{receipt.transactionHash ? `Tx: ${receipt.transactionHash}` : "WDK CLI no devolvió hash en el campo esperado; revisá la salida del CLI."}</small></div>}{message && <div className="notice">{message}</div>}<div className="dialog-actions triple"><button className="outline" disabled={busy} onClick={() => void loadWallets()}>Actualizar wallets</button><button className="outline" disabled={busy || Boolean(receipt)} onClick={() => void createPreview()}>1. Previsualizar con WDK</button><button className="primary" disabled={busy || !preview || Boolean(receipt)} onClick={() => void execute()}>2. Confirmar y enviar</button></div><p className="security-copy">Wallets de prueba únicamente. La seed y la contraseña nunca pasan por la web ni se guardan en el repositorio.</p></>}</section></div>;
}

function WalletMini({ title, wallet }: { title: string; wallet: WalletPair["client"] }) { return <div className="wallet-mini"><span>{title}</span><strong>{wallet.walletName}</strong><small>{shortAddress(wallet.address) || "Bloqueada / sin dirección"}</small><b>{wallet.balance ?? "—"} USD₮</b></div>; }

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
  return <main className="kitchen-page"><div className="kitchen-intro"><div><span className="eyebrow">PANEL INTERNO</span><h1>Cocina + caja</h1><p>Comandas y cobros WDK CLI en una sola demo.</p></div><div className="kitchen-stat"><strong>{orders.filter((order) => order.status !== "DELIVERED").length}</strong><span>activas</span></div></div><LlamadasPendientes llamadas={llamadas} onAtender={atenderLlamada} /><AgentePanel />{financials && <div className="finance-strip"><div><span>Ingresos cobrados</span><strong>{money.format(financials.businessRevenueInCents / 100)}</strong></div><div><span>Propinas</span><strong>{money.format(financials.tipsInCents / 100)}</strong></div><div><span>USD₮ recibido</span><strong>{financials.usdtReceived ?? "0"}</strong></div><div><span>Wallet negocio</span><strong>{wallets?.business.balance ?? "—"} USD₮</strong></div><small>{financials.profitReason}</small></div>}<div className="kitchen-filters">{(["ACTIVE", "RECEIVED", "PREPARING", "READY", "DELIVERED"] as const).map((item) => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item === "ACTIVE" ? "Activas" : statusLabel[item]}</button>)}</div>{error && <div className="notice warn">{error}</div>}{visible.length ? <div className="ticket-grid">{visible.map((order) => <article className="ticket" key={order.id}><div className="ticket-head"><div><span>MESA {order.tableNumber}</span><h2>{order.dinerName}</h2></div><div className="ticket-tiempo"><Cronometro desde={order.createdAt} hasta={order.updatedAt} desfasaje={desfasaje} detenido={order.status === "DELIVERED"} /><time>{new Date(order.createdAt).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}</time></div></div>{order.type === "ADDITIONAL" && <div className="additional">＋ PEDIDO ADICIONAL</div>}<ul>{order.items.map((item) => <li key={item.menuItemId}><strong>{item.quantity}×</strong><span>{item.name}{item.note && <small>{item.note}</small>}</span></li>)}</ul><div className="ticket-foot"><span className={`status ${order.status.toLowerCase()}`}>{statusLabel[order.status]}</span>{nextStatus[order.status] && <button onClick={() => void advance(order)}>Marcar {statusLabel[nextStatus[order.status]!].toLowerCase()} →</button>}</div></article>)}</div> : <div className="empty-order"><h3>No hay comandas en esta vista</h3><button className="primary" onClick={() => navigate("/mesa/12")}>Abrir mesa demo</button></div>}</main>;
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

    {estado?.politicas && <div className="agente-politicas">
      <span>tope/operacion <b>{estado.politicas.topePorOperacion} USDT</b></span>
      <span>tope/dia <b>{estado.politicas.topeDiario} USDT</b></span>
      <span>usado hoy <b>{estado.gastadoHoy} USDT</b></span>
      <span>solo a <b>{estado.politicas.destinatariosPermitidos.join(", ")}</b></span>
    </div>}

    {/* Es la pregunta que va a hacer cualquiera que mire esto: si el modelo se
        vuelve loco, cuanto puede mover. La respuesta va en pantalla. */}
    <p className="agente-alcance">
      El agente puede consultar saldos y <b>preparar</b> un cobro. No puede transmitirlo:
      <code>wdk send</code> no esta entre sus acciones. La confirmacion la das vos.
    </p>

    <form className="agente-ask" onSubmit={(e) => { e.preventDefault(); void preguntar(consulta); }}>
      <input value={consulta} maxLength={300} disabled={busy || !disponible}
        placeholder="cuanto tenemos en la caja?"
        onChange={(e) => setConsulta(e.target.value)} />
      <button className="primary" type="submit" disabled={busy || !disponible || !consulta.trim()}>Preguntar</button>
    </form>

    <div className="agente-sugeridas">
      {["¿cuánto tenemos en la caja?", "¿cuál es la dirección del local?", "cobrale 12 USDT a la mesa", "cobrale 500 USDT a la mesa"].map((q) =>
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

function StateCard({ title, text }: { title: string; text: string }) { return <main className="state-wrap"><section><span className="brand-mark">M</span><h1>{title}</h1><p>{text}</p></section></main>; }
function shortAddress(value: string) { return value ? `${value.slice(0, 6)}…${value.slice(-4)}` : ""; }
function messageOf(cause: unknown) { return cause instanceof Error ? cause.message : "Ocurrió un error inesperado."; }
