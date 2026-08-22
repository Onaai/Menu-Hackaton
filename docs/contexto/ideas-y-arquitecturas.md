# Aleph Hackathon — Ideas, arquitecturas y prompts
### Documento operativo · 21 de agosto de 2026 · 24 horas de construcción

---

# 0. Las dos decisiones estratégicas antes de las ideas

## Decisión 1: secuenciar por gate, no por idea

Esta es la corrección más importante respecto a cualquier plan anterior.

Cada track tiene un **gate binario**: una condición que, si no se cumple, te saca
de consideración por completo, sin importar lo bueno que sea el proyecto.

| Track | Gate binario | Cuánto tarda en resolverse |
|---|---|---|
| **Pears** | `pear install pear://<key>` tiene que funcionar desde otra máquina | 1–3 horas |
| **QVAC** | Un modelo local corriendo OCR sobre una foto sucia real | 1–2 horas (+2,5 GB de descarga) |
| **WDK** | Una transacción real ejecutada por la CLI en una red de prueba | 1–2 horas |

**La secuencia correcta es: pasar el gate con lo más trivial posible, verificarlo
desde una segunda máquina, y recién ahí construir el producto.**

Suena obvio y casi nadie lo hace, porque la tentación es diseñar el producto lindo
primero y dejar el deploy para el final. Ese es exactamente el equipo que a las
10 de la mañana del domingo descubre que el link `pear://` no instala.

Concretamente, para Pears: hora 1 a 3, deployás un `hello-pear-bare` que solo
imprime "hola", lo instalás desde la notebook de otro integrante, publicás una
actualización que cambie el texto y verificás que llegue sola. **Con eso ya estás
adentro del track.** Todo lo que hagas después es upside. Si algo se pudre a las
4 de la mañana, todavía tenés una entrada válida.

## Decisión 2: el "hueco" está donde el sponsor pidió trabajo aburrido

Los sponsors dijeron muy claramente qué quieren. Donde señalaron con el dedo un
caso de uso concreto (conciliación de facturas en QVAC), van a ir todos. Donde
pidieron algo que **no se puede simular** —evidencia experimental, un deploy P2P
que se verifica ejecutándolo— van a ir pocos, porque requiere trabajo real y no
se puede fingir con un asistente de IA.

Ese es el filtro que ellos mismos están aplicando, y dicen textualmente que
descartan sin revisión las entregas con errores evidentes de IA. **Elegí ideas
cuya evidencia sea verificable ejecutándola.**

---

# 1. Ranking general

Ordenadas por valor esperado, no por lo interesantes que son.

| # | Idea | Track | 24h | Competencia | ★ |
|---|---|---|---|---|---|
| **1** | **Llave** — secretos entre máquinas sin servidor | Pears | Alta | Muy baja | ★★★★★ |
| **2** | **Banco de pruebas de fiabilidad** | QVAC P2 | Media | Baja | ★★★★★ |
| **3** | **Vecino** — archivos y chat sin internet | Pears | Media | Muy baja | ★★★★☆ |
| **4** | **Portero** — agente con billetera que sabe decir que no | WDK P1 | Media | Media | ★★★★☆ |
| **5** | **Conciliador con datos sucios** | QVAC P1 | Media | **Alta** | ★★★★☆ |
| **6** | **Extracto → castellano** | QVAC P1 | Media | Baja | ★★★★☆ |
| **7** | **Nómina desde CSV con recibos** | WDK P1 | Baja | Media | ★★★☆☆ |
| **8** | **Duelo** — juego de terminal con parche en vivo | Pears | Media | Baja | ★★★☆☆ |
| **9** | **Primer envío sin gas** | WDK P2 | Alta | Baja | ★★★☆☆ |
| — | **Vault Guardian** | QVAC extra | 45 min | — | apuesta paralela |

**Recomendación:** idea 1 como primaria, idea 3 como repliegue dentro del mismo
track (comparten el 80% del andamiaje), Vault Guardian en paralelo el sábado a la
tarde. Si el equipo se inclina fuerte por IA en vez de P2P, entonces idea 2 como
primaria con idea 5 adentro.

---

# 2. Cómo usar los prompts de este documento

Cada idea trae un prompt listo para pegar en Claude Code o el asistente que usen.
Están escritos con tres propiedades deliberadas:

1. **Anclan al asistente en la documentación real.** Los tres tracks avisan que
   los modelos inventan métodos que no existen. WDK y QVAC publican *Agent Skills*
   y un *MCP Toolkit* justamente para esto. Los prompts empiezan mandando a leer.
2. **Ordenan por riesgo, no por prolijidad.** Primero el gate, después el producto.
3. **Prohíben explícitamente el sobre-diseño.** WDK dice que sus integraciones son
   pocas líneas y que los modelos las complican de más. Si la integración con el
   SDK del sponsor tiene 300 líneas, algo se rompió.

**Antes de pegar cualquiera de estos prompts, hacé esto una sola vez:**

```
Contexto permanente del proyecto (guardalo en CLAUDE.md o el equivalente):

- Competimos en Aleph Hackathon, 24 horas, cierre domingo 12:00 GMT-3.
- Todo el código se escribe durante el evento. No reutilizamos nada previo.
- El sponsor DESCARTA SIN REVISAR entregas con APIs inventadas, métodos que no
  existen en el SDK, READMEs que describen funciones inexistentes, o demos que
  solo funcionan con una entrada específica.
- Por lo tanto: si no estás seguro de que un método existe, buscalo en la doc
  antes de escribirlo. Si no lo encontrás, decímelo en vez de inventarlo.
- Preferí siempre la solución de menos líneas. La integración con el SDK del
  sponsor debe ser mínima y verificable.
- Después de cada paso, corré el código. No avances si el paso anterior no corre.
- No escribas features que no te pedí. No agregues abstracciones "por si acaso".
```

---

# 3. PEARS — el track de mejor ratio

**Gate:** los jueces instalan tu herramienta con `pear install pear://<key>` igual
que cualquier usuario. Si el comando no funciona, la entrada no se considera.
**Juez:** dmc, creador de Pear.
**Premio:** 1° $1.000 · 2° $500.

Por qué este track tiene el mejor ratio: el gate es binario, verificable y difícil
por una razón específica — **Pear y Bare no son Node.js, y los modelos de IA
asumen con total confianza que sí lo son.** Los propios docs avisan que hay que
esperar APIs de Node inventadas, nombres de módulos incorrectos y flags
imaginarios. Una parte grande de los que se anoten va a fallar el gate.

---

## 💡 Idea 1 — **Llave**
### Mandar secretos entre dos máquinas sin que pasen por ningún servidor

**Qué es:** una CLI que manda un archivo `.env`, una clave de API o cualquier
secreto directo de una máquina a otra. Sin nube, sin Slack, sin pastebin, sin
cuenta. Se genera un código de un solo uso, el otro lo pega, el secreto viaja
cifrado punta a punta por la red de pares y el canal muere.

**El problema y quién lo sufre:** todo equipo de desarrollo pasa credenciales por
Slack, WhatsApp o mail. Quedan en el historial de una empresa para siempre. En
este mismo hackathon, mañana a las 13:00, alguien de tu equipo va a pegar una
clave de API en el chat grupal. Es un problema universal, aburrido, real, y con
una solución mala instalada en todos lados.

**Por qué P2P no es decorativo acá:** es el único caso donde "no hay servidor" no
es una característica técnica sino *el producto entero*. Cualquier alternativa
con servidor tiene el problema de confiar en el servidor. Es la respuesta perfecta
a la pregunta de si la tecnología es esencial.

**Los primeros 30 segundos del video:**
```
Pantalla dividida. Dos terminales.

Izquierda:  $ llave send .env
            → código: pino-42-rojo
            → esperando...

Derecha:    $ llave get pino-42-rojo
            → .env recibido (847 bytes)

Izquierda:  → entregado. canal cerrado.
            $ llave get pino-42-rojo
            → ese código ya se usó.
```
Doce segundos. No hace falta explicar nada. Cualquiera entiende qué pasó.

**Rama:** `variant/daemon` — es un comando de un solo uso y de corta duración, la
herramienta sale mientras el demonio se actualiza en segundo plano. Elegir bien la
rama es explícitamente parte de hacerlo bien, y el juez es quien diseñó las ramas.

**Puntaje estimado:** Technicality 4 · Originality 4 · UI/UX/DX 5 · Practicality 5
· Presentation 5 → **23/25**

**Riesgo principal:** el error `INVALID_URL` de la plantilla, que aparece hasta
que reemplacés el link de upgrade placeholder por uno real de `pear touch`. Y en
la variante `daemon` ese error va a `<storage>/updates.log`, no a la terminal.
Los docs lo avisan; ahí es donde se traba todo el mundo.

### Prompt de arquitectura

