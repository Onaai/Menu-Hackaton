import { assertDomain } from "../domain/errors.js";
import type { Cuenta, Preferencias, Proveedor } from "../domain/usuario.js";
import type { Clock, RepositorioCuentas, RepositorioSesiones } from "./ports.js";

export interface IdentidadExterna {
  proveedor: Proveedor;
  proveedorId: string;
  nombre: string;
  email?: string;
}

/**
 * Cuentas y sesiones.
 *
 * El flujo, que es el que pediste:
 *
 *   1. Alguien escanea el QR y entra. **No se le pide nada.** Se le crea una
 *      cuenta anónima y una cookie, y ya puede pedir de comer.
 *   2. La primera vez ve el onboarding, una sola vez.
 *   3. Cuando ya pidió algo, se le ofrece registrarse — con el argumento
 *      concreto de que la próxima vez la carta lo va a reconocer.
 *   4. Si se registra, **la cuenta anónima se ASCIENDE**: conserva el mismo
 *      id, el mismo historial y las mismas preferencias.
 *
 * Ese cuarto punto es el que casi siempre se hace mal. Si al registrarte te
 * crean una cuenta nueva, perdés todo lo que hiciste como invitado —incluido
 * el historial que es justamente lo que le da de comer al modelo— y el
 * registro pasa a costarte algo en vez de darte algo.
 */
export class AuthService {
  constructor(
    private readonly cuentas: RepositorioCuentas,
    private readonly sesiones: RepositorioSesiones,
    private readonly clock: Clock,
  ) {}

  /** Devuelve la cuenta de la cookie, o crea una anónima nueva. */
  async resolver(token: string | undefined, apodo: () => string): Promise<{ cuenta: Cuenta; sesionToken: string; nueva: boolean }> {
    if (token) {
      const sesion = await this.sesiones.porToken(token);
      if (sesion) {
        const cuenta = await this.cuentas.porId(sesion.cuentaId);
        if (cuenta) {
          cuenta.ultimaVisita = this.clock.now().toISOString();
          await this.cuentas.guardar(cuenta);
          return { cuenta, sesionToken: sesion.token, nueva: false };
        }
      }
    }
    const cuenta = await this.cuentas.crear({ tipo: "ANONIMA", proveedor: "anonimo", nombre: apodo() });
    const sesion = await this.sesiones.crear(cuenta.id);
    return { cuenta, sesionToken: sesion.token, nueva: true };
  }

  async marcarOnboardingVisto(cuentaId: string): Promise<Cuenta> {
    const cuenta = await this.requerir(cuentaId);
    cuenta.onboardingPendiente = false;
    await this.cuentas.guardar(cuenta);
    return cuenta;
  }

  /**
   * Asciende una cuenta anónima a registrada, o entra a la que ya existía.
   *
   * Si esa identidad externa ya tenía cuenta, se devuelve esa —con su
   * historial— y se descarta la anónima. Si no, se asciende la anónima en el
   * lugar, que es lo que conserva lo que la persona ya hizo hoy.
   */
  async registrar(cuentaActualId: string, identidad: IdentidadExterna): Promise<{ cuenta: Cuenta; sesionToken: string }> {
    assertDomain(identidad.proveedorId, "VALIDATION_ERROR", "Falta el identificador del proveedor.");

    const existente = await this.cuentas.porProveedor(identidad.proveedor, identidad.proveedorId);
    if (existente) {
      const anonima = await this.cuentas.porId(cuentaActualId);
      // Lo que pidió como invitado en esta visita se lleva a su cuenta real.
      if (anonima && anonima.tipo === "ANONIMA" && anonima.id !== existente.id) {
        existente.preferencias = fusionar(existente.preferencias, anonima.preferencias);
      }
      existente.ultimaVisita = this.clock.now().toISOString();
      await this.cuentas.guardar(existente);
      const sesion = await this.sesiones.crear(existente.id);
      return { cuenta: existente, sesionToken: sesion.token };
    }

    const cuenta = await this.requerir(cuentaActualId);
    assertDomain(cuenta.tipo === "ANONIMA", "CONFLICT", "Esta sesión ya tiene una cuenta registrada.");
    cuenta.tipo = "REGISTRADA";
    cuenta.proveedor = identidad.proveedor;
    cuenta.proveedorId = identidad.proveedorId;
    cuenta.nombre = identidad.nombre.trim() || cuenta.nombre;
    if (identidad.email) cuenta.email = identidad.email;
    await this.cuentas.guardar(cuenta);
    return { cuenta, sesionToken: (await this.sesiones.crear(cuenta.id)).token };
  }

  async salir(token: string): Promise<void> {
    await this.sesiones.borrar(token);
  }

  async actualizarPreferencias(cuentaId: string, cambios: Partial<Preferencias>): Promise<Cuenta> {
    const cuenta = await this.requerir(cuentaId);
    if (cambios.dietas) {
      assertDomain(Array.isArray(cambios.dietas) && cambios.dietas.length <= 5, "VALIDATION_ERROR", "Demasiadas dietas.");
      cuenta.preferencias.dietas = [...new Set(cambios.dietas.map(String))];
    }
    if (cambios.evita) cuenta.preferencias.evita = [...new Set(cambios.evita.map(String))].slice(0, 20);
    if (cambios.ultimaMesa !== undefined) cuenta.preferencias.ultimaMesa = cambios.ultimaMesa;
    await this.cuentas.guardar(cuenta);
    return cuenta;
  }

  /** Suma al historial lo que la persona acaba de pedir. Es toda la memoria. */
  async registrarConsumo(cuentaId: string, menuItemIds: string[]): Promise<Cuenta> {
    const cuenta = await this.requerir(cuentaId);
    for (const id of menuItemIds) {
      cuenta.preferencias.historial[id] = (cuenta.preferencias.historial[id] ?? 0) + 1;
    }
    await this.cuentas.guardar(cuenta);
    return cuenta;
  }

  private async requerir(id: string): Promise<Cuenta> {
    const cuenta = await this.cuentas.porId(id);
    assertDomain(cuenta, "NOT_FOUND", "No se encontró la cuenta.");
    return cuenta;
  }
}

function fusionar(destino: Preferencias, origen: Preferencias): Preferencias {
  const historial = { ...destino.historial };
  for (const [id, veces] of Object.entries(origen.historial)) {
    historial[id] = (historial[id] ?? 0) + veces;
  }
  return {
    dietas: [...new Set([...destino.dietas, ...origen.dietas])],
    evita: [...new Set([...destino.evita, ...origen.evita])],
    historial,
    ...(origen.ultimaMesa !== undefined ? { ultimaMesa: origen.ultimaMesa } : destino.ultimaMesa !== undefined ? { ultimaMesa: destino.ultimaMesa } : {}),
  };
}
