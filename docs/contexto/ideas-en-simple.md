# Las ideas en castellano simple
### Sin tecnicismos, con lo que hace falta tener para cada una

---

# Parte 1 — Qué pide cada track, explicado como si no supieras nada

## 🍐 Pears — "hacé un programa que se instale sin tienda de aplicaciones"

**Qué es Pear, en una frase:** una forma de repartir un programa donde el programa
viaja **de computadora en computadora**, sin que exista ningún servidor ni ninguna
tienda de aplicaciones en el medio.

**La analogía:** hoy, para instalar algo, vas a una tienda (Play Store, App Store,
npm). Esa tienda es un lugar central: alguien la paga, alguien la controla, y si
se cae, nadie instala nada. Pear elimina la tienda. Vos publicás y tu programa se
copia de una computadora a la otra, como se pasaban música por Ares o los archivos
por torrent.

**Y lo mismo con las actualizaciones.** Si sacás la versión 2, le llega sola a
todos los que ya tienen la versión 1, sin que nadie apruebe nada y sin servidor.

**Lo que te piden:** hacer una herramienta que se use desde la consola (la ventana
negra de comandos) y que se pueda instalar escribiendo `pear install pear://` más
un código. **Los jueces van a escribir literalmente ese comando.** Si no anda, ni
la miran.

**Qué NO te piden:** que el programa en sí sea peer-to-peer. Puede hacer cualquier
cosa. Lo único obligatorio es que se instale y se actualice por esa vía.

**Lo que hay que tener:** nada. Solo una computadora. Es el track sin requisitos
previos.

**Plata:** 1° $1.000 · 2° $500

---

## 🔷 QVAC — "usá inteligencia artificial que corra en la computadora del usuario"

**Qué es QVAC, en una frase:** es como tener ChatGPT pero corriendo **adentro de
tu computadora**, sin internet, sin cuenta, sin pagar por uso, y sin que lo que
escribas salga nunca de tu máquina.

**Por qué a alguien le importaría eso:** porque hay cosas que no podés subir a la
nube. Un contador no puede subir la facturación de sus clientes. Un médico no
puede subir historias clínicas. Vos no querés subir tu resumen de tarjeta. Y
además, si no hay internet, la nube no existe.

**El truco y la dificultad:** los modelos que entran en una laptop son chicos —
mil a cuatro mil millones de parámetros, contra los cientos de miles de millones
de los grandes. Son más tontos. **El desafío del track es hacer que un modelo
tonto haga una tarea real de manera confiable.**

**Lo que sabe hacer QVAC:** leer texto de imágenes (OCR), entender imágenes,
transcribir audio, traducir, generar texto, buscar en documentos tuyos.

**Los dos premios:**
- **Pista 1 ($1.000):** un agente que haga trabajo administrativo. Leer
  documentos, encontrar diferencias, avisar cuando algo no cierra.
- **Pista 2 ($500):** demostrar que lograste que un modelo chico sea confiable,
  **con mediciones**. No "mirá qué lindo anduvo una vez", sino "lo corrí 47 veces
  y acertó el 89%, y acá están las 5 veces que falló".

**Lo que hay que tener:** el modelo bajado (unos 2,5 GB), y **documentos de prueba
de verdad**. Ver la Parte 3, porque acá está el problema que planteaste.

**Plata:** $1.000 + $500 + $500 del Vault Guardian

---

## 🟧 WDK — "hacé algo que mueva plata, sin tener que aprender blockchain"

**Qué es WDK, en una frase:** una caja de herramientas que te deja crear una
billetera de dólares digitales (USD₮) y mandar plata **sin que tengas que escribir
un solo contrato inteligente ni entender cómo funciona una blockchain por dentro.**

**La analogía:** es como la librería de Mercado Pago para desarrolladores, pero
para dólares digitales y sin que exista Mercado Pago en el medio. Vos escribís
`wdk send 20 USDT a esta dirección` y listo.

**Esto es lo que no entendías, y es la parte importante:** el sponsor dice
textualmente que **no hace falta escribir ningún contrato inteligente para ganar
este track.** WDK maneja las claves, las direcciones, los saldos y las
transacciones. Vos hacés el producto encima.

**Los dos premios:**

- **Pista 1 ($1.000) — algo hecho con la consola de WDK o su servidor MCP.**
  *Qué es MCP en simple:* un enchufe estándar que le permite a una IA usar
  herramientas. Si conectás la billetera por MCP, **tu asistente de IA puede
  consultar saldos y mandar plata hablándole en castellano.** Ese es el juguete
  que quieren ver.
- **Pista 2 ($500) — "sin gas".**
  *Qué es el gas, en simple:* en las blockchains, para mover plata tenés que pagar
  una comisión, y esa comisión hay que pagarla en la moneda propia de esa red. O
  sea: **te mandaron dólares digitales pero no los podés mover porque no tenés la
  otra moneda para pagar la comisión.** Es absurdo y es la razón número uno por la
  que la gente normal abandona. Los módulos "sin gas" arreglan eso: la comisión se
  paga con los mismos dólares que estás mandando.

**Lo que hay que tener:** Node.js 22.18 o más nuevo, y una billetera de prueba.
Para la Pista 2, además, una cuenta gratuita en Candide o Pimlico (minutos).

**Plata:** $1.000 + $500

---

## 🌞 General — "el mejor proyecto, sea de lo que sea"

Sin requisitos técnicos. Entra el mismo proyecto que hiciste para cualquier otro
track. **Es plata gratis: no hay que construir nada extra.**

**Plata:** 1° $500 · 2° $500

---

# Parte 2 — Cada idea en simple

Para cada una: qué hace, a qué bounty va, cuánta plata, y **qué hace falta tener**.

---

## 🔑 Llave — Pears — $1.000 + $500 del General

**En una frase:** mandar una contraseña o un archivo secreto de tu computadora a
la de otra persona **sin que pase por ningún lado en el medio**.

**No es un mensaje común.** Es específicamente para secretos: la clave de una API,
el archivo de configuración con las contraseñas de la base de datos, un token.

**El problema real:** hoy eso se manda por WhatsApp, Slack o mail. Y queda ahí
para siempre, en el servidor de una empresa que no es tuya. Mañana a las 13:00
alguien de tu equipo va a pegar una clave en el Telegram del hackathon. Está mal y
todos lo hacen igual porque no hay una alternativa fácil.

**Cómo se ve:** vos escribís `llave send .env`, te da un código de tres palabras
tipo "pino-42-rojo", se lo decís al otro por teléfono, él escribe
`llave get pino-42-rojo` y le llega. El código sirve una sola vez y se muere.

**Tenés razón en que "podría ser un repo de GitHub".** Ese es justamente el punto:
es una herramienta, no una plataforma. Y las herramientas simples ganan hackathons
cuando resuelven algo que todos sufren. Pero **es honesto decir que el "wow" es
bajo** — no hay un momento visual impactante, solo dos terminales.

**Qué hace falta tener:** nada.

---

## 🏠 Vecino — Pears — $1.000 + $500

**En una frase:** pasarse archivos y chatear entre las computadoras de una misma
sala, aunque no haya internet.

**El momento fuerte:** apagás el wifi en cámara y sigue funcionando.