```
Vamos a construir "llave": una CLI peer-to-peer para mandar secretos entre dos
máquinas sin servidor, desplegada con Pear de Holepunch.

REGLA CRÍTICA: Pear y Bare NO son Node.js. Muchas APIs de Node no existen. Antes
de usar cualquier módulo, verificá que exista en el catálogo de módulos Bare
(docs.pears.com/reference/modules/bare-modules) o Pear
(docs.pears.com/reference/modules/pear-modules). Si necesitás algo que no está
ahí, decímelo en vez de asumir que anda.

PASO 1 — El gate, antes que nada.
Cloná github.com/holepunchto/hello-pear-bare, cambiá a la rama variant/daemon,
instalá dependencias. Corré `pear touch` para generar el link de upgrade y pegalo
en el campo "upgrade" del package.json (la app no arranca sin esto). Verificá con
`npm start` que corre en modo dev. Después desplegá y dame el link pear://.
No escribas nada del producto todavía. Cuando esto funcione, pará y avisame:
voy a instalarlo desde otra máquina antes de seguir.

PASO 2 — Transporte.
Usando Hyperswarm, implementá:
- `llave send <archivo>`: genera un código legible de tres palabras (usá una
  lista de palabras corta y embebida, no una dependencia), deriva de él un topic
  de Hyperswarm, se anuncia y queda esperando un peer.
- `llave get <codigo>`: deriva el mismo topic, se conecta, recibe el archivo,
  lo escribe en disco.
La conexión de Hyperswarm ya viene cifrada; no implementes criptografía propia.
Probalo con dos terminales en la misma máquina antes de seguir.

PASO 3 — Un solo uso.
Una vez transferido, el emisor cierra el topic y guarda el código en una lista
local de códigos usados. Un segundo `get` con el mismo código tiene que fallar
con un mensaje claro: "ese código ya se usó". Agregá un timeout de 10 minutos.

PASO 4 — DX. Este paso vale un quinto de la nota, no lo saltees.
- `llave --help` claro y corto.
- Mensajes de error que digan qué pasó y qué hacer, nunca un stack trace.
- Barra de progreso en transferencias grandes.
- Salida con colores solo si la terminal los soporta.
- `llave send --text` para pegar un secreto directo sin archivo.

PASO 5 — La actualización OTA.
Publicá una versión nueva que agregue un comando visible (por ejemplo
`llave verify`, que muestre el hash del último archivo recibido). Verificá que
la actualización llegue sola a una copia ya instalada. Grabá esto: es requisito
de entrega.

PASO 6 — Binarios y README.
`npm run make` para las plataformas que podamos. README con: qué es, de qué rama
partimos y por qué (daemon = comando de un solo uso y corta duración), cómo
instalar con pear install, para qué plataformas compilamos, y el link pear://.

NO HAGAS: interfaz web, cuentas de usuario, base de datos, criptografía propia,
soporte de carpetas enteras, ni ninguna feature que no esté en estos seis pasos.
```

### Espectro de realización

| Escenario | Qué pasó | Qué entregás |
|---|---|---|
| **A — todo sale** | Los 6 pasos | `llave` completa, OTA demostrada, binarios multiplataforma. Apunta al 1° puesto |
| **B — a mitad de camino** | Pasos 1–4, sin OTA lujosa | Sigue siendo entrada válida y fuerte. La OTA mínima del paso 1 ya cuenta |
| **C — se rompe el transporte** | Hyperswarm no conecta entre redes distintas | Demostrás en LAN o entre dos terminales de la misma máquina. Lo decís en el video como limitación conocida, con el plan de cómo se resuelve. La rúbrica de *Technicality* premia explícitamente tener un plan claro |
| **D — desastre** | Nada del producto anda | Entregás la herramienta trivial del paso 1 con un README honesto. Es una entrada válida. Cero es no entregar |

**Qué se corta primero, en orden:** binarios para múltiples plataformas → barra de
progreso → `--text` → códigos de un solo uso. **Lo último que se corta es la
instalación por `pear install` y la OTA**, porque son el gate.

---

## 💡 Idea 3 — **Vecino**
### Archivos y chat entre las máquinas de la sala, sin internet

**Qué es:** una CLI que descubre otras máquinas cerca y permite mandarse archivos
y mensajes. Funciona por Hyperswarm cuando hay red, y por Bluetooth de baja
energía cuando no hay nada.

**El momento de la demo, que es todo:** apagás el wifi en cámara y seguís mandando
un archivo. Los propios docs de Pear cuentan que en una sala llena de hackers en
Buenos Aires esa demo causó sensación. **El juez ya vio esa demo y le gustó.**

**Por qué el problema es real para quien juzga:** el wifi de los venues de
hackathon se satura siempre. Es el problema del propio evento donde estás
compitiendo, resuelto en vivo, en la sala.

**Puntaje estimado:** Technicality 5 · Originality 5 · UI/UX/DX 4 · Practicality 3
· Presentation 5 → **22/25**

**Riesgo:** BLE-Swarm es experimental y los propios docs lo llaman tosco.
**Mitigación no negociable: Hyperswarm por defecto, BLE como modo `--offline`.**
Así nunca tenés una demo muerta: si el Bluetooth falla en cámara, mostrás el modo
normal y explicás el experimental.

### Prompt de arquitectura

```
Vamos a construir "vecino": una CLI peer-to-peer para compartir archivos y chatear
entre máquinas de una misma sala, con Pear de Holepunch. Funciona con red normal
y también sin internet, por Bluetooth de baja energía.

REGLA CRÍTICA: Pear y Bare NO son Node.js. Verificá cada módulo contra el catálogo
real en docs.pears.com antes de usarlo. Si algo no existe ahí, decímelo.

ARQUITECTURA EN DOS CAPAS. Esto es lo más importante del diseño: el transporte es
intercambiable y el producto funciona igual con cualquiera de los dos.
  capa transporte: HyperswarmTransport | BleTransport
  capa producto:   descubrimiento de pares, envío de archivos, chat
El producto NUNCA habla directo con Hyperswarm ni con BLE, solo con una interfaz
común de tres métodos: anunciar(sala), alConectar(cb), enviar(peer, datos).

PASO 1 — El gate.
hello-pear-bare, rama main (es un proceso de larga duración con interfaz de
terminal, así que el updater va en un worker thread). `pear touch`, pegar el link
de upgrade en package.json, verificar con npm start, desplegar, darme el link
pear://. Pará acá: lo instalo desde otra máquina antes de seguir.

PASO 2 — HyperswarmTransport.
Implementá la interfaz de transporte sobre Hyperswarm. El topic se deriva del
nombre de sala (por defecto "aleph"). Al conectarse un peer, mostrarlo en la lista.

PASO 3 — El producto, sobre la interfaz, sin tocar Hyperswarm.
- `vecino` sin argumentos: interfaz de terminal con la lista de vecinos conectados.
- `vecino send <archivo>`: elegís un vecino de la lista y se lo mandás.
- chat de texto en la misma pantalla.
Probalo entre dos máquinas en la misma red antes de seguir.

PASO 4 — BleTransport, detrás de la bandera --offline.
Basándote en github.com/mafintosh/ble-swarm, implementá la misma interfaz de tres
métodos. Es experimental: si no funciona en 3 horas, lo dejamos como está y
seguimos con Hyperswarm. NO refactorices el producto para acomodar BLE; si no
entra en la interfaz de tres métodos, el problema es la interfaz, avisame.

PASO 5 — DX y la demo.
Un indicador visible arriba que diga por qué transporte estás conectado:
[red] o [bluetooth]. Que sea grande y legible en video. Cuando se cae la red y
--offline está activo, que el indicador cambie solo. Ese cambio EN CÁMARA es la
demo entera.

PASO 6 — OTA, binarios, README indicando la rama y por qué.

NO HAGAS: historial persistente, cuentas, cifrado propio, transferencia de
carpetas, interfaz web.
```

### Espectro

| Escenario | Qué entregás |
|---|---|
| **A** | Los dos transportes, cambio en vivo al apagar el wifi. Demo estelar |
| **B** | Solo Hyperswarm, BLE explicado como trabajo siguiente con la interfaz ya lista para recibirlo. Sigue siendo fuerte: mostrás que la arquitectura lo contempla |
| **C** | Solo chat, sin archivos. Válido |
| **D** | La herramienta del paso 1 con README honesto |

---

## 💡 Idea 8 — **Duelo**
### Juego de terminal donde el balanceo llega mientras estás jugando

**Qué es:** un juego de terminal para dos jugadores por Hyperswarm. Lo interesante
no es el juego: es que publicás un cambio de balance o un nivel nuevo y **le llega
al jugador mientras sigue jugando**.

**Por qué está en la lista:** es la única forma de demostrar la actualización OTA
de un modo que ninguna otra categoría de proyecto logra. Los docs de Pear lo
sugieren explícitamente. Y el ángulo serio es real: distribución y live-ops sin
app store, sin revisión, sin backend.

**Puntaje estimado:** Technicality 4 · Originality 4 · UI/UX/DX 4 · Practicality 2
· Presentation 5 → **19/25**. La *Practicality* es el techo.

**Cuándo elegirla:** si el equipo tiene alguien fuerte en interfaces de terminal y
quieren algo divertido de mostrar. El nombre y el gancho importan: un equipo de
TreeHacks le puso omnom a su robot y le colgó la comida de una soga, y ellos
mismos dijeron que ese detalle podía ser el factor diferenciador.

*(Prompt: el mismo esqueleto de Vecino, cambiando el paso 3 por la lógica del
juego y agregando un archivo `balance.json` que se lee al inicio de cada partida
para que el parche OTA tenga efecto visible sin reiniciar.)*

