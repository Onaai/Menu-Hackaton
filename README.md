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
para conectar un nodo EVM, credenciales de Google o el servidor de QVAC.

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

Sugerencias personalizadas a partir de lo que la persona ya pidió, con el modelo
corriendo **en la máquina del local**.

| Qué | Permalink |
|---|---|
| Llamada al modelo | [`recomendador-qvac.ts` L79](https://github.com/Onaai/Menu-Hackaton/blob/9015345330255ad07252e9a7426513780452f4d3/app/src/infrastructure/recomendador-qvac.ts#L79) |
| Extracción tolerante del JSON | [`recomendador-qvac.ts` L156](https://github.com/Onaai/Menu-Hackaton/blob/9015345330255ad07252e9a7426513780452f4d3/app/src/infrastructure/recomendador-qvac.ts#L156) |
| **La validación** | [`sugerencias-service.ts` L83](https://github.com/Onaai/Menu-Hackaton/blob/9015345330255ad07252e9a7426513780452f4d3/app/src/application/sugerencias-service.ts#L83) |

Se conecta por el **servidor compatible con OpenAI de QVAC**, que la consigna
permite de forma explícita:

```bash
qvac serve openai --preload <modelo>     # levantarlo ANTES de npm run dev
```

> Si arranca sin `--preload` dice *"No models configured for preload"* y no
> responde. Ahí la app cae al plan B y **la pantalla dice "sin IA"** — un plan B
> disfrazado de IA sería mentir.

### El mérito no es llamar al modelo

Son diez líneas. Lo difícil es que un modelo de 1–4B **inventa**. Nada de lo que
dice llega al cliente sin verificarse contra la carta real:

| Chequeo | Qué atrapa |
|---|---|
| formato | prosa donde se pidió JSON |
| existe en la carta | **el plato inventado** |
| hay stock | algo que la cocina apagó hace cinco minutos |
| cumple la dieta | 🔴 **una tostada común a un celíaco** |
| no repetida | el mismo plato dos veces |

Y lo descartado **se muestra en pantalla con el motivo**. Ejemplo real de una
corrida, con la cuenta marcada sin gluten:

```
· Limonada de menta: Lo pedís seguido.
· Pesca del día: Va con lo que solés pedir de principales.
descartadas: [{ texto: "Burger de la casa", razon: "rompe-la-dieta" }]
```

El motor propuso la burger; la validación la frenó. **El costo de ese error no
es una recomendación fea, es que un celíaco coma gluten.**

### Modelo y hardware — completar con su corrida

```
Modelo:        (el que carguen con --preload)
Cuantización:  (Q4_K_M, etc.)
Máquina:       Windows 11 · 31 GB RAM · AMD Radeon 880M (Vulkan)
Inferencia:    CPU
Latencia:      la que devuelve `latenciaMs` en GET /api/sugerencias
```

`latenciaMs` viaja en la respuesta justamente para que ese número sea medido y
no estimado.

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
# tests 64 · pass 64 · fail 0
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
app/src/api/             HTTP, cookies, OAuth, archivos estáticos
app/public/              las cuatro pantallas. Sin framework, sin build
app/tests/               64 tests con node:test
scripts/                 ingesta de cartas con OCR (fuera del camino principal)
docs/                    decisiones de track y manual de uso
```

La arquitectura sale del motor de
[`Pipeballes/hackatonfeli2`](https://github.com/Pipeballes/hackatonfeli2) —
mismo dominio, mismos puertos, misma convención de centavos, mismo `tsconfig`
estricto.
