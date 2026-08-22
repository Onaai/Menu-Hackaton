import type { IncomingMessage, ServerResponse } from "node:http";
import { DIAS_DE_SESION } from "../domain/usuario.js";

export const COOKIE_SESION = "mesa_sid";

export function leerCookies(request: IncomingMessage): Record<string, string> {
  const crudo = request.headers.cookie;
  if (!crudo) return {};
  const salida: Record<string, string> = {};
  for (const parte of crudo.split(";")) {
    const i = parte.indexOf("=");
    if (i === -1) continue;
    const nombre = parte.slice(0, i).trim();
    if (!nombre) continue;
    try {
      salida[nombre] = decodeURIComponent(parte.slice(i + 1).trim());
    } catch {
      salida[nombre] = parte.slice(i + 1).trim();
    }
  }
  return salida;
}

/**
 * Deja la cookie de sesión.
 *
 * `HttpOnly` para que ningún script de la página pueda leerla — si mañana se
 * cuela un XSS, no se lleva la sesión de nadie. `SameSite=Lax` para que no
 * viaje desde otro sitio pero sí sobreviva a la vuelta del redirect de OAuth,
 * que es exactamente el caso que `Strict` rompería.
 *
 * `Secure` va condicionado: en `localhost` no hay HTTPS y con `Secure` el
 * navegador descarta la cookie y la demo no arranca. En producción va sí o sí.
 */
export function ponerCookieSesion(response: ServerResponse, token: string, seguro: boolean): void {
  const partes = [
    `${COOKIE_SESION}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${DIAS_DE_SESION * 86_400}`,
  ];
  if (seguro) partes.push("Secure");
  agregar(response, partes.join("; "));
}

export function borrarCookieSesion(response: ServerResponse): void {
  agregar(response, `${COOKIE_SESION}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
}

/** Acumula Set-Cookie sin pisar los que ya estén. */
function agregar(response: ServerResponse, valor: string): void {
  const previo = response.getHeader("set-cookie");
  const lista = previo === undefined ? [] : Array.isArray(previo) ? previo.map(String) : [String(previo)];
  lista.push(valor);
  response.setHeader("set-cookie", lista);
}
