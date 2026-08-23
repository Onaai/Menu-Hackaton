/**
 * El agente de caja: un modelo local operando la billetera del restaurante.
 *
 * QUÉ ES
 * ──────
 * El encargado escribe en castellano — "¿cuánto tenemos cobrado?", "cobrale
 * 12 USDT a la mesa" — y un modelo de 4B que corre en la máquina del local
 * decide qué herramienta de WDK CLI usar, la usa, lee lo que volvió, y sigue
 * hasta poder contestar.
 *
 * Es el bullet 1 del track de WDK:
 *
 *   > "Give an AI agent a wallet... checks balances, quotes and sends USD₮
 *   >  under user-defined guardrails (spending caps, allowlists, confirmation
 *   >  prompts). Bonus points for a thoughtful safety model."
 *
 * y a la vez el track 2 de QVAC, que es encadenar herramientas con un modelo
 * chico sin que se olvide un paso ni invente el resultado de una llamada.
 *
 * EL MODELO DE SEGURIDAD, QUE ES LO QUE IMPORTA
 * ─────────────────────────────────────────────
 * Hay tres capas, y ninguna confía en la de arriba.
 *
 * 1. LA GRAMÁTICA. El agente no escribe texto libre que después se parsea:
 *    escribe contra un esquema que QVAC convierte a GBNF. `accion` es un enum
 *    de cuatro valores y `destinatario` es un enum de los nombres de la
 *    allowlist. Una dirección arbitraria no es "algo que le pedimos que no
 *    haga": es un token que la gramática no puede emitir. No hay prompt que
 *    lo destrabe, porque no pasa por el prompt.
 *
 * 2. LAS POLÍTICAS, EN CÓDIGO. Tope por operación y tope diario se evalúan
 *    acá, sobre la propuesta ya emitida, antes de tocar el CLI. Si el modelo
 *    propone de más, la política lo rechaza y el rechazo **vuelve al modelo
 *    como resultado de herramienta**, para que tenga que explicárselo al
 *    encargado en vez de quedarse callado.
 *
 * 3. EL HUMANO. `cotizar_cobro` corre `wdk send --dry-run`. El `wdk send` de
 *    verdad NO es una herramienta del agente: no existe en el enum. El agente
 *    puede llegar hasta el preview y ahí se termina su alcance. Transmitir lo
 *    dispara una persona apretando un botón, con el monto y el destino a la
 *    vista.
 *
 * Dicho de otra forma: el peor caso de que el modelo se vuelva loco —o de que
 * alguien le escriba una inyección en el campo de texto— es que proponga un
 * dry-run a la caja del local por un monto bajo el tope. Que es lo mismo que
 * puede hacer el botón de cobrar.
 *
 * POR QUÉ EL PENSAMIENTO ES UN CAMPO DEL ESQUEMA
 * ──────────────────────────────────────────────
 * `pensamiento` no es adorno ni "chain of thought" para que razone mejor: es
 * la línea que se muestra en pantalla al lado de cada paso. El track pide que
 * un humano pueda auditar lo que hizo el agente en cinco segundos, y para eso
 * hace falta ver por qué eligió cada herramienta, no solo qué eligió.
 */
import type { MotorAgente, PasoAgente, ResultadoHerramienta } from "./agente-puertos.js";

export interface PoliticasAgente {
  /** Máximo por operación, en unidades de USD₮ (no centavos). */
  topePorOperacion: number;
  /** Máximo acumulado por día, en USD₮. */
  topeDiario: number;
  /** Nombres —no direcciones— a los que se puede cobrar. */
  destinatariosPermitidos: string[];
  /** Cuántas vueltas de herramienta antes de rendirse. */
  maxPasos: number;
}

export const POLITICAS_POR_DEFECTO: PoliticasAgente = {
  topePorOperacion: 25,
  topeDiario: 100,
  destinatariosPermitidos: ["caja"],
  maxPasos: 5,
};

export interface HerramientasCaja {
  /** `wdk get balance` */
  verSaldo(wallet: string): Promise<ResultadoHerramienta>;
  /** `wdk get address` */
  verDireccion(wallet: string): Promise<ResultadoHerramienta>;
  /** `wdk send --dry-run` — llega hasta el preview y no más. */
  cotizarCobro(montoUsdt: number, destinatario: string): Promise<ResultadoHerramienta>;
}

