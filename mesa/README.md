# Mesa Abierta

> Aleph Hackathon 2026 · Tether

Pedidos por QR para restaurantes. Cada comensal entra desde su mesa, arma su
pedido, sigue el estado en tiempo real y paga lo suyo o toda la mesa en USD₮.

Dos piezas hacen el trabajo pesado, y las dos son de Tether:

- **WDK CLI** es el backend de billetera del checkout: `wdk send --dry-run` →
  confirmación humana → `wdk send` en Sepolia.
- **QVAC** corre un modelo de 4B en la máquina del local. No asiste a la carta
  y ya: **opera la billetera**. El encargado le escribe en castellano y el
  modelo elige qué comando de WDK CLI usar, lo usa, y lee lo que volvió.

Nada de eso sale de la máquina. No hay API key en ningún lado.

```bash
npm install --allow-scripts=@tetherto/wdk-cli
npm run build
npm start
```

| Pantalla | Quién la usa |
|---|---|
| `http://localhost:3000/mesa/12` | El comensal |
| `http://localhost:3000/mesa/12/pedido` | Sus pedidos |
| `http://localhost:3000/cocina` | Cocina y caja — **acá está el agente** |

Node ≥ 22.18.0. La primera corrida baja el modelo (2,5 GB) a `~/.qvac/models`
con progreso en la terminal. Después arranca en ~11 s.

---

## El agente de caja

Esto es lo que hay que mirar primero. Es una sola función del producto que cae
en los dos tracks a la vez.

El encargado escribe **"¿cuánto tenemos en la caja?"** y un Qwen3 4B que corre
en la CPU del local decide llamar a `ver_saldo`, que por debajo es
`wdk get balance --network sepolia --token usdt --json`. Lee la respuesta y
contesta con **ese** número.

Escribe **"cobrale 12 USDT a la mesa"** y el modelo llama a `cotizar_cobro`,
que es `wdk send --dry-run --json`. La vista previa queda esperando que una
persona confirme.

Escribe **"cobrale 500 USDT"** y no pasa nada, porque una política lo frena
antes de tocar el CLI — y el rechazo vuelve al modelo, que tiene que
explicárselo al encargado.

### El modelo de seguridad

Tres capas, y ninguna confía en la de arriba.

**1 · La gramática.** El agente no escribe texto libre que después se parsea:
escribe contra un JSON Schema que QVAC convierte a gramática GBNF y usa para
**restringir el muestreo**. `accion` es un `enum` de cuatro valores y
`destinatario` es un `enum` de la allowlist.

Una dirección arbitraria no es "algo que le pedimos que no haga": **es un token
que la gramática no puede emitir.** No hay prompt que lo destrabe, porque no
pasa por el prompt. Una inyección en el campo de texto tampoco, por el mismo
motivo.

**2 · Las políticas, en código.** Tope por operación y tope diario se evalúan
en TypeScript, sobre la propuesta ya emitida, **antes** de tocar el CLI. Salen
del entorno (`AGENTE_TOPE_OPERACION`, `AGENTE_TOPE_DIARIO`,
`AGENTE_DESTINATARIOS`): son *user-defined guardrails* de verdad, no constantes
escondidas.

**3 · El humano.** `wdk send` —el que transmite— **no está entre las acciones
del agente**. El agente llega hasta el dry-run y ahí se termina su alcance. Hay
un test que falla si alguien agrega una acción que transmita.

El peor caso de que el modelo se vuelva loco es que proponga un dry-run a la
caja del local por un monto bajo el tope. Es lo mismo que puede hacer el botón
de cobrar.

### Dónde mirar