**Coincido con vos, y hay una razón nueva para bajarla:** en el Tether Developers
Cup ganó el track de Pears un proyecto llamado **Curva**, que era P2P social con
chat. Repetir esa forma es competir de frente contra un ganador reciente del mismo
sponsor. **La bajé de puesto.**

**Qué hace falta tener:** nada, aunque el modo Bluetooth es experimental y puede
no andar.

---

## 🎮 Duelo — Pears — $1.000

**En una frase:** un jueguito de consola donde publicás un cambio y le llega al
jugador **mientras está jugando**.

**Para qué sirve realmente:** demuestra la actualización automática mejor que
cualquier otra cosa. El ángulo serio es "distribuir y actualizar software sin
tienda de aplicaciones y sin backend".

**Coincido con que no convence.** El problema es *Practicality*: un juego de
consola no le resuelve un problema a nadie. Es 2 de 5 en ese criterio, y son
cinco criterios que pesan igual.

**Qué hace falta tener:** nada.

---

## 🛡️ Portero — WDK Pista 1 — $1.000 + $500 ⭐ *la que te gustó*

**En una frase:** le das una billetera a una inteligencia artificial, **pero
encerrada dentro de reglas que vos escribís**.

**El problema real:** los agentes de IA ya pueden hacer cosas solos. Darle plata a
uno da miedo, con razón: se puede equivocar, lo pueden engañar, puede malinterpretar
una instrucción. Hoy la respuesta a "¿le doy plata a un agente?" es "ni loco". Este
proyecto convierte esa respuesta en "sí, dentro de estos límites".

**Cómo se ve:** hay un archivo de reglas que cualquiera puede leer:
```
tope por operación:     50 USDT
tope por día:           200 USDT
solo puede pagarle a:   proveedor-A, proveedor-B, juan
arriba de 100:          pedir confirmación
```
Y después le hablás al agente en castellano:
```
vos: mandale 500 dólares a esta dirección desconocida
     ⛔ BLOQUEADO — el destinatario no está en la lista permitida
        (regla 3, línea 14)

vos: pagale 20 a proveedor-A
     ✓ dentro del tope por operación
     ✓ dentro del tope diario (quedan 130)
     ✓ destinatario permitido
     → enviado
```

**Por qué es tan buena y por qué te gustó:** la demo es el **"no"**. Todo el mundo
entiende en dos segundos por qué eso importa. Es más memorable que cualquier
transferencia exitosa, porque responde sola a la objeción obvia. Y el sponsor dice
textualmente que "se valorará positivamente un modelo de seguridad bien pensado".

**El otro motivo:** en el Tether Developers Cup, el ganador general **y** del track
de WDK fue **Tarkam** — un sistema de premios para torneos de fútbol amateur con
plata real. El molde del ganador de WDK es: **problema concreto + plata de verdad +
flujo simple**. Portero encaja perfecto en ese molde.

**Qué hace falta tener:** Node.js 22.18+, y fondos de prueba (gratis, de un
"faucet"). Nada más.

---

## 🧾 Conciliador de facturas / remitos — QVAC Pista 1 — $1.000 + $500

**En una frase:** sacás fotos de facturas y remitos, y el programa te dice qué no
coincide con lo que pediste o con lo que dice el banco.

**Acá tenés razón y es un problema serio.** Necesitás unos 20 documentos feos de
verdad — arrugados, torcidos, con sellos, escritos a mano. **Sin ese material, la
idea no se puede ni probar ni demostrar.** Y no sirve conseguir tres PDFs limpios:
el diferenciador es justamente que funcione con basura real.

**Veredicto: descartala**, salvo que consigas los documentos esta noche.

**Pero atención a la distinción:** *remitos* no tenés. **Tickets de supermercado y
de restaurante sí.** Tenés en la billetera, en el cajón, tu familia tiene. En una
hora juntás treinta. Ver Vaquita y Ventanilla.

**Qué hace falta tener:** ~20 documentos reales. No los tenés.

---

## 📊 Banco de pruebas de fiabilidad — QVAC Pista 2 — $500 + $500

**En una frase:** en vez de mostrar que tu IA anda, **demostrás con números cuánto
falla y cuánto la mejoraste**.

**Qué significa eso en concreto:** corrés la misma tarea 47 veces y armás una
tabla:
```
sin ninguna mejora ............ acierta 41%
con salida ordenada ........... acierta 68%
con reintento ................. acierta 81%
con auto-revisión ............. acierta 89%
```
Y decís: "estas 3 fallas no las pudimos arreglar, y son estas".

**Por qué es un hueco:** el sponsor pidió con esas palabras *"pruebas, no
impresiones"*. Y ningún equipo apurado corre nada 47 veces.

**La métrica que nadie más va a mostrar:** separar "se equivocó y lo dijo" de
**"se equivocó con total seguridad"**. Lo segundo es lo peligroso y es lo que más
le importa a quien evalúa modelos chicos.

**Qué hace falta tener:** el modelo bajado, y **una tarea con respuesta correcta
conocida**, para poder decir si acertó o no. Eso puede ser algo tan simple como
20 tickets donde vos ya sabés cuál es el total.

---

## 📄 Ventanilla — QVAC Pista 1 — $1.000 + $500

**En una frase:** foto de la carta que te pide trámites + fotos de los papeles que
tenés = **te dice qué te falta**.

**Cómo se ve:**
```
foto de la carta del banco
  → te piden 4 cosas: DNI, constancia de CUIT, recibo de sueldo,
    comprobante de domicilio

fotos de tus papeles
  → DNI                       ✓
  → constancia de CUIT        ✓
  → recibo de sueldo          ✓  (es de junio, piden el último)
  → comprobante de domicilio  ✗  FALTA
```

**Por qué es la más segura:** son dos lecturas y una comparación de listas. No hay
red, no hay pagos, no hay nada distribuido. Se termina en ocho horas y te quedan
dieciséis para que se vea impecable.

**Qué hace falta tener:** cartas o formularios que pidan documentación, y
documentos. **Esto sí lo conseguís**: cualquier resumen de banco, una carta del
consorcio, un formulario de la facultad, un contrato de alquiler. Y documentos
tenés todos: DNI, constancia de CUIT, factura de luz.

---

## 🐄 Vaquita — Pears + QVAC + WDK + General — hasta $3.500 ⭐⭐

**En una frase:** sacás foto de la cuenta del restaurante, el teléfono la lee solo,
aparecen los que están en la mesa sin internet, cada uno marca lo que comió, y se
salda la deuda entre ustedes.

**Es la única que toca tres bounties.** Y no es una ensalada: si sacás cualquiera
de las tres piezas, el producto se rompe.

**Ver la Parte 4**, donde reescribo la idea entera por tu comentario de Mercado
Pago, que es correcto y le cambia el pitch para mejor.

**Qué hace falta tener:** tickets de restaurante o súper. **Los conseguís hoy.**

---

# Parte 3 — El problema del material de prueba, ordenado

Esto es lo que planteaste y es la restricción más importante para elegir.

