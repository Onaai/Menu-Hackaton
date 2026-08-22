# Decisión y plan — quedan 17 horas

**Sábado 22 de agosto de 2026, 18:45 (GMT-3).** El reloj arrancó a las 12:00 y
cierra mañana a las 12:00. Van 6 horas 45. **Quedan 17 horas 15.**

Escribo esto sabiendo la hora, porque cambia qué tiene sentido recomendar. A esta
altura el riesgo más grande no es elegir la idea equivocada: **es no elegir.**

---

# ⚠️ Antes de nada: qué pude verificar hoy y qué no

Lo pongo primero porque cambia cuánto tienen que confiar en cada cosa de acá abajo.

**La red de esta sesión tiene bloqueado el egress a los dominios que me pasaste.**
No es que se hayan caído: la política de red devuelve 403 en el proxy.

| Dominio | Estado hoy |
|---|---|
| `tether.io` | ⛔ 403 — bloqueado |
| `mdk.tether.io` | ⛔ 403 — bloqueado |
| `docs.qvac.tether.io` | ⛔ 403 — bloqueado |
| `docs.wdk.tether.io` | ⛔ 403 — bloqueado |
| `docs.pears.com` | ⛔ 403 — bloqueado |
| `alephhackathon.crecimiento.build` | ⛔ 403 — bloqueado |
| `dorahacks.io` | ⛔ sin respuesta |

O sea: **hoy no pude leer la documentación oficial de primera mano.** Lo que
afirmo sale de tres fuentes, y las marco una por una a lo largo del documento:

- 🟩 **Texto oficial que ustedes mismos pegaron** en la conversación (las páginas
  de los bounties de WDK, QVAC y Pears están transcriptas completas ahí). Es
  evidencia de primera calidad: es la letra del sponsor.
- 🟨 **Búsqueda web** — sirvió para lo de MDK y para corroborar los tres productos.
- 🟥 **Lo que verifiqué yo con herramientas acá** — el PDF del menú. Esto sí lo
  ejecuté y lo puedo defender línea por línea.

Lo que **no** puedo hacer hoy es confirmar contra la doc oficial un nombre de
método o un campo de configuración. Si necesitan eso, es de la doc o del mentor,
no de mí. La regla de siempre: **si les digo de memoria cómo se llama un método,
desconfíen.**

---

# 1. La decisión, en cinco líneas

1. **Van con el menú interactivo.** Es la idea correcta y tienen el material.
2. **Se presentan a QVAC Premio 1** ($1.000) **+ General Track** ($500). Un solo
   bounty de Tether, como manda la regla.
3. **WDK entra en el producto** (propina y reparto entre comensales), **pero no
   es lo que los juzga.** Si a las 4 AM no anda, se corta y el proyecto vive.
4. **Pears no entra en esta idea.** Explico abajo por qué eso está bien y qué
   hacer con el gate que ya pasaron.
5. **El pitch no es "una app de menú por QR".** Es otra cosa, y ese reencuadre es
   lo que separa esto de los cincuenta menús por QR que ya existen.

---

# 2. Los tracks de Tether — y una corrección importante

## 2.1 MDK no es uno de los tracks. Es otro producto.

Me pasaste `https://mdk.tether.io/` diciendo que era uno de los tres. **No lo es.**

🟨 **MDK = Mining Development Kit.** Es el kit open source de Tether para
**operaciones de minería de Bitcoin**: un SDK de JavaScript más una librería de
componentes React para controlar ASICs, medidores de energía y sistemas de
refrigeración. Lo lanzaron en abril de 2026. La documentación vive en
`docs.mdk.tether.io`.

No tiene nada que ver con la hackathon. Si entraron a esa página buscando el kit
de billeteras, estaban leyendo el producto equivocado.

**El que ustedes quieren es WDK — Wallet Development Kit**, en
`docs.wdk.tether.io`. La sigla que anotaste como "mdt" en un momento y como "mdk"
en otro es, en los dos casos, **WDK**.

Esto no es una corrección cosmética: si mañana alguien del equipo se pone a leer
`mdk.tether.io` para preparar la parte de pagos, pierde horas leyendo sobre
hashrate.

## 2.2 Los tres de Tether son QVAC, WDK y Pears