---

# 4. QVAC — IA local

**Gate:** toda la inferencia corre localmente. Usar el servidor HTTP compatible
con OpenAI cuenta; llamar a una API en la nube no.
**Jueza:** Raquel Carrasco, DevRel de Tether.
**Premio:** 1° $1.000 (agentes de operaciones) · 2° $500 (fiabilidad) · $500 del
Vault Guardian a repartir.

**Preparativo obligatorio de hoy:** descargar el modelo son ~2,5 GB para un 4B, y
un 4B en Q4 pide ~4 GB de RAM. Bajarlo mañana al mediodía es regalar una hora.

---

## 💡 Idea 2 — **Banco de pruebas de fiabilidad**
### El hueco más grande del evento

**Qué es:** un agente local que encadena varias herramientas para una tarea
concreta, **más un harness que corre la misma tarea N veces y reporta la tasa de
éxito**, los modos de fallo, y cuánto aporta cada capa de mitigación.

**Por qué es el hueco:** el sponsor pidió textualmente *"pruebas, no impresiones"*.
Dijo que hay que correr la tarea N veces y mostrar la tasa de éxito, y que un
proyecto honesto sobre dónde falla vale más que uno que muestra una sola corrida
impecable. **Ningún equipo apurado hace evaluación con N corridas.** Y encima es
lo más difícil de simular con un asistente de IA, que es justo lo que están
filtrando.

**Los primeros 30 segundos del video:** una tabla.

```
tarea: extraer 6 campos de un remito y cruzarlos contra el extracto
modelo: Qwen 4B Q4 · local · 47 corridas por configuración

  configuración                          éxito     falla silenciosa
  ────────────────────────────────────────────────────────────────
  base                                    41%           23%
  + salida estructurada forzada           68%            9%
  + reintento con el error de vuelta      81%            6%
  + auto-chequeo antes de responder       89%            2%

  3 modos de fallo que NO pudimos arreglar → ver README
```

Esa tabla es un argumento que nadie más va a poder mostrar, y "falla silenciosa"
—responder con confianza algo incorrecto— es la métrica que más le importa a
quien evalúa modelos chicos.

**Puntaje estimado:** Technicality 5 · Originality 4 · UI/UX/DX 3 · Practicality 4
· Presentation 5 → **21/25**. **UI/UX es el punto débil: media hora en un reporte
HTML lo sube a 4.**

### Prompt de arquitectura

```
Vamos a construir un agente local con QVAC de Tether MÁS un harness de fiabilidad
que mida cuán confiable es. El harness no es una herramienta auxiliar: es la mitad
del producto y la mitad de la demo.

REGLA CRÍTICA: toda la inferencia corre local con @qvac/sdk. Ninguna llamada a API
en la nube. Antes de usar cualquier método del SDK, verificalo contra
docs.qvac.tether.io/reference/api/. Si no lo encontrás ahí, decímelo en vez de
inventarlo. La orquestación de modelos chicos es fácil de simular y difícil de
hacer bien; no me des código que parezca que funciona.

PASO 1 — El gate.
Instalá el SDK, cargá un modelo de 4B en Q4 y corré una generación de texto y un
OCR sobre UNA imagen sucia real (foto de un remito sacada con celular). Decime
qué modelo, qué cuantización, cuánta RAM usa y cuánto tarda. Si no entra en la
RAM disponible, bajamos a un modelo más chico ahora, no después.

PASO 2 — La tarea. Una sola, concreta, encadenando 3 o 4 herramientas.
  OCR sobre la imagen → extracción de campos estructurados → cálculo →
  búsqueda en un archivo local → respuesta
Implementala de la forma más simple posible. Sin capas de mitigación todavía:
queremos ver cuán mal anda la versión base.

PASO 3 — El harness. Este es el corazón.
Un módulo que:
- corre la misma tarea N veces sobre el mismo conjunto de entradas
- clasifica cada corrida en: correcta / incorrecta declarada / INCORRECTA
  SILENCIOSA (respondió con confianza algo mal) / se colgó
- guarda cada corrida cruda para poder auditarla después
- calcula tasas y las escribe en un JSON
La distinción entre "incorrecta declarada" e "incorrecta silenciosa" es la métrica
más importante del proyecto. No la colapses en una sola.

PASO 4 — Las capas de mitigación, una por una, midiendo entre cada una.
  a) salida estructurada forzada
  b) reintento devolviéndole al modelo su propio error de validación
  c) paso de auto-chequeo antes de responder
  d) abstención: si la confianza es baja, que diga "no sé" en vez de inventar
Después de CADA capa, corré el harness completo y anotá el número. Necesito la
tabla comparativa, no solo el resultado final.

PASO 5 — El reporte. Vale un quinto de la nota.
Un HTML estático generado desde el JSON: la tabla comparativa, un gráfico de
barras, y la posibilidad de hacer clic en una corrida fallida para ver la traza
completa. Sin frameworks, sin build. Que se vea bien en un video.

PASO 6 — README con: permalinks de GitHub a las líneas exactas donde ocurre la
inferencia (es lo primero que miran), modelo, cuantización, máquina, latencia,
instrucciones desde un clon limpio, y una sección honesta de "modos de fallo que
no pudimos resolver".

NO HAGAS: interfaz de usuario para la tarea, generación de imágenes o video (el
sponsor dice explícitamente que no puntúan bien), soporte multi-modelo, ni
ninguna capa de mitigación que no midas.
```

### Espectro

| Escenario | Qué entregás |
|---|---|
| **A** | Tarea + harness + 4 capas medidas + reporte HTML. Apunta al 2° premio con fuerza y toca el 1° |
| **B** | Tarea + harness + 2 capas | Sigue siendo la única entrega con evidencia experimental. Fuerte |
| **C** | El modelo no entra en RAM | Bajás a un modelo más chico. La tabla queda *más* interesante, porque los modos de fallo son más visibles. No es un fracaso: es el tema del track |
| **D** | El OCR no sirve sobre datos sucios | Cambiás la tarea a una de solo texto (contrato → calendario de pagos). El harness es idéntico. **Por eso el harness va antes que la tarea en importancia** |

---

## 💡 Idea 5 — **Conciliador con datos sucios**

**Qué es:** cargás fotos de facturas (A, B, C), remitos manuscritos y un extracto
bancario. El agente hace OCR local, extrae campos, cruza contra el extracto y
marca discrepancias con una explicación de una línea verificable en cinco segundos.

**Advertencia:** este es el caso de uso que el sponsor señaló con el dedo y dijo
*"si lo dominás, sos competitivo"*. **Todos van a ir para acá.** No ganás por la
idea; ganás por una sola cosa:

**El diferenciador:** los otros van a demostrar con PDFs limpios. Ustedes usan
fotos sacadas con el celular — torcidas, con poca luz, arrugadas, con un sello
encima, con un remito escrito a mano. El sponsor dijo textualmente que lo que hace
fuerte a una entrega es que funcione con datos reales y complejos, **no con un PDF
prolijo elegido a mano**. Eso significa que la tarea número uno no es programar:
es **juntar 20 documentos horribles de verdad esta noche**. Pedile a tu familia
facturas viejas, sacales fotos malas a propósito.

**El segundo diferenciador:** que muestre incertidumbre. Cuando el modelo no está
seguro, que lo diga y lo mande a revisión humana. Está explícitamente premiado:
*un agente que señala incertidumbre es mejor que uno que predice un número con
demasiada confianza.*

**Modelo de negocio en una frase:** un contador no puede subir la facturación de
sus clientes a una API de terceros; local es la única opción legal y por eso se
paga.

**Puntaje:** Technicality 4 · Originality 3 · UI/UX/DX 4 · Practicality 5 ·
Presentation 4 → **20/25**

**La jugada superior:** construí esta idea y **medila con el harness de la idea 2**.
Un proyecto, los dos premios del track. Es el mayor valor esperado de QVAC si el
equipo rinde.

---

## 💡 Idea 6 — **Extracto → castellano**

**Qué es:** cargás el extracto bancario o el resumen de tarjeta del mes y el
agente local responde en lenguaje llano: qué cambió respecto al mes pasado y por
qué. Categoriza comercios, detecta cargos duplicados, marca anomalías.

