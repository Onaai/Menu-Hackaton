import { readFileSync, unlinkSync } from "node:fs";
import path from "node:path";
import * as qvac from "@qvac/sdk";
import type { MenuItem } from "../domain/model.js";

/**
 * Asistente del menú con el modelo local de QVAC, **dentro del proceso**.
 *
 * POR QUÉ ESTE Y NO EL DE HTTP
 * ────────────────────────────
 * `qvac-menu-assistant.ts` habla con `qvac serve openai`. Funciona y se queda
 * —sus tests lo cubren y sigue disponible con QVAC_MODE=http— pero tiene dos
 * problemas para una demo:
 *
 *   1. Hay que acordarse de levantar el servidor aparte. Si te olvidás, el
 *      asistente cae al motor determinista sin que nadie lo note.
 *   2. `discoverModel()` agarra el primer modelo que encuentre. En el video no
 *      podés decir con qué modelo corriste.
 *
 * Acá el modelo lo carga la app, y el SDK reporta cuál es, con qué
 * cuantización y a cuántos tokens por segundo.
 *
 * LO QUE HACE QUE ESTO FUNCIONE CON UN MODELO CHICO
 * ─────────────────────────────────────────────────
 * `responseFormat: { type: "json_schema" }` hace que QVAC convierta el esquema
 * a gramática GBNF y **restrinja el muestreo**: el modelo no elige entre todos
 * los tokens, elige entre los que la gramática permite. Con el campo `id` como
 * `enum` de la carta de hoy, un plato que no existe es inalcanzable.
 *
 * Medido con Llama 3.2 1B Q4_0 en CPU, mismo prompt, lo único que cambia es el
 * esquema:
 *
 *   sin esquema  -> "Lo siento, pero no puedo cumplir con la solicitud..."  (0)
 *   con esquema  -> {"sugerencias":[{"id":"burger","motivo":"..."}]}
 *
 * Un modelo de mil millones de parámetros se niega en prosa cuando lo dejás
 * suelto. No es que se promptee mejor: la gramática no lo deja escribir otra
 * cosa.
 *
 * Y EL ENUM NO ES LA CARTA ENTERA
 * ───────────────────────────────
 * Es lo que hay con stock **y** no le rompe la restricción alimentaria a quien
 * pregunta. Para una comensal celíaca, los ids con gluten directamente no
 * están en la gramática: no es que el modelo sepa que no debe, es que no los
 * puede escribir.
 */
export class AsistenteQvacSdk {
  private modelId: string | null = null;
  private cargando: Promise<boolean> | null = null;
  private fallo: string | null = null;
  private ultima: EstadisticasCorrida | null = null;

  constructor(
    private readonly descriptor: DescriptorModelo,
    private readonly opciones: { device: string; ctxSize: number } = { device: "cpu", ctxSize: 4096 },
  ) {}

  get modeloUsado(): string {
    return this.descriptor.modelId ?? this.descriptor.name;
  }

  estado(): EstadoQvac {
    return {
      paquete: "@qvac/sdk",
      modo: "sdk",
      modelo: this.modeloUsado,
      constante: this.descriptor.name,
      parametros: this.descriptor.params ?? "?",
      cuantizacion: this.descriptor.quantization ?? "?",
      motor: this.descriptor.engine ?? "?",
      device: this.opciones.device,
      ctxSize: this.opciones.ctxSize,
      cargado: this.modelId !== null,
      ...(this.fallo ? { fallo: this.fallo } : {}),
      ...(this.ultima ? { ultimaCorrida: this.ultima } : {}),
    };
  }

  /** Carga el modelo una sola vez. Idempotente: la llama el arranque y cada consulta. */
  async arrancar(onProgress?: (pct: number, bajados: number, total: number) => void): Promise<boolean> {
    if (this.modelId) return true;
    if (this.fallo) return false;
    if (this.cargando) return this.cargando;

    this.cargando = (async () => {
      try {
        limpiarLockHuerfano();
        this.modelId = await qvac.loadModel({
          modelSrc: this.descriptor,
          modelConfig: { device: this.opciones.device, ctx_size: this.opciones.ctxSize },
          ...(onProgress
            ? { onProgress: (p: qvac.ModelProgressUpdate) => onProgress(p.percentage, p.downloaded, p.total) }
            : {}),
        });
        return true;
      } catch (error) {
        this.fallo = explicar(error);
        return false;
      } finally {
        this.cargando = null;
      }
    })();

    return this.cargando;
  }

