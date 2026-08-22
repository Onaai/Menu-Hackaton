import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type { WalletLedger } from "../application/ports.js";
import { DomainError } from "../domain/errors.js";
import type { Transfer, Wallet } from "../domain/wallet.js";

const ejecutar = promisify(execFile);

/**
 * Adaptador REAL contra la CLI de WDK. ⚠️ INCOMPLETO A PROPÓSITO.
 *
 * QUÉ ES ESTE ARCHIVO
 * ───────────────────
 * Es la prueba de que la frontera está bien puesta: `WalletLedger` es una
 * interfaz, la simulación es un adaptador, y esto es el otro. Si mañana
 * quieren pagos de verdad, se cambia UNA línea en `index.ts` —cuál adaptador
 * se construye— y no se toca nada más del sistema.
 *
 * POR QUÉ NO ESTÁ TERMINADO, Y POR QUÉ ESO ES LO CORRECTO
 * ──────────────────────────────────────────────────────
 * Porque no pude verificar los nombres exactos de las banderas de `wdk send` y
 * `wdk get` contra la documentación: la red de esta sesión tiene bloqueado
 * `docs.wdk.tether.io`, y `@tetherto/wdk-cli` no está instalado acá.
 *
 * Escribir igual un adaptador "que anda", con banderas inventadas que suenan
 * bien, es exactamente lo que la consigna del track dice que descarta sin
 * revisar: *"hallucinated APIs, dead code, a README describing features that
 * aren't there"*. Así que las banderas están declaradas arriba, en un solo
 * lugar, con un cartel que dice qué hay que correr para confirmarlas.
 *
 * LO QUE SÍ ESTÁ VERIFICADO
 * ─────────────────────────
 * De leer el código de `@tetherto/wdk-cli@1.0.0-beta.2` (`src/mcp/server.js`)
 * en el repo `Onaai/Hackaton-2026`: el servidor MCP expone nueve herramientas,
 * y tres son las que usa este adaptador —`get_address`, `get_balance` y
 * `send_token`—. `send_token` tiene un parámetro `dryRun` que por defecto vale
 * `true`, y su descripción pide previsualizar antes de confirmar. Por eso la
 * interfaz `WalletLedger` tiene `dryRun`: no lo inventamos, lo copiamos.
 *
 * PARA COMPLETARLO (15 minutos, con la CLI instalada)
 * ──────────────────────────────────────────────────
 *   1. npm i @tetherto/wdk-cli          ← el paquete CON scope. El `wdk-cli`
 *                                          sin scope en npm es otro proyecto.
 *   2. wdk --help · wdk send --help · wdk get --help
 *   3. Ajustar COMANDOS de acá abajo con lo que digan esos --help.
 *   4. Correr `wdk send ... --dry-run --json` a mano una vez y pegar la salida
 *      real en `parsearSalida`, en vez de suponer la forma del JSON.
 *   5. Recién ahí cambiar la línea de `index.ts`.
 *
 * Y antes de todo eso, lo que dice la consigna del track y no es negociable:
 * **billetera de prueba con fondos limitados, nunca una personal con plata.**
 */

/** ⚠️ SIN VERIFICAR contra `wdk --help`. Ver el paso 2 de arriba. */
const COMANDOS = {
  binario: "wdk",
  direccion: (red: string) => ["get", "address", "--network", red, "--json"],
  saldo: (red: string, token: string) => ["get", "balance", "--network", red, "--token", token, "--json"],
  enviar: (red: string, token: string, a: string, montoDecimal: string, dryRun: boolean) => [
    "send", "--network", red, "--token", token, "--to", a, "--amount", montoDecimal,
    ...(dryRun ? ["--dry-run"] : []), "--json",
  ],
};

export interface ConfigWdk {
  red: string;
  token: string;
  /** Dirección de la caja del local: adonde cobra. */
  direccionNegocio: string;
}

export class WdkWalletLedger implements WalletLedger {
  constructor(private readonly config: ConfigWdk) {}

  private noImplementado(que: string): never {
    throw new DomainError(
      "CONFLICT",
      `WdkWalletLedger.${que} todavía no está implementado: faltan verificar las banderas de la CLI. ` +
        `Ver las instrucciones en src/infrastructure/wallet-wdk.ts.`,
    );
  }

  async list(): Promise<Wallet[]> {
    return this.noImplementado("list");
  }
  async getById(): Promise<Wallet | null> {
    return this.noImplementado("getById");
  }
  async create(): Promise<Wallet> {
    // No corresponde: con WDK la billetera la crea y la desbloquea la persona
    // con `wdk` en su máquina, y la clave nunca sale de ahí. Un servidor que
    // "crea billeteras" ajenas sería justo lo contrario de no-custodial.
    throw new DomainError("CONFLICT", "Con WDK real la billetera la crea la persona con la CLI, no el servidor.");
  }
  async fund(): Promise<Wallet> {
    throw new DomainError("CONFLICT", "No existe cargar saldo de la nada contra una red real. Usá un faucet de testnet.");
  }
  async transfer(): Promise<Transfer> {
    return this.noImplementado("transfer");
  }
  async history(): Promise<Transfer[]> {
    return this.noImplementado("history");
  }

  /**
   * Lo único que sí se puede dejar escrito sin adivinar: cómo se invoca la CLI
   * y cómo se lee su `--json`. El resto depende de las banderas.
   */
  protected async correr(argumentos: string[]): Promise<unknown> {
    try {
      const { stdout } = await ejecutar(COMANDOS.binario, argumentos, { timeout: 30_000 });
      return JSON.parse(stdout);
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : String(error);
      throw new DomainError("CONFLICT", `Falló la CLI de WDK: ${mensaje}`);
    }
  }
}

export { COMANDOS as COMANDOS_WDK_SIN_VERIFICAR };