export interface TrazaPaso {
  numero: number;
  pensamiento: string;
  accion: string;
  argumentos: Record<string, unknown>;
  resultado: string;
  /** true si lo frenó una política de acá y no llegó al CLI. */
  bloqueado: boolean;
  latenciaMs: number;
}

export interface ResultadoAgente {
  respuesta: string;
  traza: TrazaPaso[];
  /** Por qué terminó: contestó, se quedó sin pasos, o el modelo no está. */
  cierre: "respondio" | "sin-pasos" | "sin-modelo";
  /** El preview de WDK, si llegó a cotizar. Lo confirma un humano, no el agente. */
  cotizacion: unknown | null;
  latenciaTotalMs: number;
}

/** Lo único que el modelo puede emitir. Es el enum de la gramática. */
export const ACCIONES = ["ver_saldo", "ver_direccion", "cotizar_cobro", "responder"] as const;
export type Accion = (typeof ACCIONES)[number];

export class AgenteCaja {
  private gastadoHoy = 0;
  private diaDeCorte: string;

  constructor(
    private readonly motor: MotorAgente,
    private readonly herramientas: HerramientasCaja,
    private readonly wallets: string[],
    private readonly politicas: PoliticasAgente = POLITICAS_POR_DEFECTO,
    private readonly ahora: () => Date = () => new Date(),
  ) {
    this.diaDeCorte = this.ahora().toISOString().slice(0, 10);
  }

  async atender(consulta: string): Promise<ResultadoAgente> {
    const t0 = Date.now();
    const traza: TrazaPaso[] = [];
    const conversacion: string[] = [];
    let cotizacion: unknown | null = null;

    for (let numero = 1; numero <= this.politicas.maxPasos; numero++) {
      const tPaso = Date.now();
      const paso = await this.motor.siguientePaso({
        consulta,
        // Copia, no la referencia viva. El motor es un adaptador —hoy QVAC,
        // manana lo que sea— y no tiene por que poder mutarle el historial al
        // agente. Lo encontro un test que fallo por esto mismo: como todas las
        // vueltas compartian el array, la primera "ya traia" lo que recien iba
        // a averiguar en la segunda.
        historial: [...conversacion],
        acciones: [...ACCIONES],
        wallets: this.wallets,
        destinatarios: this.politicas.destinatariosPermitidos,
        politicas: this.politicas,
      });

      // El motor devuelve null si el modelo no está cargado o no produjo algo
      // legible. No se inventa una respuesta: se dice que no se pudo.
      if (!paso) {
        return {
          respuesta: "No pude consultar el modelo local. Fijate el estado en GET /api/qvac.",
          traza,
          cierre: "sin-modelo",
          cotizacion,
          latenciaTotalMs: Date.now() - t0,
        };
      }

      if (paso.accion === "responder") {
        traza.push({
          numero, pensamiento: paso.pensamiento, accion: "responder",
          argumentos: {}, resultado: paso.respuesta ?? "", bloqueado: false,
          latenciaMs: Date.now() - tPaso,
        });
        return {
          respuesta: paso.respuesta?.trim() || "No tengo una respuesta para eso.",
          traza, cierre: "respondio", cotizacion,
          latenciaTotalMs: Date.now() - t0,
        };
      }

      const { texto, bloqueado, preview } = await this.ejecutar(paso);
      if (preview !== undefined) cotizacion = preview;

      traza.push({
        numero, pensamiento: paso.pensamiento, accion: paso.accion,
        argumentos: argumentosDe(paso), resultado: texto, bloqueado,
        latenciaMs: Date.now() - tPaso,
      });

      // El resultado vuelve al modelo como texto. Que la próxima vuelta lo
      // USE es justamente lo que mide `scripts/confiabilidad-agente.mjs`:
      // un modelo chico tiende a contestar de memoria e ignorar lo que
      // devolvió la herramienta.
      conversacion.push(`${paso.accion}(${JSON.stringify(argumentosDe(paso))}) devolvió: ${texto}`);
    }

    // Se acabaron los pasos. Se dice, no se improvisa una respuesta: el track
    // premia al agente que admite que no llegó por sobre el que inventa.
    return {
      respuesta: `Di ${this.politicas.maxPasos} vueltas y no llegué a una respuesta. Mirá la traza y preguntame más puntual.`,
      traza, cierre: "sin-pasos", cotizacion,
      latenciaTotalMs: Date.now() - t0,
    };
  }

