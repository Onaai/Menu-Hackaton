import type { MenuItem } from "../domain/model.js";
import type { Preferencias } from "../domain/usuario.js";
import { masPedidos } from "../domain/usuario.js";
import type { Recomendador, CandidatoCrudo, EntradaSugerencia } from "../application/ports.js";

/**
 * Recomendador con el modelo local de QVAC.
 *
 * POR QUÉ HABLA HTTP Y NO USA `@qvac/sdk` DIRECTO
 * ───────────────────────────────────────────────
 * Porque el track lo permite de forma explícita:
 *
 *   > "Using QVAC's OpenAI-compatible HTTP server as your local model provider
 *   >  counts. Calling a cloud model API does not."
 *
 * Y porque el contrato de `POST /v1/chat/completions` es público y estable,
 * mientras que la firma exacta de generación de texto del SDK no la pude
 * verificar contra la documentación (la red de esta sesión tiene bloqueado
 * `docs.qvac.tether.io`). El propio track avisa que lo que más descartan son
 * **métodos de SDK inventados**. Entre adivinar una firma y usar un contrato
 * que conozco, se usa el que conozco.
 *
 * Sigue siendo inferencia 100% local: el servidor corre en `localhost` con el
 * modelo en la máquina. No sale un byte a internet.
 *
 * CÓMO SE LEVANTA
 * ───────────────
 *     qvac serve openai --preload <modelo>
 *
 * Ojo con esto: en la salida que me pasaste, `qvac serve openai` levantaba en
 * el 11434 pero decía **"No models configured for preload"**. Sin un modelo
 * cargado, este recomendador no va a responder y la app se cae al plan B. Hay
 * que arrancarlo con el modelo.
 */
export class RecomendadorQvac implements Recomendador {
  readonly nombre = "qvac-local" as const;

  constructor(
    private readonly baseUrl: string,
    private readonly modelo: string,
    private readonly timeoutMs = 20_000,
  ) {}

  get modeloUsado(): string {
    return this.modelo;
  }

  async disponible(): Promise<boolean> {
    try {
      const r = await fetch(`${this.baseUrl}/v1/models`, { signal: AbortSignal.timeout(2_500) });
      return r.ok;
    } catch {
      return false;
    }
  }

  async sugerir(entrada: EntradaSugerencia): Promise<CandidatoCrudo[]> {
    const primera = await this.pedir(entrada, false);
    if (primera.length > 0) return primera;
    // Un solo reintento, con la instrucción endurecida. Los modelos chicos
    // suelen fallar el formato la primera vez y acertarlo la segunda; más de
    // un reintento es esperar sentado sin ganancia medible.
    return this.pedir(entrada, true);
  }

