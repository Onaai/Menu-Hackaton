import type { IncomingMessage, ServerResponse } from "node:http";
import { DomainError } from "../domain/errors.js";
import type { LineStatus, OrderStatus } from "../domain/model.js";
import type { Cuenta } from "../domain/usuario.js";
import type { Restaurante } from "../domain/restaurante.js";
import type { MenuItem } from "../domain/model.js";
import { ARS_PER_USDT } from "../config/cotizacion.js";
import type { AuthService } from "../application/auth-service.js";
import type { RestaurantService } from "../application/restaurant-service.js";
import type { SugerenciasService } from "../application/sugerencias-service.js";
import type { WalletLedger } from "../application/ports.js";
import { apodoAnonimo } from "../infrastructure/cuentas.js";
import { borrarCookieSesion, COOKIE_SESION, leerCookies, ponerCookieSesion } from "./cookies.js";
import { OAuth } from "./oauth.js";
import { serveStatic } from "./static.js";

const orderStatuses = new Set<OrderStatus>(["RECEIVED", "PREPARING", "READY", "DELIVERED"]);
const lineStatuses = new Set<LineStatus>(["PENDING", "PREPARING", "READY", "DELIVERED", "CANCELLED"]);

export interface Dependencias {
  service: RestaurantService;
  wallets: WalletLedger;
  auth: AuthService;
  sugerencias: SugerenciasService;
  oauth: OAuth;
  publicDir?: string;
  /** true detrás de HTTPS. En localhost va false o la cookie se descarta. */
  cookieSegura: boolean;
  red: string;
  token: string;
  restaurante: Restaurante;
  wdk: { activo: boolean; onchain: boolean; paquete?: string };
  /** Estado detallado de WDK para la pantalla de billeteras. */
  estadoWdk?: () => unknown;
  /** Estado detallado de QVAC: modelo, cuantizacion y la ultima corrida. */
  estadoQvac?: () => unknown;
}