| Idea | Qué material necesita | ¿Lo pueden conseguir hoy? |
|---|---|---|
| Llave | Nada | ✅ |
| Vecino | Nada | ✅ |
| Duelo | Nada | ✅ |
| Portero | Fondos de prueba, gratis | ✅ |
| **Conciliador de remitos** | **~20 remitos y facturas B2B feas** | ❌ **No** |
| Banco de pruebas | Una tarea con respuesta conocida | ✅ (usando tickets) |
| Ventanilla | Cartas que pidan trámites + documentos personales | ✅ Fácil |
| Vaquita | Tickets de restaurante y súper | ✅ Fácil |

**La conclusión práctica:** el problema no es QVAC. El problema es el *tipo* de
documento. Remitos no tienen. Tickets tienen a montones.

**Tarea de esta noche, 40 minutos, la hace el rol de Relato:** juntar 25 tickets.
De la billetera de todos, del cajón de la cocina, pedile a tu vieja, pedile al
grupo de amigos. Sacales fotos **malas a propósito**: torcidas, con poca luz,
arrugados, con el pulgar tapando una esquina. Ese sobre de fotos feas es el activo
más valioso que pueden llevar mañana, y **sirve para tres ideas distintas**:
Vaquita, Ventanilla y el Banco de pruebas.

---

# Parte 4 — Vaquita, corregida por lo de Mercado Pago

**Tu objeción es correcta y mata la versión original.** En Argentina nadie le paga
al restaurante en dólares digitales. El restaurante cobra con Mercado Pago,
transferencia o efectivo. Si la demo muestra pagarle al mozo en USD₮, cualquier
juez argentino piensa "esto no pasa".

**La corrección le cambia el pitch, y queda mejor.**

## El problema real no es pagarle al restaurante. Es la deuda entre ustedes.

Pensá qué pasa de verdad: **uno paga todo con su Mercado Pago** —porque es más
rápido, porque el mozo trae un solo posnet, porque el que tiene saldo paga— y
después arranca la parte molesta:

- sacar la cuenta de quién comió qué, a ojo
- "yo no tomé vino"
- "después te lo paso", y no te lo pasa
- el que se fue temprano
- el que no tiene Mercado Pago
- el amigo que está de visita desde Chile o Brasil y **no puede transferirte**

**Ahí está el producto.** Vaquita no reemplaza a Mercado Pago: **reemplaza el
"después te lo paso".**

## Cómo queda la demo, corregida

```
Tres notebooks. Un ticket arrugado.

1. Uno pagó todo con Mercado Pago. Saca foto del ticket.
   → aparecen 8 ítems con precios. La foto nunca sale del equipo.

2. Se apaga el wifi EN CÁMARA.

3. Las otras dos notebooks aparecen solas en la lista. Sin cuentas,
   sin agregarse como contactos, sin wifi.

4. Cada uno toca lo que comió. Los totales se actualizan en las tres.

5. "vos le debés $4.200 a Emi"  →  pagar  →  ✓ saldado en USD₮
   Comisión pagada con los mismos dólares. Sin comprar nada raro antes.

6. El wifi sigue apagado.
```

## Por qué ahora los dólares digitales tienen sentido de verdad

- **El que está de visita desde otro país te puede pagar.** Mercado Pago no cruza
  fronteras. Esto sí, al instante y sin comisión de cambio.
- **No hace falta que los dos tengan el mismo banco ni la misma app.**
- **Sin internet igual funciona el reparto**, y el pago sale cuando vuelve la señal.
- **No hay servidor**, entonces no hay una empresa registrando dónde comés, con
  quién y cuánto gastás.

## Y esto vale para el pitch

La versión honesta que le decís al juez es:

> "No estamos reemplazando a Mercado Pago. El restaurante cobra como siempre.
> Nosotros arreglamos lo que pasa *después*: la deuda entre amigos, que hoy se
> resuelve con capturas de pantalla y buena memoria — y que directamente no se
> resuelve si el que te debe está en otro país."

**Es más creíble, y "más creíble" es literalmente el criterio de *Practicality*.**

## Tu idea del menú por QR

La mencionaste y es buena, pero **elegiría el ticket, no el menú**, por tres
motivos:

1. El menú te dice los precios, **pero no qué pidieron ustedes**. Igual hay que
   marcar todo a mano. El ticket ya tiene lo que consumieron.
2. El menú por QR necesita internet para abrirse. El ticket es papel: funciona
   apagando el wifi, que es tu mejor momento de demo.
3. Leer un ticket arrugado con un modelo chico es **más difícil** y por lo tanto
   puntúa más alto en dificultad técnica. Un menú por QR es texto limpio, o sea
   que el modelo casi no trabaja — y si el modelo casi no trabaja, el sponsor de
   QVAC se da cuenta.

**Guardala como plan B:** si el OCR del ticket no anda a la hora 13, cambiás a
cargar los ítems a mano y el producto sigue vivo.

---

# Parte 5 — Ideas inspiradas en los que ganaron

Pediste esto y es una buena forma de pensar. Miremos qué forma tienen los
ganadores verificados y qué se deduce.

| Ganador | Qué era | La forma |
|---|---|---|
| **Tarkam** (WDK, campeón general) | Premios de torneos de fútbol amateur en USD₮: inscripción, estado verificable, reparto | Plata real entre gente que se conoce, con un flujo simple |
| **Curva** (Pears) | Ver un partido sincronizado entre continentes, con chat, traducción local y propinas | Sin servidores + las tres tecnologías juntas |
| **Scout** (QVAC) | IA de fútbol corriendo en el dispositivo | Un dominio específico, no "un asistente" |
| **AutoBounty** (Aleph, dos premios) | Publicás una tarea, alguien la hace, la IA verifica el trabajo y se libera el pago | La IA **decide**, la blockchain **ejecuta** |
| **Piggy Quiz** (Aleph, Base) | Trivia que enseña finanzas con premios reales | Cosa aburrida + experiencia divertida |
| **Clever** (Aleph, Fiserv) | Ayuda a comercios a cuadrar ventas, liquidaciones y extractos | Problema empresarial concreto y sin glamour |
| **TornadoCodes** (Aleph 2024, 1°) | Dar acceso a una app sin recolectar antes las direcciones de todos | Una fricción específica, eliminada |

**Los tres patrones que se repiten:**

1. **Plata de verdad moviéndose entre personas que se conocen.** Tarkam, AutoBounty,
   Piggy Quiz. → **Vaquita y Portero están en ese patrón.**
2. **La IA decide o verifica; la plata se ejecuta sola.** AutoBounty es el ejemplo
   puro. → **Portero es exactamente eso, dado vuelta: la IA propone, las reglas
   deciden.**
3. **Nadie inventó una categoría.** Todos agarraron algo que ya existe y le
   sacaron una fricción puntual.

## Tres ideas nuevas que salen de ese patrón

### 🎫 **Fiado** — WDK + QVAC — $1.000 + $1.000 + $500
El kiosquero anota fiado en un cuaderno. Sacás foto de la página del cuaderno, el
modelo local lee los nombres y los montos, y cada cliente recibe un link para
saldar en USD₮. *Patrón Tarkam: plata real, gente que se conoce, flujo simple.*
**Material necesario:** un cuaderno escrito a mano. Lo hacés vos en cinco minutos.