🟩 Está confirmado por el texto que ustedes pegaron: las tres páginas de bounty
dicen "Tether" como patrocinador. 🟨 Y lo corrobora la búsqueda: el **Tether
Developers Cup** tuvo exactamente esos tres tracks (Pears, QVAC, WDK), y la
"Resilience Stack" que anunció Tether son Holepunch/Pears, Keet, WDK y QVAC.

| Track | Qué es | Premio |
|---|---|---|
| **QVAC** | IA que corre entera en el dispositivo. OCR, visión, transcripción, texto | $2.000 |
| **WDK** | Billeteras y pagos multi-cadena, sin custodia. CLI + servidor MCP + módulos gasless | $1.500 |
| **Pears** | Runtime y distribución peer-to-peer, sin servidores ni tienda de apps | $1.000–1.500 |

## 2.3 El cuarto track no es de Tether

**General Track — Crecimiento — $1.000** (1° $500 · 2° $500). Ese es el
"general" que no sabías cuál era. **No lo pone Tether: lo pone la organización
del evento.** No tiene requisito técnico: entra el mismo proyecto que ya hiciste,
sin construir nada extra. Es el track "libre" que mencionaste.

## 2.4 La regla, y cómo se reconcilia con lo que te dijeron

🟩 El texto oficial que ustedes pegaron dice, arriba de cada bounty:

> **Tether · puedes ingresar 1 pista de este patrocinador**

Esa frase aparece en las **tres** páginas. Y las tres son de Tether. La lectura
conservadora es la que ya estaba en el dossier: **se entra a uno solo de los tres.**

Y acá está la reconciliación con lo que te dijeron cuando consultaste, que **no
se contradice** con esto:

> **Track no es lo mismo que tecnología.** El límite es sobre a cuántos *bounties*
> te presentás, no sobre cuántos *SDK* importa tu proyecto.

O sea: podés construir un producto que use QVAC **y** WDK **y** Pears —Curva, el
que ganó el track de Pears en el Developers Cup, usaba los tres— y aun así
**presentarlo a un solo bounty de Tether**, más el General. Eso explica
exactamente lo que te dijeron: *"se pueden usar las tres, pero lo ideal es
perfeccionar una"*.

**Máximo realista de tiros: 2.** Un bounty de Tether + General. Con $1.500 de
techo, que es plata de verdad.

## 2.5 La pregunta exacta para el Telegram, ahora

No la dejen para mañana. Copiar y pegar, tal cual:

> Hola! Los tres tracks de Tether (QVAC, WDK, Pears) dicen "puedes ingresar 1
> pista de este patrocinador". ¿Eso significa 1 en total entre los tres, o 1 por
> cada uno? Nuestro proyecto usa QVAC como componente principal y WDK para los
> pagos: ¿lo presentamos solo a QVAC, o podemos presentarlo también a WDK?

**Si la respuesta es "uno en total", el plan de acá abajo ya es el correcto y no
cambia nada.** Si resulta que se puede a más de uno, es upside gratis: el mismo
proyecto se anota también en WDK sin trabajo extra. **Por eso el plan está armado
para que la respuesta no los bloquee.** No esperen la respuesta para empezar.

---

# 3. Dónde están parados con la máquina

Esto lo saco de sus propias salidas de terminal, que es la mejor evidencia que hay.

| Pieza | Estado | Evidencia |
|---|---|---|
| Node 22.20.0 | ✅ | `qvac doctor` |
| RAM 31 GB · disco 713 GB | ✅ | `qvac doctor` |
| Vulkan (AMD Radeon 880M) | ✅ | `qvac doctor` |
| `@qvac/cli` + `@qvac/sdk` v0.17.1 | ✅ | `qvac doctor` → *All required checks passed* |
| Modelo de texto corriendo | ✅ | `prueba.js` imprimió con `modelConfig: { device: 'cpu' }` |
| `qvac serve openai` | ⚠️ | Levanta en el 11434 pero dice *No models configured for preload* |
| **Modelos de OCR bajados** | ✅ | `latin_g2.gguf` y `craft_mlt_25k.gguf`, checksum validado |
| **OCR corriendo** | ❓ | Se cayó por `langList: ['es']`. **El arreglo es `['en']` y nunca me pegaste la corrida siguiente** |
| **Pear** | ✅✅ | `pear://3mtqyaui5ew6...` generado y `CLI ready`. **Pasaron el gate más difícil del evento** |
| WDK CLI | ✅ | `wdk --version` responde; `send` pidió dirección real (esperable) |
| Billetera WDK creada | ❓ | Sin evidencia |
| ffmpeg | ❌ | Solo hace falta para transcripción (idea Testigo). Irrelevante ahora |

