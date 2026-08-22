import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import type { ServerResponse } from "node:http";

const TIPOS: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

/**
 * Sirve la interfaz desde /public.
 *
 * La comprobación de que la ruta resuelta siga estando ADENTRO de publicDir no
 * es paranoia decorativa: sin ella, un pedido a `/../../etc/passwd` sirve
 * cualquier archivo de la máquina. `path.resolve` normaliza los `..`, así que
 * comparar el prefijo después de resolver es lo que corta el ataque.
 *
 * Devuelve true si respondió, false si no encontró nada (y entonces el handler
 * sigue y termina en 404).
 */
export async function serveStatic(publicDir: string, urlPath: string, response: ServerResponse): Promise<boolean> {
  const raiz = path.resolve(publicDir);
  const limpio = decodeURIComponent(urlPath.split("?")[0] ?? "/");
  const relativo = limpio === "/" ? "index.html" : limpio.replace(/^\/+/, "");
  const destino = path.resolve(raiz, relativo);

  if (destino !== raiz && !destino.startsWith(raiz + path.sep)) return false;

  let info;
  try {
    info = await stat(destino);
  } catch {
    return false;
  }
  if (!info.isFile()) return false;

  const tipo = TIPOS[path.extname(destino).toLowerCase()] ?? "application/octet-stream";
  response.writeHead(200, { "content-type": tipo, "cache-control": "no-cache" });
  createReadStream(destino).pipe(response);
  return true;
}