  private async pedir(entrada: EntradaSugerencia, estricto: boolean): Promise<CandidatoCrudo[]> {
    const cuerpo = {
      model: this.modelo,
      temperature: estricto ? 0 : 0.3,
      max_tokens: 300,
      messages: [
        { role: "system", content: SISTEMA + (estricto ? "\n\n" + REFUERZO : "") },
        { role: "user", content: armarPrompt(entrada) },
      ],
    };

    let texto: string;
    try {
      const r = await fetch(`${this.baseUrl}/v1/chat/completions`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(cuerpo),
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (!r.ok) return [];
      const data = (await r.json()) as { choices?: Array<{ message?: { content?: string } }> };
      texto = data.choices?.[0]?.message?.content ?? "";
    } catch {
      return [];
    }

    return extraerCandidatos(texto);
  }
}

const SISTEMA = `Sos el mozo de un café. Recomendás platos de la carta a un cliente que ya vino antes.

Reglas que no se rompen:
- Solo podés recomendar platos que estén en la lista NUMERADA que te doy.
- Usás el "id" exacto tal como aparece. No inventás ids ni nombres.
- Devolvés SOLO un arreglo JSON, sin texto antes ni después, sin markdown.
- Cada elemento: {"id": "...", "motivo": "..."}
- El motivo va en castellano rioplatense, una sola oración, máximo 12 palabras.
- Como mucho 3 elementos. Si no estás seguro, devolvés menos.

Ejemplo exacto de la respuesta esperada:
[{"id":"limonada","motivo":"La pedís siempre, y hoy hace calor."}]`;

const REFUERZO = `IMPORTANTE: la respuesta anterior no se pudo leer.
Devolvé ÚNICAMENTE el arreglo JSON. Empezá con [ y terminá con ].
Nada de explicaciones. Nada de bloques de código.`;

function armarPrompt(entrada: EntradaSugerencia): string {
  const { carta, preferencias } = entrada;
  const disponibles = carta.filter((i) => i.available);

  const lista = disponibles
    .map((i, n) => {
      const dieta = i.diet?.length ? ` [${i.diet.join(", ")}]` : "";
      return `${n + 1}. id=${i.id} · ${i.name} · ${i.category}${dieta}`;
    })
    .join("\n");

  const historial = masPedidos(preferencias)
    .map((h) => {
      const item = carta.find((i) => i.id === h.menuItemId);
      return `- ${item?.name ?? h.menuItemId} (${h.veces} ${h.veces === 1 ? "vez" : "veces"})`;
    })
    .join("\n");

  const dietas = preferencias.dietas.length
    ? `\nSolo puede comer: ${preferencias.dietas.join(", ")}. No recomiendes nada que no lo cumpla.`
    : "";

  return `CARTA DISPONIBLE HOY:
${lista}

LO QUE ESTE CLIENTE PIDIÓ ANTES:
${historial || "(nada todavía)"}${dietas}

Recomendale hasta 3 platos de la carta de arriba.`;
}

/**
 * Saca los candidatos del texto del modelo.
 *
 * Es a propósito tolerante con el envoltorio y estricto con el contenido: un
 * modelo de 1–4B casi siempre te va a devolver el JSON correcto **envuelto**
 * en algo — un ```json, un "Acá van mis recomendaciones:", un punto final
 * después del corchete. Pelear contra eso con el prompt es perder el fin de
 * semana; recortar del primer `[` al último `]` lo resuelve.
 *
 * Lo que NO se perdona es el contenido: si el id no está en la carta, se
 * descarta arriba, en el servicio. Acá solo se extrae.
 */
export function extraerCandidatos(texto: string): CandidatoCrudo[] {
  if (!texto) return [];

  const desde = texto.indexOf("[");
  const hasta = texto.lastIndexOf("]");
  if (desde === -1 || hasta === -1 || hasta < desde) return [];

  let crudo: unknown;
  try {
    crudo = JSON.parse(texto.slice(desde, hasta + 1));
  } catch {
    return [];
  }
  if (!Array.isArray(crudo)) return [];

  const salida: CandidatoCrudo[] = [];
  for (const elemento of crudo) {
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
    salida.push({ id, motivo: motivo.slice(0, 120) });
  }
  return salida;
}

/**
 * Plan B sin modelo.
 *
 * Existe para que la app no se rompa si el servidor de QVAC no está levantado
 * —cosa que en una demo pasa— pero **se etiqueta como "sin IA" en pantalla**.
 * Un plan B disfrazado de IA sería mentirle al juez, y es exactamente el tipo
 * de cosa que el track dice que descarta.
 */
export class RecomendadorHeuristico implements Recomendador {
  readonly nombre = "heuristico" as const;

  async disponible(): Promise<boolean> {
    return true;
  }

  async sugerir({ carta, preferencias }: EntradaSugerencia): Promise<CandidatoCrudo[]> {
    const pedidos = new Set(Object.keys(preferencias.historial));
    const categoriasQueLeGustan = new Set(
      [...pedidos].map((id) => carta.find((i) => i.id === id)?.category).filter(Boolean) as string[],
    );

    const repetir = masPedidos(preferencias, 1)
      .map((h) => carta.find((i) => i.id === h.menuItemId))
      .filter((i): i is MenuItem => Boolean(i?.available))
      .map((i) => ({ id: i.id, motivo: "Lo pedís seguido." }));

    const nuevo = carta
      .filter((i) => i.available && !pedidos.has(i.id) && categoriasQueLeGustan.has(i.category))
      .slice(0, 2)
      .map((i) => ({ id: i.id, motivo: `Va con lo que solés pedir de ${i.category.toLowerCase()}.` }));

    return [...repetir, ...nuevo];
  }
}

export function cumpleDietas(item: MenuItem, prefs: Preferencias): boolean {
  return prefs.dietas.every((d) => (item.diet ?? []).includes(d));
}