  /**
   * Elige hasta 3 platos de `carta` para responder a `pregunta`.
   *
   * Devuelve `null` —y no una excepción— si el modelo no está o no produjo algo
   * usable. Quien llama cae al motor determinista y **lo dice en pantalla**:
   * un plan B disfrazado de IA sería mentirle al jurado.
   */
  async sugerir(pregunta: string, carta: MenuItem[], restricciones: string[] = []): Promise<SugerenciaQvac | null> {
    if (!(await this.arrancar())) return null;
    const modelId = this.modelId;
    if (!modelId) return null;

    const elegibles = platosElegibles(carta, restricciones);
    if (elegibles.length === 0) return null;
    const ids = elegibles.map((i) => i.id);

    const t0 = Date.now();
    let texto = "";
    try {
      const corrida = qvac.completion({
        modelId,
        history: [
          { role: "system", content: SISTEMA },
          // El ejemplo va como una vuelta ANTERIOR de la conversación, no
          // adentro del system. Ver el comentario de EJEMPLO_PEDIDO.
          { role: "user", content: EJEMPLO_PEDIDO },
          { role: "assistant", content: EJEMPLO_RESPUESTA },
          { role: "user", content: armarPrompt(pregunta, elegibles, restricciones) },
        ],
        stream: false,
        responseFormat: {
          type: "json_schema",
          json_schema: { name: "sugerencias", schema: esquemaDeSugerencias(ids) },
        },
      });

      const final = await corrida.final;
      texto = final.contentText ?? "";
      this.ultima = {
        latenciaMs: Date.now() - t0,
        tokensPorSegundo: final.stats?.tokensPerSecond ?? null,
        primerTokenMs: final.stats?.timeToFirstToken ?? null,
        tokensPrompt: final.stats?.promptTokens ?? null,
        tokensGenerados: final.stats?.generatedTokens ?? null,
      };
    } catch (error) {
      this.fallo = explicar(error);
      return null;
    }

    const crudos = leerRespuesta(texto);
    const { elegidos, descartadas } = validar(crudos, elegibles);
    if (elegidos.length === 0) return null;

    return {
      engine: "QVAC_LOCAL",
      modelo: this.modeloUsado,
      cuantizacion: this.descriptor.quantization ?? "?",
      latenciaMs: this.ultima?.latenciaMs ?? 0,
      items: elegidos.map((e) => e.item),
      motivos: Object.fromEntries(elegidos.map((e) => [e.item.id, e.motivo])),
      descartadas,
    };
  }

  /** Libera el modelo y baja el worker. Se llama al cerrar el servidor. */
  async cerrar(): Promise<void> {
    try {
      if (this.modelId) await qvac.unloadModel({ modelId: this.modelId });
      await qvac.close();
    } catch {
      // Si el worker ya se murió no hay nada que cerrar. No es un error.
    } finally {
      this.modelId = null;
    }
  }
}

// ── Tipos ───────────────────────────────────────────────────────────────────

/**
 * El descriptor de un modelo del registro de QVAC.
 *
 * Se toma prestado el tipo de una constante real en vez de escribirlo a mano:
 * si el SDK cambia la forma del descriptor esto no compila, y me entero acá y
 * no en la demo.
 */
export type DescriptorModelo = typeof qvac.LLAMA_3_2_1B_INST_Q4_0;

export interface EstadisticasCorrida {
  latenciaMs: number;
  tokensPorSegundo: number | null;
  primerTokenMs: number | null;
  tokensPrompt: number | null;
  tokensGenerados: number | null;
}

