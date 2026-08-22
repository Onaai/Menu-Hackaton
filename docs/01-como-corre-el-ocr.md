# Cómo correr el OCR sobre el PDF

Guía del script `scripts/menu-ocr.js`. Lo que hace, cómo se corre, qué está
probado y qué no.

---

# 1. Por qué hizo falta un script nuevo

`batch-ocr.js` funciona sobre **imágenes de una carpeta**. Esta carta es un PDF,
y `ocr()` de QVAC recibe la ruta de una imagen. Además, este PDF en particular
tiene una forma que rompe el camino directo. Verificado acá con poppler:

```
$ pdfinfo Menu.pdf
Pages:      1
Page size:  619.68 x 6958.08 pts

$ pdffonts Menu.pdf
(ninguna fuente)

$ pdftotext Menu.pdf -  |  wc -c
1

$ pdfimages -list Menu.pdf
page num type  width height  enc   size
   1   0 image  1291  14496  jpeg  4216K
```

Tres cosas de ahí:

1. **Una sola página, 14.496 px de alto.** Pasársela entera al detector es pedir
   memoria para una imagen once veces más alta que ancha, y `magRatio: 1.5` la
   agranda otro 50%.
2. **Cero fuentes, 1 byte de texto extraíble.** No hay atajo: no se puede
   "extraer el texto del PDF" porque no hay texto. Es una foto. **El OCR es
   obligatorio, no una elección de diseño.** Eso es bueno para el track.
3. **Un solo JPEG.** No son 43 páginas; es un scroll exportado a PDF.

---

# 2. Instalación

```
cd C:\hack\qvac-pruebas
npm install pdf-to-img sharp
```

Nada más. `@qvac/sdk` ya lo tienen.

**Si además tienen poppler en el PATH** (`pdftoppm -v` responde), el script lo
detecta solo y ni toca esas dos librerías: poppler recorta la región directamente
del PDF y **nunca carga la página entera en memoria**. En Windows es opcional; en
Mac es `brew install poppler`.

---

# 3. Correrlo

```
node menu-ocr.js ..\muestras\Menu.pdf
```

Otras formas:

```
node menu-ocr.js ..\muestras\Menu.pdf --solo-mosaicos    # ver los recortes, sin gastar modelo
node menu-ocr.js ..\muestras\Menu.pdf --dpi 200          # más resolución si lee mal
node menu-ocr.js ..\muestras\Menu.pdf --alto 1000 --solape 140   # si se queda sin memoria
node menu-ocr.js ..\muestras\Menu.pdf --no-contrast      # si contrastRetry da error
node menu-ocr.js .\carta-foto.jpg                        # también acepta fotos
```

## Las perillas, y cuándo tocar cada una

| Bandera | Default | Cuándo la tocás |
|---|---|---|
| `--dpi` | 150 | Subila a 200 o 300 si lee mal la letra chica. Cuesta tiempo |
| `--alto` | 1400 | Bajala a 1000 o 900 si se queda sin memoria |
| `--solape` | 160 | Subilo si ves renglones cortados al medio |
| `--umbral` | 0.5 | Debajo de esto, el renglón se marca para revisar |
| `--no-contrast` | — | Si `contrastRetry: true` tira error de configuración |
| `--solo-mosaicos` | — | Ver los recortes sin llamar a QVAC. **Corran esto primero** |
| `--factor-plato` / `--factor-categoria` | auto | Solo si el agrupamiento automático sale raro |

---

# 4. Qué hace, paso por paso

```
  PDF
   │
   ├─ 1 · Rasterizar          poppler si está; si no, pdf-to-img
   │
   ├─ 2 · Cortar en mosaicos  1400 px de alto, 160 px de SOLAPE
   │                          (12 mosaicos a 150 dpi con los defaults)
   │
   ├─ 3 · OCR por mosaico     ← idéntico a batch-ocr.js
   │
   ├─ 4 · Remapear            bbox del mosaico → bbox de la página (+offsetY)
   │
   ├─ 5 · Deduplicar          el solape hace que un renglón aparezca 2 veces
   │
   ├─ 6 · Columnas            la carta es a dos columnas
   │
   ├─ 7 · Clasificar          por CUERPO tipográfico: categoría / plato / descripción
   │
   └─ 8 · Agrupar             plato + sus renglones de descripción = un ítem
```

## Por qué el solape no es opcional

Sin solape, un renglón que cae justo en el corte se pierde o se lee partido al
medio. Con solape aparece en dos mosaicos y hay que deduplicar. La tolerancia
de deduplicación es **el solape mismo**, no un número más grande: si fuera más
grande, dos platos que de verdad se llaman igual en secciones distintas
—"CROISSANT" en desayunos y "CROISSANT" en tostados— se fusionarían y perderías
uno. Hay un test para exactamente ese caso.