**Por qué está acá:** el sponsor lo lista como dirección válida ("resúmenes en
lenguaje sencillo sobre qué cambió este mes y por qué") pero **no lo señaló como
el caso principal**, así que va a estar mucho menos poblado que las facturas.
Y el argumento de privacidad es todavía más fuerte: nadie quiere subir su resumen
de tarjeta a una nube.

**Los primeros 30 segundos:** arrastrás un PDF de resumen y aparecen tres frases:
*"gastaste 34% más en delivery que en julio"*, *"hay dos cargos idénticos de
$8.400 el 12 y el 13"*, *"apareció una suscripción nueva de $2.100"*. Sin
configurar nada, sin subir nada.

**Puntaje:** Technicality 3 · Originality 4 · UI/UX/DX 4 · Practicality 5 ·
Presentation 5 → **21/25**

*(Prompt: el de la idea 2, reemplazando el paso 2 por: parseo del extracto →
categorización con el modelo local → comparación mes contra mes → detección de
duplicados por regla, no por modelo. Regla importante: **lo determinístico se
resuelve con código, no con el modelo**. Los duplicados se detectan comparando
montos y fechas, no preguntándole al LLM. Eso sube la fiabilidad y es exactamente
el tipo de decisión de ingeniería que puntúa en Technicality.)*

---

## 🛡️ Vault Guardian — apuesta paralela, 45 minutos

$500 a repartir entre todos los que lo superen. **Independiente de tu proyecto.**
Es un juego de prompt injection contra una IA local que guarda un secreto y tiene
una billetera WDK con fondos reales. La implementación de referencia se comparte
durante el evento.

**Detalle económico que casi nadie va a calcular:** el pozo se divide entre todos
los que lo logren. Cuanto antes lo intentes, menos gente lo logró. Asigná a una
persona el sábado a la tarde, temprano, 45 minutos, mientras los demás codean.
No lo dejes para el domingo.

---

# 5. WDK — billeteras y pagos

**Gate:** `@tetherto/wdk` como dependencia principal. Para la CLI, el paquete es
`@tetherto/wdk-cli` **con scope** — el `wdk-cli` sin scope en npm es otro proyecto
distinto. Node.js 22.18.0 o posterior. Billetera de prueba con fondos limitados,
nunca una personal: los paquetes están en beta.
**Jueza:** Raquel Carrasco.
**Premio:** 1° $1.000 (CLI/MCP) · 2° $500 (gasless).

**El párrafo que más les importa siendo principiantes:** el sponsor dice que no
hace falta escribir ni un solo contrato inteligente para ganar esta categoría.
WDK maneja claves, direcciones, saldos y transacciones.

---

## 💡 Idea 4 — **Portero**
### Un agente con billetera que sabe decir que no

**Qué es:** un agente conectado por MCP que puede consultar saldos, cotizar y
enviar USD₮, pero **bajo un conjunto de reglas que define el usuario en un archivo
legible**: tope por transacción, tope diario, lista de destinatarios permitidos,
confirmación obligatoria por encima de cierto monto, modo simulación.

**El momento de la demo, que es todo:**

```
> mandale 500 USDT a 0x9f3a...
  ⛔ bloqueado por: destinatario no está en la lista de permitidos
     (regla 3 de politica.yaml, línea 14)

> mandale 20 USDT a proveedor-A
  ✓ dentro del tope por transacción (50)
  ✓ dentro del tope diario (restante: 130)
  ✓ destinatario permitido
  → enviado. hash: 0x4b2...
```

**Por qué gana:** el sponsor dice que *"se valorará positivamente un modelo de
seguridad bien pensado"*. Y ese **"no" en cámara es más memorable que cualquier
transferencia exitosa**, porque todo el mundo entiende inmediatamente por qué
importa. Es la demo que responde sola a la objeción obvia de darle plata a un
agente.

**Puntaje:** Technicality 4 · Originality 4 · UI/UX/DX 5 · Practicality 5 ·
Presentation 5 → **23/25**

### Prompt de arquitectura

```
Vamos a construir "portero": una capa de política de seguridad para un agente de
IA con billetera, usando el WDK de Tether y su servidor MCP.

REGLAS CRÍTICAS:
- El paquete es @tetherto/wdk-cli CON SCOPE. El wdk-cli sin scope en npm es otro
  proyecto y no sirve.
- Node.js 22.18.0 o posterior.
- Billetera de prueba con fondos mínimos. Nunca una personal.
- Las integraciones de WDK son POCAS LÍNEAS. Si tu integración crece mucho,
  probablemente estés inventando métodos. Verificá todo contra
  docs.wdk.tether.io/cli/api-reference/ antes de escribirlo.
- Leé docs.wdk.tether.io/cli/reference/security-model/ antes de desbloquear una
  billetera con fondos.

PASO 1 — El gate.
Instalá la CLI, creá una billetera de prueba, derivá una dirección, conseguí
fondos de testnet y ejecutá UNA transferencia real desde la línea de comandos.
Nada de código propio todavía. Cuando funcione, avisame.

PASO 2 — MCP.
Conectá wdk mcp a nuestro cliente MCP y verificá que el agente puede consultar
saldo. Solo lectura por ahora.

PASO 3 — El motor de políticas. Este es el producto, no la billetera.
Un archivo politica.yaml legible por humanos con: tope por transacción, tope
diario, lista de destinatarios permitidos con alias, umbral de confirmación
obligatoria, y modo simulación global.
Un módulo que recibe una operación propuesta y devuelve
{permitido: bool, reglas_evaluadas: [...], motivo: string}.
El motor NO habla con WDK. Es una función pura sobre datos. Eso lo hace testeable
y es lo que quiero mostrar.

PASO 4 — Conectar los dos.
El agente propone una operación → el motor la evalúa → si pasa, se ejecuta por
WDK; si no, se rechaza citando la regla exacta y su número de línea.
Registro de auditoría en JSON de TODA operación propuesta, permitida o no.

PASO 5 — DX. Vale un quinto de la nota.
- La salida de una operación bloqueada tiene que ser hermosa y clara en la
  terminal: qué regla, qué línea, qué valor la violó.
- `portero simular` corre todo sin ejecutar nada.
- `portero log` muestra el historial de decisiones.
- Mensajes de error accionables.

PASO 6 — Pruebas del motor de políticas.
Como es una función pura, escribí una tabla de casos: monto justo en el límite,
un centavo por encima, destinatario con alias, tope diario acumulado, etc.
Mostrarlas corriendo en el video sube Technicality.

PASO 7 — README con permalinks de GitHub a las líneas exactas de integración WDK
(es lo primero que miran), lista de paquetes y versiones, red y token usados,
.env.example, instrucciones desde clon limpio.

NO HAGAS: interfaz web, contratos inteligentes, criptografía propia, soporte
multi-cadena, ni features fuera de estos siete pasos.
```

### Espectro

| Escenario | Qué entregás |
|---|---|
| **A** | Los 7 pasos, con la tabla de casos corriendo |
| **B** | Sin registro de auditoría ni `portero log`. Sigue completa la demo central |
| **C** | El MCP no conecta bien | El motor de políticas anda igual sobre la CLI directo. La demo del "no" se mantiene, que es lo único imprescindible |
| **D** | No conseguís fondos de testnet | Modo simulación puro, honesto en el video. Débil, pero entregable |

---

## 💡 Idea 7 — **Nómina desde CSV con recibos**

**Qué es:** leés un CSV de colaboradores o de bounties, previsualizás cada
transferencia, ejecutás por lotes, y generás un registro de recibos con la salida
`--json`.

**Por qué está en la lista:** es literalmente lo que el sponsor sugiere, y es
**el proyecto con menos formas de salir mal en 24 horas**. Si el equipo está
inseguro o alguien se enferma, esto se termina.

**El riesgo es de originalidad**, no de ejecución. Diferenciá con el caso de uso
concreto: pagar a colaboradores en LATAM que no tienen cuenta bancaria en dólares.
Eso convierte una utilidad genérica en un producto con usuario nombrable.

**Puntaje:** Technicality 3 · Originality 2 · UI/UX/DX 4 · Practicality 5 ·
Presentation 4 → **18/25**. Es el piso seguro, no el techo.

---

## 💡 Idea 9 — **Primer envío sin gas** (Premio 2 de WDK)

**Qué es:** el usuario llega con la billetera vacía, recibe USD₮ y puede enviarlo
en el mismo minuto, sin comprar SOL ni ETH primero, viendo la comisión cotizada en
USD₮ antes de firmar.

**Menos competido** que el premio 1, por una razón concreta: hay fricción de
infraestructura. No proveen endpoints de paymaster — cada uno consigue el suyo en
Candide o Pimlico. Y **la testnet de USD₮ solo existe en Sepolia**; para cualquier
otra cadena hay que desplegar un token ficticio propio y apuntar el paymaster ahí.

**Recomendación fuerte: si van por acá, quedate en Sepolia.** Es el único camino
sin fricción y ellos mismos lo dicen.

**Preparativo de hoy:** conseguir el endpoint de paymaster. Son minutos desde el
panel de Candide o Pimlico, y **no es código del proyecto**, así que es preparación
de entorno legítima. Hacerlo el sábado a las 12 es regalar una hora del reloj.

**Puntaje:** Technicality 4 · Originality 3 · UI/UX/DX 5 · Practicality 4 ·
Presentation 5 → **21/25**, pero con la factibilidad más baja de la lista.

---

# 6. Cómo se elige, esta noche

No lo decidan por votación abierta. Usen este filtro, en orden. La primera
respuesta mala mata la idea.

1. **¿Alguien del equipo ya instaló la tecnología del track y le funcionó?**
   Si nadie tocó QVAC y el modelo no baja, no importa lo linda que sea la idea.
2. **¿Podés describir los primeros 30 segundos del video sin explicar nada?**
   Si necesitás una frase de contexto antes de que se entienda, la idea no está
   lista.
3. **¿Hay alguien nombrable que sufre este problema?** No "los usuarios". Un
   contador, un dev que pega claves en Slack, el que administra los pagos.
4. **¿Se termina la versión chica en 12 horas?** No 24: 12. Las otras 12 se van
   en cosas que no calculaste.
5. **¿Qué se corta si a las 12 horas van atrasados?** Si no tenés respuesta,
   volvé al punto 4.

**Y una regla que sale de un equipo que ganó:** un equipo de cinco en la Platanus
Hack estuvo hasta las 5 de la mañana sin idea, con 30 horas por delante, y ellos
mismos dijeron que quizás era porque siendo cinco costaba más ponerse de acuerdo.
Ganaron igual — **pero presentaron algo distinto de lo que habían planeado al
principio.** Con 24 horas no tenés ese margen. Decidan la dirección esta noche y
permítanse pivotear sin drama si a las 6 horas la cosa no cierra.

---

# 7. Lo que aplica a todas las ideas

## Nombre y gancho
Un equipo de TreeHacks le puso omnom a su robot y le colgó la comida de una soga
para tener que cortarla, y dijeron en cámara que ese detalle podía ser el factor
diferenciador. Ganaron Most Creative. **Un nombre corto y una analogía de una
línea valen media hora de trabajo.** Uno de los ganadores de otra hackathon se
describía como "Waze meets 311". Eso se entiende sin explicación.

## Probar con gente real
En el showcase de MIT los tres jueces le preguntaron a casi todos los equipos
alguna variante de *"¿probaste esto con alguien que no sea de tu familia?"*. Los
que tenían respuesta concreta —vecinos, dos especialistas, feedback documentado
que derivó en cambios— se llevaron los premios.

**El domingo a las 9:30, agarrá a tres personas del venue, que usen la
herramienta, y decilo en el video y en el README.** Es lo más barato que podés
hacer para subir *Practicality*, que es la debilidad histórica documentada del
campo en este evento.

## Lo determinístico va en código
Si algo se puede resolver con una comparación o una regla, no se lo preguntes al
modelo. Sube la fiabilidad y es el tipo de decisión de ingeniería que puntúa.
Un ganador del showcase de MIT explicó que extraían el esqueleto de la persona en
vez de analizar la imagen cruda, para que el modelo ignorara tono de piel,
iluminación y fondo. Explicaron ese razonamiento en el pitch y ganaron
innovación creativa. **La decisión de ingeniería explicada vale puntos.**

## El plan de lo que falta
La rúbrica de *Technicality* pregunta si la solución está completa y funcional
**o si el equipo tiene un plan claro de cómo la terminaría**. Eso es un regalo:
los últimos 20 segundos del video, dedicados a "esto no llegamos a hacerlo, y así
lo terminaríamos", recuperan puntos de lo que no cerraste. Específico, no vago.

## Entregar temprano y editar
Se puede editar la submission después de enviarla. Un ganador de YHack lo dice en
su vlog: entregá y después editás. El organizador que dio más de un millón en
premios cuenta que ve equipos talentosos que probablemente podían ganar entregando
a las 12:01, 12:05, 12:30 — o no entregando. **Apunten a las 10:30 del domingo.**

---
---

# ANEXO — Actualización del 21/8 por la noche

## A.0 Corrección: los ganadores anteriores eran reales

En el dossier marqué como no verificados los listados de ganadores de ediciones
pasadas. **Esa cautela estaba mal calibrada: los nombres eran correctos.** Una
investigación posterior los confirmó contra fuentes de Crecimiento:

| Edición | Ganadores verificados |
|---|---|
| Ago 2024 | TornadoCodes, ValidAR, Certo (tres finalistas) |
| Dic 2024 | Adversarium, Superswap, Underloans · mención: OptimismPay |
| Mar 2025 | Circuls (World), Big Brain MCP (Mantle, mejor app de IA), MetaCitizen (ZKsync), OpenProxy Gov (Polkadot), PayGo (Stellar) |
| Ago 2025 | Sportchain (Lisk), Zuma (Zama), Piggy Quiz (Base), Acepay (Flare), TuCausa (Filecoin), Regalito (AI/Protocol Labs), deliberation-agents-governance (Citrea), ZKredit (ENS), Micdrop (v0), Elemgame (Symbiotic) |
| Mar 2026 | AutoBounty (Avalanche **+ Best Project PL Genesis**), Clever (Fiserv), TreasuryPilot (GenLayer), Consient (Biotech), AlephRob (Robotics) |

**Dos lecturas que cambian la estrategia:**

**① No hay un único ganador general: hay una colección de ganadores por sponsor.**
Marzo 2025 y agosto 2025 lo muestran clarísimo. El premio general es lotería; los
bounties de sponsor son el objetivo real. Ya lo suponíamos, ahora está probado con
cinco ediciones.

**② AutoBounty ganó dos premios con un solo proyecto.** Es la prueba de que
apuntar a varios bounties con una sola construcción funciona en este evento
específicamente. Es exactamente lo que preguntaste.

## A.1 Precedentes con las tecnologías de este año

Esto es lo más útil que apareció, y no existía cuando escribí el documento.
En el **Tether Developers Cup 2026** ganaron:

| Track | Proyecto | Qué era |
|---|---|---|
| WDK + campeonato general | **Tarkam** | Escrow autocustodiado para premios de torneos de fútbol amateur: inscripción en USDT, estado verificable, reparto de premios. Usa WDK para generación de wallet, firma y cuentas gasless |
| QVAC | **Scout** | IA de fútbol corriendo en el dispositivo, sobre el SDK de QVAC |
| Pears | **Curva** | Watch-party P2P de fútbol: sincroniza la reproducción entre continentes, chat, **traducción local con QVAC**, **propinas con WDK**, sin servidores |

**Tres conclusiones operativas:**

1. **Tarkam es el molde de un ganador de WDK:** problema físico concreto + dinero
   real + flujo simple + WDK haciendo el trabajo pesado. No es "una wallet porque
   sí". Confirma que **Portero** (idea 4) va por buen camino: WDK como sistema, no
   como feature.
2. **Curva demuestra que combinar las tres tecnologías de Tether gana.** No es una
   ensalada tecnológica: cada pieza hace un trabajo que las otras no pueden.
   Volvé a la sección A.3.
3. **Cuidado con Vecino (idea 3).** Curva ya ocupó el espacio "P2P social con
   chat". Repetir esa forma es competir contra un ganador reciente del mismo
   sponsor. **Llave (idea 1) no tiene ese problema** — mandar secretos no es un
   chat. Vecino baja del puesto 3 al 7 de mi ranking.

**Otro dato verificado:** la submission es por **DoraHacks**, no Hacki. Queda
resuelta esa duda del dossier.

---

# A.2 Mapa de bounties: qué se puede ganar y cuánto

Esto es lo que pediste explícitamente, y hay una relectura importante de la regla.

## La plata que hay en juego

| Bounty | Monto | Sponsor |
|---|---|---|
| QVAC · Pista 1 — agentes de operaciones | **$1.000** | Tether |
| QVAC · Pista 2 — fiabilidad de modelos chicos | **$500** | Tether |
| QVAC · Vault Guardian | **$500** a repartir | Tether · *independiente del proyecto* |
| WDK · Pista 1 — CLI / MCP | **$1.000** | Tether |
| WDK · Pista 2 — gasless | **$500** | Tether |
| Pears · 1° puesto | **$1.000** | Tether / Holepunch |
| Pears · 2° puesto | **$500** | Tether / Holepunch |
| General · 1° puesto | **$500 USDC** | Crecimiento |
| General · 2° puesto | **$500 USDC** | Crecimiento |

## La relectura de "1 pista por patrocinador"

En el dossier interpreté conservadoramente que, como los tres documentos dicen
*"Tether · puedes ingresar 1 pista de este patrocinador"* y los tres son de
Tether, solo se podía entrar a uno de los tres. **Creo que esa lectura era
demasiado pesimista**, por dos razones:

1. Cada documento **es** una pista (WDK, Pears, QVAC), y adentro tiene sub-pistas
   ("Pista 1", "Pista 2"). La frase leída así significa: *dentro de este
   documento, elegí una de las dos sub-pistas*. Eso explica por qué Pears —que
   tiene un solo desafío con dos puestos— aclara que este fin de semana hay una
   sola propuesta y no categorías separadas.
2. El FAQ oficial del Hacker's Manual pregunta si se puede aplicar a varios
   bounties y responde que **sí, a uno o a varios**, con la condición de cumplir
   los requisitos de cada sponsor y ser razonable en la elección.

**Los dos escenarios y lo que valen:**

| Lectura | Máximo alcanzable con un proyecto |
|---|---|
| **Optimista** (creo que es la correcta): 1 sub-pista por documento, más el General | QVAC $1.000 + WDK $1.000 + Pears $1.000 + General $500 = **$3.500** · + Vault Guardian $500 |
| **Conservadora:** solo 1 track de Tether en total | 1 track $1.000 + General $500 = **$1.500** |

**Preguntalo mañana apenas abra el Telegram.** Pero fijate el detalle importante:
en los dos escenarios, la respuesta correcta es la misma — **construir algo que
califique para varios y anotarlo a todos los que aplique.** Si resulta que solo
podés elegir uno, elegís el más fuerte y no perdiste nada. Si podés anotarte a
todos, multiplicaste los tiros sin multiplicar el trabajo.

⚠️ **La condición que no se negocia:** el FAQ dice "sé razonable en tu elección",
y los tres tracks de Tether descartan proyectos que le pegaron su tecnología al
costado para llevarse el premio. **Cada integración tiene que hacer un trabajo
que las otras no pueden hacer.** Si sacás una y el producto sigue funcionando
igual, esa no va.

## A qué bounty apunta cada idea del documento

| Idea | Bounty principal | $ | Bounties adicionales realistas | Total alcanzable |
|---|---|---|---|---|
| 1 · **Llave** | Pears 1° | $1.000 | General | $1.500 |
| 2 · **Banco de pruebas** | QVAC Pista 2 | $500 | General · toca Pista 1 | $1.000 |
| 4 · **Portero** | WDK Pista 1 | $1.000 | General | $1.500 |
| 5 · **Conciliador** | QVAC Pista 1 | $1.000 | General · Pista 2 si lo medís | $1.500–2.000 |
| 6 · **Extracto → castellano** | QVAC Pista 1 | $1.000 | General | $1.500 |
| 7 · **Nómina CSV** | WDK Pista 1 | $1.000 | General | $1.500 |
| 8 · **Duelo** | Pears | $1.000 | — | $1.000 |
| 9 · **Primer envío sin gas** | WDK Pista 2 | $500 | General | $1.000 |
| **10 · Vaquita** ⭐ | **Pears + QVAC + WDK** | — | General | **$3.500** |
| 11 · **Ventanilla** | QVAC Pista 1 | $1.000 | General | $1.500 |

---

# A.3 ⭐ Idea 10 — **Vaquita**
### La única que toca tres bounties, y cada tecnología hace algo que las otras no pueden

> En Argentina, cuando varios ponen plata entre todos para pagar algo, se dice
> *"hacer una vaquita"*. Eso es el producto entero y es el nombre. Explicar esa
> palabra en el primer segundo del video es el gancho memorable.

**Qué es:** sacás una foto de la cuenta del restaurante o del súper. La
herramienta lee los ítems ahí mismo en tu teléfono, encuentra a los demás que
están en la mesa sin necesidad de internet, cada uno marca lo que consumió, y se
salda en USD₮ en el momento. Sin app store, sin servidor, sin cuenta, sin que la
foto de tu cuenta salga de tu dispositivo.

**Por qué cada pieza es imprescindible — esta es la parte que hay que poder
defender en 15 segundos:**

| Tecnología | Qué hace | Por qué no se puede reemplazar |
|---|---|---|
| **QVAC** | Lee el ticket en el dispositivo y lo convierte en ítems con precios | Un ticket tiene lo que comés, dónde, cuándo y a veces los últimos dígitos de la tarjeta. **Subir eso a una API de terceros es exactamente lo que no querés.** Y sin internet no hay API que valga |
| **Pears** | Los comensales se encuentran entre sí y sincronizan quién marcó qué | No hay servidor, entonces no hay cuentas, no hay registro, no hay nada que se caiga. Y funciona en un subsuelo sin señal |
| **WDK** | Cada uno paga su parte en USD₮, sin necesitar gas nativo | El que te debe $12 no va a instalar una wallet, comprar ETH y aprender qué es el gas. **El módulo gasless es literalmente lo que hace posible el caso de uso** |

Si sacás cualquiera de las tres, el producto se rompe. Eso es lo contrario de una
ensalada tecnológica, y es exactamente la forma de **Curva**, que ganó el track
de Pears del Tether Developers Cup combinando las tres.

**Los primeros 30 segundos del video:**

```
Tres notebooks sobre una mesa. Un ticket de restaurante arrugado.

1.  Foto del ticket.  →  aparecen 8 ítems con precios. Nada salió del equipo.
2.  Se apaga el wifi EN CÁMARA.
3.  Las otras dos notebooks aparecen solas en la lista.
4.  Cada uno toca lo que comió. Los totales se actualizan en las tres pantallas.
5.  "vos ponés $4.200"  →  pagar  →  ✓ enviado en USD₮, comisión pagada en USD₮.
6.  El wifi sigue apagado.
```

Cero explicación necesaria. Todo el mundo estuvo en esa mesa alguna vez.

**Modelo de negocio en una frase:** las apps de división de cuentas cobran por
transacción y necesitan que todos tengan la misma app y banco; esta funciona entre
desconocidos, entre países y sin conexión, y el margen está en el flujo de pago.

**Puntaje estimado:** Technicality 5 · Originality 5 · UI/UX/DX 5 · Practicality 5
· Presentation 5 → **25/25** si sale completa.

**Factibilidad en 24h:** 3/5 con un equipo de primera vez. **Es la idea más
ambiciosa del documento y la que más disciplina exige.** Por eso la escalera de
repliegue de abajo no es opcional: es parte del plan desde la hora cero.

## La escalera de repliegue de Vaquita

Esto es lo que la hace jugable a pesar de la ambición: **cada escalón sigue siendo
una entrega válida a un bounty distinto.**

| Escalón | Qué tenés funcionando | A qué te anotás | $ |
|---|---|---|---|
| **1** | El gate de Pear: instala y actualiza | Pears | $1.000 |
| **2** | + descubrimiento de pares y división manual de ítems | Pears + General | $1.500 |
| **3** | + QVAC leyendo el ticket | Pears + QVAC + General | $2.500 |
| **4** | + WDK con pago normal | los cuatro | $3.500 |
| **5** | + WDK gasless | los cuatro, con la Pista 2 de WDK | $3.500 |

**La regla que salva el proyecto:** construís en ese orden exacto, y anotás en la
submission solo los bounties de los escalones que efectivamente cerraste. Nunca te
anotás a un bounty que no cumpliste — eso te hace quedar como el proyecto que le
pegó la tecnología al costado, que es lo que descartan sin revisar.

## Prompt de arquitectura

```
Vamos a construir "vaquita": una herramienta peer-to-peer para dividir la cuenta
de un restaurante entre varias personas, leyendo el ticket con IA local y saldando
en USD₮. Tres tecnologías de Tether: Pear (P2P), QVAC (IA local), WDK (pagos).

ARQUITECTURA OBLIGATORIA — tres módulos que NO se conocen entre sí. Cada uno
expone una interfaz chica y el núcleo los orquesta. Esto no es prolijidad: es lo
que nos permite cortar un módulo entero sin tocar el resto si algo falla.

  nucleo/          estado de la cuenta: items[], personas[], asignaciones[]
  lector/          leerTicket(imagen) -> {items: [{nombre, precio}]}
  pares/           anunciar(sala), alConectar(cb), difundir(estado)
  pagos/           cotizar(monto) -> comision ; enviar(destino, monto) -> hash

El núcleo NUNCA importa QVAC, Pear ni WDK directamente. Solo habla con las tres
interfaces de arriba. Cada módulo tiene una versión falsa (lector/falso.js, etc.)
que devuelve datos de prueba. Empezamos con las tres falsas y las vamos
reemplazando por las reales de a una.

REGLAS ANTI-ALUCINACIÓN, no negociables:
- Pear y Bare NO son Node.js. Verificá cada módulo contra docs.pears.com.
- El paquete de WDK es @tetherto/wdk-cli CON SCOPE. El wdk-cli sin scope en npm
  es otro proyecto distinto.
- Toda la inferencia de QVAC corre local. Ninguna llamada a la nube.
- Antes de usar un método de cualquiera de los tres SDKs, verificalo en la doc
  oficial. Si no lo encontrás, decímelo en vez de inventarlo.
- Las integraciones de estos SDKs son POCAS LÍNEAS. Si un módulo crece mucho,
  probablemente estés inventando API. Pará y avisame.

PASO 1 — EL GATE, antes que nada. (hora 1 a 3)
hello-pear-bare, rama main. `pear touch`, pegar el link de upgrade en
package.json, npm start, desplegar, darme el link pear://.
Pará acá. Lo instalo desde otra máquina antes de seguir.

PASO 2 — Núcleo con los tres módulos falsos. (hora 3 a 5)
Interfaz de terminal que muestra: lista de ítems, lista de personas, quién marcó
qué, total por persona. Todo con datos de prueba hardcodeados. Al final de este
paso el producto ya se puede demostrar, aunque no haga nada real.

PASO 3 — pares/ real, con Hyperswarm. (hora 5 a 9)
El topic se deriva de un código de sala de tres palabras. Cuando alguien marca un
ítem, se difunde el estado a todos. Resolución de conflictos: gana la última
escritura por ítem, con marca de tiempo. Probalo entre dos máquinas.
ESCALÓN 2 ALCANZADO. Commiteá y avisame.

PASO 4 — lector/ real, con QVAC. (hora 9 a 13)
leerTicket(imagen) -> lista de items. Usá OCR + extracción estructurada del SDK.
Probalo con las 10 fotos de tickets reales que tenemos en /pruebas.
Si un ítem no se lee con confianza, devolvelo marcado como "revisar", NO lo
inventes: el sponsor premia explícitamente señalar incertidumbre.
Si esto no funciona a la hora 13, lo dejamos en falso y el usuario carga los
ítems a mano. El producto sigue en pie.
ESCALÓN 3 ALCANZADO.

PASO 5 — pagos/ real, con WDK. (hora 13 a 17)
Primero una transferencia común desde la CLI, verificada. Después conectarla al
núcleo: cada persona ve su total y un botón para pagar.
ESCALÓN 4 ALCANZADO.

PASO 6 — gasless, solo si llegamos. (hora 17 a 19)
M�dulo gasless de WDK con nuestro paymaster ya configurado. Mostrar la comisión
cotizada en USD₮ antes de firmar.
ESCALÓN 5 ALCANZADO.

PASO 7 — OTA, interfaz, README. (hora 19 en adelante)
Publicar una actualización visible y verificar que llega sola. Permalinks de
GitHub a las líneas exactas de cada una de las tres integraciones — es lo primero
que miran los tres sponsors.

NO CONSTRUIR: cuentas de usuario, base de datos, servidor, interfaz web, historial
persistente, multi-moneda, propinas, cifrado propio, ni nada que no esté acá.
```

---

# A.4 Idea 11 — **Ventanilla**
### La idea simple: una sola inferencia, cero infraestructura, un problema que todos sufren

Pediste algo simple que igual pueda competir. Esta es esa.

**Qué es:** sacás una foto de la carta que te mandó el banco, la ANSES, la AFIP,
la universidad o el consorcio — cualquier cosa que te pida trámites — y del otro
lado sacás fotos de los papeles que ya tenés. La herramienta te dice, en
castellano llano, **qué te están pidiendo y qué te falta.**

**Por qué es simple de verdad:** son dos inferencias y una comparación de
conjuntos. No hay red, no hay pagos, no hay estado distribuido, no hay servidor.
Un equipo de vibecoders lo tiene funcionando en ocho horas y usa las otras
dieciséis en que se vea impecable — que es exactamente donde se ganan los puntos
de UI/UX y de Presentation que casi nadie cuida.

**Por qué compite igual:**
- **Practicality 5.** Todo el mundo en LATAM sufre esto. No hay que explicar el
  problema.
- **El argumento de privacidad es aplastante.** Una carta del banco tiene tu CUIT,
  tu domicilio y tus números de cuenta. Que nunca salga del dispositivo no es una
  característica: es la razón de existir.
- **Encaja en la Pista 1 de QVAC** — trabajo administrativo de leer documentos,
  detectar lo que falta y escalar lo importante. Es literalmente lo que pidieron,
  en un dominio donde no va a ir nadie porque todos van a ir a las facturas.

**Los primeros 30 segundos:**
```
Foto de una carta del banco.
  → "Te piden 4 cosas: DNI, constancia de CUIT,
     último recibo de sueldo, y comprobante de domicilio."

Fotos de tres papeles que tenés.
  → DNI                       ✓
  → constancia de CUIT        ✓
  → recibo de sueldo          ✓  (junio — piden el último, verificar)
  → comprobante de domicilio  ✗  FALTA

  "Con lo que tenés no alcanza. Te falta uno."
```

**Puntaje estimado:** Technicality 3 · Originality 4 · UI/UX/DX 5 · Practicality 5
· Presentation 5 → **22/25**
**Factibilidad 24h: 5/5.** Es la idea más segura del documento.

**El riesgo real es Technicality 3.** Se sube así: la comparación de qué está
cubierto y qué falta **se hace con código, no preguntándole al modelo**. El modelo
extrae la lista de requisitos y la lista de documentos; el cruce es un conjunto
contra otro. Explicar esa decisión en el video sube el puntaje, porque es
exactamente el tipo de razonamiento de ingeniería que los jueces premian.

## Prompt de arquitectura

```
Vamos a construir "ventanilla": una herramienta local que lee una carta o formulario
que te pide documentación, lee los documentos que tenés, y te dice qué te falta.
Toda la IA corre en el dispositivo con QVAC de Tether.

ANTI-ALUCINACIÓN: toda la inferencia es local con @qvac/sdk, ninguna llamada a la
nube. Verificá cada método contra docs.qvac.tether.io/reference/api/ antes de
escribirlo. Si no lo encontrás ahí, decímelo en vez de inventarlo.

PASO 1 — El gate. (hora 1 a 2)
Cargar un modelo 4B en Q4 y hacer OCR sobre UNA foto de una carta real, sacada
con el celular. Decime modelo, cuantización, RAM y latencia. Si no entra en la
RAM que tenemos, bajamos de modelo ahora, no después.

PASO 2 — Extraer requisitos. (hora 2 a 5)
leerRequisitos(imagen) -> [{requisito, obligatorio, detalle}]
Probalo con 5 cartas distintas. Si un requisito es ambiguo, marcalo, no lo
inventes.

PASO 3 — Extraer documentos. (hora 5 a 8)
identificarDocumento(imagen) -> {tipo, fecha, titular, campos}
Probalo con 8 documentos distintos.

PASO 4 — El cruce, EN CÓDIGO, no con el modelo. (hora 8 a 10)
cruzar(requisitos, documentos) -> [{requisito, estado, documento, motivo}]
estado ∈ {cubierto, falta, revisar}
"revisar" cuando el documento existe pero algo no cierra: vencido, a nombre de
otro, o de un mes que no corresponde. Esa lógica es determinística. NO le
preguntes al modelo si algo está cubierto.

PASO 5 — La explicación, ahí sí con el modelo. (hora 10 a 12)
Una frase por cada requisito que falta o que hay que revisar, en castellano llano.

PASO 6 — Interfaz. Acá va la mitad del tiempo restante. (hora 12 a 18)
Una sola pantalla: a la izquierda la carta, a la derecha la lista de requisitos
con ✓ / ✗ / ⚠. Arrastrás fotos y se acomodan solas. Sin frameworks pesados, sin
build complicado. Que se vea impecable en un video.

PASO 7 — Probar con documentos que NO elegimos nosotros. (hora 18 a 20)
Pedirle a 3 personas del venue una foto de cualquier carta que tengan. Anotar qué
falló. Ponerlo en el README.

NO CONSTRUIR: cuentas, nube, base de datos, chatbot, subida de archivos a ningún
lado, soporte de más de un idioma, generación de documentos.
```

---
---

# 📘 NOTA PARA VIBECODERS
### Cómo trabajar los cuatro sobre el mismo proyecto sin pisarse

Esta sección es para el equipo entero, no solo para quien programa más. Está
escrita asumiendo que van a usar asistentes de IA en serio, que es lo que los tres
sponsors recomiendan explícitamente.

---

## 1. El problema que nadie te avisa

Cuatro personas con asistentes de IA sobre el mismo repositorio no es cuatro veces
más rápido. Sin reglas, es **más lento que una sola persona**, por una razón
específica: los asistentes no saben qué está tocando el otro. Dos agentes editando
el mismo archivo generan conflictos que después nadie sabe resolver a las 3 de la
mañana, y el reflejo típico —"dejá, lo arreglo a mano"— consume las horas que
te quedaban.

**La solución no es técnica, es de organización: cada persona es dueña de una
carpeta, y nadie edita la carpeta de otro. Nunca.**

Por eso todos los prompts de este documento arrancan definiendo módulos separados
con interfaces chicas. No es prolijidad de arquitecto: es la única forma de que
cuatro agentes trabajen en paralelo sin chocarse.

---

## 2. El contrato: lo primero que se escribe, antes que cualquier código

En la primera hora, **una sola persona** crea el repositorio y escribe dos
archivos. Los demás no tocan nada hasta que estén.

### `CLAUDE.md` (o el equivalente de la herramienta que usen), en la raíz

```markdown
# Reglas de este proyecto

- Hackathon Aleph. 24 horas. Cierre domingo 12:00 GMT-3.
- Todo el código se escribe durante el evento. No reutilizamos nada previo.
- El sponsor DESCARTA SIN REVISAR entregas con APIs inventadas, métodos que no
  existen en el SDK, READMEs que describen funciones inexistentes, o demos que
  solo funcionan con una entrada específica.
- Si no estás seguro de que un método existe, buscalo en la doc antes de
  escribirlo. Si no lo encontrás, decímelo. No lo inventes.
- Preferí siempre la solución de menos líneas.
- Después de cada paso, corré el código. No avances si el anterior no corre.
- No escribas features que no te pedí. No agregues abstracciones "por si acaso".

# Límites de propiedad — CRÍTICO
Solo podés editar archivos dentro de la carpeta que te indique al empezar.
Si necesitás cambiar algo fuera de tu carpeta, PARÁ y decímelo. No lo edites.
```

### `CONTRATO.md`

Acá van las interfaces entre módulos, con las formas exactas de los datos que
viajan. Ejemplo para Vaquita:

```
lector/     leerTicket(rutaImagen) -> { items: [{nombre, precio, confianza}] }
pares/      anunciar(sala) ; alConectar(cb) ; difundir(estado)
pagos/      cotizar(monto) -> {comision, moneda} ; enviar(destino, monto) -> {hash}
nucleo/     estado = { items[], personas[], asignaciones[] }
```

**Cuatro líneas.** Con eso, cuatro personas pueden trabajar en paralelo desde la
hora 2 sin hablarse, porque cada una sabe exactamente qué recibe y qué devuelve.

---

## 3. Los muñecos primero

**Regla:** en la hora 2, cada módulo existe con una versión falsa que devuelve
datos de prueba con la forma correcta.

```javascript
// lector/falso.js
export function leerTicket() {
  return { items: [
    { nombre: "milanesa", precio: 8500, confianza: 1 },
    { nombre: "coca", precio: 2100, confianza: 1 },
  ]};
}
```

Suena tonto. **Es lo que hace que el equipo entero pueda avanzar desde la hora 2
en vez de la hora 9.** El que hace la interfaz no espera a que funcione QVAC. El
que hace el núcleo no espera a que funcione Pear. Y si a la hora 13 QVAC no anda,
dejás el muñeco puesto, el usuario carga los ítems a mano y **el producto sigue
demostrable**.

Los muñecos también son el seguro de la demo: si algo se cae en cámara, tenés un
modo con datos de prueba que siempre funciona.

---

## 4. Git para cuatro vibecoders, sin drama

Lo más simple que funciona:

- **Una rama por persona.** `emi`, `juan`, `sofi`, `nico`. No hay nombres de
  features, no hay convenciones. Una rama, una persona.
- **Una persona es dueña de `main`** — el rol de integración — y es la única que
  mergea.
- **Merge cada 2 horas**, en el reloj. No "cuando esté listo". A las 14, 16, 18,
  20. Si tu rama no compila a esa hora, no se mergea y seguís.
- **Commits chicos y frecuentes.** Cada 20–30 minutos. Además de salvarte, **el
  historial de git es tu coartada de que el código se escribió durante el evento**
  — la organización dice que revisa todo.
- Si aparece un conflicto, gana el dueño de la carpeta. No se discute.

**Si están en la misma máquina o alguien ya sabe git bien**, los *worktrees*
dejan tener varias ramas abiertas a la vez en carpetas distintas y son un
multiplicador real cuando tenés varios agentes corriendo en paralelo. Pero si
nunca los usaron, **no los aprendan mañana**. Ramas normales alcanzan.

---

## 5. Los cuatro roles

No son "el que sabe más" y tres ayudantes. Son cuatro trabajos distintos y todos
puntúan en la rúbrica.

### 🔑 Integración y gate
**Dueño de:** `main`, el deploy, la configuración, los merges.
**Su trabajo real:** pasar el gate del sponsor en las primeras 3 horas y
verificarlo desde otra máquina. Después, ser el que mergea y el que hace la prueba
de clon limpio antes de entregar.
**Es el rol más importante y el menos glamoroso.** Si el gate no pasa, no existe
el proyecto.

### ⚙️ Núcleo
**Dueño de:** la lógica central y las integraciones con los SDKs.
**Su trabajo real:** reemplazar los muñecos por las versiones reales, de a una,
en el orden de la escalera de repliegue.
**Regla:** nunca toca la interfaz ni el README.

### 🎨 Cara — interfaz, mensajes y DX
**Dueño de:** todo lo que el usuario ve. Pantallas, salida de terminal, mensajes
de error, `--help`, estados vacíos, el README.
**Su trabajo real:** que un juez que nunca vio esto entienda qué pasa sin
preguntar.
**Por qué es un rol de primera:** UI/UX/DX es **un quinto de la nota**, y es lo
primero que un equipo de primera vez sacrifica. En una herramienta de línea de
comandos, el README y los mensajes de error **son** la interfaz. Este rol puede
trabajar desde la hora 2 contra los muñecos, sin esperar a nadie.

### 🎬 Relato — video, mentores y entrega
**Dueño de:** el guion del video, la charla con los mentores, el testeo con
usuarios, el formulario de submission.
**Su trabajo real, en orden cronológico:**
- Hora 0–1: escribe el guion del video **antes de que nadie codee**. Si no se
  puede escribir, la idea no está lista.
- Hora 3–4: habla con Raquel Carrasco con **dos opciones concretas**, no con una
  pregunta abierta.
- Hora 20: agarra 3 personas del venue, las hace usar la herramienta, anota las
  tres fricciones. Eso es evidencia real de *Practicality*.
- Hora 21: graba el video.
- Hora 22: llena la submission en DoraHacks con los permalinks y **marca los
  bounties correctos**.

**Este rol no requiere programar.** Y según el ingeniero de Meta que ganó más de
$30.000 en hackathons, una buena presentación es la mitad del proyecto.

**Regla transversal:** cada vez que alguien se levanta de la silla —a hablar con
un mentor, a comer, al baño— **deja una tarea corriendo en su asistente**.

---

## 6. Reparto concreto por idea

### ⭐ Vaquita (la más ambiciosa, la que más exige el reparto)

| Rol | Carpeta | Hora 1–3 | Hora 3–9 | Hora 9–17 | Hora 17+ |
|---|---|---|---|---|---|
| 🔑 Integración | raíz, `deploy/` | **El gate de Pear** | Verificar instalación desde otra máquina | Merges cada 2h · OTA | Clon limpio · binarios |
| ⚙️ Núcleo | `nucleo/`, `pares/` | Espera el gate · escribe `CONTRATO.md` | **pares/ real con Hyperswarm** | Ayuda con `pagos/` | Robustez |
| ⚙️ Núcleo 2 *(si son 4)* | `lector/`, `pagos/` | Prepara las 10 fotos de tickets | Muñecos de lector y pagos | **QVAC y después WDK** | Manejo de errores |
| 🎨 Cara | `ui/`, `README.md` | Diseña la pantalla contra los muñecos | **Interfaz completa funcionando con datos falsos** | Mensajes de error · pulido | README · permalinks |
| 🎬 Relato | `demo/` | **Guion del video** | Mentores · consigue tickets reales | Ensaya la demo | Testeo · grabar · entregar |

**El punto clave:** la interfaz está terminada a la hora 9 corriendo con muñecos.
Cuando llegan QVAC y WDK, es enchufarlos. Si no llegan, la demo existe igual.

### 🔑 Llave (Pears, la más pareja)

| Rol | Qué hace |
|---|---|
| 🔑 Integración | Gate de Pear, rama `variant/daemon`, deploy, OTA, binarios |
| ⚙️ Núcleo | Transporte con Hyperswarm, códigos de tres palabras, un solo uso |
| 🎨 Cara | `--help`, barra de progreso, mensajes de error, README |
| 🎬 Relato | Guion, mentores, las dos terminales de la demo, testeo, entrega |

Es la de reparto más limpio: cuatro trabajos casi independientes.

### 📊 Banco de pruebas (QVAC)

| Rol | Qué hace |
|---|---|
| 🔑 Integración | Que el modelo cargue y corra. Decide el tamaño según la RAM real |
| ⚙️ Núcleo | La tarea encadenada + el harness de N corridas |
| ⚙️ Núcleo 2 | Las capas de mitigación, una por una, midiendo entre cada una |
| 🎨 Cara | **El reporte HTML.** Es la demo entera: la tabla y el gráfico |
| 🎬 Relato | Guion, mentores, y explicar los modos de fallo que no se arreglaron |

Acá el rol de Cara es inusualmente crítico: sin el reporte lindo, el proyecto se
ve como una tabla en una terminal y pierde el punto de UI/UX.

### 📄 Ventanilla (la simple)

| Rol | Qué hace |
|---|---|
| 🔑 Integración | Modelo cargando, OCR sobre una foto real en la hora 1 |
| ⚙️ Núcleo | Extracción de requisitos y de documentos, más el cruce determinístico |
| 🎨 Cara | La pantalla única. **Acá va la mitad del tiempo del equipo** |
| 🎬 Relato | Consigue cartas y documentos reales de otra gente, guion, testeo |

Con solo tres personas, esta es la idea que mejor aguanta: el rol de Núcleo 2 no
hace falta.

---

## 7. Las siete reglas de vibecoding en equipo

1. **Nadie edita la carpeta de otro.** Si tu agente quiere hacerlo, pará y avisá.
2. **El contrato antes que el código.** Cuatro líneas de interfaces valen más que
   dos horas de discusión.
3. **Muñecos en la hora 2.** Todos avanzan en paralelo desde el principio.
4. **Commit cada 20–30 minutos.** Es tu red y tu coartada.
5. **Merge en el reloj, no cuando esté listo.** 14, 16, 18, 20.
6. **Corré el código.** El error más caro de un asistente es el que compila y no
   hace lo que dice el README. Los tres sponsors descartan sin revisar por esto.
7. **Lo determinístico va en código.** Si se puede resolver comparando dos listas,
   no se lo preguntes al modelo. Sube la fiabilidad y puntúa en Technicality.

---

## 8. Qué elegir, en una línea

- **Si el equipo quiere el máximo y aguanta la presión →** Vaquita. Tres bounties
  más el General, con escalera de repliegue en cada escalón.
- **Si quieren el mejor ratio con riesgo controlado →** Llave. Un gate que elimina
  competencia, y cuatro trabajos independientes.
- **Si alguien está inseguro, o son tres en vez de cuatro →** Ventanilla. Se
  termina, se ve bien, y compite por Practicality y presentación.
- **Si en el workshop de mañana los de QVAC dicen que quieren ver evaluación y
  benchmarking →** Banco de pruebas, sin dudarlo.
