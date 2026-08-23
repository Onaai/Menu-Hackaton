import type { HerramientasCaja } from "../application/agente-caja.js";
import type { ResultadoHerramienta } from "../application/agente-puertos.js";
import type { CheckoutWalletGateway } from "../application/checkout-wallet.js";
import type { HackathonExtensionsService } from "../application/hackathon-extensions-service.js";
import type { SessionRepository } from "../application/ports.js";

/**
 * Las herramientas del agente, cableadas contra WDK CLI de verdad.
 *
 * No hay un `wdk` nuevo acá: se reusa `WdkCliCheckoutGateway`, que ya hace
 * `spawn` del binario, parsea `--json`, valida nombres de wallet y guarda los
 * previews de un solo uso atados al monto. El agente es un cliente más de esa
 * puerta, exactamente igual que el botón de cobrar de la interfaz.
 *
 * Eso importa para el track: el camino que recorre el agente es EL MISMO que
 * recorre una persona. No hay un atajo para el modelo ni una versión relajada
 * de las validaciones "porque es una demo".
 *
 * LO QUE NO ESTÁ ACÁ, Y ES A PROPÓSITO
 * ────────────────────────────────────
 * `execute()` —el `wdk send` que transmite— existe en el gateway y **no se
 * expone como herramienta**. El agente llega hasta `preview()` y ahí termina.
 * Si mañana alguien agrega `transmitir` al enum de acciones, tiene que
 * agregarlo también acá, y este comentario está para que esa decisión sea
 * consciente y no un descuido.
 */
export class HerramientasWdkCli implements HerramientasCaja {
  constructor(
    private readonly gateway: CheckoutWalletGateway,
    private readonly arsPerUsdt: number,
    /** Para el corte del dia y el estado de las mesas. */
    private readonly extensions: HackathonExtensionsService,
    private readonly sessions: SessionRepository,
    /** Nombre de la allowlist -> rol real de la wallet. */
    private readonly destinos: Record<string, "client" | "business"> = { caja: "business" },
  ) {}

  /**
   * El corte del dia, en una linea que el modelo pueda leer y repetir.
   *
   * Se le da MASTICADO y no como JSON: un 4B con un objeto anidado adelante
   * tiende a inventarse campos que no existen. Con una oracion armada en
   * codigo, lo unico que tiene que hacer es elegir el numero que le
   * preguntaron.
   */
  async verCaja(): Promise<ResultadoHerramienta> {
    try {
      const f = await this.extensions.getFinancialSummary();
      const pesos = (centavos: number) => "$" + (centavos / 100).toLocaleString("es-AR");
      const m = f.porMetodo;
      const texto = [
        `cobrado hoy ${pesos(f.clientExpensesInCents)} en ${m.wallet.cantidad + m.efectivo.cantidad + m.mercadoPago.cantidad} pagos`,
        `ingresos ${pesos(f.businessRevenueInCents)}`,
        `propinas ${pesos(f.tipsInCents)}`,
        `billetera ${m.wallet.cantidad} pagos ${pesos(m.wallet.totalInCents)} (${f.usdtReceived ?? "0"} USDT)`,
        `efectivo ${m.efectivo.cantidad} pagos ${pesos(m.efectivo.totalInCents)}`,
        `Mercado Pago ${m.mercadoPago.cantidad} pagos ${pesos(m.mercadoPago.totalInCents)}`,
        `en el cajon tiene que haber ${pesos(m.efectivo.enElCajon)}`,
      ].join(" · ");
      return { ok: true, texto, datos: f };
    } catch (error) {
      return { ok: false, texto: mensajeDe(error) };
    }
  }

  /** Que mesas siguen abiertas y quien no pago. */
  async verMesas(): Promise<ResultadoHerramienta> {
    try {
      const todas = await this.sessions.list();
      const abiertas = todas.filter((s) => s.status !== "CLOSED");
      if (abiertas.length === 0) return { ok: true, texto: "no hay mesas abiertas: esta todo cobrado" };

      const detalle = abiertas.map((s) => {
        const pagaron = new Set(s.payments.filter((p) => p.mode === "INDIVIDUAL" && p.dinerId).map((p) => p.dinerId));
        const deben = s.diners.filter((d) => !pagaron.has(d.id)).length;
        const estado = s.status === "BILL_REQUESTED" ? "cuenta pedida" : "pidiendo";
        return `mesa ${s.tableNumber}: ${s.diners.length} comensales, ${deben} sin pagar, ${estado}`;
      }).join(" · ");
      return { ok: true, texto: `${abiertas.length} mesas abiertas · ${detalle}` };
    } catch (error) {
      return { ok: false, texto: mensajeDe(error) };
    }
  }

  async verSaldo(wallet: string): Promise<ResultadoHerramienta> {
    try {
      const pair = await this.gateway.getWallets();
      const perfil = wallet === "caja" ? pair.business : pair.client;
      if (perfil.unlocked === false) {
        // Se dice cuál es el problema y cómo se arregla. El modelo va a
        // repetirle esto al encargado, así que tiene que ser accionable.
        return { ok: false, texto: `la billetera ${perfil.walletName} está bloqueada. Hay que desbloquearla con wdk wallet unlock.` };
      }
      if (perfil.balance === null) {
        return { ok: false, texto: `WDK CLI no devolvió saldo para ${perfil.walletName}.` };
      }
      return { ok: true, texto: `${perfil.balance} USDT en ${perfil.walletName} (red sepolia)`, datos: perfil };
    } catch (error) {
      return { ok: false, texto: mensajeDe(error) };
    }
  }

  async verDireccion(wallet: string): Promise<ResultadoHerramienta> {
    try {
      const pair = await this.gateway.getWallets();
      const perfil = wallet === "caja" ? pair.business : pair.client;
      if (!perfil.address) return { ok: false, texto: `WDK CLI no devolvió dirección para ${perfil.walletName}.` };
      return { ok: true, texto: `${perfil.address} (${perfil.walletName}, sepolia)`, datos: perfil };
    } catch (error) {
      return { ok: false, texto: mensajeDe(error) };
    }
  }

  async cotizarCobro(montoUsdt: number, destinatario: string): Promise<ResultadoHerramienta> {
    // Doble llave: el agente ya chequeó la allowlist con sus políticas, y acá
    // se vuelve a chequear contra el mapa de destinos reales. Si un nombre no
    // tiene wallet detrás, no hay a dónde cobrar.
    if (!this.destinos[destinatario]) {
      return { ok: false, texto: `"${destinatario}" no tiene una billetera asociada en este local.` };
    }
    try {
      // El gateway trabaja en centavos de peso; el agente razona en USDT.
      const totalInCents = Math.round(montoUsdt * this.arsPerUsdt * 100);
      const preview = await this.gateway.preview(totalInCents);
      return {
        ok: true,
        texto: `vista previa lista: ${preview.amount} USDT de ${preview.fromWallet} a ${preview.toWallet} (${preview.toAddress}). NO se transmitió: falta que una persona confirme.`,
        datos: preview,
      };
    } catch (error) {
      return { ok: false, texto: mensajeDe(error) };
    }
  }
}

function mensajeDe(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
