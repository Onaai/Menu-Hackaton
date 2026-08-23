import { readFileSync, unlinkSync } from "node:fs";
import path from "node:path";
import * as qvac from "@qvac/sdk";
import type { CandidatoCrudo, EntradaSugerencia, Recomendador } from "../application/ports.js";
import { armarPrompt, platosElegibles } from "./recomendador-qvac.js";

/**
 * Recomendador con el modelo local de QVAC, **dentro del proceso**.
 *
 * POR QUÉ ESTE Y NO EL DE HTTP
 * ────────────────────────────
 * El de HTTP (`RecomendadorQvac`) se escribió a ciegas: no tenía el SDK a mano
 * y adivinar la firma de un método era la forma más rápida de que el track te
 * descarte. Con `@qvac/sdk@0.17.1` instalado, las firmas ya no se adivinan —
 * se leen en `node_modules/@qvac/sdk/dist/**.d.ts`. Este adaptador usa las de
 * verdad, y con eso desaparecen dos problemas:
 *
 *   1. No hay servidor que levantar aparte. Antes, si te olvidabas de correr
 *      `qvac serve openai --preload <modelo>`, la demo salía por el plan B.
 *      Acá el modelo lo carga la app.
 *   2. Se destraba `responseFormat`, que es lo que hace que esto funcione.
 *
 * LA PARTE QUE IMPORTA: EL MODELO NO PUEDE INVENTAR UN PLATO
 * ──────────────────────────────────────────────────────────
 * QVAC convierte un JSON Schema a gramática GBNF y **restringe el muestreo**:
 * el modelo no elige entre todos los tokens, elige entre los que la gramática
 * permite. Si el campo `id` es un `enum` con los ids de la carta de hoy, un id
 * que no está en la carta es literalmente inalcanzable.
 *
 * Medido acá, con Llama 3.2 1B Q4_0 en CPU, mismo prompt:
 *
 *   sin esquema  -> "Lo siento, pero no puedo cumplir con la solicitud de
 *                    recomendar más de 3 platos de la carta."   (0 sugerencias)
 *   con esquema  -> {"sugerencias":[{"id":"flat-white",
 *                                    "motivo":"por ser pedido repetido"}]}
 *
 * Un modelo de mil millones de parámetros se niega en prosa cuando lo dejás
 * suelto. No es que "prompteás mejor": lo que cambia es que la gramática no lo
 * deja escribir otra cosa.
 *
 * El enum no sale de la carta entera sino de `platosElegibles`: lo que hay con
 * stock **y** no le rompe la dieta a esta persona. Para una clienta celíaca,
 * la gramática directamente no contiene los ids con gluten. No es que el
 * modelo "sabe que no debe": no los puede escribir.
 *
 * QUÉ **NO** RESUELVE EL ESQUEMA — y por eso la validación sigue estando
 * ──────────────────────────────────────────────────────────────────────
 *   - Puede repetir el mismo id dos veces: un `enum` no expresa unicidad y
 *     GBNF tampoco. Lo ataja `validar()` y se ve en pantalla como "repetida".
 *   - La carta puede cambiar entre que se arma el prompt y vuelve la
 *     respuesta: son unos diez segundos, y la cocina marca sin stock en vivo.
 *   - El plan B no pasa por acá. Sin gramática que lo sujete, tiene que
 *     filtrar por su cuenta —y no lo hacía, ver `RecomendadorHeuristico`.
 *
 * Por eso `validar()` sigue corriendo sobre TODO lo que llega, venga de donde
 * venga. Que el camino principal sea seguro por construcción no es motivo para
 * sacar el colador: el costo de equivocarse acá no es una recomendación fea,
 * es que un celíaco coma gluten.
 *
 * EL CLAVO CON EL QUE TROPEZAMOS
 * ──────────────────────────────
 * Si el proceso anterior murió de mala manera, queda `~/.qvac/.worker.lock`
 * apuntando a un pid que ya no existe, y el SDK se cuelga 30 s y tira
 * RPC_INIT_TIMEOUT. Nos costó media hora la primera vez.
 *
 * `limpiarLockHuerfano()` corre antes de cada carga y lo resuelve solo. Y si
 * igual aparece un RPC_INIT_TIMEOUT por otro motivo, `explicar()` lo traduce a
 * castellano en vez de dejarte con un código numérico.
 */
export class RecomendadorQvacSdk implements Recomendador {
  readonly nombre = "qvac-local" as const;

  private modelId: string | null = null;
  private cargando: Promise<boolean> | null = null;
  private fallo: string | null = null;
  private ultima: EstadisticasCorrida | null = null;

  constructor(
    private readonly descriptor: DescriptorModelo,
    private readonly opciones: { device: string; ctxSize: number } = { device: "cpu", ctxSize: 2048 },
  ) {}