**El único desconocido que importa a esta hora es el OCR.** Todo el plan cuelga de
ahí, y hay una forma de saberlo en veinte minutos. Está en la sección 8.

---

# 4. El PDF del menú: tres hallazgos, y uno cambia el alcance

🟥 Esto lo ejecuté yo, acá, con `pdfinfo`, `pdffonts`, `pdftotext` y `pdfimages`.
Es lo más sólido de todo el documento.

```
Pages:           1
Page size:       619.68 x 6958.08 pts
Fuentes:         (ninguna)
Texto extraíble: 1 byte
Imagen:          1 JPEG · 1291 x 14496 px · 150 ppi · 4,2 MB
```

## Hallazgo 1 — Es UNA página de 14.496 píxeles de alto

No son 43 páginas: es una sola, once veces más alta que ancha. Es la exportación
de un menú digital de scroll, hecha desde macOS Quartz en septiembre de 2024.

**Consecuencia práctica:** no le podés pasar eso a `ocr()` de una. Entre el
tamaño y el `magRatio: 1.5` que ya tienen puesto, es pedir memoria para una
imagen gigante. **Hay que cortarla en mosaicos.** Ya está resuelto, ver sección 7.

## Hallazgo 2 — No tiene capa de texto. Ni una letra.

`pdffonts` no devuelve ninguna fuente y `pdftotext` devuelve 1 byte. **La carta
entera es una foto.**

Esto es **buenísimo para ustedes**, y quiero ser explícito porque contradice algo
que yo mismo escribí antes. En el documento de ideas simples yo había bajado esta
idea con este argumento:

> *"Un menú por QR es texto limpio, o sea que el modelo casi no trabaja — y si el
> modelo casi no trabaja, el sponsor de QVAC se da cuenta."*

**Ese argumento se cae con este PDF.** No hay texto limpio: hay una imagen de
14.496 px, a dos columnas, con tipografías de tres cuerpos distintos, texto
blanco sobre fotos, y los símbolos de dieta como íconos y no como letras. El
modelo trabaja, y mucho. La objeción que yo mismo puse ya no aplica.

## Hallazgo 3 — ⚠️ La carta NO TIENE PRECIOS

Miré la carta entera. Hay nombres, descripciones, íconos de dieta (vegano,
vegetariano, sin TACC), medidas (`500 CC`), y opciones escritas en prosa. **No
hay un solo precio en todo el archivo.**

Es normalísimo en Argentina —la carta de diseño se imprime una vez y los precios
van aparte— pero **rompe el carrito con total** si el plan era que el OCR
resolviera todo.

**No es fatal. Es el reencuadre del producto**, y queda mejor así:

> El OCR no saca el precio. El OCR saca **la estructura**: 60 y pico de platos,
> sus categorías, sus descripciones, sus restricciones de dieta y sus opciones de
> personalización. Eso es lo que cuesta un día de tipeo. **El precio lo pone el
> local una sola vez, en una planilla que le generamos nosotros.**

Y ahí aparece algo mejor todavía: esa planilla es **la pantalla de revisión
humana**, con los renglones dudosos marcados. Y eso es literalmente lo que el
sponsor de QVAC premia, con sus palabras:

> *"un agente que señala incertidumbre es mejor que uno que predice un número con
> demasiada confianza"*

El script que les dejo ya genera esa planilla: `menu-precios.csv`.

## Hallazgo 4 — La carta ya trae las opciones escritas

Este me lo encontré leyendo la sección de bebidas y es oro:

```
LICUADOS  FRUTA A ELECCIÓN
BANANA . FRUTILLA . DURAZNO . MANZANA
ELEGILO CON BASE DE LECHE, AGUA O NARANJA.
```

Eso **ya es un selector de personalización**, escrito en la propia carta,
esperando a que alguien lo lea. Lo mismo con `LIMONADAS 500 CC` y con
`TARTAS — CONSULTÁ POR LA TARTA DEL DÍA`.

