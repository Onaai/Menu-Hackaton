# Mesa Abierta

**Aleph Hackathon · agosto 2026**

Pedidos por QR para restaurantes. Cada persona de la mesa ve la carta en su
teléfono, arma su pedido con las opciones que quiera, y la cocina lo recibe como
un ticket por mesa con cronómetro. Al final cada uno paga con lo que le venga:
**billetera USD₮ (WDK), Mercado Pago o efectivo con vuelto.**

```bash
cd app
npm install
npm run dev
```

| Pantalla | Quién la usa |
|---|---|
| `http://localhost:3000/` | El comensal. Escanea el QR y entra |
| `http://localhost:3000/cocina.html` | La cocina |
| `http://localhost:3000/billeteras.html` | La caja |
| `http://localhost:3000/admin.html` | El encargado |

Node ≥ 22.18. Sin variables de entorno arranca completo: ver `app/.env.example`
para conectar un nodo EVM o credenciales de Google. La primera corrida baja el
modelo de QVAC (2,5 GB) y avisa el progreso.

---

## Integración con WDK — dónde mirar

Paquetes instalados:

```
@tetherto/wdk@1.0.0-beta.16
@tetherto/wdk-wallet-evm@1.0.0-beta.11
```

Todo vive en un archivo: **[`app/src/infrastructure/wallet-wdk.ts`](https://github.com/Onaai/Menu-Hackaton/blob/9015345330255ad07252e9a7426513780452f4d3/app/src/infrastructure/wallet-wdk.ts)**

| Qué | Permalink |
|---|---|
| Semilla BIP-39 real | [línea 84](https://github.com/Onaai/Menu-Hackaton/blob/9015345330255ad07252e9a7426513780452f4d3/app/src/infrastructure/wallet-wdk.ts#L84) |
| `registerWallet` + `registerPolicy` | [líneas 96-97](https://github.com/Onaai/Menu-Hackaton/blob/9015345330255ad07252e9a7426513780452f4d3/app/src/infrastructure/wallet-wdk.ts#L96-L97) |
| **Las políticas** | [líneas 112-178](https://github.com/Onaai/Menu-Hackaton/blob/9015345330255ad07252e9a7426513780452f4d3/app/src/infrastructure/wallet-wdk.ts#L112-L178) |
| Derivación BIP-44 de cada cuenta | [línea 226](https://github.com/Onaai/Menu-Hackaton/blob/9015345330255ad07252e9a7426513780452f4d3/app/src/infrastructure/wallet-wdk.ts#L226) |
| `quoteTransfer` (vista previa) | [línea 311](https://github.com/Onaai/Menu-Hackaton/blob/9015345330255ad07252e9a7426513780452f4d3/app/src/infrastructure/wallet-wdk.ts#L311) |
| `transfer` (envío) | [línea 320](https://github.com/Onaai/Menu-Hackaton/blob/9015345330255ad07252e9a7426513780452f4d3/app/src/infrastructure/wallet-wdk.ts#L320) |
| `PolicyViolationError` → 409 | [línea 379](https://github.com/Onaai/Menu-Hackaton/blob/9015345330255ad07252e9a7426513780452f4d3/app/src/infrastructure/wallet-wdk.ts#L379) |

### Qué hace WDK acá

**Autoriza cada cobro.** No es una capa de conveniencia sobre una llamada: el
motor de políticas de WDK envuelve la cuenta en un Proxy y evalúa tres reglas
antes de que la transferencia toque la red.

```
solo-a-la-caja       el destinatario tiene que ser la billetera del local
tope-por-operacion   máximo 150,00 USDT por pago
tope-diario          máximo 500,00 USDT por día y por cuenta
permitir-el-resto    permiso explícito — WDK deniega por defecto
```

Un pago que viola una regla no ocurre:

```
POST /api/tables/:id/payments   { metodo: "WALLET", ... }
409 {"code":"CONFLICT","message":"WDK bloqueó el pago — Supera el tope por operación (150.00 USDT)"}
```

`GET /api/wdk` devuelve el estado completo —paquete, cadena, reglas activas,
cuentas con su derivación y el gasto del día contra el tope— y la pantalla de
billeteras lo muestra arriba de todo.

### ⚠️ Qué es real y qué no

| | Sin `EVM_RPC_URL` | Con `EVM_RPC_URL` |
|---|---|---|
| Semilla BIP-39 | ✅ real | ✅ real |
| Direcciones BIP-44 | ✅ derivadas por WDK | ✅ derivadas por WDK |
| Motor de políticas | ✅ evalúa y bloquea | ✅ evalúa y bloquea |
| Comisión | estimada | ✅ `quoteTransfer` |
| Transacción | ❌ **el saldo se asienta en memoria** | ✅ `transfer` a la red |

**Sin nodo no se manda nada a ninguna cadena.** La derivación y las políticas sí
son reales, porque son locales. Cada movimiento lo declara con `motor: "wdk"` y
`onchain: false`, y se ve en la interfaz y en el log de la terminal. Poner
`EVM_RPC_URL` es lo único que cambia, sin tocar código.

> Red del demo: `sepolia`. Token: configurable con `WDK_TOKEN_ADDRESS` (6
> decimales por defecto). **No se desplegó ningún contrato**: el default es la
> dirección cero, porque sin RPC no se consulta.

### Un detalle que costó encontrar

WDK **deniega por defecto**. Si una operación está gobernada por una política y
ninguna regla la matchea, tira `governed-but-unmatched` y el pago se cae. Hace
falta una regla `ALLOW` explícita al final — y como dentro del mismo alcance
`DENY` le gana a `ALLOW`, esa regla no destapa nada de lo bloqueado arriba.

---

## Integración con QVAC — dónde mirar

Paquete instalado:

```
@qvac/sdk@0.17.1
```

Sugerencias personalizadas a partir de lo que la persona ya pidió, con el modelo
cargado **dentro del proceso de la app**. No hay servidor que levantar aparte,
no hay clave de API en ningún lado, y no sale un byte a internet.

Casi todo vive en un archivo: **[`app/src/infrastructure/recomendador-qvac-sdk.ts`](https://github.com/Onaai/Menu-Hackaton/blob/e2874b5560d8e34af0ab1f6baa8a2e4148d6a75a/app/src/infrastructure/recomendador-qvac-sdk.ts)**

| Qué | Permalink |
|---|---|
| `loadModel` — carga el modelo local | [L116](https://github.com/Onaai/Menu-Hackaton/blob/e2874b5560d8e34af0ab1f6baa8a2e4148d6a75a/app/src/infrastructure/recomendador-qvac-sdk.ts#L116) |
| `completion` con `responseFormat` | [L153-L169](https://github.com/Onaai/Menu-Hackaton/blob/e2874b5560d8e34af0ab1f6baa8a2e4148d6a75a/app/src/infrastructure/recomendador-qvac-sdk.ts#L153-L169) |
| **El esquema que se vuelve gramática** | [L241-L272](https://github.com/Onaai/Menu-Hackaton/blob/e2874b5560d8e34af0ab1f6baa8a2e4148d6a75a/app/src/infrastructure/recomendador-qvac-sdk.ts#L241-L272) |
| El `enum` que sale de la carta de hoy | [L253](https://github.com/Onaai/Menu-Hackaton/blob/e2874b5560d8e34af0ab1f6baa8a2e4148d6a75a/app/src/infrastructure/recomendador-qvac-sdk.ts#L253) |
| Qué platos puede nombrar esta persona | [`recomendador-qvac.ts` L251](https://github.com/Onaai/Menu-Hackaton/blob/e2874b5560d8e34af0ab1f6baa8a2e4148d6a75a/app/src/infrastructure/recomendador-qvac.ts#L251) |
| El ejemplo como turno anterior, no como molde | [L160-L161](https://github.com/Onaai/Menu-Hackaton/blob/e2874b5560d8e34af0ab1f6baa8a2e4148d6a75a/app/src/infrastructure/recomendador-qvac-sdk.ts#L160-L161) |
| La validación posterior | [`sugerencias-service.ts` L83](https://github.com/Onaai/Menu-Hackaton/blob/e2874b5560d8e34af0ab1f6baa8a2e4148d6a75a/app/src/application/sugerencias-service.ts#L83) |
| Auto-reparación del lock del worker | [L402](https://github.com/Onaai/Menu-Hackaton/blob/e2874b5560d8e34af0ab1f6baa8a2e4148d6a75a/app/src/infrastructure/recomendador-qvac-sdk.ts#L402) |

### Lo que hace QVAC acá: el modelo no puede inventar un plato

`responseFormat: { type: "json_schema" }` convierte el esquema a gramática GBNF
y **restringe el muestreo**. El modelo no elige entre todos los tokens, elige
entre los que la gramática permite.

El `enum` del campo `id` no es la carta entera: es lo que hay con stock **y** no
le rompe la dieta a esta persona. Para una clienta celíaca, los ids con gluten
directamente no están en la gramática. **No es que el modelo sepa que no debe:
no los puede escribir.**

La diferencia se mide. Mismo prompt, mismo modelo (Llama 3.2 1B), lo único que
cambia es el esquema:

```
sin esquema  ->  "Lo siento, pero no puedo cumplir con la solicitud de
                  recomendar más de 3 platos de la carta."       0 sugerencias

con esquema  ->  {"sugerencias":[{"id":"flat-white",
                                  "motivo":"por ser pedido repetido"}]}
```

Un modelo de mil millones de parámetros se niega en prosa cuando lo dejás
suelto. Con la gramática puesta no puede escribir otra cosa.

### Evidence, not vibes — 60 llamadas por modelo

La consigna pide correr la misma tarea N veces y mostrar el porcentaje de
acierto. Está en **[`app/scripts/confiabilidad-qvac.mjs`](https://github.com/Onaai/Menu-Hackaton/blob/e2874b5560d8e34af0ab1f6baa8a2e4148d6a75a/app/scripts/confiabilidad-qvac.mjs)**:

```bash
cd app
node scripts/confiabilidad-qvac.mjs QWEN3_4B_INST_Q4_K_M 20
```

Tres escenarios x 20 vueltas = 60 llamadas. Salida textual de la corrida:

```
caso                        devolvió  id en carta  dieta ok  sin repetir  sin copiar  3 de 3   mediana
habitual sin restricciones  100%      100%         100%      100%         100%        0%       10619 ms
celíaca (sin-gluten)        100%      100%         100%      100%         100%        10%       9929 ms
media carta sin stock       100%      100%         100%      100%         100%        50%      11173 ms
TOTAL                       100%      100%         100%      100%         100%        20%      10435 ms

sugerencias mostradas: 132 · descartadas por el validador: 0
latencia p95: 12063 ms
```

Con el modelo chico, misma corrida:

```
TOTAL                       100%      100%         100%       92%          93%        63%       3432 ms

sugerencias mostradas: 156 · descartadas por el validador: 5
latencia p95: 3974 ms
```

**Qué leer de ahí.** Las dos columnas que importan dan 100% en los dos modelos:
el id siempre existe en la carta y la dieta siempre se respeta, 120 de 120. Eso
no es mérito del modelo, es la gramática. Las que separan a un modelo del otro
—repetir un plato, copiar el ejemplo— son justamente las que la gramática **no**
puede expresar, y ahí el 4B saca 8 y 7 puntos de ventaja.

La columna "3 de 3" es la que menos parece y más se malinterpreta: el 4B llena
las tres sugerencias solo el 20% de las veces porque el prompt le dice *"mejor
uno que le sirva que tres al azar"* y **le hace caso**. El 1B llena las tres el
63% de las veces porque no está evaluando si le sirven.

### Lo que la gramática no arregla

| | ¿lo garantiza el esquema? | quién lo ataja |
|---|---|---|
| el id existe en la carta | si, por construcción | — |
| respeta la dieta | si, el enum ya viene filtrado | — |
| hay stock ahora mismo | solo al armar el prompt | `validar()` |
| no repite el mismo plato | no: un enum no expresa unicidad | `validar()` |
| el motivo dice algo útil | no, y nada puede | nadie |

Por eso **`validar()` sigue corriendo sobre todo lo que llega**, venga del
modelo o del plan B, y lo descartado se muestra en pantalla con el motivo. Que
el camino principal sea seguro por construcción no es razón para sacar el
colador.

### Tres fallas que aparecieron corriéndolo, no leyéndolo

**El plan B no filtraba por dieta.** Cuando QVAC devolvía lista vacía, la app
caía al respaldo heurístico — y el respaldo le ofrecía burrata, papas bravas y
burger a una clienta sin gluten. `validar()` las frenó a las tres, así que nadie
iba a comer gluten, pero la pantalla le quedaba vacía. El colador andaba; el que
recomendaba mal era el respaldo. Ahora filtra en el origen.

**Los dos modelos copiaban el ejemplo palabra por palabra.** Con el ejemplo
metido dentro del prompt del sistema, `"La pedís siempre y hoy pega el calor"`
salió en tres casos de prueba seguidos, para platos que el cliente nunca había
pedido. Un ejemplo dentro de las reglas se lee como un molde para rellenar.
Movido a un turno anterior de la conversación, y con la carta de otro café, la
métrica "sin copiar" pasó de 93% a 100%.

**`maxLength` corta contando caracteres.** Salió al aire un motivo terminado en
`"...que esté sin-gl"`. La gramática no sabe dónde termina una palabra. Techo
más alto para que casi nunca toque, y recorte por palabra para cuando toque.

### Y una que no tiene arreglo

El motivo puede ser vacío de contenido aunque sea gramaticalmente perfecto:
*"Te recomiendo el Burrata de estación."* no le dice nada a nadie. Ninguna
gramática puede exigir que una oración sea útil, y ningún validador puede
medirlo sin poner otro modelo a juzgar. Queda así, y se declara acá.

### Modelo y hardware

```
Modelo:        Qwen3-4B-Instruct         (constante QWEN3_4B_INST_Q4_K_M)
Cuantización:  Q4_K_M · 2,50 GB
Alternativa:   Llama-3.2-1B-Instruct Q4_0 · 0,77 GB   (https://github.com/Onaai/Menu-Hackaton/blob/e2874b5560d8e34af0ab1f6baa8a2e4148d6a75a/app/src/infrastructure/recomendador-qvac.tsC_MODELO_SDK=...)
Motor:         llamacpp-completion · ctx 4096
Máquina:       Windows 11 · AMD Ryzen AI 9 365 · 10 núcleos / 20 hilos · 31 GB RAM
Inferencia:    CPU
Carga:         10,3 s   (con el modelo ya bajado, en ~/.qvac/models)
Latencia:      mediana 10,4 s · p95 12,1 s   (4B)
               mediana  3,4 s · p95  4,0 s   (1B)
```

El modelo se baja solo la primera vez, con progreso en la terminal.
`latenciaMs` viaja en la respuesta de `GET /api/sugerencias`, y `GET /api/qvac`
devuelve modelo, cuantización, motor y la última corrida — para que ningún
número de acá sea estimado.

### La otra capacidad de QVAC: OCR

`scripts/` ingesta la carta de un restaurante de verdad —un PDF de una sola
página de 14.496 píxeles de alto, sin capa de texto— cortándola en mosaicos con
solape y corriendo `ocr()` con `OCR_LATIN` en cada uno. Está fuera del camino
principal de la app, y se documenta en
[`docs/01-como-corre-el-ocr.md`](https://github.com/Onaai/Menu-Hackaton/blob/e2874b5560d8e34af0ab1f6baa8a2e4148d6a75a/docs/01-como-corre-el-ocr.md).

---

## Lo demás

**Cocina.** Un ticket por mesa —no por estación— con cronómetro que arranca en
el pedido pendiente más viejo. Lo cuenta el servidor y el navegador solo lo hace
correr, así que dos pantallas nunca muestran distinto. Se entrega tildando, o
toda la mesa de una. Marcar sin stock saca el plato de la carta al instante.

**Pagos.** Tres métodos, cada comensal el suyo o uno paga la mesa. Efectivo
calcula el vuelto. El corte de caja separa por método y dice **cuánto tiene que
haber en el cajón**: lo cobrado en efectivo, no lo recibido.

**Cuentas.** Cuenta anónima automática por cookie — nadie se registra para pedir
de comer. Registrarse **asciende** la cuenta anónima en el lugar, así el
historial que junta el modelo no se pierde. Google tiene el flujo OAuth 2.0 +
PKCE implementado y se activa con `GOOGLE_CLIENT_ID`; sin credenciales corre un
modo demo etiquetado en pantalla. **Apple corre siempre en demo**: "Sign in with
Apple" exige una cuenta de desarrollador paga.

**Administración.** El encargado edita los datos del local y la carta en vivo:
precio, categoría, minutos de preparación, stock, alta y baja.

---

## Probado

```bash
cd app && npm test
# tests 80 · pass 80 · fail 0
```

Verificado también por HTTP contra el servidor: pedido con opciones → ticket de
cocina con cronómetro → entrega → cuenta → los tres métodos de pago → corte de
caja cuadrado → bloqueo por política de WDK.

**Lo que no está probado:** las pantallas no se abrieron en un navegador (se
desarrollaron en una máquina sin interfaz gráfica), y el flujo OAuth real de
Google nunca se ejecutó por falta de credenciales.

## El repo

```
app/src/domain/          modelo y reglas. No sabe de HTTP ni de almacenamiento
app/src/application/     casos de uso + puertos (WalletLedger, Recomendador…)
app/src/infrastructure/  adaptadores: WDK, QVAC, memoria, consola
app/scripts/             evidencia y confiabilidad de QVAC (corridas reales)
app/src/api/             HTTP, cookies, OAuth, archivos estáticos
app/public/              las cuatro pantallas. Sin framework, sin build
app/tests/               80 tests con node:test
scripts/                 ingesta de cartas con OCR (fuera del camino principal)
docs/                    decisiones de track y manual de uso
```

La arquitectura sale del motor de
[`Pipeballes/hackatonfeli2`](https://github.com/Pipeballes/hackatonfeli2) —
mismo dominio, mismos puertos, misma convención de centavos, mismo `tsconfig`
estricto.