  /** Lo que se muestra en pantalla y va al README. Lo reporta el SDK, no yo. */
  get modeloUsado(): string {
    return this.descriptor.modelId ?? this.descriptor.name;
  }

  estado(): EstadoQvac {
    return {
      paquete: "@qvac/sdk",
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

  /**
   * Carga el modelo una sola vez. Idempotente a propósito: la llama el arranque
   * y la vuelve a llamar cada request, y tiene que ser la misma promesa.
   */
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

  async disponible(): Promise<boolean> {
    return this.arrancar();
  }

  async sugerir(entrada: EntradaSugerencia): Promise<CandidatoCrudo[]> {
    if (!(await this.arrancar())) return [];
    const modelId = this.modelId;
    if (!modelId) return [];

    // El enum y la lista del prompt salen de la MISMA función. Si se separan,
    // el modelo ve un plato que la gramática no lo deja nombrar y se queda
    // trabado generando cualquier cosa.
    const ids = platosElegibles(entrada.carta, entrada.preferencias).map((i) => i.id);
    if (ids.length === 0) return [];

    const t0 = Date.now();
    let texto = "";
    try {
      const corrida = qvac.completion({
        modelId,
        history: [
          { role: "system", content: SISTEMA },
          // El ejemplo va como una conversación ANTERIOR, no adentro del
          // system. Ver el comentario de EJEMPLO: la diferencia es entre
          // mostrarle un molde para rellenar y mostrarle un caso ya resuelto.
          { role: "user", content: EJEMPLO_PEDIDO },
          { role: "assistant", content: EJEMPLO_RESPUESTA },
          { role: "user", content: armarPrompt(entrada) },
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
      return [];
    }

    return leerRespuesta(texto);
  }

  /** Libera el modelo y baja el worker. Se llama al cerrar el servidor. */
  async cerrar(): Promise<void> {
    try {
      if (this.modelId) await qvac.unloadModel({ modelId: this.modelId });
      await qvac.close();
    } catch {
      // Si el worker ya se murió, no hay nada que cerrar. No es un error.
    } finally {
      this.modelId = null;
    }
  }
}

/**
 * El descriptor de un modelo del registro de QVAC.
 *
 * Se toma prestado el tipo de una constante real en vez de escribirlo a mano:
 * así, si el SDK cambia la forma del descriptor, esto no compila y me entero
 * acá y no en la demo.
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

/**
 * El esquema que se convierte en gramática.
 *
 * `enum: ids` es toda la gracia: la lista son los ids de los platos que hoy
 * están disponibles, así que el modelo no tiene forma de nombrar otro.
 *
 * `maxItems: 3` también lo garantiza la gramática — el "máximo 3" del prompt
 * era una sugerencia que el modelo podía ignorar, esto no.
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
            // El largo también lo pone la gramática. "Máximo 12 palabras" en el
            // prompt el modelo lo ignoraba y escribía párrafos.
            //
            // El tope está en 90 y no en 70 por algo que se vio probando: la
            // gramática corta en el carácter exacto, sin mirar dónde termina la
            // palabra, y salió al aire un "...no te gusta la idea de que esté
            // sin-gl". Un techo alto hace que casi nunca toque, y para la vez
            // que toque está `recortarBien` abajo.
            motivo: { type: "string", maxLength: 90 },
          },
          required: ["id", "motivo"],
        },
      },
    },
    required: ["sugerencias"],
  };
}

/**
 * Lee la respuesta del modelo.
 *
 * Con el esquema puesto esto tendría que ser un `JSON.parse` y listo. Igual se
 * banca el caso raro —un corte por límite de tokens deja el JSON por la mitad—
 * devolviendo lista vacía en vez de reventar el request.
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
    salida.push({ id, motivo: recortarBien(motivo, 80) });
  }
  return salida;
}

/**
 * Recorta sin cortar palabras por la mitad.
 *
 * La gramática ya limita el campo, pero corta contando caracteres: si el tope
 * cae en medio de "sin-gluten", el mozo termina diciendo "...que esté sin-gl".
 * Preferimos una oración más corta y entera que una larga y mutilada.
 */
export function recortarBien(texto: string, largo: number): string {
  if (texto.length <= largo) return texto;
  const cortado = texto.slice(0, largo);
  const ultimoEspacio = cortado.lastIndexOf(" ");
  // Si no hay un espacio razonablemente cerca del final es una sola palabra
  // larguísima; ahí sí no queda otra que cortarla.
  const base = ultimoEspacio > largo * 0.6 ? cortado.slice(0, ultimoEspacio) : cortado;
  return base.replace(/[\s,;:.]+$/, "") + "…";
}

/**
 * El prompt del sistema.
 *
 * La primera versión decía "el motivo va en castellano rioplatense, una sola
 * oración, máximo 12 palabras" y el modelo devolvía, literalmente:
 *
 *     {"id":"gin-citrico","motivo":"castellano rioplatense"}
 *     {"id":"gin-citrico","motivo":"rio plata"}
 *
 * Un modelo de 1B no distingue bien entre "así tenés que escribir el campo" y
 * "esto es lo que va adentro del campo": con la gramática obligándolo a llenar
 * un string, agarra las palabras que tiene más a mano, y son las de la propia
 * instrucción. La gramática garantiza la forma, no el sentido.
 *
 * Lo que lo arregla es no describir el campo sino mostrarlo lleno. El ejemplo
 * de abajo hace más que cualquier adjetivo sobre el registro del castellano.
 */
const SISTEMA = `Sos el mozo de un café en Buenos Aires y te acordás de los clientes que vuelven.

Te paso la carta de hoy y lo que este cliente pidió otras veces.
Elegí hasta 3 platos y en "motivo" escribile a él, de vos, por qué se lo recomendás.

En "motivo" le hablás AL CLIENTE, tratándolo de vos, en una oración corta.
Nunca escribas "el cliente" ni "es un amante de". Escribí "la pedís", "te gusta", "pediste".
El motivo tiene que hablar de ESTE cliente y de ESTA carta: si sirve para cualquiera, no sirve.
No repitas el mismo plato dos veces.
Si no se te ocurre nada bueno, poné menos platos: mejor uno que le sirva que tres al azar.`;

/**
 * El ejemplo de una vuelta anterior.
 *
 * NO va adentro del prompt del sistema, y la diferencia no es cosmética.
 *
 * Con el ejemplo metido en las instrucciones, tanto Llama 1B como Qwen 4B
 * devolvían el motivo del ejemplo **palabra por palabra**, para platos que no
 * tenían nada que ver: "La pedís siempre y hoy pega el calor" salió en los tres
 * casos de prueba seguidos, incluso para una clienta que nunca había pedido esa
 * limonada. Un ejemplo dentro de las reglas se lee como un molde para rellenar.
 *
 * Puesto como turno de usuario + turno de asistente, se lee como "así se
 * resolvió el caso anterior". Y la carta del ejemplo es de otro café a
 * propósito: ninguno de estos ids existe en la carta real, así que copiar el
 * motivo tal cual no le sirve de nada — la gramática ni siquiera lo dejaría
 * escribir esos ids.
 */
const EJEMPLO_PEDIDO = `CARTA DISPONIBLE HOY:
1. id=cafe-con-leche · Café con leche · Café
2. id=tarta-frutal · Tarta de frutas · Panadería
3. id=sopa-calabaza · Sopa de calabaza · Entradas

LO QUE ESTE CLIENTE PIDIÓ ANTES:
- Café con leche (6 veces)
- Sopa de calabaza (1 vez)

Recomendale hasta 3 platos de la carta de arriba.`;

const EJEMPLO_RESPUESTA = `{"sugerencias":[{"id":"cafe-con-leche","motivo":"El de siempre, ya te lo vamos preparando."},{"id":"tarta-frutal","motivo":"Nunca la probaste y sale bien con el café."}]}`;

/**
 * Borra `~/.qvac/.worker.lock` si apunta a un proceso que ya no existe.
 *
 * El SDK deja ese archivo mientras el worker vive. Si el proceso se baja bien
 * —Ctrl+C, que engancha `cerrar()`— se limpia solo. Si lo matan a la fuerza
 * (Stop-Process, un corte de luz, el administrador de tareas), queda apuntando
 * a un pid muerto y **el próximo arranque se cuelga 30 segundos y falla** con
 * RPC_INIT_TIMEOUT. Verificado: matando el server con `Stop-Process -Force` el
 * lock queda ahí.
 *
 * Perder cinco minutos por esto en una demo es inaceptable, así que se limpia
 * solo. La condición es estricta a propósito: se borra ÚNICAMENTE si el pid
 * anotado no responde. Si hay otra instancia viva —dos terminales corriendo la
 * app, por ejemplo— el archivo no se toca y el SDK resuelve lo que tenga que
 * resolver. Borrar el lock de un worker vivo sería bastante peor que el
 * problema que arregla.
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
      // ESRCH = no existe. EPERM = existe pero es de otro usuario, así que
      // tampoco se toca.
      if ((error as NodeJS.ErrnoException).code !== "ESRCH") return;
    }

    unlinkSync(ruta);
    console.log(`  QVAC: había un lock de un worker muerto (pid ${pid}). Lo borré.`);
  } catch {
    // No existe, no se puede leer, o no es JSON: no hay nada que limpiar.
  }
}

/**
 * Traduce el error del SDK a algo que se pueda leer a las tres de la mañana.
 *
 * El caso del lock es el que más tiempo nos comió: 30 segundos colgado y un
 * código numérico. Que lo diga con todas las letras.
 */
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