O sea que tu "gaseosa con hielo" y tu "hamburguesa sin aderezos" no son una
feature que hay que inventar: **son datos que están en la carta y que nadie
extrae**. El script ya los detecta y los saca como opciones estructuradas.

---

# 5. La idea, evaluada en serio

## 5.1 Lo que está bien, y no es poco

- **El dolor es real y nombrable.** Comanda con errores, el mozo que tiene que
  volver tres veces, el que es celíaco y tiene que preguntar plato por plato.
- **Tienen el material, y es difícil.** Una carta real de un local real de Buenos
  Aires, en el formato peor posible. Es exactamente lo que el sponsor pide:
  *"que funcione con datos reales y complejos, no con un PDF limpio elegido a mano"*.
- **Es el patrón Clever**, que ganó el track de Fiserv en Aleph de marzo: un
  problema comercial concreto y sin nada de glamour.
- **Es el patrón TornadoCodes**, que salió primero en 2024: una fricción
  específica que desaparece.

## 5.2 Los cuatro problemas, y cuál es fatal

### ❌ Pears no encaja, y hay que aceptarlo

🟩 El requisito del track, textual: la herramienta tiene que instalarse con
`pear install pear://<key>`, y **los jueces la instalan igual que cualquier
usuario; si ese comando no funciona, la entrada no se considera.**

Una carta que se abre escaneando un QR **es una página web**. No se instala con
`pear install`. No hay forma de que califique.

Pegarle un CLI al costado para calificar es exactamente lo que los sponsors
castigan. **No lo hagan.**

*(Hay una vuelta elegante — el ingestor de cartas SÍ es un CLI — pero es un
opcional de la hora 14, no un plan. Ver 9.4.)*

### ⚠️ Pagarle al restaurante en USD₮ no pasa en Argentina

Es la misma objeción de Mercado Pago que vos mismo trajiste y que ya corregimos
para Vaquita. Un juez argentino ve al mozo cobrando en dólares digitales y piensa
"esto no pasa". Y tiene razón.

**Lo que sí pasa, y encaja perfecto:**

- **La propina.** 🟩 El bounty de WDK nombra textualmente *"suscripciones,
  propinas o economías in-game"* como caso de uso de los módulos gasless. Una
  propina al mozo es plata del mozo, no del circuito fiscal del local, es chica,
  y **un turista puede dejarla sin tener banco argentino.** Es creíble.
- **El reparto entre los de la mesa.** Uno paga todo con el posnet y los demás le
  saldan. Eso es Vaquita, y es el mismo problema de siempre.
- **El efectivo con vuelto.** No es cripto, es lógica pura, y en Argentina es
  **más** creíble que cualquier pago digital. Va sí o sí.

### ⚠️ El fueguito de "los más pedidos" no tiene datos el día 1

Si un local recién carga la carta, no hay historial. Dos salidas honestas:
que **el local marque sus destacados** (una columna más en el CSV), o mostrar
"lo que más se pidió hoy en esta mesa" cuando ya haya pedidos.

**Lo que no hay que hacer es inventar números en la demo.** Si un juez pregunta
de dónde sale el fueguito y la respuesta es "lo hardcodeamos", perdiste
*Practicality* en la única pregunta que te hicieron.

### ⚠️ "Menú por QR" es una categoría llena

Fudo, Mostrador, Bistrosoft, y treinta más. Un juez lo vio. **Si el pitch es "una
app de menú por QR", perdés en Originality y no hay ejecución que lo recupere.**

Por eso la sección que sigue es la más importante del documento.

---

# 6. El reencuadre: qué es esto en realidad

## Lo que NO es

> ~~"Hicimos un menú digital con QR para restaurantes."~~

Eso ya existe cincuenta veces y no usa nada de lo que el sponsor quiere ver.

## Lo que SÍ es

> **"Un local carga su carta en veinte minutos en vez de en un día, sacándole una
> foto a la que ya tiene. La IA corre en la máquina del local: la carta no se
> sube a ningún lado. Y de yapa saca algo que ningún menú digital tiene — qué
> puede comer un celíaco."**

Las tres partes de esa frase hacen trabajo distinto:

**① "en veinte minutos en vez de en un día"** — ese es el problema real y es la
razón por la que la mayoría de los bares de tu barrio **no** tienen carta
digital. No es que no quieran: es que cargar 80 platos con descripciones a mano
es un día de laburo de alguien. 🟩 Y el bounty de QVAC pide exactamente esto:
*"agentes locales que reemplazan trabajo de operaciones"*. Cargar una carta a
mano **es** trabajo de operaciones.