### ⚖️ **Árbitro** — WDK + QVAC — $1.000 + $1.000 + $500
Dos personas acuerdan algo ("te hago el logo por 50 dólares"). La plata queda
retenida. Cuando el trabajo se entrega, **un modelo local revisa si cumple lo
pactado** y libera el pago, o lo marca para revisión humana si no está seguro.
*Es AutoBounty, que ganó dos premios en marzo, pero con IA local en vez de
blockchain — que es justo lo que este sponsor quiere ver.*
**Ojo:** es más ambicioso que Portero y comparte su mejor momento de demo.

### 🧑‍🍳 **Changa** — WDK Pista 2 — $500 + $500
Le pagás a alguien que hizo una changa y **no tiene banco, ni tarjeta, ni saldo de
ninguna cripto**. Recibe dólares digitales y los puede mover en el mismo minuto,
sin comprar nada antes. *Es el caso puro de "sin gas", con un usuario latinoamericano
nombrable.*
**Requiere:** resolver el paymaster hoy.

---

# Parte 6 — Tier list

Ponderando: plata alcanzable, probabilidad de terminarla, competencia esperable,
material que hace falta, y qué tan impactante es la demo.

## 🟥 S — las dos que yo defendería

| Idea | Track | Plata | Por qué |
|---|---|---|---|
| **🐄 Vaquita** | Pears + QVAC + WDK + General | **$3.500** | Única con tres bounties. Demo imbatible. Escalera de repliegue en cada escalón. Difícil, pero cada escalón ya es una entrega válida |
| **🛡️ Portero** | WDK P1 + General | **$1.500** | La demo del "no" es el mejor momento del documento. Encaja en el molde de Tarkam. **Es la más fácil de terminar de todas las S** |

## 🟧 A — muy buenas

| Idea | Track | Plata | Por qué |
|---|---|---|---|
| **📄 Ventanilla** | QVAC P1 + General | $1.500 | La más segura de terminar. Material fácil de conseguir. Problema que todos sufren |
| **📊 Banco de pruebas** | QVAC P2 + General | $1.000 | El hueco más claro. Puntaje técnico altísimo. Poca competencia |
| **🔑 Llave** | Pears + General | $1.500 | Mejor relación esfuerzo/competencia. Pero el "wow" es bajo, como dijiste |

## 🟨 B — funcionan, no destacan

| Idea | Track | Plata | Por qué |
|---|---|---|---|
| **🎫 Fiado** | WDK + QVAC + General | $2.500 | Patrón ganador, pero menos memorable que Portero |
| **⚖️ Árbitro** | WDK + QVAC + General | $2.500 | Muy bueno, demasiado ambicioso para 24h siendo primerizos |
| **🧾 Nómina CSV** | WDK P1 + General | $1.500 | Imposible de arruinar, imposible de destacar |
| **🏠 Vecino** | Pears + General | $1.500 | Buena, pero Curva ya ocupó ese lugar |

## 🟦 C — solo si algo falla

| Idea | Por qué |
|---|---|
| **🎮 Duelo** | *Practicality* 2 de 5 |
| **🧑‍🍳 Changa / sin gas** | Depende de infraestructura que puede fallar |
| **🧾 Conciliador de remitos** | **No tienen el material** |

---

# Parte 7 — Mi recomendación, en tres líneas

1. **Si el equipo se anima: Vaquita.** Tres bounties, la mejor demo, y cada
   escalón de la escalera ya es una entrega válida. Construida en el orden
   correcto, el riesgo es mucho menor de lo que parece.
2. **Si quieren algo más contenido pero igual de fuerte: Portero.** Es la que más
   te gustó, la demo es memorable, y es de las más fáciles de terminar.
3. **Y hay una jugada que combina las dos:** Vaquita **incluye** el motor de
   reglas de Portero. La parte de pagos de Vaquita puede tener límites de gasto y
   confirmaciones — o sea que si Vaquita se complica en QVAC o en Pears, **lo que
   ya construiste sigue siendo Portero**, y te presentás a WDK igual.

Esa es la razón real por la que Vaquita es menos riesgosa de lo que parece: **su
plan de emergencia es la otra idea que te gustó.**

---
---

# Parte 8 — Respuestas rápidas a lo que preguntaste

## ¿Se cae la idea de mensajería por culpa de Curva?

**Sí, se cae. Pero por un motivo mucho más fuerte que Curva, y lo encontré recién.**

**El tutorial oficial de Pear se llama, literalmente, "Build a peer-to-peer chat".**
Es el hola-mundo de la plataforma. Es lo primero que hace cualquiera que abre la
documentación.

Y el juez del track es **dmc, el creador de Pear**.

O sea: si presentás un chat, el tipo que diseñó la plataforma va a estar mirando
**el resultado de su propio tutorial**. Es la peor nota posible en originalidad que
podés sacar, y no hay forma de recuperarla con ejecución.

Curva refuerza lo mismo desde el otro lado —ya ganó un proyecto social con chat—
pero el argumento del tutorial es definitivo. **Chat, mensajería y pasarse archivos
entre pares: descartado.**

**Lo que se salva:** Llave sigue viva, porque no es mensajería. Es un
intercambiador de secretos de un solo uso: código de tres palabras, se usa una vez
y se muere. La diferencia no es cosmética — el producto es *que el secreto no
quede en ningún lado*, no *que dos personas se hablen*.

## ¿Se le pueden agregar llamadas de voz?

**No en 24 horas.** Voz por peer-to-peer es posible —Keet, la app de Holepunch, lo
hace— pero implica captura de audio, códec, buffer, latencia y manejo de cortes.
Es un proyecto entero, no una feature.

Y hay un problema peor: **te empuja de vuelta al territorio del chat**, que
acabamos de descartar. Sumar llamadas no diferencia; profundiza el parecido con el
tutorial.

## ¿Puede funcionar sin internet?

Acá hay que ser preciso, porque "sin internet" significa dos cosas distintas:

| Situación | ¿Funciona? |
|---|---|
| **Todos en el mismo wifi, pero el wifi no tiene salida a internet** | Sí. Los pares se encuentran en la red local |
| **Cada uno en su casa, en redes distintas** | Sí, pero **necesita internet** para que se encuentren. La red de descubrimiento vive en internet |
| **Sin ninguna red: wifi apagado, en el subte** | Solo con Bluetooth de baja energía, que es experimental |

**La demo de apagar el wifi funciona** si están todos en la misma red local — que
es exactamente la situación de una mesa de restaurante o de una sala de hackathon.

⚠️ **No lo tomes como verificado.** No confirmé el detalle exacto de cómo Pear
descubre pares en red local sin salida a internet. **Probalo hoy**: dos máquinas,
mismo wifi, desconectá el router de internet pero dejá el wifi prendido, y fijate
si se ven. Si funciona, tenés la demo. Si no, la demo es "apago los datos del
celular y sigue andando en la red local", que igual impresiona.

---

# Parte 9 — Vaquita en el teléfono

Tenías toda la razón: **nadie saca la notebook en la cena.** Es la objeción más
obvia y un juez la va a pensar en el segundo tres del video.

## La respuesta corta

**Para el hackathon: se construye para computadora. Para el mundo real: va al
teléfono, y las tres tecnologías lo soportan.**

