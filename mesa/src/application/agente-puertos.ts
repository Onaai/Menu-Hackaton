import type { PoliticasAgente } from "./agente-caja.js";

/**
 * La frontera entre el agente y el modelo.
 *
 * El agente (`agente-caja.ts`) no importa `@qvac/sdk` ni sabe qué es una
 * gramática GBNF: pide "el próximo paso" y recibe un objeto. Eso permite dos
 * cosas que importan:
 *
 *   - testear el bucle, las políticas y los rechazos con un motor de mentira,
 *     sin cargar 2,5 GB de modelo ni esperar diez segundos por vuelta;
 *   - medir al modelo de verdad con el mismo bucle, sin código de test
 *     adentro del camino de producción.
 */

export interface ContextoPaso {
  consulta: string;
  /** Lo que devolvió cada herramienta hasta ahora, en orden. */
  historial: string[];
  acciones: string[];
  wallets: string[];
  destinatarios: string[];
  politicas: PoliticasAgente;
}

export interface PasoAgente {
  /** Por qué eligió esto. Se muestra en pantalla para que un humano audite. */
  pensamiento: string;
  accion: string;
  wallet?: string;
  montoUsdt?: number;
  destinatario?: string;
  respuesta?: string;
}

export interface MotorAgente {
  /** `null` si el modelo no está o no produjo algo legible. Nunca inventa. */
  siguientePaso(contexto: ContextoPaso): Promise<PasoAgente | null>;
}

export interface ResultadoHerramienta {
  ok: boolean;
  /** Lo que se le devuelve al modelo, en texto. */
  texto: string;
  /** El dato crudo, para la interfaz. El modelo no lo ve. */
  datos?: unknown;
}
