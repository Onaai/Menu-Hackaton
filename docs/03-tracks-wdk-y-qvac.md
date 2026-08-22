# WDK y QVAC: qué califica y qué no

Respuesta a *"confirmame si la utilización de WDK es la que termina por ser
requerida en el hackathon"*. La respuesta corta está en la primera sección y no
es la que esperabas.

---

# 1. Lo que tenemos hoy NO califica para el track de WDK

Está en el texto de la consigna, literal:

> **Must use: WDK as a core dependency of your project. `@tetherto/wdk`**
>
> Track 1: `@tetherto/wdk-cli` (the scoped package; the unscoped `wdk-cli` on
> npm is a different project).

Y más abajo, lo que directamente nos apunta:

> **"Do not bolt WDK on in parallel. If we find a project that already has its
> own wallet/payment layer and simply added WDK alongside it for the prize, we
> will discard it."**

Nuestro `InMemoryWalletLedger` **es** una capa de pagos propia. Si presentáramos
esto al track de WDK, entra justo en la frase que dice que lo descartan.

Y hay más requisitos que una simulación no puede cumplir:

| Lo que pide la consigna | ¿Lo tenemos? |
|---|---|
| Permalinks a las líneas donde se usa WDK | ❌ no hay una sola línea de WDK |
| Lista de paquetes WDK y sus versiones | ❌ ninguno instalado |
| `.env.example` con RPC, bundler, paymaster | ❌ no aplica |
| En qué cadena se demostró | ❌ ninguna |
| Si desplegaron un USD₮ falso, su contrato | ❌ ninguno |

**No hay forma de maquillarlo.** Un adaptador simulado no es una integración.

---

# 2. Por qué eso no es un problema

Los tres tracks de Tether dicen, cada uno arriba de todo:

> **Tether · you can enter 1 track from this sponsor**

O sea: **una sola entrega de Tether**. No podemos presentarnos a WDK *y* a QVAC.
Hay que elegir, y ya elegimos: **QVAC**.

Con esa decisión tomada, la billetera simulada pasa a ser lo que es —una feature
de producto etiquetada como simulada— y no una integración fraudulenta de un
track al que no nos presentamos. **Lo único obligatorio es decirlo**: en el
README, en la pantalla y en el video. Está dicho en los tres lados.

## Y ojo, porque QVAC tiene la misma cláusula

> **"Don't bolt QVAC on in parallel. A project that already has its own cloud
> AI layer and simply adds QVAC alongside it for the prize will be discarded.
> Local inference has to be doing real work in your product."**

Por eso la IA local **no** está de adorno. Ver la sección 4.

---

# 3. Qué haría falta para que WDK sí califique

Lo dejo escrito por si el fin de semana rinde más de lo previsto o por si
después quieren ir por ese track en otra edición. **No lo hagan hoy**: son horas
que salen de la parte que sí los juzga.

1. `npm i @tetherto/wdk-cli` — el paquete **con scope**.
2. `wdk --help`, `wdk send --help`, `wdk get --help` → anotar las banderas reales.
3. Billetera de prueba, **nunca una personal con plata** (lo dice la consigna).
4. Testnet: USD₮ de prueba **solo existe en Sepolia**, vía Candide o Pimlico.
   En cualquier otra cadena hay que desplegar un USD₮ falso propio.
5. Completar `app/src/infrastructure/wallet-wdk.ts`.
6. Cambiar **una línea** de `app/src/index.ts`:

```ts
const ledgerBase = new InMemoryWalletLedger(systemClock, uuidGenerator);
// pasa a ser
const ledgerBase = new WdkWalletLedger({ red, token, direccionNegocio });
```

**Eso es todo lo que cambia en el sistema entero.** Esa es la razón de que
`WalletLedger` sea una interfaz y no una clase: la frontera está puesta donde
tiene que estar.

## Por qué `wallet-wdk.ts` está incompleto a propósito

Porque no pude verificar los nombres exactos de las banderas de `wdk send`: la
red de esta sesión tiene bloqueado `docs.wdk.tether.io` y el paquete no está
instalado acá. Escribir igual un adaptador con banderas que suenan bien es
exactamente lo que la consigna dice que descarta sin revisar:

> *"hallucinated APIs, dead code, a README describing features that aren't
> there"*

Así que el archivo declara las banderas en un solo lugar, con un cartel que dice
qué correr para confirmarlas, y cada método tira un error explicando que falta
ese paso. **Un archivo honestamente incompleto vale más que uno que finge.**

## Lo que sí está verificado de WDK

De leer el código de `@tetherto/wdk-cli@1.0.0-beta.2` (`src/mcp/server.js`) en el
repo `Onaai/Hackaton-2026`: el servidor MCP expone nueve herramientas. Tres nos
importan: `get_address`, `get_balance` y `send_token`.

Y esta es la descripción textual de `send_token`, del código fuente:

> *"Send native tokens or ERC-20/SPL tokens. **IMPORTANT: Always call with
> dryRun=true first to preview fees and amounts, show the preview to the user,
> and only call again with dryRun=false after user confirms.**"*