| Qué | Permalink |
|---|---|
| **El bucle del agente y las políticas** | [`agente-caja.ts`](https://github.com/Onaai/Menu-Hackaton/blob/32e31e3a2a809ca946891cdb085af5146376d38c/mesa/src/application/agente-caja.ts) |
| Las cuatro acciones — ninguna transmite | [L106](https://github.com/Onaai/Menu-Hackaton/blob/32e31e3a2a809ca946891cdb085af5146376d38c/mesa/src/application/agente-caja.ts#L106) |
| El tope por operación, antes del CLI | [L220](https://github.com/Onaai/Menu-Hackaton/blob/32e31e3a2a809ca946891cdb085af5146376d38c/mesa/src/application/agente-caja.ts#L220) |
| La allowlist, chequeada en código | [L214](https://github.com/Onaai/Menu-Hackaton/blob/32e31e3a2a809ca946891cdb085af5146376d38c/mesa/src/application/agente-caja.ts#L214) |
| **La allowlist hecha gramática** | [`motor-agente-qvac.ts` L69](https://github.com/Onaai/Menu-Hackaton/blob/32e31e3a2a809ca946891cdb085af5146376d38c/mesa/src/infrastructure/motor-agente-qvac.ts#L69) |
| El esquema completo del paso | [L59-L76](https://github.com/Onaai/Menu-Hackaton/blob/32e31e3a2a809ca946891cdb085af5146376d38c/mesa/src/infrastructure/motor-agente-qvac.ts#L59-L76) |
| Las herramientas, contra WDK CLI real | [`herramientas-wdk-cli.ts`](https://github.com/Onaai/Menu-Hackaton/blob/32e31e3a2a809ca946891cdb085af5146376d38c/mesa/src/infrastructure/herramientas-wdk-cli.ts) |
| El test que impide agregar una acción que transmita | [`agente-caja.test.ts`](https://github.com/Onaai/Menu-Hackaton/blob/32e31e3a2a809ca946891cdb085af5146376d38c/mesa/tests/agente-caja.test.ts) |

---

## Integración con WDK

```
@tetherto/wdk-cli@1.0.0-beta.2
@tetherto/wdk@1.0.0-beta.16
@tetherto/wdk-wallet-evm@1.0.0-beta.17
```

El checkout no llama a una librería: **hace `spawn` del binario `wdk`** y parsea
su `--json`. El flujo completo es dry-run → confirmación humana separada →
send, con la vista previa expirable, de un solo uso y atada al monto.

| Qué | Permalink |
|---|---|
| **El gateway de WDK CLI** | [`wdk-cli-checkout-gateway.ts`](https://github.com/Onaai/Menu-Hackaton/blob/32e31e3a2a809ca946891cdb085af5146376d38c/mesa/src/infrastructure/wdk-cli-checkout-gateway.ts) |
| `wdk send --dry-run --json` | [L43-L67](https://github.com/Onaai/Menu-Hackaton/blob/32e31e3a2a809ca946891cdb085af5146376d38c/mesa/src/infrastructure/wdk-cli-checkout-gateway.ts#L43-L67) |
| `wdk send --json` (transmite) | [L69](https://github.com/Onaai/Menu-Hackaton/blob/32e31e3a2a809ca946891cdb085af5146376d38c/mesa/src/infrastructure/wdk-cli-checkout-gateway.ts#L69) |
| El preview se marca usado **antes** del broadcast | [L78](https://github.com/Onaai/Menu-Hackaton/blob/32e31e3a2a809ca946891cdb085af5146376d38c/mesa/src/infrastructure/wdk-cli-checkout-gateway.ts#L78) |
| Las políticas del SDK (`ALLOW`/`DENY`) | [`wdk-policy-gateway.ts`](https://github.com/Onaai/Menu-Hackaton/blob/32e31e3a2a809ca946891cdb085af5146376d38c/mesa/src/infrastructure/wdk-policy-gateway.ts) |

Un `send` exitoso es el punto irreversible: si después falla la lectura de
balances, igual se devuelve el recibo, para que la app registre el broadcast y
nunca invite a pagar dos veces.

### Preparar las wallets — lo hacés vos

Crear una wallet genera una frase semilla y pide passphrase. Eso no lo hace la
app ni ningún asistente:

```bash
npm run wallets:setup
```

Después, con TTL corto y solo mientras dure la prueba:

```bash
wdk wallet unlock --name mesa-cliente-demo --ttl 5
```

**La seed y la passphrase no van a `.env`, ni a los logs, ni al repo, ni al
video.** Sepolia y wallets dedicadas: nunca una personal, nunca mainnet.

---

## Integración con QVAC

```
@qvac/sdk@0.17.1
```

El modelo lo carga **esta misma app, en su proceso**. No hay servidor que
levantar aparte. Lo único que toca la red es la descarga del modelo, una sola
vez; después la app anda con el cable desenchufado.

| Qué | Permalink |
|---|---|
| `loadModel` | [`qvac-sdk-assistant.ts` L88](https://github.com/Onaai/Menu-Hackaton/blob/32e31e3a2a809ca946891cdb085af5146376d38c/mesa/src/infrastructure/qvac-sdk-assistant.ts#L88) |
| `completion` con `responseFormat` | [L137](https://github.com/Onaai/Menu-Hackaton/blob/32e31e3a2a809ca946891cdb085af5146376d38c/mesa/src/infrastructure/qvac-sdk-assistant.ts#L137) |
| La misma vuelta, reusada por el agente | [L184](https://github.com/Onaai/Menu-Hackaton/blob/32e31e3a2a809ca946891cdb085af5146376d38c/mesa/src/infrastructure/qvac-sdk-assistant.ts#L184) |
| **El esquema que se vuelve gramática** | [L313-L340](https://github.com/Onaai/Menu-Hackaton/blob/32e31e3a2a809ca946891cdb085af5146376d38c/mesa/src/infrastructure/qvac-sdk-assistant.ts#L313-L340) |
| Qué platos puede nombrar esta persona | [L300](https://github.com/Onaai/Menu-Hackaton/blob/32e31e3a2a809ca946891cdb085af5146376d38c/mesa/src/infrastructure/qvac-sdk-assistant.ts#L300) |

### El modelo no puede inventar un plato

El `enum` del campo `id` no es la carta entera: es lo que hay con stock **y** no
le rompe la restricción alimentaria a quien pregunta. Para una comensal
celíaca, los ids con gluten **no están en la gramática**.

Misma consulta, distinta restricción, medido contra la API:

```
sin restricciones →  Burrata de estación · Papas bravas
sin-gluten        →  Risotto · Pesca del día · Limonada    ← la burger no aparece
vegano            →  Limonada de menta
```

Y lo que cambia al poner el esquema, con el modelo chico y el mismo prompt:

```
sin esquema  →  "Lo siento, pero no puedo cumplir con la solicitud..."   0 sugerencias
con esquema  →  {"sugerencias":[{"id":"burger","motivo":"..."}]}
```

Un modelo de mil millones de parámetros se niega en prosa cuando lo dejás
suelto. Con la gramática puesta no puede escribir otra cosa.

---

## Evidence, not vibes

El track pide correr la misma tarea N veces y mostrar el porcentaje. Hay dos
arneses y los dos imprimen su tabla.

### El asistente de la carta — 60 llamadas

```bash
node scripts/confiabilidad-qvac.mjs QWEN3_4B_INST_Q4_K_M 15
```

```
caso                              devolvió  id en carta  restricción  sin repetir* sin copiar  sin cortar  mediana
consulta libre                    100%      100%         100%         100%         100%        100%        16571 ms
celíaca — el caso que importa     100%      100%         100%         100%         100%         87%        11542 ms
vegana — una sola opción elegible 100%      100%         100%          53%         100%        100%         7824 ms
algo que no está en la carta      100%      100%         100%         100%         100%         93%        12394 ms
TOTAL                             100%      100%         100%          88%         100%         95%        12393 ms

platos ofrecidos: 106 · descartados por el validador: 7 · p95 16690 ms
```

**Las dos columnas que importan dan 100% en 60 corridas**: el id siempre existe
en la carta y la restricción alimentaria siempre se respeta. Eso no es mérito
del modelo, es la gramática.

**El 53% es el hallazgo honesto.** Cuando queda una sola opción elegible —una
comensal vegana en esta carta— el modelo llena los tres lugares repitiendo el
mismo plato. Un `enum` no expresa unicidad y GBNF tampoco, así que la gramática
no puede evitarlo: lo ataja el validador, y de ahí salen los 7 descartes.

> `*` La columna se mide sobre lo que dijo el **modelo**, antes del validador.
> La primera versión la medía después y daba 100% siempre, mientras el contador
> de descartes marcaba 7. Las dos cosas no podían ser ciertas. Un número que no
> puede fallar no es evidencia.

### El agente de caja — 50 consultas

```bash
node scripts/confiabilidad-agente.mjs QWEN3_4B_INST_Q4_K_M 10
```

<!-- TABLA_AGENTE -->

Las herramientas de este arnés son deterministas **a propósito**: lo que se mide
es el modelo, no WDK CLI. El saldo de prueba es `37.42`, un número que no
aparece en ningún prompt ni en ningún ejemplo. Si el modelo lo dice en la
respuesta es porque lo leyó de la herramienta y no de su memoria — que es justo
la falla que el track nombra. El camino con el CLI de verdad se ejercita en la
app y en `tests/wdk-cli-checkout-gateway.test.ts`.

---

## Modelo y hardware

```
Modelo:        Qwen3-4B-Instruct        (constante QWEN3_4B_INST_Q4_K_M)
Cuantización:  Q4_K_M · 2,50 GB
Alternativa:   Llama-3.2-1B-Instruct Q4_0 · 0,77 GB   (QVAC_MODELO_SDK=...)
Motor:         llamacpp-completion · ctx 4096
Máquina:       Windows 11 · AMD Ryzen AI 9 365 · 10 núcleos / 20 hilos · 31 GB RAM
Inferencia:    CPU
Carga:         11,5 s con el modelo ya bajado
Latencia:      asistente de carta — mediana 12,4 s · p95 16,7 s
```

`GET /api/qvac` devuelve modelo, cuantización, motor y la última corrida.
`GET /api/agente` devuelve las políticas vigentes y cuánto se usó hoy. Ningún
número de este README está estimado.

---

## Probado

```bash
npm run typecheck && npm test
# tests 49 · pass 49 · fail 0
```

Verificado además a mano: el asistente respondiendo consultas libres por HTTP
con las tres restricciones; el arranque cargando el modelo; el apagado ordenado
liberando el worker; y la interfaz en el navegador cayendo al motor
determinista y **diciéndolo** cuando QVAC está apagado.

### Lo que NO está verificado

- **El broadcast on-chain.** Hace falta crear las dos wallets de Sepolia y
  financiarlas con USD₮ de testnet, y eso lo hace una persona con su seed. Hasta
  que esa prueba corra, el pago on-chain **no se presenta como verificado**.
- **El motivo puede ser vacío de contenido** aunque sea gramaticalmente
  perfecto. Ninguna gramática puede exigir que una oración sea útil, y ningún
  validador puede medirlo sin poner otro modelo a juzgar.
- **Con una sola opción elegible el modelo repite** el 47% de las veces. Lo
  ataja el validador; el modelo lo sigue haciendo.

---

## Seguridad

- Sepolia únicamente para el camino transmisible. Wallets dedicadas.
- La seed y la passphrase nunca llegan al frontend, al backend, ni al repo. El
  backend solo usa nombres de wallet y direcciones públicas, vía el CLI.
- El camino transmisible **falla cerrado**: si WDK no autoriza, no se cobra. Un
  fallback simulado nunca autoriza un broadcast.
- Dry-run obligatorio, confirmación humana separada, preview de un solo uso
  atado al monto y con vencimiento.
- El agente local no puede transmitir ni nombrar un destinatario fuera de la
  allowlist.

Detalle en [`docs/WDK.md`](docs/WDK.md).

---

## Arquitectura

```
src/domain/          modelo y reglas
src/application/     casos de uso · el agente y sus políticas
src/infrastructure/  WDK CLI, políticas WDK, QVAC SDK, memoria
src/api/             HTTP
web/                 React + Vite: comensal y cocina/caja
tests/               49 tests con node:test
scripts/             setup de wallets y los dos arneses de confiabilidad
```

La base de producto y la interfaz vienen de
[`Pipeballes/hackatonfeli2`](https://github.com/Pipeballes/hackatonfeli2), rama
`feature-wdk-cli-wallet-flow`, que es de donde sale la integración con WDK CLI.
Lo que se sumó es la inferencia local: el asistente de la carta con gramática,
el agente de caja, los dos arneses de confiabilidad, y un arreglo del servidor
estático que en Windows impedía servir el frontend.