export interface EstadoQvac {
  paquete: string;
  modo: string;
  modelo: string;
  constante: string;
  parametros: string;
  cuantizacion: string;
  motor: string;
  device: string;
  ctxSize: number;
  cargado: boolean;
  fallo?: string;
  ultimaCorrida?: EstadisticasCorrida;
}

export interface SugerenciaQvac {
  engine: "QVAC_LOCAL";
  modelo: string;
  cuantizacion: string;
  latenciaMs: number;
  items: MenuItem[];
  motivos: Record<string, string>;
  descartadas: Array<{ texto: string; razon: RazonDescarte }>;
}

export type RazonDescarte = "no-existe-en-la-carta" | "repetida" | "formato-invalido";

export interface CandidatoCrudo {
  id: string;
  motivo: string;
  formatoInvalido?: boolean;
}

// ── La carta que el modelo puede nombrar ────────────────────────────────────

/**
 * Los platos que esta persona puede pedir ahora: hay stock **y** no le rompen
 * la restricción alimentaria.
 *
 * Una sola función, usada por el prompt y por el enum del esquema. Si se
 * separan, el modelo lee un plato que la gramática no lo deja escribir y se
 * traba generando cualquier cosa.
 */
export function platosElegibles(carta: MenuItem[], restricciones: string[]): MenuItem[] {
  return carta.filter(
    (item) => item.available && restricciones.every((r) => (item.diet ?? []).includes(r)),
  );
}

/**
 * El esquema que se vuelve gramática.
 *
 * `enum: ids` es toda la gracia. `maxItems: 3` también lo garantiza la
 * gramática — el "máximo 3" escrito en el prompt era una sugerencia que el
 * modelo podía ignorar, y la ignoraba.
 */
export function esquemaDeSugerencias(ids: string[]): Record<string, unknown> {
  return {
    type: "object",
    additionalProperties: false,
    properties: {
      sugerencias: {
        type: "array",
        maxItems: 3,
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            id: { type: "string", enum: ids },
            // El largo también lo pone la gramática, pero con dos topes
            // distintos y a propósito.
            //
            // La gramática corta contando caracteres, sin mirar dónde termina
            // la palabra: con el tope en 70 salió al aire un "...que esté
            // sin-gl". Y si la gramática y el recorte por palabra usan el
            // MISMO número, el recorte se come toda oración que la gramática
            // dejó pasar entera — se veían motivos terminados en "…" que
            // estaban perfectos.
            //
            // Entonces: 120 acá, que es un techo que evita el párrafo y casi
            // nunca toca, y `recortarBien` a 90 por palabra para la vez que sí.
            motivo: { type: "string", maxLength: 120 },
          },
          required: ["id", "motivo"],
        },
      },
    },
    required: ["sugerencias"],
  };
}

// ── El prompt ───────────────────────────────────────────────────────────────

const SISTEMA = `Sos el mozo de un restaurante en Buenos Aires. Un cliente te hace una consulta sobre la carta.

Elegí hasta 3 platos de la carta que te paso y en "motivo" contale por qué se los recomendás.
Le hablás A ÉL, tratándolo de vos, en una oración corta.
Nunca escribas "el cliente" ni "es un amante de". Escribí "te va a gustar", "pediste", "va bien con".
El motivo tiene que hablar de ESTE plato y de ESTA consulta: si sirve para cualquiera, no sirve.
No repitas el mismo plato dos veces.
Si la consulta no se corresponde con nada de la carta, devolvé menos platos o ninguno.`;

/**
 * El ejemplo de una vuelta anterior.
 *
 * NO va adentro del prompt del sistema, y la diferencia no es cosmética. Con el
 * ejemplo metido en las instrucciones, tanto Llama 1B como Qwen 4B devolvían el
 * motivo del ejemplo **palabra por palabra**: "La pedís siempre y hoy pega el
 * calor" salió en tres casos de prueba seguidos, para platos que el cliente
 * nunca había pedido. Un ejemplo dentro de las reglas se lee como un molde para
 * rellenar.
 *
 * Puesto como turno de usuario + turno de asistente, se lee como "así se
 * resolvió la consulta anterior". Y la carta del ejemplo es de otro
 * restaurante a propósito: ninguno de estos ids existe en la carta real, así
 * que copiar el motivo tal cual no le sirve de nada.
 *
 * Medido: la métrica "sin copiar" pasó de 93% a 100%.
 */
