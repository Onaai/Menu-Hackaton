import type { MenuItem, TableSession } from "../domain/model.js";
import type { Cuenta, Preferencias, Sesion } from "../domain/usuario.js";
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
  /** El encargado edita la carta desde /admin.html. */
  upsert(item: MenuItem): Promise<MenuItem>;
  remove(id: string): Promise<void>;
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
 * Hoy la implementa `InMemoryWalletLedger`. El día que se enchufe WDK se
 * escribe un `WdkWalletLedger` que hable con `@tetherto/wdk-cli` (get_address,
 * get_balance, send_token) y **no se toca una línea del resto del sistema**.
 * Por eso `transfer` tiene `dryRun`: porque `send_token` lo tiene.
 *
 * Ver `infrastructure/wallet-wdk.ts` para el esqueleto de ese adaptador y qué
 * falta para completarlo.
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

// ── Cuentas ─────────────────────────────────────────────────────────────────

export interface RepositorioCuentas {
  crear(input: { tipo: Cuenta["tipo"]; proveedor: Cuenta["proveedor"]; nombre: string; email?: string; proveedorId?: string }): Promise<Cuenta>;
  porId(id: string): Promise<Cuenta | null>;
  porProveedor(proveedor: Cuenta["proveedor"], proveedorId: string): Promise<Cuenta | null>;
  guardar(cuenta: Cuenta): Promise<void>;
}

export interface RepositorioSesiones {
  crear(cuentaId: string): Promise<Sesion>;
  porToken(token: string): Promise<Sesion | null>;
  borrar(token: string): Promise<void>;
}

// ── Recomendaciones ─────────────────────────────────────────────────────────

export interface EntradaSugerencia {
  carta: MenuItem[];
  preferencias: Preferencias;
  nombre: string;
}

/** Lo que devuelve el motor, ANTES de validarlo contra la carta real. */
export interface CandidatoCrudo {
  id: string;
  motivo: string;
  formatoInvalido?: boolean;
}

export interface Recomendador {
  readonly nombre: "qvac-local" | "heuristico";
  disponible(): Promise<boolean>;
  sugerir(entrada: EntradaSugerencia): Promise<CandidatoCrudo[]>;
}