## Por qué para el hackathon tiene que ser computadora

El track de Pears exige que el juez pueda instalar tu herramienta escribiendo
`pear install pear://` y un código. **Ese comando se escribe en una terminal de
computadora.** Si hacés una app de teléfono, no hay forma de que el juez la
instale así, y no calificás para el track.

O sea: la versión que se presenta corre en computadora, **porque es la única que
el juez puede probar.**

## Pero móvil no es una fantasía, y esto es lo bueno

Las tres tecnologías tienen camino a teléfono, y lo encontré en la documentación:

| Tecnología | En el teléfono |
|---|---|
| **QVAC** | Sí, vía Expo. Corre en iOS y Android, aunque **solo en un teléfono real**, no en emulador |
| **WDK** | Sí. Hay un arranque rápido de React Native **y un kit de interfaz ya hecho** |
| **Pear** | El motor (Bare) corre en teléfono. Lo que no corre en teléfono es la **instalación** por `pear install` |

**Traducción:** el producto Vaquita en teléfono es construible de verdad. Lo único
que es de computadora es el canal de distribución que exige el track.

## Y esto se convierte en un punto a favor

Es material perfecto para los últimos 20 segundos del video, que es donde la
rúbrica premia tener un plan claro de cómo terminarías:

> "Lo presentamos como herramienta de computadora porque así se instala con Pear y
> así lo pueden probar ustedes. El producto real es una app de teléfono: QVAC corre
> en móvil vía Expo y WDK tiene kit de React Native. El motor es el mismo; lo que
> cambia es la pantalla."

**Eso demuestra que entendiste la plataforma en vez de ignorar la objeción.** Y es
mucho mejor que fingir que la gente lleva notebooks al restaurante.

## El detalle de la demo que lo arregla del todo

En el video, **tres notebooks sobre la mesa es raro**. Pero esto no:

- Poné las tres notebooks y **un ticket de verdad, arrugado, apoyado al lado**.
- **El primer plano es la foto del ticket sacada con el celular.** Eso ancla la
  escena en el mundo real.
- Y decilo en voz alta: *"lo mostramos en computadoras porque así se instala con
  Pear; en la vida real esto es una app de teléfono."*

Diez palabras y la objeción desaparece.

---

# Parte 10 — Pluses nuevos para Vaquita

Además de la corrección de Mercado Pago de la Parte 4, que se mantiene entera.

## Plus 1 — Ya existe una libreta de direcciones peer-to-peer, hecha por Tether

Encontré en la documentación de WDK una herramienta llamada **P2P Address Book**.

**Resuelve exactamente el problema más molesto de Vaquita:** ¿cómo sé la dirección
de la billetera del que me debe plata, sin un servidor que guarde una lista de
contactos? Esa es la parte fea de cualquier producto de pagos entre personas.

Si esa herramienta hace lo que su nombre dice, **se ahorran horas** y además usan
otra pieza del ecosistema del sponsor, que es lo que quieren ver.

`https://docs.wdk.tether.io/tools/p2p-address-book/`

## Plus 2 — Tether documenta oficialmente cómo correr WDK adentro de Pear

Hay una página que se llama **"Run WDK in a Pear worklet"**.

Esto es importante por dos motivos. Primero, práctico: hay una guía, no hay que
inventar cómo se juntan. Segundo, y más importante: **la combinación Pear + WDK
está bendecida por el sponsor.** No es una ensalada tecnológica nuestra — es un
camino que ellos documentaron.

Si un juez duda de por qué combinaste dos tracks, la respuesta es que seguiste su
propia guía.

`https://docs.wdk.tether.io/tools/pear-wrk-wdk/`

## Plus 3 — El modo "el que se fue temprano"

Una función chica que agrega mucha credibilidad porque todos la vivieron:

Alguien se va antes de que llegue la cuenta. Deja marcado lo que consumió y se va.
Cuando el ticket entra, **su parte se calcula sola y le llega la deuda**, aunque ya
no esté en la mesa ni en la red.

Cuesta poco —es guardar su marca y sincronizar después— y en el video son cinco
segundos que hacen que el juez piense *"esta gente estuvo en esa mesa"*.

## Plus 4 — La propina y el reparto desigual

Dos casos que aparecen en toda cuenta real y que casi ningún producto de estos
maneja bien:

- **La propina** se reparte proporcional a lo que consumió cada uno, no en partes
  iguales.
- **Lo compartido** —la picada, la botella de vino— se marca como "de todos" y se
  divide solo entre los que lo tocaron.

Es lógica pura, no requiere ninguna tecnología nueva, y **demuestra que pensaste
el problema en serio**. Es lo que separa un demo de un producto.

## Plus 5 — La confianza, mostrada en pantalla

Cuando el modelo lee el ticket y no está seguro de un ítem, **que lo diga**: el
renglón queda en amarillo y pide que alguien lo confirme.

Esto no es un detalle de interfaz. **El sponsor de QVAC premia explícitamente
señalar incertidumbre**, con estas palabras: un agente que marca lo que no sabe es
mejor que uno que predice un número con demasiada confianza.

Y encima resuelve un problema real: si el OCR se come un número, alguien paga de
más y el producto pierde toda credibilidad.

## Plus 6 — El recibo que queda

Después de saldar, cada uno recibe un comprobante: qué comió, cuánto puso, a quién
le pagó, con el identificador de la transacción.

Sirve para el pitch —*"nunca más 'yo ya te pagué'"*— y es barato de construir.

---

# Parte 11 — Los ganadores, explicados en detalle

Pediste entender cómo funcionaban de verdad. Acá va, y de cada uno sale un patrón
que se puede copiar.

## 🏆 Tarkam — ganó el track de WDK **y** el campeonato general del Tether Developers Cup

**Qué era:** un sistema de premios para torneos de fútbol amateur.

**Cómo funcionaba:** los equipos pagan la inscripción en dólares digitales. Esa
plata queda retenida en un lugar que **nadie controla individualmente** —ni el
organizador ni los jugadores—. El estado del torneo se puede verificar. Cuando
termina, los premios se reparten solos según el resultado.

**Qué problema real resolvía:** el organizador de un torneo de barrio junta la
plata de ocho equipos y todos tienen que confiar en que no se va a ir con la
recaudación. Es un problema social de toda la vida, resuelto sin que nadie tenga
que confiar en nadie.

**Qué usó de WDK:** creación de billeteras, firma de transacciones, y cuentas sin
comisión de gas.

> **El patrón: plata real, entre gente que se conoce, con un flujo que se explica
> en una oración.** No inventó una categoría. Agarró algo que ya pasa —una vaquita
> para un torneo— y le sacó la parte de confiar.

## 🏆 Curva — ganó el track de Pears

**Qué era:** ver un partido de fútbol sincronizado con amigos que están en otros
países.

**Cómo funcionaba:** la reproducción se sincroniza entre todos sin servidor. Hay
chat. **La traducción entre idiomas la hace un modelo corriendo en el dispositivo
de cada uno** (QVAC). Y podés mandarle propina a alguien (WDK).

**Qué problema resolvía:** ver algo "juntos" estando lejos, sin que exista una
empresa en el medio que sepa qué mirás y con quién.