  /** Las políticas se evalúan ACÁ, no en el prompt. */
  private async ejecutar(paso: PasoAgente): Promise<{ texto: string; bloqueado: boolean; preview?: unknown }> {
    if (paso.accion === "ver_saldo" || paso.accion === "ver_direccion") {
      const wallet = paso.wallet ?? "";
      // Redundante con la gramática, y a propósito: si mañana alguien cambia el
      // esquema o enchufa otro motor, esto sigue siendo la última palabra.
      if (!this.wallets.includes(wallet)) {
        return { texto: `RECHAZADO: "${wallet}" no es una wallet de este local.`, bloqueado: true };
      }
      const r = paso.accion === "ver_saldo"
        ? await this.herramientas.verSaldo(wallet)
        : await this.herramientas.verDireccion(wallet);
      return { texto: r.ok ? r.texto : `ERROR: ${r.texto}`, bloqueado: false };
    }

    // cotizar_cobro
    const monto = paso.montoUsdt ?? 0;
    const destinatario = paso.destinatario ?? "";

    if (!this.politicas.destinatariosPermitidos.includes(destinatario)) {
      return { texto: `RECHAZADO POR POLÍTICA: "${destinatario}" no está en la lista de destinatarios permitidos.`, bloqueado: true };
    }
    if (!Number.isFinite(monto) || monto <= 0) {
      return { texto: `RECHAZADO POR POLÍTICA: ${monto} no es un monto válido.`, bloqueado: true };
    }
    if (monto > this.politicas.topePorOperacion) {
      return {
        texto: `RECHAZADO POR POLÍTICA: ${monto} USDT supera el tope por operación (${this.politicas.topePorOperacion} USDT). Decíselo al encargado.`,
        bloqueado: true,
      };
    }
    this.rotarDia();
    if (this.gastadoHoy + monto > this.politicas.topeDiario) {
      return {
        texto: `RECHAZADO POR POLÍTICA: con ${monto} USDT se pasa el tope diario (${this.politicas.topeDiario} USDT; van ${this.gastadoHoy}).`,
        bloqueado: true,
      };
    }

    const r = await this.herramientas.cotizarCobro(monto, destinatario);
    if (!r.ok) return { texto: `ERROR: ${r.texto}`, bloqueado: false };

    // Se cuenta al COTIZAR y no al transmitir. Es deliberadamente conservador:
    // si el agente pudiera cotizar sin límite, un bucle raro dejaría al
    // encargado con veinte previews listos para confirmar de un click.
    this.gastadoHoy += monto;
    return { texto: r.texto, bloqueado: false, preview: r.datos ?? null };
  }

  private rotarDia() {
    const hoy = this.ahora().toISOString().slice(0, 10);
    if (hoy !== this.diaDeCorte) {
      this.diaDeCorte = hoy;
      this.gastadoHoy = 0;
    }
  }

  estado() {
    this.rotarDia();
    return {
      politicas: this.politicas,
      gastadoHoy: this.gastadoHoy,
      disponibleHoy: Math.max(0, this.politicas.topeDiario - this.gastadoHoy),
      dia: this.diaDeCorte,
      // Se explicita que `wdk send` no es alcanzable por el agente. Es la
      // pregunta que va a hacer el jurado y la respuesta tiene que estar acá.
      accionesDelAgente: [...ACCIONES],
      transmitir: "no es una accion del agente: la dispara una persona",
    };
  }
}

function argumentosDe(paso: PasoAgente): Record<string, unknown> {
  const args: Record<string, unknown> = {};
  if (paso.wallet !== undefined) args["wallet"] = paso.wallet;
  if (paso.montoUsdt !== undefined) args["montoUsdt"] = paso.montoUsdt;
  if (paso.destinatario !== undefined) args["destinatario"] = paso.destinatario;
  return args;
}
