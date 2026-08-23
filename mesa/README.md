# Al Toque

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

Además: cronómetro por comanda en cocina —ámbar a los 10 minutos, rojo a los
20—, botón de llamar al mozo con aviso en la pantalla del local, y tope de 3
comandas sin entregar por comensal, que es lo que frena a alguien que escanea el
QR, se va del restaurante y sigue pidiendo desde afuera.

Node ≥ 22.18.0. La primera corrida baja el modelo (2,5 GB) a `~/.qvac/models`
con progreso en la terminal. Después arranca en ~11 s.

---

## El agente de caja

Esto es lo que hay que mirar primero. Es una sola función del producto que cae
en los dos tracks a la vez.

El encargado escribe **"¿cuánto llevamos cobrado hoy?"** y un Qwen3 4B que corre
en la CPU del local decide llamar a `ver_caja`, lee el corte del día y contesta
con **esos** números:

```
> ¿cuánto llevamos cobrado hoy?
  1. [ver_caja]  → cobrado hoy $19.690 en 1 pagos · ingresos $17.900 · propinas $1.790 …
  2. [responder] → "Hoy se ha cobrado un total de $19.690, incluyendo $17.900
                    en ingresos y $1.790 en propinas."

> ¿qué mesas faltan pagar?
  1. [ver_mesas] → 1 mesas abiertas · mesa 5: 1 comensales, 1 sin pagar
  2. [responder] → "Hay 1 mesa abierta: mesa 5 con 1 comensal sin pagar."
```

Pregunta **"¿cuánto tenemos en la billetera del local?"** y el modelo llama a
`ver_saldo`, que por debajo es `wdk get balance --network sepolia --token usdt
--json`. El número que dice es el que devolvió el comando, no uno inventado —
eso se mide, más abajo.

Y si le pedís que prepare un cobro, llama a `cotizar_cobro`, que es
`wdk send --dry-run --json`. La vista previa queda esperando que una persona
confirme: **el agente nunca transmite**.

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

**2 · Las políticas, en código.** Tope por operación, tope diario y allowlist se
evalúan en TypeScript, sobre la propuesta ya emitida, **antes** de tocar el CLI.
Salen del entorno (`AGENTE_TOPE_OPERACION`, `AGENTE_TOPE_DIARIO`,
`AGENTE_DESTINATARIOS`): son *user-defined guardrails* de verdad, no constantes
escondidas.

Los valores por defecto —1000 USD₮ por operación, 5000 por día— están altos a
propósito. Arrancaron en 25 y 100, y en la práctica frenaban cuentas normales:
una mesa de cuatro ya pasa los 25, así que el agente chocaba con su propio tope
preparando un cobro que el botón de la cuenta sí permitía. Un tope que se
dispara con una cuenta común no protege, estorba. Cuando **sí** se disparan, el
rechazo vuelve al modelo como resultado de herramienta y aparece en la traza,
en ámbar, con el motivo.

**3 · El humano.** `wdk send` —el que transmite— **no está entre las acciones
del agente**. El agente llega hasta el dry-run y ahí se termina su alcance. Hay
un test que falla si alguien agrega una acción que transmita.

El peor caso de que el modelo se vuelva loco —o de que alguien le escriba una
inyección en el campo de texto— es que proponga un dry-run a la caja del local
por un monto bajo el tope. Es lo mismo que puede hacer el botón de cobrar.

### Dónde mirar