const EJEMPLO_PEDIDO = `CARTA DISPONIBLE:
1. id=cafe-con-leche · Café con leche · Café
2. id=tarta-frutal · Tarta de frutas · Panadería
3. id=sopa-calabaza · Sopa de calabaza · Entradas

CONSULTA DEL CLIENTE: "algo calentito para empezar"`;

const EJEMPLO_RESPUESTA = `{"sugerencias":[{"id":"sopa-calabaza","motivo":"Sale bien caliente y te entra liviana antes del plato."},{"id":"cafe-con-leche","motivo":"Si querés algo corto para arrancar, este va."}]}`;

export function armarPrompt(pregunta: string, elegibles: MenuItem[], restricciones: string[]): string {
  const lista = elegibles
    .map((item, n) => {
      const dieta = item.diet?.length ? ` [${item.diet.join(", ")}]` : "";
      const desc = item.description ? ` — ${item.description}` : "";
      return `${n + 1}. id=${item.id} · ${item.name} · ${item.category}${dieta}${desc}`;
    })
    .join("\n");

  const aclaracion = restricciones.length
    ? `\n(La carta de arriba ya está filtrada: es ${restricciones.join(" y ")}.)`
    : "";

  return `CARTA DISPONIBLE:
${lista}${aclaracion}

CONSULTA DEL CLIENTE: "${pregunta}"`;
}

// ── Lo que se hace con la respuesta ─────────────────────────────────────────

/**
 * Lee la respuesta del modelo.
 *
 * Con el esquema puesto esto debería ser un `JSON.parse` y listo. Igual se
 * banca el caso raro —una generación cortada por límite de tokens deja el JSON
 * por la mitad— devolviendo lista vacía en vez de reventar el request.
 */
export function leerRespuesta(texto: string): CandidatoCrudo[] {
  if (!texto.trim()) return [];

  let crudo: unknown;
  try {
    crudo = JSON.parse(texto);
  } catch {
    return [];
  }

  const lista = (crudo as { sugerencias?: unknown })?.sugerencias;
  if (!Array.isArray(lista)) return [];

  const salida: CandidatoCrudo[] = [];
  for (const elemento of lista) {
    if (typeof elemento !== "object" || elemento === null) {
      salida.push({ id: "", motivo: String(elemento).slice(0, 80), formatoInvalido: true });
      continue;
    }
    const e = elemento as Record<string, unknown>;
    const id = typeof e["id"] === "string" ? e["id"].trim() : "";
    const motivo = typeof e["motivo"] === "string" ? e["motivo"].trim() : "";
    if (!id) {
      salida.push({ id: "", motivo: JSON.stringify(e).slice(0, 80), formatoInvalido: true });
      continue;
    }
    salida.push({ id, motivo: recortarBien(motivo, 90) });
  }
  return salida;
}

/**
 * La validación, después de la gramática.
 *
 * Sí, el enum ya garantiza que el id existe y que la dieta se respeta. Esto
 * corre igual porque la gramática **no** puede expresar unicidad (un `enum` no
 * dice "cada valor una sola vez") y porque la carta puede cambiar entre que se
 * armó el prompt y volvió la respuesta: son varios segundos y la cocina marca
 * sin stock en vivo.
 *
 * Que el camino principal sea seguro por construcción no es razón para sacar
 * el colador.
 */