**② "la IA corre en la máquina del local"** — es la razón de existir de QVAC y no
un adorno. La carta con los precios de costo, los márgenes y los proveedores es
información comercial. Y encima: **funciona sin internet**, que en un local con
wifi de morondanga no es un detalle.

**③ el celíaco** — este es el que gana Originality, y es el que menos cuesta.

## El celíaco, en detalle, porque es el mejor momento del video

La carta de Tienda de Café tiene tres íconos: **vegano · vegetariano · sin TACC**.
Están puestos al lado del nombre de cada plato.

Hoy, si sos celíaco, entrás a un bar y tenés que preguntarle al mozo plato por
plato. El mozo no siempre sabe. A veces te dice que sí y no era.

Con esto: tocás **"soy celíaco"** y la carta se filtra sola. Cinco segundos de
video, todo el mundo lo entiende, y nadie más lo va a mostrar.

**Y acá está la parte que lo hace serio en vez de lindo:** el reconocedor de
alfabeto latino **no lee los íconos** — son símbolos, no letras. Entonces el
sistema marca *"esto lo leí de una palabra escrita"* vs *"esto no lo pude
verificar"*, y **nunca afirma que un plato es sin TACC si no está seguro**.

Eso no es una limitación que hay que esconder. Es exactamente lo que el sponsor
premia, y acá el costo de equivocarse **es que un celíaco coma gluten**. Decir
eso en el video, con esas palabras, vale más que cualquier feature.

---

# 7. Por qué QVAC y no WDK, y la regla que lo decide

La regla, que sirve para cualquier hackathon:

> **El track al que te presentás tiene que ser aquel cuya falla no sobrevivís.**

- Si a las 3 AM se rompe el OCR, **no hay producto.** Toda la idea es que la
  carta se ingiera sola. → **QVAC es carga estructural.**
- Si a las 3 AM se rompe WDK, sacás la propina y la app **sigue en pie**: carta,
  carrito, opciones, celíaco, comanda, efectivo con vuelto. → **WDK es una feature.**

Presentarse a WDK con una integración que se puede cortar sin que se note es
regalar el bounty. Presentarse a QVAC con la pieza que no se puede cortar es
alinear la nota con el trabajo.

**Además:** QVAC Premio 1 vale $1.000 y la conciliación de facturas es el caso que
el sponsor señaló con el dedo — o sea que ahí va a estar la multitud. Pero van a
estar todos con facturas y remitos. **Con una carta de restaurante no va a haber
nadie**, y sigue siendo, palabra por palabra, "comprensión multimodal de
documentos: foto → datos estructurados".

---

# 8. Portero y Vaquita: qué se salva de todo lo anterior

Preguntaste cómo encarar esto ahora, viniendo de querer hacer Portero y escalar a
Vaquita. La respuesta es mejor de lo que esperabas.

## El menú es la mitad delantera de Vaquita

Vaquita pasa **después** de la comida: foto del ticket, quién comió qué, saldar.
El menú pasa **antes y durante**. Es la misma mesa, la misma gente, los mismos
ítems, la misma deuda.

Y acá está el hallazgo que hace que valga la pena el cambio:

> **El problema más difícil de Vaquita —"quién pidió qué"— desaparece si cada uno
> pidió desde su propio teléfono.**

Vaquita lo resolvía con OCR de un ticket arrugado más tocar los ítems a mano, uno
por uno, y rezar. Acá **el sistema ya lo sabe**, porque cada pedido entró con un
nombre. El reparto no es una feature difícil: **es un `GROUP BY`.**

Tu propia idea de "que diferentes personas desde el mismo QR hagan pedidos
distintos, y que después paguen juntos o separados" **es Vaquita**, y llegás a
ella por el camino fácil en vez del difícil.

## Y Portero también sobrevive

El motor de reglas de Portero —topes por operación, lista de permitidos, pedir
confirmación arriba de cierto monto— es exactamente lo que necesita el pago
compartido de una mesa. Si a alguien le sobra tiempo, se enchufa ahí.

**Nada de lo que pensaron se tira. Cambió el orden, no el destino.**

