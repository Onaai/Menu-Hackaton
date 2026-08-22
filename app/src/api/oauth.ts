import { randomBytes, createHash } from "node:crypto";
import type { IdentidadExterna } from "../application/auth-service.js";
import { DomainError } from "../domain/errors.js";

/**
 * Inicio de sesión con Google y con Apple.
 *
 * LEER ESTO ANTES DE PROMETER NADA EN EL VIDEO
 * ────────────────────────────────────────────
 * Hay dos modos, y cuál corre depende de si hay credenciales configuradas:
 *
 *   MODO REAL — si están `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`.
 *     Flujo OAuth 2.0 / OIDC estándar con PKCE contra Google. El código de
 *     abajo lo implementa completo. **No lo pude probar**: esta sesión no
 *     tiene salida a internet ni credenciales, así que está escrito contra el
 *     contrato público de Google (endpoints estables y documentados), pero
 *     nadie lo corrió todavía. Probalo antes de mostrarlo.
 *
 *   MODO DEMO — si no hay credenciales, que es el caso por defecto.
 *     El servidor genera una identidad local y la cuenta se registra igual.
 *     El flujo de la app es idéntico: onboarding, ascenso de cuenta anónima,
 *     preferencias que sobreviven. Lo único que cambia es de dónde sale el
 *     nombre. **La interfaz lo dice en pantalla con todas las letras.**
 *
 * Sobre Apple, la verdad completa: "Sign in with Apple" **exige una cuenta de
 * Apple Developer paga (99 USD al año)** y firmar un JWT con una clave `.p8`
 * para el client secret. Eso no se consigue en una noche. El botón existe y el
 * flujo funciona, pero **corre siempre en modo demo**, y así está etiquetado.
 * Decirlo es mejor que fingirlo: el track descarta explícitamente los README
 * que describen cosas que no están.
 */

export interface ConfigOAuth {
  googleClientId?: string;
  googleClientSecret?: string;
  baseUrl: string;
}

const AUTORIZAR_GOOGLE = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_GOOGLE = "https://oauth2.googleapis.com/token";
const PERFIL_GOOGLE = "https://openidconnect.googleapis.com/v1/userinfo";

interface Pendiente {
  verifier: string;
  creadoEn: number;
}

export class OAuth {
  private readonly pendientes = new Map<string, Pendiente>();

  constructor(private readonly config: ConfigOAuth) {}

  googleConfigurado(): boolean {
    return Boolean(this.config.googleClientId && this.config.googleClientSecret);
  }

  /** Apple nunca está configurado en este proyecto. Ver el comentario de arriba. */
  appleConfigurado(): boolean {
    return false;
  }

  redirectUri(proveedor: "google"): string {
    return `${this.config.baseUrl}/api/auth/${proveedor}/callback`;
  }

  /**
   * Arranca el flujo de Google con PKCE.
   *
   * PKCE va aunque tengamos client secret: el `code_verifier` ata el código de
   * autorización a esta misma máquina, así que un código interceptado en el
   * redirect no le sirve a nadie más.
   */
  comenzarGoogle(): { url: string; state: string } {
    if (!this.googleConfigurado()) throw new DomainError("CONFLICT", "Google no está configurado en este servidor.");

    const state = randomBytes(16).toString("base64url");
    const verifier = randomBytes(32).toString("base64url");
    const challenge = createHash("sha256").update(verifier).digest("base64url");

    this.limpiarViejos();
    this.pendientes.set(state, { verifier, creadoEn: Date.now() });

    const p = new URLSearchParams({
      client_id: this.config.googleClientId!,
      redirect_uri: this.redirectUri("google"),
      response_type: "code",
      scope: "openid email profile",
      state,
      code_challenge: challenge,
      code_challenge_method: "S256",
      prompt: "select_account",
    });
    return { url: `${AUTORIZAR_GOOGLE}?${p}`, state };
  }

  async terminarGoogle(code: string, state: string): Promise<IdentidadExterna> {
    const pendiente = this.pendientes.get(state);
    if (!pendiente) throw new DomainError("VALIDATION_ERROR", "El state no coincide o venció. Volvé a intentar.");
    this.pendientes.delete(state);

    const respuesta = await fetch(TOKEN_GOOGLE, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: this.config.googleClientId!,
        client_secret: this.config.googleClientSecret!,
        redirect_uri: this.redirectUri("google"),
        grant_type: "authorization_code",
        code_verifier: pendiente.verifier,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!respuesta.ok) throw new DomainError("CONFLICT", `Google rechazó el intercambio de código (${respuesta.status}).`);

    const { access_token } = (await respuesta.json()) as { access_token?: string };
    if (!access_token) throw new DomainError("CONFLICT", "Google no devolvió access_token.");

    const perfil = await fetch(PERFIL_GOOGLE, {
      headers: { authorization: `Bearer ${access_token}` },
      signal: AbortSignal.timeout(10_000),
    });
    if (!perfil.ok) throw new DomainError("CONFLICT", `No se pudo leer el perfil de Google (${perfil.status}).`);

    const datos = (await perfil.json()) as { sub?: string; name?: string; email?: string; given_name?: string };
    if (!datos.sub) throw new DomainError("CONFLICT", "El perfil de Google vino sin identificador.");

    return {
      proveedor: "google",
      proveedorId: datos.sub,
      nombre: datos.given_name ?? datos.name ?? "Cliente",
      ...(datos.email ? { email: datos.email } : {}),
    };
  }

  /**
   * Identidad de demostración.
   *
   * Se usa cuando el proveedor real no está configurado. El `proveedorId` es
   * estable a partir del nombre, así que si volvés a "entrar" con el mismo
   * nombre, caés en la misma cuenta y tu historial sigue ahí — que es
   * justamente lo que hay que poder mostrar.
   */
  identidadDemo(nombre: string): IdentidadExterna {
    const limpio = nombre.trim().slice(0, 40) || "Cliente";
    const id = createHash("sha256").update(limpio.toLowerCase()).digest("hex").slice(0, 24);
    return {
      proveedor: "demo",
      proveedorId: `demo_${id}`,
      nombre: limpio,
      email: `${limpio.toLowerCase().replace(/[^a-z0-9]+/g, ".")}@demo.local`,
    };
  }

  private limpiarViejos(): void {
    const limite = Date.now() - 10 * 60_000;
    for (const [state, p] of this.pendientes) if (p.creadoEn < limite) this.pendientes.delete(state);
  }
}