> **El patrón: las tres tecnologías juntas, cada una haciendo algo que las otras no
> pueden.** Sin servidores por Pear, privacidad e idiomas por QVAC, plata por WDK.
> **Esta es exactamente la forma de Vaquita.** Está probado que gana.

## 🏆 Scout — ganó el track de QVAC

**Qué era:** inteligencia artificial de fútbol corriendo dentro del dispositivo.

> **El patrón: un dominio específico, no "un asistente".** No hizo "una IA que
> responde preguntas". Hizo IA **de fútbol**. La especificidad es la ventaja.

## 🏆 AutoBounty — ganó dos premios en Aleph marzo 2026

**Qué era:** un sistema de recompensas para trabajo de programación.

**Cómo funcionaba:** alguien publica una tarea con una recompensa. Un programador
la hace y manda su cambio de código. **Un contrato inteligente con capacidad de
razonar mira el código de GitHub y decide si el trabajo está hecho.** Si sí, libera
el pago automáticamente.

**Qué problema resolvía:** para pagarle a alguien por un trabajo digital, hoy hace
falta que un humano revise y decida. Eso es lento, es discutible y necesita
confianza.

> **El patrón: la inteligencia artificial DECIDE, el sistema de pagos EJECUTA.**
> Es la estructura más premiada de todas y se puede aplicar a cualquier dominio.

## 🏆 Piggy Quiz — ganó el track de Base en Aleph agosto 2025

**Qué era:** una trivia que enseña finanzas, con preguntas generadas por IA,
personajes, ranking, y premios de verdad en dólares digitales.

> **El patrón: tema aburrido + experiencia divertida.** Nadie quiere "aprender
> educación financiera". Todos quieren jugar una trivia y ganar plata. El envoltorio
> es el producto.

## 🏆 Clever — ganó el track de Fiserv en Aleph marzo 2026

**Qué era:** una herramienta para que un comercio pueda cuadrar sus ventas con lo
que efectivamente le depositó el banco.

**El problema, según su creador:** los comercios reciben reportes pero no pueden
validar ni entender realmente dónde está su plata. Clever conecta ventas,
liquidaciones y extractos y muestra dónde está cada peso y por qué.

> **El patrón: un problema empresarial concreto y sin nada de glamour.** No hay
> agentes autónomos ni nada futurista. Hay un comerciante que no entiende su
> liquidación. Y ganó.

## 🏆 TornadoCodes — primer puesto general en Aleph agosto 2024

**Qué era:** dar acceso a una aplicación sin tener que juntar antes las direcciones
de billetera de todos los que van a entrar.

**Cómo funcionaba:** generás códigos únicos, repartís un link, y cualquiera puede
verificar el acceso sin que vos hayas recolectado nada de antemano.

> **El patrón: una fricción específica, eliminada.** No es una plataforma. Es un
> paso molesto que desaparece.

## Los cinco patrones, resumidos

| # | Patrón | Ganadores | Qué idea nuestra lo usa |
|---|---|---|---|
| 1 | Plata real entre gente que se conoce | Tarkam, Piggy Quiz | **Vaquita, Fiado** |
| 2 | La IA decide, el sistema ejecuta | AutoBounty | **Portero, Árbitro** |
| 3 | Las tres tecnologías, cada una imprescindible | Curva | **Vaquita** |
| 4 | Problema aburrido, sin glamour | Clever | **Ventanilla, Fiado** |
| 5 | Una fricción específica, eliminada | TornadoCodes | **Llave, Enjambre** |

---

# Parte 12 — Catálogo nuevo de ideas

Sacadas directamente de esos cinco patrones. Todas explicadas en simple, con lo
que hace falta tener.

---

## 🐝 Enjambre — Pears + QVAC — $1.000 + $1.000 + $500

**En una frase:** repartir el modelo de IA de máquina en máquina, para que
cuarenta personas en una sala no bajen cada una los mismos 2,5 GB.

**El problema, que ustedes están sufriendo hoy:** el modelo de QVAC pesa gigas.
Mañana, doscientas personas van a intentar bajar el mismo archivo por el wifi del
venue al mismo tiempo. Se va a caer. **Es el problema del propio evento donde están
compitiendo.**

**Cómo funciona:** el primero lo baja de internet. El segundo lo recibe del
primero. El tercero de los dos anteriores. Como funcionaban los torrents. Cuanta
más gente hay, más rápido va — al revés de lo que pasa hoy.

**Por qué las dos tecnologías son imprescindibles:** Pear es el reparto sin
servidor, QVAC es el modelo que estás repartiendo. Y **le resuelve un problema
real al sponsor: cómo hacer que la gente instale sus modelos sin depender de una
descarga central.**

**El momento de la demo:** una barra de progreso de una máquina que baja a 2 MB/s
desde internet. Se prende la segunda máquina y baja a 40 MB/s **desde la primera**.
Se prende la tercera y baja más rápido todavía.

**Puntaje:** Technicality 5 · Originality 5 · UI/UX/DX 3 · Practicality 5 ·
Presentation 4 → **22/25**

**Lo bueno:** es el patrón TornadoCodes puro y le habla directo a los dos sponsors.
**El riesgo:** repartir archivos grandes de forma confiable no es trivial.
**Qué hace falta tener:** nada. Es el que menos material necesita.

---

## 🎙️ Testigo — QVAC — $1.000 + $500

**En una frase:** grabás una reunión y te dice **quién se comprometió a qué y para
cuándo**, sin que el audio salga nunca de tu computadora.

**El problema:** en toda reunión alguien dice "yo me encargo del informe para el
jueves" y después nadie se acuerda. Las herramientas que existen suben el audio a
una nube. **Ninguna empresa seria puede subir sus reuniones internas a un tercero.**

**Cómo funciona:** QVAC transcribe el audio en el dispositivo, y después un modelo
local saca de la transcripción una lista de compromisos: quién, qué, para cuándo.
Lo que no está claro lo marca como dudoso.

**Por qué encaja perfecto en la Pista 1:** el sponsor pidió agentes que hagan
trabajo administrativo — leer, encontrar lo importante, avisar. Esto es
exactamente eso, con la privacidad como razón de existir.

**El momento de la demo:** ponés a correr un audio de dos minutos de gente
hablando. Aparecen tres renglones: *"Emi — mandar el presupuesto — martes"*,
*"Sofi — hablar con el proveedor — sin fecha ⚠"*. El wifi apagado de fondo.

**Puntaje:** Technicality 4 · Originality 4 · UI/UX/DX 5 · Practicality 5 ·
Presentation 5 → **23/25**

**Qué hace falta tener:** un audio de gente hablando. **Lo grabás vos esta noche
en cinco minutos**, con tus amigos actuando una reunión. Es el material más fácil
de conseguir de todo el documento.

---

## 🧯 Perito — QVAC — $1.000 + $500

**En una frase:** sacás fotos de un daño —el auto chocado, la humedad en la pared,
el electrodoméstico roto— y te arma el informe estructurado para el reclamo.

**El problema:** hacer un reclamo al seguro o al garante implica describir el daño,
fecharlo, listarlo y ordenarlo. Es tedioso y la gente lo hace mal, y por hacerlo
mal le rechazan el reclamo.

