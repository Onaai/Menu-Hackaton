import { randomUUID, randomBytes } from "node:crypto";
import type { Clock, IdGenerator, RepositorioCuentas, RepositorioSesiones } from "../application/ports.js";
import { assertDomain } from "../domain/errors.js";
import { DIAS_DE_SESION, preferenciasVacias, type Cuenta, type Sesion } from "../domain/usuario.js";

export class CuentasEnMemoria implements RepositorioCuentas {
  private readonly data = new Map<string, Cuenta>();

  constructor(
    private readonly clock: Clock,
    private readonly ids: IdGenerator,
  ) {}

  async crear(input: {
    tipo: Cuenta["tipo"];
    proveedor: Cuenta["proveedor"];
    nombre: string;
    email?: string;
    proveedorId?: string;
  }): Promise<Cuenta> {
    const ahora = this.clock.now().toISOString();
    const cuenta: Cuenta = {
      id: this.ids.next("cuenta"),
      tipo: input.tipo,
      proveedor: input.proveedor,
      nombre: input.nombre.trim() || "Invitado",
      ...(input.email ? { email: input.email } : {}),
      ...(input.proveedorId ? { proveedorId: input.proveedorId } : {}),
      creadaEn: ahora,
      ultimaVisita: ahora,
      onboardingPendiente: true,
      preferencias: preferenciasVacias(),
    };
    this.data.set(cuenta.id, cuenta);
    return structuredClone(cuenta);
  }

  async porId(id: string): Promise<Cuenta | null> {
    const c = this.data.get(id);
    return c ? structuredClone(c) : null;
  }

  async porProveedor(proveedor: Cuenta["proveedor"], proveedorId: string): Promise<Cuenta | null> {
    for (const c of this.data.values()) {
      if (c.proveedor === proveedor && c.proveedorId === proveedorId) return structuredClone(c);
    }
    return null;
  }

  async guardar(cuenta: Cuenta): Promise<void> {
    assertDomain(this.data.has(cuenta.id), "NOT_FOUND", "No existe esa cuenta.");
    this.data.set(cuenta.id, structuredClone(cuenta));
  }
}

export class SesionesEnMemoria implements RepositorioSesiones {
  private readonly data = new Map<string, Sesion>();

  constructor(private readonly clock: Clock) {}

  async crear(cuentaId: string): Promise<Sesion> {
    const ahora = this.clock.now();
    const sesion: Sesion = {
      // 32 bytes de aleatoriedad criptográfica, no un uuid: este token ES la
      // credencial. Un uuid v4 tiene 122 bits y es predecible en algunos
      // generadores; para una cookie de sesión se usa randomBytes.
      token: randomBytes(32).toString("base64url"),
      cuentaId,
      creadaEn: ahora.toISOString(),
      expiraEn: new Date(ahora.getTime() + DIAS_DE_SESION * 86_400_000).toISOString(),
    };
    this.data.set(sesion.token, sesion);
    return structuredClone(sesion);
  }

  async porToken(token: string): Promise<Sesion | null> {
    const s = this.data.get(token);
    if (!s) return null;
    if (new Date(s.expiraEn).getTime() < this.clock.now().getTime()) {
      this.data.delete(token);
      return null;
    }
    return structuredClone(s);
  }

  async borrar(token: string): Promise<void> {
    this.data.delete(token);
  }
}

/** Id anónimo legible para mostrar en pantalla: "Invitado 4f2a". */
export function apodoAnonimo(): string {
  return `Invitado ${randomUUID().slice(0, 4)}`;
}