---

# 9. El alcance: qué entra en 17 horas y qué no

Tu lista, una por una, sin diplomacia. **Solo lo verde va al plan.**

| Lo que pediste | Veredicto | Por qué |
|---|---|---|
| QR por mesa → sabe qué mesa sos | 🟢 **Núcleo** | Es un parámetro en la URL. Media hora |
| OCR del PDF → carta estructurada | 🟢 **Núcleo** | **Es el track.** Sin esto no hay proyecto |
| Nombre + descripción de cada plato | 🟢 **Núcleo** | Sale gratis del mismo OCR |
| Carrito con el pedido | 🟢 **Núcleo** | Sin esto no es un pedido, es un folleto |
| Personalizar (con hielo, sin aderezos) | 🟢 **Núcleo** | **Es lo mejor de la idea.** La carta ya trae las opciones escritas |
| Filtro celíaco / vegano / vegetariano | 🟢 **Núcleo** | El diferenciador. Cuesta poco y gana Originality |
| Pedido a nombre de quien lo pidió | 🟢 **Núcleo** | Un campo de texto. Y es lo que habilita el reparto |
| Varios comensales desde el mismo QR | 🟢 **Núcleo** | Es el puente a Vaquita |
| Efectivo: con cuánto pagás → cuánto de vuelto | 🟢 **Sí** | Lógica pura. En Argentina, lo más creíble de la demo |
| Pantalla de revisión con la confianza del modelo | 🟢 **Sí** | Es lo que el sponsor premia explícitamente |
| Propina en USD₮ con WDK | 🟡 **Sí, si llegan** | El mejor encaje de WDK. Se corta sin dolor |
| Pagar juntos o cada uno por separado | 🟡 **Sí, si llegan** | Es Vaquita. Impresiona |
| Sin cuenta, sin registrar datos | 🟢 **Sí** | No hacer nada *es* la feature. Se dice en el video |
| "Los más pedidos" con fueguito | 🟡 **Cuidado** | Que lo marque el local. **No inventar datos** |
| Dejar reseña al restaurante | 🔴 **Afuera** | No aporta a ningún criterio. Es tiempo que sale de otra cosa |
| Cuenta con sugerencias personalizadas | 🔴 **Afuera** | Otro modelo, otro flujo, otro día. Va en "qué sigue" del video |
| Que te traigan el pedido a la mesa | 🔴 **No es software** | Eso lo hace el mozo |
| Pagarle al restaurante en cripto | 🔴 **Afuera** | La objeción de Mercado Pago. Mata la credibilidad |

**Regla de oro para las próximas 17 horas: cada vez que alguien proponga algo que
no está en verde, la respuesta es "va en la lista de qué sigue".** Esa lista es
parte del video y 🟩 la rúbrica de *Technicality* la premia textualmente:
*"¿la solución está completa, o el equipo tiene un plan claro de cómo la
terminaría?"*

---

# 10. El plan, hora por hora

## 10.1 AHORA — los próximos 20 minutos, antes que nada

Todo el plan cuelga de una sola pregunta que todavía no tiene respuesta:
**¿el OCR lee esta carta?**

```
cd C:\hack\qvac-pruebas
npm install pdf-to-img sharp
node menu-ocr.js ..\ruta\a\Menu.pdf
```

Y antes de eso, si quieren ver los recortes sin gastar un minuto de modelo:

```
node menu-ocr.js ..\ruta\a\Menu.pdf --solo-mosaicos
```

**El semáforo, y decidan con esto y nada más:**

| Lo que ves | Qué significa | Qué hacer |
|---|---|---|
| 40+ ítems, confianza > 0,7 | El OCR anda | 🟢 **Adelante, sin dudar** |
| 15–40 ítems, o confianza 0,5–0,7 | Anda a medias | 🟡 Subí a `--dpi 200`, achicá con `--alto 1000`. Si sube, adelante |
| < 15 ítems, o se cae | El OCR no sirve para esto | 🔴 **Sección 10.4** |

## 10.2 Si el OCR anda — el plan hasta las 12:00

