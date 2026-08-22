import { randomUUID } from "node:crypto";
import type { Clock, IdGenerator, WalletLedger } from "../application/ports.js";
import { assertDomain } from "../domain/errors.js";
import { assertPositiveAmount, calculateFee, type Transfer, type Wallet } from "../domain/wallet.js";

/**
 * Libro de billeteras en memoria.
 *
 * Reglas que se respetan porque si no la demo miente:
 *
 *   · No se puede gastar lo que no hay. Saldo insuficiente es un error, no un
 *     saldo negativo.
 *   · La comisión la paga quien envía, en el mismo activo. El destinatario
 *     recibe el importe completo.
 *   · `dryRun: true` NO toca ningún saldo. Devuelve el movimiento con estado
 *     PREVIEW y los saldos que quedarían. Es la vista previa del botón.
 *   · Las transferencias quedan registradas en orden. El historial es la
 *     evidencia de la demo.
 */
export class InMemoryWalletLedger implements WalletLedger {
  private readonly wallets = new Map<string, Wallet>();
  private readonly transfers: Transfer[] = [];

  constructor(
    private readonly clock: Clock,
    private readonly ids: IdGenerator,
  ) {}

  async list(): Promise<Wallet[]> {
    return [...this.wallets.values()].map((w) => structuredClone(w));
  }

  async getById(id: string): Promise<Wallet | null> {
    const wallet = this.wallets.get(id);
    return wallet ? structuredClone(wallet) : null;
  }

  async create(input: {
    label: string;
    kind: Wallet["kind"];
    initialBalanceInCents: number;
  }): Promise<Wallet> {
    const label = input.label.trim();
    assertDomain(label.length >= 2 && label.length <= 40, "VALIDATION_ERROR", "El nombre de la billetera debe tener entre 2 y 40 caracteres.");
    assertDomain(
      Number.isInteger(input.initialBalanceInCents) && input.initialBalanceInCents >= 0,
      "VALIDATION_ERROR",
      "El saldo inicial debe ser un entero mayor o igual a cero.",
    );

    const wallet: Wallet = {
      id: this.ids.next("wallet"),
      label,
      kind: input.kind,
      address: fakeAddress(),
      balanceInCents: input.initialBalanceInCents,
      createdAt: this.clock.now().toISOString(),
    };
    this.wallets.set(wallet.id, wallet);
    return structuredClone(wallet);
  }

  async fund(walletId: string, amountInCents: number): Promise<Wallet> {
    assertPositiveAmount(amountInCents);
    const wallet = this.wallets.get(walletId);
    assertDomain(wallet, "NOT_FOUND", "No existe esa billetera.");
    wallet.balanceInCents += amountInCents;
    return structuredClone(wallet);
  }

  async transfer(input: {
    fromWalletId: string;
    toWalletId: string;
    amountInCents: number;
    concept: string;
    dryRun: boolean;
  }): Promise<Transfer> {
    assertPositiveAmount(input.amountInCents);
    assertDomain(input.fromWalletId !== input.toWalletId, "VALIDATION_ERROR", "No se puede transferir a la misma billetera.");

    const from = this.wallets.get(input.fromWalletId);
    assertDomain(from, "NOT_FOUND", "No existe la billetera de origen.");
    const to = this.wallets.get(input.toWalletId);
    assertDomain(to, "NOT_FOUND", "No existe la billetera de destino.");

    const feeInCents = calculateFee(input.amountInCents);
    const debitedInCents = input.amountInCents + feeInCents;

    assertDomain(
      from.balanceInCents >= debitedInCents,
      "CONFLICT",
      `Saldo insuficiente en ${from.label}: hacen falta ${(debitedInCents / 100).toFixed(2)} USDT y hay ${(from.balanceInCents / 100).toFixed(2)} USDT.`,
    );

    const transfer: Transfer = {
      id: this.ids.next("tx"),
      fromWalletId: from.id,
      toWalletId: to.id,
      amountInCents: input.amountInCents,
      feeInCents,
      debitedInCents,
      concept: input.concept.slice(0, 120),
      status: input.dryRun ? "PREVIEW" : "CONFIRMED",
      createdAt: this.clock.now().toISOString(),
      balancesAfter: {
        from: from.balanceInCents - debitedInCents,
        to: to.balanceInCents + input.amountInCents,
      },
    };

    // Vista previa: se calcula todo y no se toca nada.
    if (input.dryRun) return structuredClone(transfer);

    from.balanceInCents -= debitedInCents;
    to.balanceInCents += input.amountInCents;
    this.transfers.push(structuredClone(transfer));
    return structuredClone(transfer);
  }

  async history(walletId?: string): Promise<Transfer[]> {
    const all = this.transfers.map((t) => structuredClone(t));
    if (!walletId) return all.reverse();
    return all.filter((t) => t.fromWalletId === walletId || t.toWalletId === walletId).reverse();
  }
}

/** Dirección de fantasía con forma de dirección EVM. No deriva de ninguna clave. */
function fakeAddress(): string {
  return `0x${randomUUID().replace(/-/g, "")}${randomUUID().replace(/-/g, "").slice(0, 8)}`.slice(0, 42);
}