export function createApiHandler(deps: Dependencias) {
  const { service, wallets, auth, sugerencias, oauth, publicDir } = deps;

  return async (request: IncomingMessage, response: ServerResponse) => {
    try {
      const method = request.method ?? "GET";
      const url = new URL(request.url ?? "/", "http://localhost");
      const parts = url.pathname.split("/").filter(Boolean);

      if (method === "GET" && url.pathname === "/health") return json(response, 200, { status: "ok" });

      if (method === "GET" && url.pathname === "/api/config") {
        return json(response, 200, {
          arsPerUsdt: deps.restaurante.arsPorUsdt || ARS_PER_USDT,
          red: deps.red,
          token: deps.token,
          restaurante: deps.restaurante,
          wdk: deps.wdk,
          pagosReales: deps.wdk.onchain,
          googleConfigurado: oauth.googleConfigurado(),
          appleConfigurado: oauth.appleConfigurado(),
        });
      }

      // ── Todo lo que sigue tiene cuenta. Si no hay cookie, se crea anónima ──
      // Nadie se registra para pedir de comer: la cuenta anónima se arma sola
      // y la persona ni se entera.
      let cuenta: Cuenta | null = null;
      let sesionToken = "";
      const necesitaCuenta = url.pathname.startsWith("/api/");
      if (necesitaCuenta) {
        const cookies = leerCookies(request);
        const resuelto = await auth.resolver(cookies[COOKIE_SESION], apodoAnonimo);
        cuenta = resuelto.cuenta;
        sesionToken = resuelto.sesionToken;
        if (resuelto.nueva) ponerCookieSesion(response, sesionToken, deps.cookieSegura);
      }

      // ── Cuenta ──────────────────────────────────────────────────────────
      if (url.pathname === "/api/auth/yo" && method === "GET") {
        return json(response, 200, { cuenta: publico(cuenta!) });
      }
      if (url.pathname === "/api/auth/onboarding-visto" && method === "POST") {
        return json(response, 200, { cuenta: publico(await auth.marcarOnboardingVisto(cuenta!.id)) });
      }
      if (url.pathname === "/api/auth/preferencias" && method === "PATCH") {
        const body = await readJson<{ dietas?: string[]; evita?: string[]; ultimaMesa?: number }>(request);
        return json(response, 200, { cuenta: publico(await auth.actualizarPreferencias(cuenta!.id, body)) });
      }
      if (url.pathname === "/api/auth/salir" && method === "POST") {
        await auth.salir(sesionToken);
        borrarCookieSesion(response);
        return json(response, 200, { ok: true });
      }

      // Registro en modo demo: el proveedor real no está configurado, así que
      // la identidad la genera el servidor. La interfaz lo dice en pantalla.
      if (url.pathname === "/api/auth/registrar" && method === "POST") {
        const body = await readJson<{ nombre: string; proveedor?: "google" | "apple" | "demo" }>(request);
        if (!body.nombre?.trim()) throw new DomainError("VALIDATION_ERROR", "Hace falta un nombre.");
        const identidad = oauth.identidadDemo(body.nombre);
        const r = await auth.registrar(cuenta!.id, identidad);
        ponerCookieSesion(response, r.sesionToken, deps.cookieSegura);
        return json(response, 201, { cuenta: publico(r.cuenta), modo: "demo", proveedorPedido: body.proveedor ?? "demo" });
      }

      // OAuth real de Google. Solo si hay credenciales; si no, 409 con motivo.
      if (url.pathname === "/api/auth/google" && method === "GET") {
        const { url: destino } = oauth.comenzarGoogle();
        response.writeHead(302, { location: destino });
        return response.end();
      }
      if (url.pathname === "/api/auth/google/callback" && method === "GET") {
        const code = url.searchParams.get("code");
        const state = url.searchParams.get("state");
        if (!code || !state) throw new DomainError("VALIDATION_ERROR", "Faltan code o state.");
        const identidad = await oauth.terminarGoogle(code, state);
        const r = await auth.registrar(cuenta!.id, identidad);
        ponerCookieSesion(response, r.sesionToken, deps.cookieSegura);
        response.writeHead(302, { location: "/?bienvenida=1" });
        return response.end();
      }

      // ── Sugerencias con el modelo local ─────────────────────────────────
      if (url.pathname === "/api/sugerencias" && method === "GET") {
        return json(response, 200, await sugerencias.para(cuenta!.preferencias, cuenta!.nombre));
      }

      // ── Carta ───────────────────────────────────────────────────────────
      if (method === "GET" && url.pathname === "/api/menu") {
        return json(response, 200, { items: await service.listMenu() });
      }
      if (method === "PATCH" && parts[0] === "api" && parts[1] === "menu" && parts[2] && parts[3] === "availability") {
        const body = await readJson<{ available: boolean }>(request);
        if (typeof body.available !== "boolean") throw new DomainError("VALIDATION_ERROR", "Se espera { available: boolean }.");
        return json(response, 200, await service.setMenuAvailability(parts[2], body.available));
      }

      // ── Mesas ───────────────────────────────────────────────────────────
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
          const orden = await service.placeOrder(sessionId, body);
          // Lo que la persona acaba de pedir entra a su historial. Es toda la
          // memoria que guardamos, y es lo que después come el modelo local.
          await auth.registrarConsumo(cuenta!.id, orden.items.map((i) => i.menuItemId));
          const mesa = await service.getTable(sessionId);
          await auth.actualizarPreferencias(cuenta!.id, { ultimaMesa: mesa.tableNumber });
          return json(response, 201, orden);
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
        if (method === "POST" && parts[3] === "payments") {
          const body = await readJson<Parameters<RestaurantService["pagar"]>[1]>(request);
          const result = await service.pagar(sessionId, body);
          return json(response, result.preview ? 200 : 201, result);
        }
      }

      // ── Cocina (pantalla aparte, no la ve el cliente) ────────────────────
      if (method === "GET" && url.pathname === "/api/kitchen/board") {
        return json(response, 200, await service.getKitchenBoard());
      }
      if (method === "POST" && parts[0] === "api" && parts[1] === "kitchen" && parts[2] === "tables" && parts[3] && parts[4] === "deliver") {
        return json(response, 200, await service.entregarMesa(parts[3]));
      }
      if (parts[0] === "api" && parts[1] === "kitchen" && parts[2] === "orders" && parts[3]) {
        const orderId = parts[3];
        if (method === "POST" && parts[4] === "deliver") {
          return json(response, 200, await service.entregarPedido(orderId));
        }
        if (parts[4] === "lines" && parts[5] !== undefined) {
          const lineIndex = Number(parts[5]);
          if (!Number.isInteger(lineIndex) || lineIndex < 0) throw new DomainError("VALIDATION_ERROR", "El índice de línea no es válido.");
          if (method === "POST" && parts[6] === "deliver") {
            return json(response, 200, await service.entregarLinea(orderId, lineIndex));
          }
          if (method === "POST" && parts[6] === "rollback") {
            return json(response, 200, await service.rollbackLine(orderId, lineIndex));
          }
          if (method === "PATCH" && parts.length === 6) {
            const body = await readJson<{ status: LineStatus }>(request);
            if (!lineStatuses.has(body.status)) throw new DomainError("VALIDATION_ERROR", "El estado de línea no es válido.");
            return json(response, 200, await service.advanceLine(orderId, lineIndex, body.status));
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

      // ── WDK: evidencia de la integración ────────────────────────────────
      if (method === "GET" && url.pathname === "/api/qvac") {
        return json(response, 200, deps.estadoQvac ? deps.estadoQvac() : { paquete: null, cargado: false });
      }

      if (method === "GET" && url.pathname === "/api/wdk") {
        return json(response, 200, deps.estadoWdk ? deps.estadoWdk() : { activo: false, onchain: false });
      }

      // ── Billeteras ──────────────────────────────────────────────────────
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

      // ── Administración del local ────────────────────────────────────────
      // Sin login: es una demo y las pantallas del local no están enlazadas
      // desde la vista del comensal. Para producción, acá va un rol.
      if (method === "GET" && url.pathname === "/api/admin/restaurante") {
        return json(response, 200, deps.restaurante);
      }
      if (method === "PATCH" && url.pathname === "/api/admin/restaurante") {
        const body = await readJson<Partial<Restaurante>>(request);
        aplicarRestaurante(deps.restaurante, body);
        return json(response, 200, deps.restaurante);
      }
      if (method === "PATCH" && parts[0] === "api" && parts[1] === "admin" && parts[2] === "menu" && parts[3]) {
        const body = await readJson<Partial<MenuItem>>(request);
        return json(response, 200, await service.editarProducto(parts[3], body));
      }
      if (method === "POST" && url.pathname === "/api/admin/menu") {
        const body = await readJson<Partial<MenuItem> & { name: string }>(request);
        return json(response, 201, await service.crearProducto(body));
      }
      if (method === "DELETE" && parts[0] === "api" && parts[1] === "admin" && parts[2] === "menu" && parts[3]) {
        return json(response, 200, await service.borrarProducto(parts[3]));
      }
      if (method === "GET" && url.pathname === "/api/admin/caja") {
        return json(response, 200, await service.corteDeCaja());
      }

      // ── Interfaz ────────────────────────────────────────────────────────
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

/**
 * Lo que se manda al navegador de una cuenta.
 *
 * El `proveedorId` no viaja: es el identificador con el que el proveedor
 * externo conoce a la persona, y en el navegador no hace falta para nada.
 */
function publico(cuenta: Cuenta) {
  return {
    id: cuenta.id,
    tipo: cuenta.tipo,
    proveedor: cuenta.proveedor,
    nombre: cuenta.nombre,
    ...(cuenta.email ? { email: cuenta.email } : {}),
    onboardingPendiente: cuenta.onboardingPendiente,
    preferencias: cuenta.preferencias,
  };
}

/** Aplica solo los campos conocidos: un PATCH no puede inventar propiedades. */
function aplicarRestaurante(actual: Restaurante, cambios: Partial<Restaurante>): void {
  const textos = ["nombre", "direccion", "localidad", "telefono", "cuit", "walletAddress", "aliasMp", "moneda"] as const;
  for (const k of textos) {
    const v = cambios[k];
    if (typeof v === "string" && v.trim()) actual[k] = v.trim().slice(0, 120);
  }
  if (typeof cambios.arsPorUsdt === "number" && cambios.arsPorUsdt > 0) actual.arsPorUsdt = cambios.arsPorUsdt;
  if (Array.isArray(cambios.propinasSugeridas)) {
    const limpias = cambios.propinasSugeridas.map(Number).filter((n) => Number.isFinite(n) && n >= 0 && n <= 100);
    if (limpias.length) actual.propinasSugeridas = [...new Set(limpias)].sort((a, b) => a - b);
  }
  if (Array.isArray(cambios.metodosHabilitados)) {
    const validos = cambios.metodosHabilitados.filter((m) => ["WALLET", "MERCADO_PAGO", "EFECTIVO"].includes(m));
    if (validos.length) actual.metodosHabilitados = validos;
  }
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