| Hora | Qué |
|---|---|
| **19:00 – 19:30** | Correr el OCR. Decidir con el semáforo. **Repartir roles y no volver a discutir la idea** |
| **19:30 – 20:30** | Cargar precios en `menu-precios.csv`. Inventados está bien: son precios de un local, no un dato técnico. **Media hora, cronometrada** |
| **20:30 – 23:30** | La carta en pantalla: QR con mesa → categorías → plato → opciones → carrito |
| **23:30 – 01:00** | Varios comensales en la misma mesa. Cada pedido con nombre. La comanda de la mesa |
| **01:00 – 02:30** | Filtro de dieta + la pantalla de revisión con la confianza a la vista |
| **02:30 – 04:00** | Efectivo con vuelto. Y **si y solo si todo lo de arriba está**, la propina con WDK |
| **04:00 – 06:00** | Reparto entre comensales (Vaquita). **Este es el primer bloque que se sacrifica entero si vienen atrasados** |
| **06:00 – 07:30** | 🛑 **CONGELAR.** Cero features nuevas. Solo arreglar lo que está roto y que ande desde un clon limpio |
| **07:30 – 09:00** | README con **permalinks de GitHub a las líneas exactas donde ocurre la inferencia** 🟩 *(dicen que es lo primero que miran)*. Modelo, cuantización, máquina, latencia |
| **09:00 – 10:30** | Grabar el video. En inglés, o en castellano **con subtítulos en inglés precisos** 🟩 *(la organización avisa que subtitular mal puede impactar la nota)* |
| **10:30 – 11:15** | Editar y subir |
| **11:15 – 11:30** | 🚨 **SUBMIT.** Con el video que tengan |
| **11:30 – 12:00** | Colchón. Si sobra, se mejora la descripción del proyecto — nunca el código |

**La regla que sale del manual de campo que ya tienen: entregar a las 11:15, no a
las 11:55.** Se puede editar después de entregar. No se puede entregar después de
las 12:00.

## 10.3 Los roles, ahora

Cuatro personas, cuatro carriles que no se pisan:

- **Ingesta** — corre el OCR, ajusta `--dpi` y `--alto`, carga los precios, arma
  `menu.json`. **Es el dueño del track.**
- **Pantalla** — la carta, el carrito, las opciones, el filtro de dieta. Es el
  que más horas tiene y el que más se ve en el video.
- **Mesa y plata** — QR con mesa, comensales, comanda, efectivo, WDK.
- **Relato** — README, permalinks, guion, filmación, subtítulos. **Empieza a las
  19:00, no a las 8 de la mañana.** Este rol es el que más equipos subestiman y
  el que decide dos de los cinco criterios.

## 10.4 Si el OCR no anda — el repliegue

**No se replieguen a otra idea. Se repliegan dentro de la misma idea.**

1. **Cambien el insumo, no el proyecto.** Sáquenle una foto con el celular a una
   carta de papel de verdad, derecha y con buena luz. Es un insumo distinto y
   mucho más fácil, y `menu-ocr.js` también acepta imágenes. **Que el OCR falle
   con un JPEG de 14.496 px no significa que falle con una foto normal.**
2. **Si tampoco:** carguen la carta a mano y QVAC pasa a hacer otra cosa adentro
   del mismo producto —por ejemplo, leer la foto de un ticket para el reparto—.
   El producto vive, el track cambia de pieza.
3. **Si QVAC entero está muerto:** ahí sí cambian de track, y tienen una carta
   guardada que casi nadie tiene: **el gate de Pears ya está pasado.** Su
   `pear://` funciona. Con eso, una herramienta de consola chica y bien hecha
   entra a un track donde la mayoría del campo queda afuera por no pasar ese
   gate. Es el plan C y es mejor que el plan C de casi todos.

---

# 11. El video

🟩 Tres minutos máximo. Inglés, o castellano con subtítulos en inglés precisos.

