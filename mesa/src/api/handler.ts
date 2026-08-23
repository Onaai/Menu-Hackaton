import type { IncomingMessage, ServerResponse } from "node:http";
import type { HackathonExtensionsService } from "../application/hackathon-extensions-service.js";
import type { RestaurantService } from "../application/restaurant-service.js";
import { DomainError } from "../domain/errors.js";
import type { OrderStatus } from "../domain/model.js";
import { tryQvacMenuAssistant } from "../infrastructure/qvac-menu-assistant.js";
import type { AsistenteQvacSdk } from "../infrastructure/qvac-sdk-assistant.js";
import type { AgenteCaja } from "../application/agente-caja.js";

const orderStatuses = new Set<OrderStatus>(["RECEIVED", "PREPARING", "READY", "DELIVERED"]);

export function createApiHandler(
  service: RestaurantService,
  extensions?: HackathonExtensionsService,
  asistente?: AsistenteQvacSdk | null,
  agente?: AgenteCaja | null,
) {
  return async (request: IncomingMessage, response: ServerResponse) => {
    try {
      const method = request.method ?? "GET";
      const url = new URL(request.url ?? "/", "http://localhost");
      const parts = url.pathname.split("/").filter(Boolean);

      if (method === "GET" && url.pathname === "/health") return json(response, 200, { status: "ok" });
      if (method === "GET" && url.pathname === "/api/menu") return json(response, 200, { items: await service.listMenu() });
      // ── El agente de caja ───────────────────────────────────────────
      // El encargado escribe en castellano y un modelo local decide que
      // herramienta de WDK CLI usar. Devuelve la traza completa: que penso,
      // que herramienta llamo, que le contesto, y si alguna politica lo freno.
      // Sin la traza esto seria una caja negra que mueve plata.
      if (method === "GET" && url.pathname === "/api/agente") {
        return json(response, 200, agente ? agente.estado() : { disponible: false, motivo: "el modelo local no esta cargado" });
      }
      if (method === "POST" && url.pathname === "/api/agente") {
        if (!agente) throw new DomainError("INVALID_STATE", "El agente necesita el modelo local. Fijate GET /api/qvac.");
        const body = await readJson<{ consulta: string }>(request);
        const consulta = (body.consulta ?? "").trim();
        if (!consulta || consulta.length > 300) throw new DomainError("VALIDATION_ERROR", "La consulta debe tener entre 1 y 300 caracteres.");
        return json(response, 200, await agente.atender(consulta));
      }

      if (method === "GET" && url.pathname === "/api/qvac") {
        // Estado del modelo local: cual es, con que cuantizacion, y como salio
        // la ultima corrida. Todo lo reporta el SDK; no hay un dato a mano.
        return json(response, 200, asistente ? asistente.estado() : { modo: "apagado", cargado: false });
      }
      if (method === "POST" && url.pathname === "/api/menu/assistant") {
        requireExtensions(extensions);
        const body = await readJson<{ question: string; restricciones?: string[] }>(request);
        const restricciones = Array.isArray(body.restricciones)
          ? body.restricciones.filter((r): r is string => typeof r === "string").slice(0, 4)
          : [];

        // El motor determinista corre SIEMPRE y primero. No es solo un plan B:
        // es la respuesta que se muestra si el modelo no esta o no produce algo
        // usable, y se etiqueta distinto en pantalla. Un plan B disfrazado de
        // IA seria mentirle al jurado.
        const grounded = await extensions.askMenuAssistant(body.question);

        // Al modelo se le ofrece la carta ENTERA disponible, no las 3 que ya
        // eligieron las reglas. Si no, el modelo es un reordenador de tres
        // items y no esta haciendo trabajo real.
        if (asistente) {
          const carta = await service.listMenu();
          const elegido = await asistente.sugerir(body.question, carta, restricciones);
          if (elegido) {
            return json(response, 200, {
              engine: elegido.engine,
              title: grounded.title,
              message: `Te recomiendo ${elegido.items.map((item) => item.name).join(", ")}.`,
              items: elegido.items,
              motivos: elegido.motivos,
              descartadas: elegido.descartadas,
              note: `Elegido localmente por ${elegido.modelo} (${elegido.cuantizacion}) en ${elegido.latenciaMs} ms. La gramatica del esquema le impide nombrar un plato que no este en la carta.`,
            });
          }
        }

        const qvac = await tryQvacMenuAssistant(body.question, grounded);
        return json(response, 200, qvac ?? grounded);
      }
      if (method === "GET" && url.pathname === "/api/wdk/wallets") {
        requireExtensions(extensions);
        return json(response, 200, await extensions.getWallets());
      }
      if (method === "GET" && url.pathname === "/api/wdk/financials") {
        requireExtensions(extensions);
        return json(response, 200, await extensions.getFinancialSummary());
      }
      if (method === "POST" && url.pathname === "/api/tables") {
        const body = await readJson<{ tableNumber: number }>(request);
        return json(response, 201, await service.openTable(body.tableNumber));
      }
      if (parts[0] === "api" && parts[1] === "tables" && parts[2]) {
        if (method === "GET" && parts[2] === "by-number" && parts[3]) return json(response, 200, await service.getActiveTableByNumber(Number(parts[3])));
        const sessionId = parts[2];
        if (method === "GET" && parts.length === 3) return json(response, 200, await service.getTable(sessionId));
        if (method === "POST" && parts[3] === "diners") {
          const body = await readJson<{ name: string }>(request);
          return json(response, 201, await service.joinTable(sessionId, body.name));
        }
        if (method === "POST" && parts[3] === "orders" && parts.length === 4) {
          const body = await readJson<Parameters<RestaurantService["placeOrder"]>[1]>(request);
          return json(response, 201, await service.placeOrder(sessionId, body));
        }
        if (method === "POST" && parts[3] === "orders" && parts[4] && parts[5] === "items" && parts[6] && parts[7] === "remove") {
          requireExtensions(extensions);
          const body = await readJson<{ dinerId: string }>(request);
          return json(response, 200, await extensions.removeOrderItem(sessionId, parts[4], body.dinerId, parts[6]));
        }
        // La mas especifica primero: /llamadas/:id/atender tambien tiene
        // parts[3] === "llamadas", asi que si la creacion va antes sin mirar el
        // largo, se come la ruta de atender y nunca se llega.
        if (method === "POST" && parts[3] === "llamadas" && parts[4] && parts[5] === "atender") {
          return json(response, 200, await service.atenderLlamada(sessionId, parts[4]));
        }
        if (method === "POST" && parts[3] === "llamadas" && parts.length === 4) {
          const body = await readJson<{ dinerId: string; motivo: string }>(request);
          return json(response, 201, await service.llamarAlMozo(sessionId, body.dinerId, body.motivo));
        }
        if (method === "POST" && parts[3] === "bill" && parts[4] === "request") {
          const body = await readJson<{ confirmed: boolean }>(request);
          return json(response, 200, await service.requestBill(sessionId, body.confirmed));
        }
        if (method === "POST" && parts[3] === "bill" && parts[4] === "reopen") return json(response, 200, await service.reopenTable(sessionId));
        if (method === "GET" && parts[3] === "bill") {
          const tipPercent = Number(url.searchParams.get("tipPercent") ?? 0);
          return json(response, 200, await service.getBill(sessionId, tipPercent));
        }
        if (method === "POST" && parts[3] === "payments" && parts[4] === "simulated") {
          const body = await readJson<Parameters<RestaurantService["paySimulated"]>[1]>(request);
          return json(response, 201, await service.paySimulated(sessionId, body));
        }
        if (method === "POST" && parts[3] === "payments" && parts[4] === "evaluate") {
          const body = await readJson<Parameters<RestaurantService["evaluatePayment"]>[1]>(request);
          return json(response, 200, await service.evaluatePayment(sessionId, body));
        }
        if (method === "POST" && parts[3] === "payments" && parts[4] === "wdk" && parts[5] === "preview") {
          requireExtensions(extensions);
          const body = await readJson<Parameters<HackathonExtensionsService["previewPayment"]>[1]>(request);
          return json(response, 200, await extensions.previewPayment(sessionId, body));
        }
        if (method === "POST" && parts[3] === "payments" && parts[4] === "wdk" && parts[5] === "execute") {
          requireExtensions(extensions);
          const body = await readJson<Parameters<HackathonExtensionsService["executePayment"]>[1]>(request);
          return json(response, 201, await extensions.executePayment(sessionId, body));
        }
      }
      if (method === "GET" && url.pathname === "/api/kitchen/orders") {
        const rawStatus = url.searchParams.get("status");
        const status = rawStatus && orderStatuses.has(rawStatus as OrderStatus) ? rawStatus as OrderStatus : undefined;
        if (rawStatus && !status) throw new DomainError("VALIDATION_ERROR", "El estado de comanda no es válido.");
        // `ahora` viaja con las comandas para el cronometro de la pantalla.
        //
        // Sin esto el navegador calcularia el tiempo transcurrido con SU reloj
        // contra un createdAt del servidor, y una tablet de cocina desfasada
        // dos minutos mostraria dos minutos de mas en cada comanda. Con el
        // ahora del servidor, el navegador calcula el desfasaje una vez y todas
        // las pantallas muestran lo mismo.
        return json(response, 200, {
          orders: await service.listKitchenOrders(status),
          ahora: new Date().toISOString(),
          llamadas: await service.listarLlamadasPendientes(),
        });
      }
      if (method === "PATCH" && parts[0] === "api" && parts[1] === "kitchen" && parts[2] === "orders" && parts[3] && parts[4] === "status") {
        const body = await readJson<{ status: OrderStatus }>(request);
        if (!orderStatuses.has(body.status)) throw new DomainError("VALIDATION_ERROR", "El estado de comanda no es válido.");
        return json(response, 200, await service.updateOrderStatus(parts[3], body.status));
      }
      return json(response, 404, { error: { code: "NOT_FOUND", message: "Ruta inexistente." } });
    } catch (error) {
      if (error instanceof DomainError) return json(response, errorStatus(error), { error: { code: error.code, message: error.message } });
      if (error instanceof SyntaxError) return json(response, 400, { error: { code: "VALIDATION_ERROR", message: "El cuerpo JSON no es válido." } });
      console.error(error);
      return json(response, 500, { error: { code: "INTERNAL_ERROR", message: error instanceof Error ? error.message : "Ocurrió un error inesperado." } });
    }
  };
}

function requireExtensions(extensions: HackathonExtensionsService | undefined): asserts extensions is HackathonExtensionsService {
  if (!extensions) throw new DomainError("INVALID_STATE", "Las extensiones del hackathon no están configuradas.");
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