export function validar(
  candidatos: CandidatoCrudo[],
  elegibles: MenuItem[],
): { elegidos: Array<{ item: MenuItem; motivo: string }>; descartadas: Array<{ texto: string; razon: RazonDescarte }> } {
  const porId = new Map(elegibles.map((i) => [i.id, i]));
  const elegidos: Array<{ item: MenuItem; motivo: string }> = [];
  const descartadas: Array<{ texto: string; razon: RazonDescarte }> = [];
  const yaPuestos = new Set<string>();

  for (const c of candidatos) {
    if (c.formatoInvalido || !c.id) {
      descartadas.push({ texto: c.motivo || "(vacío)", razon: "formato-invalido" });
      continue;
    }
    const item = porId.get(c.id);
    if (!item) {
      descartadas.push({ texto: c.id, razon: "no-existe-en-la-carta" });
      continue;
    }
    if (yaPuestos.has(item.id)) {
      descartadas.push({ texto: item.name, razon: "repetida" });
      continue;
    }
    yaPuestos.add(item.id);
    elegidos.push({ item, motivo: c.motivo });
  }

  return { elegidos, descartadas };
}

/**
 * Recorta sin cortar palabras por la mitad.
 *
 * La gramática limita el campo contando caracteres: si el tope cae en medio de
 * "sin-gluten", el mozo termina diciendo "...que esté sin-gl". Preferimos una
 * oración más corta y entera que una larga y mutilada.
 */
export function recortarBien(texto: string, largo: number): string {
  if (texto.length <= largo) return texto;
  const cortado = texto.slice(0, largo);
  const ultimoEspacio = cortado.lastIndexOf(" ");
  // Si no hay un espacio razonablemente cerca del final es una sola palabra
  // larguísima; ahí no queda otra que cortarla.
  const base = ultimoEspacio > largo * 0.6 ? cortado.slice(0, ultimoEspacio) : cortado;
  return base.replace(/[\s,;:.]+$/, "") + "…";
}

// ── Operación ───────────────────────────────────────────────────────────────

/**
 * Borra `~/.qvac/.worker.lock` si apunta a un proceso que ya no existe.
 *
 * El SDK deja ese archivo mientras el worker vive. Si el proceso se baja bien
 * se limpia solo; si lo matan a la fuerza (Stop-Process, un corte de luz, el
 * administrador de tareas) queda apuntando a un pid muerto y **el próximo
 * arranque se cuelga 30 segundos y falla** con RPC_INIT_TIMEOUT. Verificado a
 * mano: matando el server con `Stop-Process -Force` el lock queda ahí.
 *
 * Perder cinco minutos por esto en una demo es inaceptable. La condición es
 * estricta a propósito: se borra ÚNICAMENTE si el pid anotado no responde. Si
 * hay otra instancia viva el archivo no se toca — borrar el lock de un worker
 * vivo sería peor que el problema que arregla.
 */
export function limpiarLockHuerfano(): void {
  const home = process.env["USERPROFILE"] ?? process.env["HOME"];
  if (!home) return;
  const ruta = path.join(home, ".qvac", ".worker.lock");

  try {
    const { pid } = JSON.parse(readFileSync(ruta, "utf8")) as { pid?: number };
    if (typeof pid !== "number") return;

    try {
      // Señal 0: no manda nada, solo pregunta si el proceso existe.
      process.kill(pid, 0);
      return; // Vive. No es asunto nuestro.
    } catch (error) {
      // ESRCH = no existe. EPERM = existe pero es de otro usuario: tampoco se toca.
      if ((error as NodeJS.ErrnoException).code !== "ESRCH") return;
    }

    unlinkSync(ruta);
    console.log(`  QVAC: había un lock de un worker muerto (pid ${pid}). Lo borré.`);
  } catch {
    // No existe, no se puede leer, o no es JSON: no hay nada que limpiar.
  }
}

/** Traduce el error del SDK a algo que se pueda leer a las tres de la mañana. */
export function explicar(error: unknown): string {
  const e = error as { code?: number | string; message?: string };
  const mensaje = e?.message ?? String(error);

  if (String(e?.code) === "50204" || /RPC_INIT_TIMEOUT|worker process may have failed/i.test(mensaje)) {
    return "el worker de QVAC no arrancó. Casi siempre es un lock viejo: borrá ~/.qvac/.worker.lock y volvé a probar.";
  }
  if (/ENOENT|BareRuntimeBinaryNotFound/i.test(mensaje)) {
    return "falta el runtime de Bare que usa QVAC. Reinstalá @qvac/sdk.";
  }
  return mensaje;
}