| Tiempo | Qué se ve |
|---|---|
| **0:00–0:15** | Una mano deja **la carta de papel** sobre la mesa y le saca una foto con el celular. Nada de pantallas todavía |
| **0:15–0:45** | La carta entra al sistema. Aparecen los platos con sus categorías. **Un renglón queda en amarillo y el sistema dice que no está seguro** |
| **0:45–1:00** | Alguien corrige ese renglón y pone los precios. *"Veinte minutos, una vez"* |
| **1:00–1:40** | Escaneo del QR de la mesa. Carta en el teléfono. Se arma un pedido **con opciones** — el licuado con base de leche, la limonada de 500 |
| **1:40–2:00** | 🔥 **"Soy celíaco."** La carta se filtra sola. Y se dice en voz alta: *"lo que no pudimos verificar no lo marcamos como seguro — acá el error se come alguien"* |
| **2:00–2:20** | Dos personas piden desde la misma mesa. La comanda sale junta, con nombre. Efectivo con vuelto, o propina en USD₮ |
| **2:20–2:40** | **Se apaga el wifi.** El modelo sigue leyendo. *"La carta de un local nunca sale de la máquina del local"* |
| **2:40–3:00** | Qué falta, concreto: sugerencias personalizadas, íconos de dieta con un segundo pase de visión, app nativa. **Con nombres de tecnología y estimación de días** |

**Las tres cosas que no pueden faltar, en orden de importancia:**

1. **El renglón amarillo.** Es lo que separa un demo de un producto, y es lo que
   el sponsor pidió con todas las letras.
2. **El celíaco.** Es el momento que se recuerda.
3. **El wifi apagado.** Es gratis y es la razón de existir de QVAC.

Y la frase del teléfono, tal como está en la Parte 15 del documento de ideas,
dicha al pasar en el segundo 25: *"lo mostramos así porque es lo que pueden
probar ustedes; en la vida real esto vive en el teléfono"*.

---

# 12. Checklist de entrega

🟩 Sacado del texto del bounty de QVAC:

- [ ] Repo **público** con README que funcione **desde un clon limpio**
- [ ] **Permalinks de GitHub a las líneas exactas donde ocurre la inferencia** ← lo primero que miran
- [ ] Modelo, cuantización, máquina y latencia aproximada, escritos
- [ ] Video ≤ 3 min, inglés o subtitulado en inglés
- [ ] Toda la inferencia local. Ni una llamada a una API en la nube
- [ ] Los cuatro con cuenta en DoraHacks y el proyecto asociado al equipo
- [ ] Preguntado en Telegram lo de los tracks (sección 2.5)
- [ ] Entregado **11:15**, no 11:55

---

# 13. Lo que sigue sin confirmar

Lo dejo explícito para que nadie construya sobre arena:

1. **Si se puede entrar a más de un track de Tether.** No pude leer la página.
   Evidencia: el texto que ustedes pegaron dice "1 pista de este patrocinador" en
   las tres. **Planificamos con 1 + General.** Preguntar igual: si son más, es
   upside gratis.
2. **La forma exacta de `block.bbox`** que devuelve `ocr()`. No la pude verificar
   contra la doc. `normalizarBbox()` acepta las cuatro formas habituales y avisa
   por consola si no reconoce ninguna. Se resuelve mirando
   `bloques-crudos.json` en la primera corrida.
3. **Si `contrastRetry: true` es válido.** La doc lo trae en `false`; lo pusimos
   en `true` a propósito para fotos con mala luz. Si tira error de configuración:
   `--no-contrast`.
4. **Nunca corrí `menu-ocr.js` de punta a punta**, porque acá no hay QVAC
   instalado. Lo que **sí** probé: la rasterización y el mosaico (12 mosaicos a
   150 dpi, 15 con `--alto 1200`), y **37 tests de la lógica de estructura, que
   pasan**. La llamada a QVAC es copia textual de su `batch-ocr.js`. Detalle en
   `docs/01-como-corre-el-ocr.md`.

---

# 14. La versión de todo esto en un párrafo

Los tres de Tether son **QVAC, WDK y Pears** — MDK es el kit de minería de
Bitcoin y no entra acá. Se presenta a **uno solo** de los tres, más el General de
Crecimiento, aunque el producto use las tres tecnologías. Van con el **menú
interactivo presentado a QVAC Premio 1**, porque el OCR de la carta es la pieza
sin la cual no hay producto, y porque esta carta en particular —una imagen de
14.496 píxeles, sin capa de texto y sin precios— es exactamente el "dato real y
complejo" que el sponsor pidió. WDK entra como propina y reparto, y se puede
cortar. Pears no entra, y el `pear://` que ya funciona queda como plan C. El
pitch no es "un menú con QR": es **veinte minutos en vez de un día para cargar
una carta, sin que la carta salga de la máquina del local**, y un celíaco que por
fin puede ver qué puede comer. Falta una sola cosa para arrancar: **correr el OCR
y mirar el semáforo.**