**Por qué local:** las fotos de tu casa y de tu auto con la patente visible no son
algo que quieras subir a una API de terceros.

**Puntaje:** Technicality 4 · Originality 4 · UI/UX/DX 4 · Practicality 4 ·
Presentation 4 → **20/25**

**Qué hace falta tener:** fotos de cosas rotas. Fáciles de conseguir, pero menos
convincentes que un ticket.

---

## 🏷️ Fiado — WDK + QVAC — $1.000 + $1.000 + $500

*(ya estaba, la amplío porque encaja en dos patrones a la vez)*

**En una frase:** el kiosquero anota el fiado en un cuaderno; sacás foto de la
página y cada cliente puede saldar su deuda.

**Cómo funciona:** el modelo local lee los nombres y montos escritos a mano. Cada
cliente recibe cuánto debe y paga en dólares digitales. El cuaderno sigue siendo
el cuaderno; lo que cambia es que la deuda se puede saldar sin que el cliente
vuelva al local.

**Por qué es fuerte:** es el patrón Tarkam (plata entre gente que se conoce) y el
patrón Clever (problema comercial sin glamour) al mismo tiempo. Y **leer letra
manuscrita argentina es difícil de verdad**, lo que sube la dificultad técnica —
el sponsor de QVAC menciona explícitamente los remitos manuscritos como caso
interesante.

**Qué hace falta tener:** una hoja de cuaderno con nombres y montos escritos a
mano. **La escribís vos en cinco minutos.**

---

## ⚖️ Árbitro — WDK + QVAC — $1.000 + $1.000 + $500

*(ya estaba, la amplío porque es el patrón AutoBounty puro)*

**En una frase:** dos personas acuerdan un trabajo, la plata queda retenida, y
**una IA local revisa si el entregable cumple** antes de liberar el pago.

**Es AutoBounty, que ganó dos premios en marzo**, pero con IA local en vez de
blockchain — que es justamente lo que este sponsor quiere ver.

**El detalle que lo hace mejor que el original:** cuando la IA no está segura,
**no decide**. Marca el caso y lo manda a un humano. Eso es exactamente lo que el
sponsor de QVAC premia, y además es la respuesta a la objeción obvia de "¿y si la
IA se equivoca?".

**El riesgo:** comparte su mejor momento de demo con Portero, y es más ambicioso.
Si te gusta esta, probablemente te convenga Portero.

---

## 🎫 Padrón — Pears — $1.000 + $500

**En una frase:** tomar asistencia en un lugar sin señal, con varias personas
anotando a la vez y sin que se pisen.

**El problema:** una elección de centro de estudiantes, un torneo, un evento en un
sótano, un control de acceso en el campo. Hoy se hace con papel y después alguien
lo carga a mano.

**Cómo funciona:** cada persona que toma asistencia tiene la herramienta. Se ven
entre ellos sin internet. Cuando uno marca a alguien, aparece en todas las
pantallas. Nadie queda anotado dos veces.

**Por qué es buena:** el "sin servidor" no es un lujo, es el requisito. Y el
problema de "dos personas anotando a la vez sin pisarse" es un problema técnico
real y explicable, que sube la dificultad.

**Qué hace falta tener:** nada.

---

## 💧 Goteo — WDK Pista 2 — $500 + $500

**En una frase:** en vez de cobrar el sueldo a fin de mes, la plata te va llegando
de a poco todos los días.

**El problema:** el que trabaja por día o por changa cobra cuando el otro se
acuerda. Y si le mandan dólares digitales, muchas veces **no los puede mover
porque no tiene con qué pagar la comisión** — que es exactamente lo que arregla la
Pista 2.

**Por qué encaja:** es el caso de uso puro de "sin comisión de gas", con un usuario
latinoamericano nombrable.

**El riesgo:** depende del paymaster. Resolvelo hoy o no la elijas.

---

## 🔐 Cofre — Pears + WDK — $1.000 + $1.000 + $500

**En una frase:** una billetera compartida entre varias personas donde hace falta
que dos de tres estén de acuerdo para sacar plata, y **el acuerdo se coordina sin
servidor**.

**El problema:** la caja chica de un grupo, el fondo de un viaje, la plata de un
club. Hoy la tiene uno solo y todos confían.

**Por qué las dos tecnologías:** WDK maneja la billetera y las firmas; Pear
coordina a los que tienen que aprobar, sin que exista un servicio central que
podría censurar o caerse.

**El riesgo:** las firmas múltiples son territorio de contratos inteligentes, y el
sponsor dice que **no hace falta escribirlos para ganar**. Verificá que WDK lo
soporte de fábrica antes de comprometerte. Si no, es demasiado para 24 horas.

---

# Parte 13 — Tier list actualizada

Con las ideas nuevas, con la mensajería descartada, y con lo que sabemos de los
patrones ganadores.

## 🟥 S

| Idea | Track | Plata | Por qué |
|---|---|---|---|
| **🐄 Vaquita** | Pears + QVAC + WDK + General | **$3.500** | Tres bounties. La forma de Curva, que ganó. Ahora con la libreta P2P y la guía oficial de WDK-en-Pear que ahorran horas. Demo imbatible |
| **🛡️ Portero** | WDK P1 + General | **$1.500** | El patrón AutoBounty. La demo del "no". La más fácil de terminar de las S |

## 🟧 A

| Idea | Track | Plata | Por qué |
|---|---|---|---|
| **🎙️ Testigo** | QVAC P1 + General | $1.500 | **El material lo grabás en cinco minutos.** Privacidad como razón real. Trabajo administrativo puro |
| **🐝 Enjambre** | Pears + QVAC + General | $2.500 | Resuelve un problema del propio sponsor. Cero material necesario. Patrón TornadoCodes |
| **📄 Ventanilla** | QVAC P1 + General | $1.500 | La más segura de terminar |
| **📊 Banco de pruebas** | QVAC P2 + General | $1.000 | El hueco más claro del evento |
| **🏷️ Fiado** | WDK + QVAC + General | $2.500 | Dos patrones ganadores a la vez. Material trivial de conseguir |

## 🟨 B

| Idea | Track | Plata | Por qué |
|---|---|---|---|
| **🔑 Llave** | Pears + General | $1.500 | Buena relación esfuerzo/competencia, pero el "wow" es bajo |
| **⚖️ Árbitro** | WDK + QVAC + General | $2.500 | Excelente forma, demasiado ambiciosa para 24h |
| **🎫 Padrón** | Pears + General | $1.500 | Sólida, sin material necesario, poco memorable |
| **🧯 Perito** | QVAC P1 + General | $1.500 | Funciona, no destaca |
| **🧾 Nómina CSV** | WDK P1 + General | $1.500 | Imposible de arruinar, imposible de destacar |

## 🟦 C — solo si algo falla

| Idea | Por qué |
|---|---|
| **🔐 Cofre** | Puede requerir contratos inteligentes. Verificar antes |
| **💧 Goteo** | Depende del paymaster |
| **🎮 Duelo** | Practicality 2 de 5 |
| **🧾 Conciliador de remitos** | No tienen el material |

## ⬛ Descartadas

