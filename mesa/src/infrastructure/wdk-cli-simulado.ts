import { createHash } from "node:crypto";
import type { CliRunner } from "./wdk-cli-checkout-gateway.js";

/**
 * Un WDK CLI de mentira, para poder demostrar el flujo sin fondear Sepolia.
 *
 * POR QUÉ EXISTE
 * ──────────────
 * Conseguir USD₮ de testnet y gas de Sepolia lleva su rato, y sin saldo el
 * checkout no se puede mostrar: el preview sale, el `send` falla, y la demo
 * queda a mitad de camino. Esto deja correr el recorrido completo —saldo,
 * dry-run, confirmación humana, transferencia, saldo actualizado— con la
 * lógica de la app intacta.
 *
 * QUÉ **NO** ES
 * ─────────────
 * No es un atajo para el track ni un camino alternativo escondido. Se activa
 * con `WDK_CLI_MODE=simulado` y **no es el valor por defecto**: si no ponés esa
 * variable, corre el binario `wdk` de verdad. Cuando está activo lo grita la
 * terminal al arrancar, `GET /api/config` lo devuelve, y la pantalla del
 * checkout muestra un cartel. Un pago simulado que se hace pasar por real es
 * exactamente lo que un jurado tiene que poder descartar de un vistazo, y por
 * eso se etiqueta en los tres lugares.
 *
 * CÓMO ESTÁ HECHO
 * ───────────────
 * Se enchufa en el `CliRunner` que `WdkCliCheckoutGateway` ya recibía por
 * constructor. O sea: **el gateway no sabe que esto existe**. Toda la lógica
 * —el preview de un solo uso, el vencimiento, el amarre al monto, el marcar
 * usado antes de transmitir— es la misma que corre contra el CLI real. Lo
 * único que cambia es de dónde salen los bytes del JSON.
 *
 * Las direcciones se derivan del nombre de la wallet con un hash, así que son
 * estables entre reinicios y distintas entre sí. No son direcciones válidas de
 * ninguna red y no pretenden serlo.
 */
export interface OpcionesSimulado {
  /** Saldo inicial de cada wallet, en USD₮. */
  saldos: Record<string, number>;
}

export function crearWdkCliSimulado(opciones: OpcionesSimulado): CliRunner {
  // El libro contable. Vive lo que vive el proceso, igual que los pedidos.
  const saldos = new Map<string, number>(Object.entries(opciones.saldos));
  let nonce = 0;

  const direccionDe = (wallet: string) =>
    "0x" + createHash("sha256").update(`mesa-abierta:${wallet}`).digest("hex").slice(0, 40);

  const saldoDe = (wallet: string) => saldos.get(wallet) ?? 0;

  const valorDe = (args: string[], bandera: string) => {
    const i = args.indexOf(bandera);
    return i >= 0 ? args[i + 1] ?? "" : "";
  };

  return async (args: string[]) => {
    const responder = (datos: unknown) => ({ stdout: JSON.stringify(datos), stderr: "" });

    if (args[0] === "wallet" && args[1] === "list") {
      return responder({
        wallets: [...saldos.keys()].map((name) => ({ name, unlocked: true, default: false })),
        count: saldos.size,
        simulado: true,
      });
    }

    if (args[0] === "get" && args[1] === "address") {
      const wallet = valorDe(args, "--wallet");
      return responder({ address: direccionDe(wallet), network: "sepolia", simulado: true });
    }

    if (args[0] === "get" && args[1] === "balance") {
      const wallet = valorDe(args, "--wallet");
      return responder({ amount: saldoDe(wallet).toFixed(6), token: "usdt", network: "sepolia", simulado: true });
    }

    if (args[0] === "send") {
      const wallet = valorDe(args, "--wallet");
      const to = valorDe(args, "--to");
      const monto = Number(valorDe(args, "--amount"));
      const dryRun = args.includes("--dry-run");

      if (!Number.isFinite(monto) || monto <= 0) {
        throw new Error("El monto a enviar no es válido.");
      }
      // Se chequea el saldo TAMBIÉN en el dry-run, igual que el CLI real: la
      // gracia del dry-run es enterarte antes de confirmar, no después.
      if (saldoDe(wallet) < monto) {
        throw new Error(`Saldo insuficiente en ${wallet}: tiene ${saldoDe(wallet).toFixed(2)} y quiere enviar ${monto.toFixed(2)} USDT.`);
      }

      if (dryRun) {
        return responder({
          dryRun: true, from: direccionDe(wallet), to, amount: monto.toFixed(6),
          token: "usdt", network: "sepolia",
          estimatedFee: "0.000042", feeToken: "ETH",
          simulado: true,
        });
      }

      // El destinatario se busca por dirección, que es lo único que el gateway
      // pasa. Si no es ninguna de las wallets conocidas, la plata sale igual:
      // así se comporta una transferencia de verdad.
      const destino = [...saldos.keys()].find((w) => direccionDe(w).toLowerCase() === to.toLowerCase());
      saldos.set(wallet, saldoDe(wallet) - monto);
      if (destino) saldos.set(destino, saldoDe(destino) + monto);

      nonce += 1;
      const hash = "0x" + createHash("sha256").update(`${wallet}:${to}:${monto}:${nonce}`).digest("hex");
      return responder({
        transactionHash: hash, from: direccionDe(wallet), to,
        amount: monto.toFixed(6), token: "usdt", network: "sepolia",
        status: "confirmed", simulado: true,
      });
    }

    if (args[0] === "--version") {
      return responder({ version: "simulado", simulado: true });
    }

    throw new Error(`El WDK CLI simulado no conoce el comando: ${args.join(" ")}`);
  };
}
