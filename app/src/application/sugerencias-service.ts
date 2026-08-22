import type { MenuItem } from "../domain/model.js";
import type { Preferencias } from "../domain/usuario.js";
import { tieneHistorialUtil } from "../domain/usuario.js";
import { MAX_SUGERENCIAS, type RazonDescarte, type ResultadoSugerencias, type Sugerencia } from "../domain/sugerencia.js";
import type { Clock, MenuCatalog, Recomendador } from "./ports.js";

/**
 * Servicio de sugerencias.
 *
 * ACÁ ESTÁ LA PARTE QUE IMPORTA DEL TRACK DE QVAC, y no es llamar al modelo.
 * Llamar al modelo son diez líneas. Lo difícil —y lo que el track premia con
 * todas las letras— es que un modelo de 1 a 4 mil millones de parámetros
 * **inventa**: te recomienda un plato que no está en la carta, te repite el
 * mismo dos veces, te sugiere algo con gluten a un celíaco, o te devuelve
 * prosa donde pediste JSON.
 *
 * La respuesta de este servicio es no confiar en nada: **todo lo que dice el
 * modelo se verifica contra la carta real antes de mostrarse**, y lo que se
 * cae se cuenta y se muestra. El track pide textualmente
 * *"evidence, not vibes"* y *"show us the failures you couldn't fix"*.
 *
 * El caso que más importa es el de la dieta: si el modelo le sugiere una
 * tostada común a alguien que marcó sin gluten, acá se descarta. **El costo de
 * ese error no es una recomendación fea, es que un celíaco coma gluten.**
 */
export class SugerenciasService {
  constructor(
    private readonly menu: MenuCatalog,
    private readonly principal: Recomendador,
    private readonly respaldo: Recomendador,
    private readonly clock: Clock,
    private readonly modelo?: string,
  ) {}

  async para(preferencias: Preferencias, nombre: string): Promise<ResultadoSugerencias> {
    const inicio = Date.now();
    const carta = await this.menu.list();

    if (!tieneHistorialUtil(preferencias)) {
      return { sugerencias: [], motor: "heuristico", latenciaMs: 0, descartadas: [], degradado: false };
    }

    const entrada = { carta, preferencias, nombre };

    let motor = this.principal;
    let degradado = false;
    if (!(await this.principal.disponible())) {
      motor = this.respaldo;
      degradado = true;
    }

    let candidatos = await motor.sugerir(entrada);

    // Si el modelo estaba levantado pero no devolvió nada usable, no dejamos
    // la sección vacía: caemos al plan B y lo decimos.
    if (candidatos.length === 0 && motor === this.principal) {
      motor = this.respaldo;
      degradado = true;
      candidatos = await motor.sugerir(entrada);
    }

    const { sugerencias, descartadas } = validar(candidatos, carta, preferencias);

    return {
      sugerencias,
      motor: motor.nombre,
      ...(motor.nombre === "qvac-local" && this.modelo ? { modelo: this.modelo } : {}),
      latenciaMs: Date.now() - inicio,
      descartadas,
      degradado,
    };
  }
}

/**
 * La validación, separada del servicio para poder testearla sola.
 *
 * El orden de los chequeos importa y no es arbitrario: primero formato,
 * después existencia, después stock, después dieta, y último repetidos. Así el
 * motivo del descarte que se reporta es siempre **la primera cosa que estaba
 * mal**, que es la que le sirve a quien está depurando el prompt.
 */
export function validar(
  candidatos: Array<{ id: string; motivo: string; formatoInvalido?: boolean }>,
  carta: MenuItem[],
  preferencias: Preferencias,
): { sugerencias: Sugerencia[]; descartadas: Array<{ texto: string; razon: RazonDescarte }> } {
  const porId = new Map(carta.map((i) => [i.id, i]));
  const sugerencias: Sugerencia[] = [];
  const descartadas: Array<{ texto: string; razon: RazonDescarte }> = [];
  const yaPuestos = new Set<string>();

  for (const c of candidatos) {
    if (c.formatoInvalido || !c.id) {
      descartadas.push({ texto: c.motivo || "(vacío)", razon: "formato-invalido" });
      continue;
    }

    const item = porId.get(c.id);
    if (!item) {
      // El caso estrella: el modelo se inventó un plato.
      descartadas.push({ texto: c.id, razon: "no-existe-en-la-carta" });
      continue;
    }
    if (!item.available) {
      descartadas.push({ texto: item.name, razon: "sin-stock" });
      continue;
    }
    if (!preferencias.dietas.every((d) => (item.diet ?? []).includes(d))) {
      descartadas.push({ texto: item.name, razon: "rompe-la-dieta" });
      continue;
    }
    if (yaPuestos.has(item.id)) {
      descartadas.push({ texto: item.name, razon: "repetida" });
      continue;
    }

    yaPuestos.add(item.id);
    sugerencias.push({
      menuItemId: item.id,
      nombre: item.name,
      motivo: limpiarMotivo(c.motivo) || "Va con lo que solés pedir.",
    });

    if (sugerencias.length >= MAX_SUGERENCIAS) break;
  }

  return { sugerencias, descartadas };
}

/**
 * Una sola oración, sin comillas sueltas ni saltos.
 *
 * El orden importa y la primera versión lo tenía al revés: recortaba las
 * comillas ANTES de sacar los espacios, así que un motivo que venía como
 * `  "texto"  ` se quedaba con las comillas puestas — el ancla `^` no llegaba
 * a la comilla porque adelante había espacios. Se normaliza primero, se pelan
 * las comillas después.
 */
function limpiarMotivo(motivo: string): string {
  const limpio = motivo
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^["'`«]+|["'`»]+$/g, "")
    .trim();
  const corte = limpio.split(/(?<=[.!?])\s/)[0] ?? limpio;
  return corte.length > 90 ? `${corte.slice(0, 87)}…` : corte;
}
