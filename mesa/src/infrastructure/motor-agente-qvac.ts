import type { ContextoPaso, MotorAgente, PasoAgente } from "../application/agente-puertos.js";
import type { AsistenteQvacSdk } from "./qvac-sdk-assistant.js";
import { recortarBien } from "./qvac-sdk-assistant.js";

/**
 * El motor del agente de caja, con el modelo local de QVAC.
 *
 * ACÁ ESTÁ LA PARTE QUE HACE QUE UN 4B PUEDA USAR HERRAMIENTAS
 * ────────────────────────────────────────────────────────────
 * Un modelo chico, suelto, falla al usar herramientas de tres formas típicas
 * —el track de QVAC las nombra una por una—: se olvida un paso, ignora lo que
 * devolvió la herramienta y contesta de memoria, o inventa el resultado de una
 * llamada que falló.
 *
 * De esas tres, la gramática resuelve la forma pero no el fondo:
 *
 *   - `accion` es un enum de cuatro valores: no puede inventar una herramienta
 *     que no existe, ni escribir una llamada mal formada, ni devolver prosa
 *     donde va una acción.
 *   - `wallet` es un enum de las wallets del local.
 *   - `destinatario` es un enum de la allowlist. **Una dirección arbitraria no
 *     es alcanzable**: no hay camino en la gramática que la produzca. Esto no
 *     es "le pedimos que no lo haga", es que el sampler no tiene el token.
 *
 * Lo que la gramática NO puede garantizar es que use el resultado en vez de
 * contestar de memoria. Eso se mide, no se promete:
 * `scripts/confiabilidad-agente.mjs` corre la misma consulta N veces y cuenta
 * cuántas veces el número que dijo el agente es el número que devolvió la
 * herramienta.
 *
 * POR QUÉ EL HISTORIAL VA COMO TEXTO Y NO COMO TURNOS DE ASSISTANT
 * ───────────────────────────────────────────────────────────────
 * Probé las dos. Con turnos `assistant` el modelo tiende a seguir la forma del
 * turno anterior y repite la misma herramienta con los mismos argumentos.
 * Puesto como un bloque "esto ya lo averiguaste", lo lee como datos y avanza.
 * Es la misma lección que el ejemplo del asistente del menú: lo que se parece
 * a un molde se rellena, lo que se parece a un dato se usa.
 */
export class MotorAgenteQvac implements MotorAgente {
  constructor(private readonly asistente: AsistenteQvacSdk) {}

  async siguientePaso(contexto: ContextoPaso): Promise<PasoAgente | null> {
    const texto = await this.asistente.completarConEsquema(
      SISTEMA(contexto),
      armarPrompt(contexto),
      esquemaDePaso(contexto),
    );
    if (texto === null) return null;
    return leerPaso(texto);
  }
}

/**
 * El esquema que se vuelve gramática.
 *
 * Los tres enums son la allowlist, el catálogo de herramientas y el de
 * wallets. Nada de eso depende de que el modelo "entienda" las reglas.
 */
export function esquemaDePaso(contexto: ContextoPaso): Record<string, unknown> {
  return {
    type: "object",
    additionalProperties: false,
    properties: {
      pensamiento: { type: "string", maxLength: 160 },
      accion: { type: "string", enum: contexto.acciones },
      wallet: { type: "string", enum: contexto.wallets },
      montoUsdt: { type: "number" },
      // La allowlist, hecha gramática. Una dirección 0x... no es emitible.
      destinatario: { type: "string", enum: contexto.destinatarios },
      respuesta: { type: "string", maxLength: 400 },
    },
    required: ["pensamiento", "accion"],
  };
}

const SISTEMA = (contexto: ContextoPaso) => `Sos el asistente de caja de un restaurante. Operás la billetera del local con las herramientas que tenés, una por vez.

HERRAMIENTAS
- ver_saldo(wallet): cuánto USDT tiene esa billetera. wallet: ${contexto.wallets.join(" | ")}
- ver_direccion(wallet): la dirección pública de esa billetera.
- cotizar_cobro(montoUsdt, destinatario): prepara un cobro y devuelve la vista previa. NO cobra: la confirma una persona.
- responder(respuesta): cuando ya sabés la respuesta, contestale al encargado.

REGLAS
- Una acción por vez. Primero averiguás, después respondés.
- Los números los sacás de lo que devolvió la herramienta. Nunca de tu memoria.
- Si una herramienta devuelve ERROR o RECHAZADO, no lo escondas: respondé explicando qué pasó.
- El tope por operación es ${contexto.politicas.topePorOperacion} USDT y el diario ${contexto.politicas.topeDiario} USDT.
- Solo podés cobrar a: ${contexto.destinatarios.join(", ")}.
- En "pensamiento" escribí en una línea por qué elegís esa acción.`;

export function armarPrompt(contexto: ContextoPaso): string {
  const yaSabes = contexto.historial.length
    ? `\nESTO YA LO AVERIGUASTE (usá estos números, no otros):\n${contexto.historial.map((h, n) => `${n + 1}. ${h}`).join("\n")}`
    : "\nTodavía no usaste ninguna herramienta.";

  const cierre = contexto.historial.length
    ? "\n¿Te alcanza para responder? Si sí, usá responder. Si no, usá otra herramienta."
    : "\n¿Qué herramienta usás primero?";

  return `EL ENCARGADO PREGUNTA: "${contexto.consulta}"${yaSabes}${cierre}`;
}

/**
 * Lee el paso que emitió el modelo.
 *
 * Con la gramática puesta esto debería ser un `JSON.parse`. Se banca igual el
 * JSON cortado por límite de tokens devolviendo `null`, que el agente trata
 * como "el modelo no contestó" y no como "el modelo dijo que sí".
 */
export function leerPaso(texto: string): PasoAgente | null {
  if (!texto.trim()) return null;
  let crudo: unknown;
  try {
    crudo = JSON.parse(texto);
  } catch {
    return null;
  }
  if (typeof crudo !== "object" || crudo === null) return null;

  const e = crudo as Record<string, unknown>;
  const accion = typeof e["accion"] === "string" ? e["accion"] : "";
  if (!accion) return null;

  const paso: PasoAgente = {
    pensamiento: recortarBien(typeof e["pensamiento"] === "string" ? e["pensamiento"].trim() : "", 150),
    accion,
  };
  if (typeof e["wallet"] === "string" && e["wallet"]) paso.wallet = e["wallet"];
  if (typeof e["montoUsdt"] === "number" && Number.isFinite(e["montoUsdt"])) paso.montoUsdt = e["montoUsdt"];
  if (typeof e["destinatario"] === "string" && e["destinatario"]) paso.destinatario = e["destinatario"];
  if (typeof e["respuesta"] === "string" && e["respuesta"].trim()) paso.respuesta = e["respuesta"].trim();
  return paso;
}
