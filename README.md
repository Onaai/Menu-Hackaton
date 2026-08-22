# Carta — la carta de un local, leída sola y sin salir de su máquina

**Aleph Hackathon · agosto 2026 · track QVAC + General**

Un local le saca una foto a la carta que ya tiene y en veinte minutos tiene un
menú que funciona: categorías, platos, descripciones, restricciones de dieta y
opciones de personalización. **Toda la lectura corre en la máquina del local**
—sin nube, sin cuenta, sin internet— y el sistema **marca lo que no pudo leer con
seguridad** en vez de inventarlo.

El comensal escanea el QR de su mesa, ve la carta en su teléfono sin instalar
nada, arma el pedido con sus opciones, y —si es celíaco— filtra la carta y ve de
una qué puede comer.

---

## Por dónde empezar

| Documento | Qué hay adentro |
|---|---|
| **[`docs/00-decision.md`](docs/00-decision.md)** | **Leer primero.** Los tracks de Tether, cuál elegimos y por qué, el alcance, y el plan hora por hora |
| [`docs/01-como-corre-el-ocr.md`](docs/01-como-corre-el-ocr.md) | Cómo correr el OCR sobre el PDF, qué devuelve, y qué está probado y qué no |
| [`docs/contexto/`](docs/contexto/) | Los documentos de trabajo previos, conservados enteros |

---

## Arrancar

```bash
cd scripts
npm install pdf-to-img sharp

node prueba-estructura.js                              # 5 s · no toca QVAC
node menu-ocr.js ../muestras/Menu.pdf --solo-mosaicos  # 10 s · no toca QVAC
node menu-ocr.js ../muestras/Menu.pdf                  # el de verdad
```

Requisitos: **Node ≥ 22.18** y `@qvac/sdk` instalado.
`poppler` es opcional — si `pdftoppm` está en el PATH, el script lo usa y es más
rápido y más liviano de memoria.

---

## Qué hay en el repo

```
docs/
  00-decision.md              decisión de track e idea, alcance, plan de 17 horas
  01-como-corre-el-ocr.md     manual del script de ingesta
  contexto/                   los documentos previos, conservados
muestras/
  Menu.pdf                    la carta real de Tienda de Café (Buenos Aires)
scripts/
  menu-ocr.js                 PDF/foto → menu.json     ← el ingestor
  lib/estructura.js           todo lo que pasa DESPUÉS del OCR (sin QVAC)
  prueba-estructura.js        37 tests de esa lógica    ← corren sin modelo
  batch-ocr.js                el OCR de tickets, conservado
```

---

## La carta de muestra, y por qué es difícil

`muestras/Menu.pdf` es la carta real de un local de Buenos Aires. Verificado con
poppler:

```
Pages:            1
Page size:        619.68 x 6958.08 pts    ← una sola página, altísima
Fuentes:          ninguna                 ← no hay capa de texto
Texto extraíble:  1 byte
Imagen:           1 JPEG de 1291 x 14496 px
```

**Es una foto de 14.496 píxeles de alto, sin una sola letra seleccionable, a dos
columnas, con texto blanco sobre fotos y los símbolos de dieta como íconos.** No
es un PDF limpio elegido a mano: es lo que un local tiene de verdad.

Y **no trae precios** — ninguno. Por eso el OCR extrae la *estructura* y el local
carga los precios una vez en `menu-precios.csv`. Lo que cuesta un día de trabajo
es tipear 80 platos con sus descripciones, no poner 80 números.

---

## Lo que el sistema no afirma

Los íconos de vegano, vegetariano y sin TACC de la carta **son símbolos, no
letras**: un reconocedor de alfabeto latino no los lee. El sistema solo marca una
dieta cuando está **escrita con palabras**, y en todos los demás casos deja
`dietaVerificada: false`.

No lo escondemos: lo mostramos en pantalla. **Acá el costo de equivocarse es que
un celíaco coma gluten**, y un sistema que dice "no lo pude verificar" es mejor
que uno que afirma.
