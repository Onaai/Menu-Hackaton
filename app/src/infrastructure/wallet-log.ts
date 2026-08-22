import type { WalletLedger } from "../application/ports.js";
import { DomainError } from "../domain/errors.js";
import { calculateFee, type Transfer, type Wallet } from "../domain/wallet.js";
import { imprimirPago } from "./consola.js";

/**
 * Envuelve cualquier `WalletLedger` y escribe cada movimiento en la terminal.
 *
 * Es un decorador y no un `console.log` metido adentro del ledger, por dos
 * razones. La primera: el ledger simulado y el adaptador real de WDK son
 * intercambiables, y el log tiene que andar con los dos sin duplicar código.
 * La segunda: si mañana el log molesta —por ejemplo corriendo los tests— se
 * saca envolviendo una capa menos, sin tocar la lógica de plata.
 *
 * Imprime las tres cosas: la vista previa, la confirmación, y **también el
 * rechazo**. El rechazo es el que más vale para el video: se ve que el sistema
 * frena por saldo insuficiente en vez de dejar un saldo negativo.
 */
export class LedgerConLog implements WalletLedger {
  constructor(
    private readonly interno: WalletLedger,
    private readonly red: string,
    private readonly token: string,
  ) {}

  list(): Promise<Wallet[]> {
    return this.interno.list();
  }
  getById(id: string): Promise<Wallet | null> {
    return this.interno.getById(id);
  }
  create(input: Parameters<WalletLedger["create"]>[0]): Promise<Wallet> {
    return this.interno.create(input);
  }
  fund(walletId: string, amountInCents: number): Promise<Wallet> {
    return this.interno.fund(walletId, amountInCents);
  }
  history(walletId?: string): Promise<Transfer[]> {
    return this.interno.history(walletId);
  }

  async transfer(input: Parameters<WalletLedger["transfer"]>[0]): Promise<Transfer> {
    // Los saldos se leen ANTES de mover nada: es lo que permite imprimir el
    // "antes → después" con el valor real de partida y no con el ya cambiado.
    const origen = await this.interno.getById(input.fromWalletId);
    const destino = await this.interno.getById(input.toWalletId);

    try {
      const transfer = await this.interno.transfer(input);
      if (origen && destino) {
        imprimirPago({
          fase: transfer.status === "PREVIEW" ? "PREVIEW" : "CONFIRMED",
          transfer,
          origen,
          destino,
          red: this.red,
          token: this.token,
        });
      }
      return transfer;
    } catch (error) {
      if (origen && destino && error instanceof DomainError) {
        // La comisión se recalcula acá aunque la transferencia no exista: si
        // el log dijera 0, el débito total no coincidiría con el importe que
        // el propio mensaje de error dice que faltaba, y quien mira la
        // terminal pensaría que el sistema se contradice.
        const feeInCents = calculateFee(input.amountInCents);
        imprimirPago({
          fase: "RECHAZADO",
          transfer: {
            id: "—",
            fromWalletId: input.fromWalletId,
            toWalletId: input.toWalletId,
            amountInCents: input.amountInCents,
            feeInCents,
            debitedInCents: input.amountInCents + feeInCents,
            concept: input.concept,
            status: "REJECTED",
            createdAt: new Date().toISOString(),
          },
          origen,
          destino,
          motivoRechazo: error.message,
          red: this.red,
          token: this.token,
        });
      }
      throw error;
    }
  }
}
