# Cómo correrlo en tu máquina

Respuesta a "*¿dónde lo ejecuto, si yo trabajo en `C:\hack` y vos escribís en
GitHub?*". La respuesta corta: **yo escribo en GitHub, vos te lo bajás una vez
con `git clone`, y a partir de ahí trabajás local.**

---

# 1. Bajarlo — se hace una sola vez

Tu `C:\hack` hoy tiene esto:

```
C:\hack
    Hackaton
    Hackaton-2026
    hello-pear-bare
    qvac-pruebas
    ref-portero-core
```

Falta `Menu-Hackaton`, que es donde estoy escribiendo. Abrí una consola y:

```bat
cd C:\hack
git clone https://github.com/Onaai/Menu-Hackaton.git
cd Menu-Hackaton
git checkout claude/hackaton-tether-tracks-m61ebw
```

Te queda `C:\hack\Menu-Hackaton`, al lado de las otras. **No adentro de
`qvac-pruebas`**: son dos cosas distintas y mezclarlas te va a confundir las
rutas. `qvac-pruebas` es donde probás QVAC; `Menu-Hackaton` es la app.

> Si `git clone` te pide usuario y contraseña, es porque el repo es privado.
> Entrá con la cuenta de GitHub que tenga acceso a la organización Onaai.

---

# 2. Correr la app

```bat
cd C:\hack\Menu-Hackaton\app
npm install
npm run dev
```

`npm install` tarda unos veinte segundos la primera vez y no vuelve a tardar.
Lo único que baja es TypeScript: **la app no tiene ni una dependencia de
ejecución.**

Cuando arranca vas a ver esto:

```
  ┌──────────────────────────────────────────────────────────┐
  │  MESA ABIERTA                                            │
  └──────────────────────────────────────────────────────────┘

  Carta (comensal)   http://localhost:3000/
  Cocina             http://localhost:3000/cocina.html
  Billeteras         http://localhost:3000/billeteras.html

  Cotización         1 USDT = $1.480

  Mesa 7 abierta · session_...
    Mesa Abierta · caja     0x...  0,00 USDT
    Sofía                   0x...  200,00 USDT
    Emi                     0x...  12,00 USDT
```

Abrí esas tres direcciones **en tres pestañas distintas** y dejalas abiertas:
se actualizan solas cada 3 o 4 segundos, así que lo que hacés en una lo ves
aparecer en las otras. Eso es la demo.

Para cortarlo: `Ctrl+C`. Los datos están en memoria, así que al cortar se borra
todo y volvés a arrancar limpio.

---

# 3. Probar los scripts de OCR (lo que preguntaste)

**Esos scripts viven en otra carpeta y NO tienen nada que ver con la app.** Son
`Menu-Hackaton\scripts`, y hoy están fuera del camino principal porque decidiste
sacar el OCR. Los dejo porque funcionan y porque el repliegue puede necesitarlos.

```bat
cd C:\hack\Menu-Hackaton\scripts
npm install pdf-to-img sharp

node prueba-estructura.js
node menu-ocr.js ../muestras/Menu.pdf --solo-mosaicos
node menu-ocr.js ../muestras/Menu.pdf
```