| Qué | Permalink |
|---|---|
| **El bucle del agente y las políticas** | [`agente-caja.ts`](https://github.com/Onaai/Menu-Hackaton/blob/d05032c674362240b6f718a47cfcf5b01278be8e/mesa/src/application/agente-caja.ts) |
| Las seis acciones — ninguna transmite | [L117](https://github.com/Onaai/Menu-Hackaton/blob/d05032c674362240b6f718a47cfcf5b01278be8e/mesa/src/application/agente-caja.ts#L117) |
| El tope por operación, antes del CLI | [L303](https://github.com/Onaai/Menu-Hackaton/blob/d05032c674362240b6f718a47cfcf5b01278be8e/mesa/src/application/agente-caja.ts#L303) |
| La allowlist, chequeada en código | [L297](https://github.com/Onaai/Menu-Hackaton/blob/d05032c674362240b6f718a47cfcf5b01278be8e/mesa/src/application/agente-caja.ts#L297) |
| **La allowlist hecha gramática** | [`motor-agente-qvac.ts` L97](https://github.com/Onaai/Menu-Hackaton/blob/d05032c674362240b6f718a47cfcf5b01278be8e/mesa/src/infrastructure/motor-agente-qvac.ts#L97) |
| El esquema completo del paso | [L84-L102](https://github.com/Onaai/Menu-Hackaton/blob/d05032c674362240b6f718a47cfcf5b01278be8e/mesa/src/infrastructure/motor-agente-qvac.ts#L84-L102) |
| Las herramientas, contra WDK CLI real | [`herramientas-wdk-cli.ts`](https://github.com/Onaai/Menu-Hackaton/blob/d05032c674362240b6f718a47cfcf5b01278be8e/mesa/src/infrastructure/herramientas-wdk-cli.ts) |
| El test que impide agregar una acción que transmita | [`agente-caja.test.ts`](https://github.com/Onaai/Menu-Hackaton/blob/d05032c674362240b6f718a47cfcf5b01278be8e/mesa/tests/agente-caja.test.ts) |

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
| **El gateway de WDK CLI** | [`wdk-cli-checkout-gateway.ts`](https://github.com/Onaai/Menu-Hackaton/blob/d05032c674362240b6f718a47cfcf5b01278be8e/mesa/src/infrastructure/wdk-cli-checkout-gateway.ts) |
| `wdk send --dry-run --json` | [L43-L67](https://github.com/Onaai/Menu-Hackaton/blob/d05032c674362240b6f718a47cfcf5b01278be8e/mesa/src/infrastructure/wdk-cli-checkout-gateway.ts#L43-L67) |
| `wdk send --json` (transmite) | [L69](https://github.com/Onaai/Menu-Hackaton/blob/d05032c674362240b6f718a47cfcf5b01278be8e/mesa/src/infrastructure/wdk-cli-checkout-gateway.ts#L69) |
| El preview se marca usado **antes** del broadcast | [L78](https://github.com/Onaai/Menu-Hackaton/blob/d05032c674362240b6f718a47cfcf5b01278be8e/mesa/src/infrastructure/wdk-cli-checkout-gateway.ts#L78) |
| Las políticas del SDK (`ALLOW`/`DENY`) | [`wdk-policy-gateway.ts`](https://github.com/Onaai/Menu-Hackaton/blob/d05032c674362240b6f718a47cfcf5b01278be8e/mesa/src/infrastructure/wdk-policy-gateway.ts) |

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

## Los otros dos métodos de pago

El checkout no es solo cripto, porque un restaurante tampoco lo es.

**Efectivo.** Ponés con cuánto paga la persona y el vuelto se calcula en vivo.
Con menos de lo que sale la cuenta dice *"Falta $5.180"* y no deja cobrar; con
un billete de más, el botón mismo dice *"Cobrar y dar $4.820 de vuelto"*. En el
celular el vuelto va **arriba** del campo, porque abajo lo tapa el teclado.

En el corte de caja va el número que casi siempre se hace mal: **en el cajón
queda lo cobrado, no lo recibido**. Entraron $20.000, salieron $4.820 de vuelto,
quedan $15.180. Contar lo recibido haría cerrar la caja de más todas las noches.

**Mercado Pago.** Un botón y un logo. No hay API, ni credenciales, ni webhook.
Se registra con `simulado: true` —un campo del tipo, no un comentario que se
desactualiza— y la pantalla lo dice.

Los dos caminos reusan las mismas validaciones que el de WDK: cuenta pedida, sin
mezclar formas de división, sin cobrar dos veces al mismo comensal. Un camino de
pago con reglas más flojas que el otro es como se cobra dos veces una mesa.

---

## El modo simulado de WDK CLI

Conseguir USD₮ de testnet en Sepolia lleva su tiempo, y sin saldo el checkout no
se puede mostrar: el preview sale, el `send` falla, y la demo queda por la
mitad. `WDK_CLI_MODE=simulado` enchufa un CLI de mentira con saldo inicial.

```bash
set "WDK_CLI_MODE=simulado" && set "WDK_SALDO_CLIENTE=50" && npm start
```

**No es un atajo escondido.** Se enchufa en el `CliRunner` que
`WdkCliCheckoutGateway` ya recibía por constructor, así que **el gateway no sabe
que existe**: el preview de un solo uso, el vencimiento, el amarre al monto y el
marcar-usado-antes-de-transmitir son exactamente los mismos. Lo único que cambia
es de dónde salen los bytes del JSON.

Y se grita en tres lugares: la terminal al arrancar, `GET /api/config`, y un
cartel ámbar en el checkout. Un pago simulado que se hace pasar por real es lo
que un jurado tiene que poder descartar de un vistazo.

Sin esa variable corre el binario `wdk` de verdad.

| Qué | Permalink |
|---|---|
| El CLI simulado | [`wdk-cli-simulado.ts`](https://github.com/Onaai/Menu-Hackaton/blob/d05032c674362240b6f718a47cfcf5b01278be8e/mesa/src/infrastructure/wdk-cli-simulado.ts) |
| Los pagos en efectivo y Mercado Pago | [`hackathon-extensions-service.ts`](https://github.com/Onaai/Menu-Hackaton/blob/d05032c674362240b6f718a47cfcf5b01278be8e/mesa/src/application/hackathon-extensions-service.ts) |
| Sus tests | [`pagos-locales.test.ts`](https://github.com/Onaai/Menu-Hackaton/blob/d05032c674362240b6f718a47cfcf5b01278be8e/mesa/tests/pagos-locales.test.ts) |

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
| `loadModel` | [`qvac-sdk-assistant.ts` L99](https://github.com/Onaai/Menu-Hackaton/blob/d05032c674362240b6f718a47cfcf5b01278be8e/mesa/src/infrastructure/qvac-sdk-assistant.ts#L99) |
| `completion` con `responseFormat` | [L161](https://github.com/Onaai/Menu-Hackaton/blob/d05032c674362240b6f718a47cfcf5b01278be8e/mesa/src/infrastructure/qvac-sdk-assistant.ts#L161) |
| La misma vuelta, reusada por el agente | [L208](https://github.com/Onaai/Menu-Hackaton/blob/d05032c674362240b6f718a47cfcf5b01278be8e/mesa/src/infrastructure/qvac-sdk-assistant.ts#L208) |
| **El esquema que se vuelve gramática** | [L337-L370](https://github.com/Onaai/Menu-Hackaton/blob/d05032c674362240b6f718a47cfcf5b01278be8e/mesa/src/infrastructure/qvac-sdk-assistant.ts#L337-L370) |
| Qué platos puede nombrar esta persona | [L324](https://github.com/Onaai/Menu-Hackaton/blob/d05032c674362240b6f718a47cfcf5b01278be8e/mesa/src/infrastructure/qvac-sdk-assistant.ts#L324) |

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

```
caso                              uso la herr.  uso el dato   termino   no invento   pasos   mediana
cuanto hay en la caja             100%          100%          100%      100%         2.8     29569 ms
direccion de la caja              100%          100%          100%      100%         2.0     22267 ms
cobro dentro del tope             100%          100%          100%      100%         4.7     57458 ms
cobro por encima del tope         100%          100%          100%      100%         2.4     23824 ms
destinatario fuera de la allowlist100%          100%          100%      100%         2.5     25460 ms
TOTAL                             100%          100%          100%      100%         2.9     27787 ms
```

**50 de 50 en las cuatro columnas**, pero el número que importa contar es otro:
esa tabla dio `82% / 98% / 94% / 86%` la primera vez, y el caso "cobro dentro
del tope" daba **10%**. Lo que la llevó a 100% fueron tres arreglos que
aparecieron midiendo, no leyendo el código:

**El campo opcional en la gramática.** `wallet` estaba en el esquema pero no en
`required`, así que el modelo emitía `{"accion":"ver_saldo"}` sin decir de cuál
billetera — con decodificación restringida siempre toma el camino más corto que
la gramática permite. La herramienta nunca se llegaba a llamar. Adivinar el
argumento desde el código era la otra salida y se descartó: en algo que toca
plata, *"seguro quiso decir la caja"* es la suposición que no se hace.

**El bucle.** El modelo llamaba a `ver_saldo` y volvía a llamarlo tres veces
más, quemaba las cinco vueltas y terminaba *describiendo* el cobro en vez de
hacerlo. Devolverle el dato memorizado no alcanzó: seguía eligiendo lo mismo. Lo
que lo destrabó fue **sacarle la herramienta del enum** — el mismo mecanismo que
usa todo el resto del diseño. Si no puede emitir el token, no hay bucle posible.

**La afirmación falsa.** Con la vista previa recién preparada, contestaba *"Cobro
de 12 USDT realizado con éxito"*. Es mentira: se creó un dry-run. Pedírselo en el
prompt es una promesa del modelo sobre su propia salida, así que ahora **la
aclaración la agrega el código** y el modelo no puede contradecirla. La última
palabra sobre si la plata se movió no la tiene el modelo.

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
# tests 79 · pass 79 · fail 0
```

Verificado además en el navegador, no solo por API: el asistente con las tres
restricciones alimentarias; el agente contestando con el corte del día real; el
cobro en efectivo con vuelto; el cobro con billetera de punta a punta —cliente
50 → 30,31, negocio 0 → 19,69, la caja registrando la ganancia y la mesa
quedando liberada—; el rechazo por saldo insuficiente; el tope de 20 unidades;
el cronómetro corriendo; y la interfaz cayendo al motor determinista y
**diciéndolo** cuando QVAC está apagado.

### Lo que NO está verificado

- **El broadcast on-chain.** Las dos wallets de Sepolia están creadas y se
  desbloquean bien —`wdk get address` y `wdk get balance` responden— pero están
  en 0 USD₮: falta que alguien les mande USD₮ de prueba de
  `0xd077A400968890Eacc75cdc901F0356c943e4fDb`. Hasta que esa transferencia
  corra, el pago on-chain **no se presenta como verificado**, y el recorrido
  completo se demuestra con `WDK_CLI_MODE=simulado`, declarado en pantalla.
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
tests/               79 tests con node:test
scripts/             setup de wallets y los dos arneses de confiabilidad
```

La base de producto y la interfaz vienen de
[`Pipeballes/hackatonfeli2`](https://github.com/Pipeballes/hackatonfeli2), rama
`feature-wdk-cli-wallet-flow`, que es de donde sale la integración con WDK CLI.
Lo que se sumó es la inferencia local: el asistente de la carta con gramática,
el agente de caja, los dos arneses de confiabilidad, y un arreglo del servidor
estático que en Windows impedía servir el frontend.
