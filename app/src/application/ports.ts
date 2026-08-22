import type { MenuItem, TableSession } from "../domain/model.js";
import type { Transfer, Wallet } from "../domain/wallet.js";

export interface SessionRepository {
  getById(id: string): Promise<TableSession | null>;
  list(): Promise<TableSession[]>;
  save(session: TableSession): Promise<void>;
}

export interface MenuCatalog {
  getById(id: string): Promise<MenuItem | null>;
  list(): Promise<MenuItem[]>;
  /** La cocina marca un producto sin stock y desaparece de la carta de todos. */
  setAvailability(id: string, available: boolean): Promise<MenuItem>;
}

export interface Clock {
  now(): Date;
}

export interface IdGenerator {
  next(prefix: string): string;
}

/**
 * El libro de billeteras.
 *
 * Esta interfaz es la frontera entre "pagos simulados" y "pagos de verdad".
 * Hoy la implementa `InMemoryWalletLedger`. El día que se enchufe WDK, se
 * escribe un `WdkWalletLedger` que hable con `wdk-mcp` (`get_address`,
 * `get_balance`, `send_token`) y **no se toca ni una línea del resto del
 * sistema**. Por eso `transfer` tiene `dryRun`: porque `send_token` lo tiene.
 */
export interface WalletLedger {
  list(): Promise<Wallet[]>;
  getById(id: string): Promise<Wallet | null>;
  create(input: { label: string; kind: Wallet["kind"]; initialBalanceInCents: number }): Promise<Wallet>;
  /** Carga saldo de la nada. Solo existe en la simulación — es el "faucet". */
  fund(walletId: string, amountInCents: number): Promise<Wallet>;
  transfer(input: {
    fromWalletId: string;
    toWalletId: string;
    amountInCents: number;
    concept: string;
    dryRun: boolean;
  }): Promise<Transfer>;
  history(walletId?: string): Promise<Transfer[]>;
}
