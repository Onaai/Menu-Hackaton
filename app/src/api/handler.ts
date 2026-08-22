import type { IncomingMessage, ServerResponse } from "node:http";
import { DomainError } from "../domain/errors.js";
import type { LineStatus, OrderStatus } from "../domain/model.js";
import { ARS_PER_USDT } from "../config/cotizacion.js";
import type { RestaurantService } from "../application/restaurant-service.js";
import type { WalletLedger } from "../application/ports.js";
import { serveStatic } from "./static.js";

const orderStatuses = new Set<OrderStatus>(["RECEIVED", "PREPARING", "READY", "DELIVERED"]);
const lineStatuses = new Set<LineStatus>(["PENDING", "PREPARING", "READY", "DELIVERED", "CANCELLED"]);

export function createApiHandler(service: RestaurantService, wallets: WalletLedger, publicDir?: string) {
  return async (request: IncomingMessage, response: ServerResponse) => {
    try {
      const method = request.method ?? "GET";
      const url = new URL(request.url ?? "/", "http://localhost");
      const parts = url.pathname.split("/").filter(Boolean);

      if (method === "GET" && url.pathname === "/health") return json(response, 200, { status: "ok" });

      if (method === "GET" && url.pathname === "/api/config") {
        return json(response, 200, { arsPerUsdt: ARS_PER_USDT });
      }

      // ── Carta ──────────────────────────────────────────────────────────
      if (method === "GET" && url.pathname === "/api/menu") {
        return json(response, 200, { items: await service.listMenu() });
      }
      if (method === "PATCH" && parts[0] === "api" && parts[1] === "menu" && parts[2] && parts[3] === "availability") {
        const body = await readJson<{ available: boolean }>(request);
        if (typeof body.available !== "boolean") throw new DomainError("VALIDATION_ERROR", "Se espera { available: boolean }.");
        return json(response, 200, await service.setMenuAvailability(parts[2], body.available));
      }

      // ── Mesas ──────────────────────────────────────────────────────────
      if (method === "GET" && url.pathname === "/api/tables") {
        return json(response, 200, { sessions: await service.listTables() });
      }
      if (method === "POST" && url.pathname === "/api/tables") {
        const body = await readJson<{ tableNumber: number }>(request);
        return json(response, 201, await service.openTable(body.tableNumber));
      }
      if (parts[0] === "api" && parts[1] === "tables" && parts[2]) {
        const sessionId = parts[2];
        if (method === "GET" && parts.length === 3) return json(response, 200, await service.getTable(sessionId));
        if (method === "POST" && parts[3] === "diners") {
          const body = await readJson<{ name: string; walletId?: string }>(request);
          return json(response, 201, await service.joinTable(sessionId, body.name, body.walletId));
        }
        if (method === "POST" && parts[3] === "orders") {
          const body = await readJson<Parameters<RestaurantService["placeOrder"]>[1]>(request);
          return json(response, 201, await service.placeOrder(sessionId, body));
        }
        if (method === "POST" && parts[3] === "bill" && parts[4] === "request") {
          const body = await readJson<{ confirmed: boolean }>(request);
          return json(response, 200, await service.requestBill(sessionId, body.confirmed));
        }
        if (method === "POST" && parts[3] === "bill" && parts[4] === "reopen") {
          return json(response, 200, await service.reopenTable(sessionId));
        }
        if (method === "GET" && parts[3] === "bill") {
          const tipPercent = Number(url.searchParams.get("tipPercent") ?? 0);
          return json(response, 200, await service.getBill(sessionId, tipPercent));
        }
        if (method === "POST" && parts[3] === "payments" && parts[4] === "wallet") {
          const body = await readJson<Parameters<RestaurantService["payWithWallet"]>[1]>(request);
          const result = await service.payWithWallet(sessionId, body);
          return json(response, result.preview ? 200 : 201, result);
        }
      }

      // ── Cocina ─────────────────────────────────────────────────────────
      if (method === "GET" && url.pathname === "/api/kitchen/board") {
        return json(response, 200, await service.getKitchenBoard());
      }
      if (parts[0] === "api" && parts[1] === "kitchen" && parts[2] === "orders" && parts[3]) {
        const orderId = parts[3];
        if (parts[4] === "lines" && parts[5] !== undefined) {
          const lineIndex = Number(parts[5]);
          if (!Number.isInteger(lineIndex) || lineIndex < 0) throw new DomainError("VALIDATION_ERROR", "El índice de línea no es válido.");
          if (method === "PATCH" && parts.length === 6) {
            const body = await readJson<{ status: LineStatus }>(request);
            if (!lineStatuses.has(body.status)) throw new DomainError("VALIDATION_ERROR", "El estado de línea no es válido.");
            return json(response, 200, await service.advanceLine(orderId, lineIndex, body.status));
          }
          if (method === "POST" && parts[6] === "rollback") {
            return json(response, 200, await service.rollbackLine(orderId, lineIndex));
          }
          if (method === "DELETE" && parts.length === 6) {
            return json(response, 200, await service.cancelLine(orderId, lineIndex));
          }
        }
        if (method === "POST" && parts[4] === "rush") {
          const body = await readJson<{ rushed: boolean }>(request);
          return json(response, 200, await service.rushOrder(orderId, Boolean(body.rushed)));
        }
        if (method === "PATCH" && parts[4] === "status") {
          const body = await readJson<{ status: OrderStatus }>(request);
          if (!orderStatuses.has(body.status)) throw new DomainError("VALIDATION_ERROR", "El estado de comanda no es válido.");
          return json(response, 200, await service.updateOrderStatus(orderId, body.status));
        }
      }

      // ── Billeteras ─────────────────────────────────────────────────────
      if (method === "GET" && url.pathname === "/api/wallets") {
        return json(response, 200, { wallets: await wallets.list() });
      }
      if (method === "POST" && url.pathname === "/api/wallets") {
        const body = await readJson<{ label: string; kind?: "CLIENT" | "BUSINESS"; initialBalanceInCents?: number }>(request);
        return json(response, 201, await wallets.create({
          label: body.label,
          kind: body.kind ?? "CLIENT",
          initialBalanceInCents: body.initialBalanceInCents ?? 0,
        }));
      }
      if (method === "GET" && url.pathname === "/api/wallets/transfers") {
        const walletId = url.searchParams.get("walletId") ?? undefined;
        return json(response, 200, { transfers: await wallets.history(walletId) });
      }
      if (method === "POST" && url.pathname === "/api/wallets/transfer") {
        const body = await readJson<{
          fromWalletId: string; toWalletId: string; amountInCents: number; concept?: string; dryRun?: boolean;
        }>(request);
        const transfer = await wallets.transfer({
          fromWalletId: body.fromWalletId,
          toWalletId: body.toWalletId,
          amountInCents: body.amountInCents,
          concept: body.concept ?? "Transferencia manual",
          dryRun: body.dryRun ?? true,
        });
        return json(response, transfer.status === "PREVIEW" ? 200 : 201, transfer);
      }
      if (method === "POST" && parts[0] === "api" && parts[1] === "wallets" && parts[2] && parts[3] === "fund") {
        const body = await readJson<{ amountInCents: number }>(request);
        return json(response, 200, await wallets.fund(parts[2], body.amountInCents));
      }

      // ── Interfaz ───────────────────────────────────────────────────────
      if (method === "GET" && publicDir) {
        const served = await serveStatic(publicDir, url.pathname, response);
        if (served) return;
      }

      return json(response, 404, { error: { code: "NOT_FOUND", message: "Ruta inexistente." } });
    } catch (error) {
      if (error instanceof DomainError) return json(response, errorStatus(error), { error: { code: error.code, message: error.message } });
      if (error instanceof SyntaxError) return json(response, 400, { error: { code: "VALIDATION_ERROR", message: "El cuerpo JSON no es válido." } });
      console.error(error);
      return json(response, 500, { error: { code: "INTERNAL_ERROR", message: "Ocurrió un error inesperado." } });
    }
  };
}

async function readJson<T>(request: IncomingMessage): Promise<T> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > 1_000_000) throw new DomainError("VALIDATION_ERROR", "El cuerpo de la solicitud es demasiado grande.");
    chunks.push(buffer);
  }
  if (!chunks.length) throw new DomainError("VALIDATION_ERROR", "La solicitud requiere un cuerpo JSON.");
  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as T;
}

function json(response: ServerResponse, status: number, body: unknown) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

function errorStatus(error: DomainError) {
  if (error.code === "NOT_FOUND") return 404;
  if (error.code === "CONFLICT" || error.code === "INVALID_STATE") return 409;
  return 400;
}