## Por qué se clasifica por altura y no por el texto

En esta carta **los platos y las descripciones están todos en mayúsculas**. El
texto no los distingue. Lo que los distingue es el cuerpo tipográfico, y eso es
la altura de la caja del renglón.

**La primera versión usaba la mediana de altura como base. Estaba mal y el test
la tumbó:** la mediana de una carta no es la altura de las descripciones, es la
que le toque según cuántos renglones tenga cada plato. En la carta de prueba
había 9 descripciones y 7 nombres y la mediana cayó justo en los nombres — con lo
cual ningún bloque quedaba clasificado como plato y salían **cero ítems**.

La versión que quedó **agrupa** las alturas (k-means en una dimensión, k=3,
determinístico y sin dependencias) y asigna cada renglón al escalón más cercano.
No supone proporciones: busca los escalones que hay, estén donde estén. Y fusiona
escalones que difieren menos de 20%, porque 29,8 y 30,2 no son dos cuerpos, es
ruido del detector.

## Por qué las categorías se manejan en dos niveles

En una carta a dos columnas hay dos clases de título y hay que tratarlas distinto:

- **"DESAYUNOS"** ocupa el ancho de la página y manda sobre **las dos** columnas.
- **"ME TIENDA ESTE TOSTADO"** y **"TORTAS"** son títulos de **una** columna y no
  tienen que pisar lo que pasa al lado.

**La primera versión recorría columna por columna y también estaba mal.** Cuando
terminaba la izquierda, la categoría vigente era la última de abajo de todo, y
con esa arrancaba la derecha: todos los platos de la derecha quedaban bajo la
categoría equivocada. Se ve en un test en dos segundos y no se ve nunca mirando
un JSON de 80 ítems a las 5 de la mañana.

La versión que quedó hace **una sola pasada ordenada por y**, con categoría
global para los títulos de ancho completo, categoría por columna para los de
columna, y un ítem "en curso" por columna para que las descripciones se peguen al
plato de su columna aunque en el medio pase un renglón de la otra.

---

# 5. Lo que devuelve

```
salida-menu/
  menu.json           ← la carta estructurada, para la app
  menu-precios.csv    ← se la mandás al local para que ponga precios
  menu-revisar.csv    ← SOLO lo que el modelo marcó dudoso
  bloques-crudos.json ← renglón por renglón con bbox y confianza — evidencia
  mosaicos/           ← los recortes, por si hay que mirarlos
```

Un ítem de `menu.json`:

```json
{
  "categoria": "QUE TOMAMOS",
  "nombre": "LICUADOS FRUTA A ELECCION",
  "descripcion": "BANANA. FRUTILLA. DURAZNO. MANZANA ELEGILO CON BASE DE LECHE, AGUA O NARANJA.",
  "dieta": [],
  "dietaVerificada": false,
  "opciones": [
    { "tipo": "eleccion", "valores": ["BANANA", "FRUTILLA", "DURAZNO", "MANZANA"], "obligatoria": true },
    { "tipo": "base", "valores": ["LECHE", "AGUA", "NARANJA"], "obligatoria": true }
  ],
  "precio": null,
  "confianzaMinima": 0.83,
  "revisar": false,
  "columna": "der",
  "bboxPagina": { "x0": 700, "y0": 2100, "x1": 1120, "y1": 2130 }
}
```

## Los cuatro campos que importan para el pitch

**`precio: null`** — 🔴 **esta carta no tiene precios. Ninguno.** El OCR no saca
lo que no está. Los pone el local una vez, en `menu-precios.csv`. Eso no es un
parche: es el producto. Lo que cuesta un día de laburo es tipear 80 platos con
sus descripciones, no poner 80 números.

**`opciones`** — lo mejor de la idea, y sale gratis. La carta **ya trae las
opciones escritas en prosa** y nadie las extrae. El script detecta cuatro clases:
`base` ("con base de leche, agua o naranja"), `eleccion` ("fruta a elección"),
`medida` ("500 cc") y `consultar-al-mozo` ("consultá por la tarta del día").

**`dietaVerificada`** — ⚠️ leer esto con atención. Los símbolos de vegano,
vegetariano y sin TACC de la carta son **íconos, no letras**. Un reconocedor de
alfabeto latino **no los lee**. El script solo marca la dieta cuando está escrita
con palabras ("SIN GLUTEN", "APTO CELÍACOS"), y en todos los demás casos deja
`dietaVerificada: false`.

**Eso no se esconde: se muestra.** Acá el costo de equivocarse es que un celíaco
coma gluten. Un sistema que dice "no lo pude verificar" es mejor que uno que
afirma. 🟩 El sponsor lo pide con estas palabras: *"un agente que señala
incertidumbre es mejor que uno que predice un número con demasiada confianza"*.

