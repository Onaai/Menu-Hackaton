import type { HerramientasCaja } from "../application/agente-caja.js";
import type { ResultadoHerramienta } from "../application/agente-puertos.js";
import type { CheckoutWalletGateway } from "../application/checkout-wallet.js";

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
    /** Nombre de la allowlist -> rol real de la wallet. */
    private readonly destinos: Record<string, "client" | "business"> = { caja: "business" },
  ) {}

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
