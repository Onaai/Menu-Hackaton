// Sugerencias personalizadas generadas por el modelo local.

export interface Sugerencia {
  menuItemId: string;
  nombre: string;
  /** Una línea, en castellano, explicando por qué. La escribe el modelo. */
  motivo: string;
}

export interface ResultadoSugerencias {
  /** Solo las que sobrevivieron la validación contra la carta real. */
  sugerencias: Sugerencia[];
  /** Qué motor las produjo. Se muestra en pantalla: no se disfraza nada. */
  motor: "qvac-local" | "heuristico";
  /** Modelo y máquina, para el README y el video. */
  modelo?: string;
  latenciaMs: number;
  /**
   * Auditoría del descarte. Un modelo chico inventa platos que no existen; en
   * vez de esconderlo, se cuenta.
   *
   * Esto no es telemetría interna: es lo que el track de QVAC pide con todas
   * las letras — *"evidence, not vibes"*, y *"show us the failures you
   * couldn't fix as well as the ones you could"*.
   */
  descartadas: Array<{ texto: string; razon: RazonDescarte }>;
  /** true si el modelo no estaba disponible y se cayó al plan B. */
  degradado: boolean;
}

export type RazonDescarte =
  | "no-existe-en-la-carta"
  | "sin-stock"
  | "repetida"
  | "rompe-la-dieta"
  | "formato-invalido";

export const MAX_SUGERENCIAS = 3;