**`revisar`** — se prende si **cualquier** renglón del ítem (el nombre o
cualquier línea de la descripción) quedó por debajo del umbral. Es la cola de la
pantalla de revisión humana y es el renglón amarillo del video.

---

# 6. Qué está probado y qué no

## ✅ Probado acá, corriendo

- **Rasterizado y mosaico sobre el PDF real.** 12 mosaicos con los defaults, 15
  con `--alto 1200 --solape 200`. Los PNG salen bien.
- **La forma del PDF**, con `pdfinfo` / `pdffonts` / `pdftotext` / `pdfimages`.
- **37 tests de la lógica de estructura**, en `scripts/prueba-estructura.js`,
  todos pasando:

```
$ node prueba-estructura.js
── normalizarBbox ──          7 casos, incluidas las 4 formas de bbox
── deduplicar ──              3 casos, incluido el de los homónimos
── columnas ──                3 casos
── clasificar por cuerpo ──   4 casos
── dieta y opciones ──        7 casos
── armar ítems ──            10 casos
── casos borde ──             3 casos
============================================================
  37 pasaron · 0 fallaron
```

Los bloques del test están calcados de la carta real: dos columnas, tres cuerpos
tipográficos, un renglón repetido a propósito para simular el solape, y un plato
de confianza 0,31 para verificar que se marca.

**Dos de esos tests nacieron de bugs que el propio test encontró** — el de la
mediana y el de la categoría entre columnas, los dos explicados arriba. Sin el
test, los dos llegaban a la hackathon.

## ❌ No probado, y hay que decirlo

- **Nunca corrí `menu-ocr.js` de punta a punta**, porque en esta máquina no hay
  QVAC instalado y la documentación oficial está bloqueada por la red.
- **La forma exacta de `block.bbox`.** No la pude verificar contra la doc.
  `normalizarBbox()` acepta las cuatro formas habituales (4 esquinas,
  `[x0,y0,x1,y1]`, `{x,y,width,height}`, `{left,top,right,bottom}`) y **si no
  reconoce ninguna, el script avisa por consola** en vez de fallar en silencio:

  > ⚠ Ningún bloque trajo bbox reconocible. La reconstrucción por columnas y
  > cuerpo tipográfico no va a funcionar: revisá la forma real de block.bbox en
  > bloques-crudos.json y agregá ese caso a normalizarBbox().

  Si aparece ese aviso: abran `bloques-crudos.json`, miren cómo viene el bbox, y
  agreguen ese caso. Son tres líneas.

## Lo que reduce el riesgo

**La llamada a QVAC es copia textual de su `batch-ocr.js`** — el mismo
`loadModel` con el mismo `modelConfig`, el mismo `ocr({ modelId, image, options })`,
el mismo `await blocks`. No inventé ni un parámetro. Lo único nuevo alrededor es
la capa PDF→mosaicos, que sí probé, y la de estructura, que también.

O sea: **la parte que no pude probar es idéntica a la parte que ustedes ya
probaron.** No es una garantía, pero es lo más cerca que se puede estar.

---

# 7. Si algo sale mal

| Síntoma | Qué es | Qué hacer |
|---|---|---|
| `MODEL_LOAD_FAILED: Unsupported language(s)` | Alguien volvió a poner `langList: ['es']` | Dejarlo en `['en']`. `OCR_LATIN` es alfabeto, no idioma |
| `MODEL_LOAD_FAILED` por configuración | Probablemente `contrastRetry` | `--no-contrast` |
| Se queda sin memoria | Mosaico muy grande | `--alto 900 --solape 120` |
| Lee poquísimos renglones | Resolución baja | `--dpi 200` o `--dpi 300` |
| Renglones cortados al medio | Solape corto | `--solape 250` |
| Sale todo como una categoría gigante | El agrupamiento salió raro | `--factor-plato 1.35 --factor-categoria 2.2` |
| `pdftoppm no generó salida` | poppler roto o a medio instalar | `--rasterizador pdfjs` |
| El aviso de bbox | La forma no está contemplada | Sección 6, tres líneas en `normalizarBbox` |

---

# 8. Lo primero que tienen que hacer

```
cd scripts
npm install pdf-to-img sharp
node prueba-estructura.js                            # 5 segundos, no toca QVAC
node menu-ocr.js ../muestras/Menu.pdf --solo-mosaicos   # 10 segundos, no toca QVAC
node menu-ocr.js ../muestras/Menu.pdf                # el de verdad
```

Los dos primeros no gastan un solo minuto de modelo y les dicen si el andamiaje
está bien. **El tercero es el que decide el proyecto** — el semáforo está en la
sección 10.1 de `00-decision.md`.