Los dos primeros corren en segundos y no tocan QVAC. El tercero necesita
`@qvac/sdk`, que lo tenés en `qvac-pruebas` y no acá — si lo vas a correr, o
copiás `menu-ocr.js` y `lib\` a `C:\hack\qvac-pruebas`, o hacés
`npm install @qvac/sdk` en `scripts`.

---

# 4. Cómo trabajamos los dos sobre el mismo repo

Yo escribo en la rama `claude/hackaton-tether-tracks-m61ebw`. Cada vez que te
diga que subí algo:

```bat
cd C:\hack\Menu-Hackaton
git pull origin claude/hackaton-tether-tracks-m61ebw
```

Si vos también tocaste código y `git pull` se queja, guardá lo tuyo primero:

```bat
git stash
git pull origin claude/hackaton-tether-tracks-m61ebw
git stash pop
```

Y para subir lo tuyo:

```bat
git add -A
git commit -m "lo que hiciste"
git push origin claude/hackaton-tether-tracks-m61ebw
```

---

# 5. El recorrido de la demo, paso a paso

Con las tres pestañas abiertas, hacé esto en orden. Son dos minutos y es
exactamente el guion del video.

## Pestaña **Carta**

1. Arriba dice **Mesa 7** y **Soy: Sofía**. Dejalo así.
2. Tocá **Soy celíaco**. La carta se filtra sola y quedan solo los platos aptos.
   *(Este es el mejor momento del producto. Destildalo para seguir.)*
3. Tocá **Agregar** en la Burger. Se abre el detalle: punto de la carne, sacar
   ingredientes, agregados. Elegí *jugosa*, *sin cebolla*, *panceta*. Mirá cómo
   sube el precio arriba a la derecha. Escribí una nota: "bien caliente".
4. Agregá una **Limonada**, elegí *sin hielo* y *jarra de 1 litro*.
5. **Enviar a cocina**.
6. Cambiá **Soy** a **Emi** y pedí un **Risotto**. Ahora hay dos pedidos de dos
   personas distintas en la misma mesa.

## Pestaña **Cocina**

7. Aparecieron solos. Y —esto es lo importante— **la comanda se partió**: la
   burger y el risotto están en 🔥 Parrilla, la limonada en 🍹 Barra. La barra
   no espera a la parrilla.
8. La burger muestra **sin cebolla · panceta** y la nota **"bien caliente"**.
   El mozo no tuvo que volver a la mesa a preguntar nada.
9. Tocá **Empezar** y después **Listo** en cada línea. Fijate que el tilde ↶
   deshace, por si le diste de más.
10. Dejá pasar unos minutos y mirá el contador de la esquina: a los 5 el ticket
    se pone ámbar, a los 10 rojo. **El reloj lo lleva el servidor**, así que dos
    pantallas de cocina muestran siempre lo mismo.
11. Tocá **Marcar urgente** en uno: salta al primer lugar de su estación.
12. Abrí **Sin stock…** y apagá la Pesca del día. Volvé a la Carta: aparece en
    gris con la cinta **SIN STOCK** y no se puede pedir. En todas las mesas, al
    instante.
13. Poné todo en **Entregado**.

## Pestaña **Carta** otra vez

14. En el panel de la derecha se habilitó **Pedir la cuenta**. Tocalo.
15. Elegí **Cada uno lo suyo**, 10% de propina, la billetera de Sofía.
16. Tocá **Ver el detalle antes de pagar**. Te muestra el total en pesos, el
    equivalente en USDT con la cotización a la vista, la comisión de red, y
    cuánto te queda. **Todavía no se movió nada.**

## Pestaña **Billeteras** (dejala a la vista)

17. Volvé a la Carta y tocá **Confirmar y pagar**.
18. En Billeteras, el saldo de la caja **sube con un destello**, el de Sofía
    baja, y aparece el movimiento en la tabla de abajo.
19. Cambiá a **Emi** en la Carta y pagá lo suyo. **Emi tiene 12 USDT a
    propósito**: si el total supera eso, el sistema dice
    *"Saldo insuficiente en Emi: hacen falta 13,90 USDT y hay 12,00"*. Cargale
    saldo con el botón **+50 USDT** de la pestaña Billeteras y reintentá.
20. Cuando pagaron los dos, la mesa pasa sola a **CLOSED**.

---

# 6. Las billeteras

**Son un libro contable en memoria. No hay blockchain, no hay claves privadas,
no hay frase semilla y no se mueve un centavo real.** Están creadas por código
al arrancar, en `src/config/demo-seed.ts`. Se pueden crear más desde la API o
tocando **+50 USDT** para cargarle saldo a cualquiera.

Las tres que arrancan:

| Billetera | Tipo | Saldo | Para qué está |
|---|---|---|---|
| Mesa Abierta · caja | negocio | 0 USDT | Es donde tiene que llegar la plata. Empieza en cero a propósito: el destello de que sube es la demo |
| Sofía | cliente | 200 USDT | Paga sin problema |
| Emi | cliente | **12 USDT** | **No le alcanza.** Muestra que el sistema frena en vez de dejar saldo negativo |

## Por qué hay una vista previa antes de pagar

No es un adorno de interfaz. En el repo `Onaai/Hackaton-2026` está verificado,
leyendo el código de `@tetherto/wdk-cli@1.0.0-beta.2`, que la herramienta
`send_token` del MCP de WDK tiene un parámetro `dryRun` y que su descripción
dice textualmente:

> *"Always call with dryRun=true first to preview fees and amounts, show the
> preview to the user, and only call again with dryRun=false after user
> confirms."*

Nuestro `WalletLedger.transfer` tiene el **mismo parámetro con el mismo
significado**. Así que el día que se enchufe la billetera real, se escribe un
adaptador que hable con `wdk-mcp` y **no se toca una línea del resto del
sistema**. Esa es toda la gracia de que `WalletLedger` sea una interfaz.

Y hay un detalle que no es cosmético: con `dryRun: true` la respuesta viene con
`payment: undefined`. O sea que **un cliente que se saltee el paso de confirmar
no registra ningún cobro** — lo garantiza el tipo, no una frase amable.

## La comisión

0,5% con piso de 2 centavos, **cobrada en el mismo USDT que se envía**. Eso es
a propósito y es el argumento de los módulos *gasless* de WDK: la razón número
uno por la que la gente abandona una billetera cripto es que le mandan dólares
y no los puede mover porque no tiene la moneda nativa para pagar la comisión.
Acá la comisión sale de los mismos dólares, así que alguien que nunca tocó
cripto paga la cena sin comprar nada antes.

## La cotización

La carta está en pesos porque un restaurante argentino cobra en pesos. Las
billeteras están en USDT. Alguien tiene que convertir y ese alguien tiene que
ser **explícito**: la cotización está en `src/config/cotizacion.ts`, sale en el
arranque del servidor y **se muestra en la pantalla de pago**. Si la interfaz
te mostrara un total en pesos y te descontara USDT sin decir a qué cambio, el
producto no sería creíble.

---

# 7. Las fotos de los platos

Van en `app/public/img/`, con el nombre que figura en `image` de
`src/config/demo-menu.ts` (`burger.jpg`, `limonada.jpg`, etc.).

**Si no están —y hoy no está ninguna— no se rompe nada.** La interfaz dibuja un
SVG generado a partir del nombre del plato: siempre el mismo color para el mismo
nombre, con el ícono de su categoría. No se descarga nada de internet y no hay
un solo recuadro roto.

O sea: **podés grabar el video sin conseguir una sola foto**, y cuando el local
mande las suyas aparecen sin tocar código.

---

# 8. Si algo falla

| Síntoma | Qué es | Qué hacer |
|---|---|---|
| `EADDRINUSE :3000` | Ya hay algo en ese puerto | `set PORT=3100` y `npm run dev` |
| `npm install` no baja nada | Sin red o proxy | Probá `npm ping` |
| La carta dice "No hay ninguna mesa abierta" | El servidor se reinició | Recargá: la semilla crea la mesa 7 en cada arranque |
| "Todavía hay pedidos sin entregar" | Falta despachar en cocina | Poné todas las líneas en Entregado |
| "Primero se debe solicitar la cuenta" | Falta apretar *Pedir la cuenta* | Es el orden correcto, no un bug |
| Cambiaste un `.ts` y no se ve | Falta compilar | `npm run dev` compila y arranca de nuevo |
| Querés empezar de cero | Todo está en memoria | `Ctrl+C` y `npm run dev` |

---

# 9. Qué está probado

```
$ npm test
# tests 25
# pass 25
# fail 0
```

Y además recorrí el flujo entero contra el servidor con `curl`, no solo los
tests. Lo verificado, corriendo:

- La comanda **se parte por estación**: burger y risotto a Parrilla, limonada a
  Barra, en el mismo pedido.
- Las opciones y la nota **llegan escritas a la cocina**.
- El precio con opciones da bien: burger $17.900 + panceta $2.800 = **$20.700**.
- El semáforo de demora cambia con el reloj del servidor (verde → ámbar a los 5
  → rojo a los 10).
- Lo urgente **pasa al frente** aunque sea más nuevo.
- Una línea cancelada **sale del tablero y no se cobra**.
- Marcar sin stock **saca el plato de la carta y rechaza el pedido**.
- `dryRun` calcula todo y **no mueve un centavo** (verificado mirando los saldos
  antes y después).
- Confirmado, la plata **llega a la caja**: 0 → 24,01 → 37,84 USDT.
- Saldo insuficiente **falla con 409** y no deja cobro a medias.
- La mesa **se cierra sola** cuando pagaron todos los que consumieron.
- Las tres pantallas se sirven bien y `/../../etc/passwd` devuelve **404**.

# 10. Qué NO está probado

- **No lo abrí en un navegador.** Esta máquina no tiene interfaz gráfica, así
  que la lógica la verifiqué por HTTP con `curl` pero **el HTML y el CSS no los
  vi renderizados**. Si algo se ve corrido, es ahí.
- **No hay pagos reales.** Ninguna línea de este código habla con una
  blockchain, con WDK ni con ninguna red. Es un libro contable en memoria.
- **No hay persistencia.** Al cortar el servidor se borra todo.
- **No hay autenticación.** Cualquiera que abra `/cocina.html` puede cancelar
  platos. Para la demo está bien; para producción no.