| Idea | Por qué |
|---|---|
| **🏠 Vecino / chat / archivos entre pares** | **Es el tutorial oficial de Pear.** El juez es el creador de Pear |
| **📞 Cualquier cosa con llamadas de voz** | No entra en 24 horas y te empuja al territorio del chat |

---

# Parte 14 — Lo que yo haría

**Vaquita sigue primera**, y ahora con más razón que antes: encontré que Tether
documenta oficialmente cómo correr WDK adentro de Pear, y que existe una libreta
de direcciones peer-to-peer ya hecha. Las dos piezas que parecían más difíciles
resultaron estar resueltas por el propio sponsor.

**Pero apareció una segunda opción que antes no estaba: Testigo.** Y tiene una
virtud que ninguna otra tiene — **el material de prueba lo generás esta noche en
cinco minutos**, juntando a tus amigos a actuar una reunión de dos minutos. Sin
depender de conseguir tickets, sin depender de que el OCR lea letra manuscrita.
Si la instalación de QVAC te sale bien pero la lectura de fotos te falla, **Testigo
usa transcripción de audio en vez de lectura de imágenes**, que es otro camino
completamente distinto dentro del mismo track.

Ese es el argumento real: **Testigo es el plan B de Vaquita que no comparte su
punto de falla.**

Y si el driver de AMD no se deja actualizar y QVAC queda afuera: **Portero**, que
no lo necesita para nada y es la que más te gustó desde el principio.

---
---

# Parte 15 — La defensa del teléfono, completa

> Escrita para responder a la objeción más obvia que va a tener un juez:
> *"nadie saca la notebook en la cena".*

## El planteo del problema

Es una objeción real y la va a pensar cualquiera en el segundo tres del video. Si
la ignorás, el juez se queda con la duda todo el resto del pitch y baja
*Practicality*. Si la enfrentás de frente en diez segundos, **la convertís en un
punto a favor** porque demuestra que entendiste la plataforma en vez de esquivarla.

## Los hechos, separados por nivel de certeza

### ✅ Verificado en la documentación oficial

| Tecnología | Situación en teléfono |
|---|---|
| **QVAC** | Corre en iOS y Android **vía Expo**. Hay un tutorial dedicado ("Build on Expo"). **Solo en dispositivo físico, no en emulador** |
| **WDK** | Tiene arranque rápido de React Native **y un kit de interfaz ya hecho** |
| **Pear** | El motor (Bare) corre en teléfono. Lo que **no** corre en teléfono es la instalación por `pear install pear://` |

### ⚠️ Lo que NO se puede hacer, y hay que decirlo

**Armar la app de Expo no es "correr el mismo script en el celular".** Es construir
una aplicación aparte, con su propio proyecto, su propio build y un dispositivo
físico para probar. **Eso no entra en 24 horas siendo la primera hackathon.**

Cualquiera que te diga que sí, no leyó la documentación.

## Por qué la versión de computadora no es un parche, es el requisito

Esta es la parte que hay que entender bien, porque le da vuelta el argumento:

**El track de Pears exige que el juez pueda instalar tu herramienta escribiendo
`pear install pear://` más un código.** Ese comando se escribe en una terminal de
computadora. Los jueces la instalan igual que cualquier usuario, y si no anda, la
entrada **no se considera**.

O sea: **la versión de computadora no es una limitación tuya. Es la forma que el
sponsor eligió para que se entreguen los proyectos de su track.** Presentar una app
de teléfono te dejaría afuera del bounty de $1.000.

Cuando lo decís así, dejás de estar excusándote y pasás a estar explicando una
decisión de diseño correcta.

## El guion, palabra por palabra

Tenés dos lugares donde meterlo. **Usá los dos.**

### Momento 1 — Segundo 25 del video, apenas termina la demo del ticket

Diez segundos, dicho al pasar, sin darle importancia:

> *"Lo mostramos en computadoras porque así se instala con Pear, y así lo pueden
> probar ustedes. En la vida real esto vive en el teléfono."*

**Por qué funciona:** cortás la objeción antes de que se forme. El juez iba a
pensarlo justo ahí, y vos lo dijiste primero. Eso transmite que estuviste un paso
adelante.

### Momento 2 — Los últimos 20 segundos, en la parte de "qué falta"

Acá va la versión larga, y es donde se ganan los puntos:

> *"El camino a producción está resuelto, no es una promesa. QVAC corre en Android
> e iOS vía Expo — hay tutorial oficial — y WDK tiene arranque rápido de React
> Native con un kit de interfaz ya hecho. El motor es exactamente el mismo; lo que
> cambia es la pantalla.*
>
> *Lo que no migra es la instalación por Pear, porque `pear install` es de
> escritorio. En producción la app se distribuye por tienda, y Pear queda como lo
> que ya es acá: la capa de descubrimiento entre pares, que en el teléfono corre
> igual sobre Bare.*
>
> *Calculamos dos días para la app de Expo, sobre el mismo núcleo."*

**Por qué esto puntúa:** la rúbrica de *Technicality* pregunta textualmente si la
solución está completa **o si el equipo tiene un plan claro de cómo la
terminaría.** Esto es un plan claro, con nombres de tecnologías reales, con lo que
migra y lo que no, y con una estimación. No es *"con más tiempo lo mejoraríamos"*.

## Los tres trucos de filmación que hacen desaparecer la objeción

**1. El primer plano es el ticket de papel, no la pantalla.**
Arrancá el video con una mano dejando un ticket arrugado sobre la mesa. Eso ancla
la escena en el mundo real antes de que aparezca una sola computadora.

**2. Sacá la foto con el celular, en cámara.**
Aunque el procesamiento después ocurra en la notebook. Que se vea la mano
agarrando el teléfono y sacando la foto del ticket. **El gesto que el juez tiene
en la cabeza es ese**, y si lo ve, el cerebro completa el resto solo.

**3. Las tres notebooks abiertas, pero con vasos y platos alrededor.**
Suena tonto y no lo es. Una mesa con tres notebooks y nada más parece un
laboratorio. Una mesa con tres notebooks, un ticket, dos vasos y una servilleta
parece una sobremesa donde alguien sacó la compu. **Es la misma toma con veinte
segundos más de preparación.**

## Y el argumento de fondo, por si alguien insiste

Si en las preguntas alguien te aprieta con esto, la respuesta corta es:

> *"El problema que resolvemos no pasa en la mesa. Pasa a las dos horas, cuando
> nadie se acuerda quién debe qué. Ahí sí estás con la compu."*

Es verdad y es fuerte, porque **reencuadra el momento de uso**. La foto del ticket
se saca en la mesa; el reparto y el pago pasan después. Y "después" es cuando
estás en tu casa.

## Cómo se conecta con el resto del pitch

Fijate que esta defensa **refuerza la corrección de Mercado Pago de la Parte 4**,
no la contradice:

- El restaurante cobra como siempre, con el posnet de uno solo.
- La foto del ticket se saca ahí, con el teléfono.
- **El reparto y el saldo de la deuda pasan después**, que es cuando el "después
  te lo paso" se evapora.

Las dos cosas juntas arman una historia coherente de cuándo se usa el producto, y
esa coherencia es exactamente lo que separa una demo de un producto pensado.