**Por eso nuestro `WalletLedger.transfer` tiene `dryRun`.** No lo inventamos: lo
copiamos. Y lo hacemos cumplir con el tipo en vez de con una frase amable — la
vista previa devuelve `payment: undefined`, así que saltearse la confirmación no
registra ningún cobro.

---

# 4. Cómo QVAC hace trabajo real

## Qué hace

Sugerencias personalizadas a partir de lo que la persona ya pidió. El modelo
local recibe la carta disponible de hoy y el historial de esa cuenta, y devuelve
hasta tres platos con un motivo de una línea.

## Cómo se conecta, y por qué así

**Contra el servidor HTTP compatible con OpenAI de QVAC**, no contra el SDK.

La consigna lo permite explícitamente:

> *"Using QVAC's OpenAI-compatible HTTP server as your local model provider
> counts. Calling a cloud model API does not."*

Y lo elegí por una razón concreta: el contrato de `POST /v1/chat/completions` es
público y estable, mientras que la firma exacta de generación de texto del SDK no
la pude verificar (`docs.qvac.tether.io` está bloqueado en esta sesión). La misma
consigna avisa que **lo que más descartan son métodos de SDK inventados**. Entre
adivinar una firma y usar un contrato que conozco, uso el que conozco.

Sigue siendo inferencia 100% local: el servidor corre en `localhost` con el
modelo en la máquina. No sale un byte a internet.

```bash
qvac serve openai --preload <modelo>
```

> ⚠️ En la salida que me pasaste, `qvac serve openai` levantaba en el 11434 pero
> decía **"No models configured for preload"**. Sin modelo cargado esto no
> responde y la app se cae al plan B. **Arrancalo con el modelo.**

## Dónde está el mérito, que no es llamar al modelo

Llamar al modelo son diez líneas. Lo difícil, y lo que el track premia con todas
las letras, es que un modelo de 1 a 4B **inventa**. Le pedís tres platos de una
lista de ocho y te devuelve una milanesa napolitana que no existe.

`app/src/application/sugerencias-service.ts` no le cree nada:

| Chequeo | Qué atrapa |
|---|---|
| formato | prosa donde se pidió JSON |
| existe en la carta | **el plato inventado** |
| hay stock | algo que la cocina apagó hace cinco minutos |
| cumple la dieta | 🔴 **una tostada común a un celíaco** |
| no repetida | el mismo plato dos veces |

Y lo que se cae **no se esconde: se muestra en pantalla**, con el motivo. La
consigna pide textualmente *"evidence, not vibes"* y *"show us the failures you
couldn't fix as well as the ones you could"*.

El caso de la dieta es el que hay que decir en voz alta en el video: **el costo
de ese error no es una recomendación fea, es que un celíaco coma gluten.**

### Ya se puede ver funcionando, incluso sin el modelo

En la corrida de prueba, con QVAC apagado y el plan B activo:

```
motor=heuristico  degradado=True
  · Limonada de menta: Lo pedís seguido.
  · Pesca del día: Va con lo que solés pedir de principales.
descartadas: [{'texto': 'Burger de la casa', 'razon': 'rompe-la-dieta'}]
```

El motor propuso la burger; **la validación la frenó porque la cuenta está
marcada sin gluten**. Y como la validación es independiente del motor, hace
exactamente lo mismo con lo que devuelva el modelo.

## El plan B, y por qué se etiqueta

Si el servidor de QVAC no está levantado, las sugerencias salen de una regla
simple y **la pantalla dice "sin IA — modelo no disponible"**. Un plan B
disfrazado de IA sería mentirle al juez, y es de las cosas que la consigna
descarta sin revisar.

## Para el README de la entrega

La consigna pide *"model and hardware details: which model, which quantization,
what machine you ran it on, rough latency"*. Eso hay que completarlo **con la
corrida real de ustedes**, no con lo que yo suponga:

```
Modelo:         (el que carguen con --preload)
Cuantización:   (Q4_K_M, etc.)
Máquina:        Windows 11 · 31 GB RAM · AMD Radeon 880M (Vulkan)
Inferencia:     CPU
Latencia:       la que imprima `latenciaMs` en /api/sugerencias
```

`latenciaMs` viene en la respuesta de la API justamente para que ese número sea
medido y no estimado.

---

# 5. Pears: por qué queda afuera

Coincido con vos y el argumento que diste es el correcto: **un restaurante tiene
wifi**, así que "funciona sin servidores" no le resuelve nada a nadie acá.

Y hay un motivo más duro: el track exige que el juez pueda instalar la
herramienta escribiendo `pear install pear://<key>`, y que eso sea una **CLI**.
Una carta que se abre escaneando un QR es una página web. No califica, y pegarle
un CLI al costado para calificar es lo que los sponsors castigan.

El `pear://` que ya generaron sigue siendo un activo — pasaron el gate más
difícil del evento— pero como plan C, no como parte de esto.

---

# 6. Resumen de una línea

**Se presentan a QVAC.** WDK queda como capa de pagos simulada, honestamente
etiquetada, con la frontera puesta para que cambiar a real sea una línea. Pears
afuera. Y la IA local no está de adorno: es la pieza que valida contra la carta
real todo lo que el modelo dice, y que cuenta en pantalla lo que descartó.
