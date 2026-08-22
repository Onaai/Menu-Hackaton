// Cuentas, sesiones y preferencias.
//
// La regla de diseño, que vale para todo este archivo: **la app funciona
// entera sin cuenta**. Nadie tiene que registrarse para pedir de comer. La
// cuenta solo agrega una cosa —que el sistema te recuerde entre visitas— y se
// ofrece, nunca se exige.
//
// Eso no es una decisión estética: un comensal que escanea un QR en una mesa
// y se topa con un registro obligatorio, se va. Y además es lo honesto con la
// privacidad, que es el eje del track de QVAC: si no hace falta un dato, no se
// pide.

export type TipoCuenta = "ANONIMA" | "REGISTRADA";
export type Proveedor = "anonimo" | "google" | "apple" | "demo";

export interface Cuenta {
  id: string;
  tipo: TipoCuenta;
  proveedor: Proveedor;
  nombre: string;
  email?: string;
  /** Identificador estable del proveedor externo (el `sub` de OIDC). */
  proveedorId?: string;
  creadaEn: string;
  ultimaVisita: string;
  /** Se apaga cuando la persona ya vio la pantalla de bienvenida. */
  onboardingPendiente: boolean;
  preferencias: Preferencias;
}

export interface Preferencias {
  /** "sin-gluten", "vegano", "vegetariano". Las elige la persona. */
  dietas: string[];
  /** Ingredientes que siempre saca. Sale de lo que fue pidiendo. */
  evita: string[];
  /** menuItemId → cuántas veces lo pidió. Es toda la memoria que guardamos. */
  historial: Record<string, number>;
  /** Última mesa en la que estuvo, para retomar. */
  ultimaMesa?: number;
}

export interface Sesion {
  token: string;
  cuentaId: string;
  creadaEn: string;
  expiraEn: string;
}

export const DIAS_DE_SESION = 30;

export function preferenciasVacias(): Preferencias {
  return { dietas: [], evita: [], historial: {} };
}

/**
 * Los platos que más pidió, de mayor a menor.
 *
 * Es lo que alimenta al modelo local. Se le pasan pocos y ordenados a
 * propósito: un modelo chico con una lista larga se pierde, y acá lo único que
 * importa son los últimos gustos, no la biografía completa.
 */
export function masPedidos(prefs: Preferencias, limite = 6): Array<{ menuItemId: string; veces: number }> {
  return Object.entries(prefs.historial)
    .map(([menuItemId, veces]) => ({ menuItemId, veces }))
    .sort((a, b) => b.veces - a.veces || a.menuItemId.localeCompare(b.menuItemId))
    .slice(0, limite);
}

/** ¿Vale la pena pedirle al modelo? Con menos de esto no hay señal. */
export const MINIMO_PARA_SUGERIR = 1;

export function tieneHistorialUtil(prefs: Preferencias): boolean {
  return Object.values(prefs.historial).reduce((a, b) => a + b, 0) >= MINIMO_PARA_SUGERIR;
}
