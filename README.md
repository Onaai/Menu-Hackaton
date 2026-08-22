# Mesa Abierta

**Aleph Hackathon · agosto 2026**

Pedidos por QR para restaurantes. Cada persona de la mesa ve la carta en su
teléfono, arma su pedido con las opciones que quiera, y la cocina lo recibe
partido por estación. Al final se paga junto o por separado, desde una
billetera, y la plata llega a la caja del local.

```bat
cd app
npm install
npm run dev
```

→ **[`docs/02-como-correrlo.md`](docs/02-como-correrlo.md)** tiene el paso a
paso completo, incluido cómo bajarlo a `C:\hack` y el recorrido de la demo.

---

## Las tres pantallas

| | |
|---|---|
| **`/`** · Carta | Lo que ve el comensal. Platos con foto, filtro de dieta, personalización, carrito, cuenta y pago |
| **`/cocina.html`** · Cocina | El tablero de la cocina. Por estación, con demora, urgencias y sin stock |
| **`/billeteras.html`** · Billeteras | Los saldos y los movimientos. Se ve llegar la plata a la caja |

Abrilas en tres pestañas y dejalas: se actualizan solas, así que lo que hacés en
una aparece en las otras. Eso es la demo.

---

## Lo que hace, y por qué está hecho así

### La cocina no es una lista de pedidos

- **Se parte por estación.** La barra arranca la limonada mientras la parrilla
  hace la burger. Ninguna espera a la otra. Sin esto, una cocina real no usa el
  sistema.
- **El estado va por línea, no por comanda.** Un plato puede estar listo y otro
  del mismo pedido todavía no. El estado de la comanda **se deduce** de sus
  líneas — nunca se guardan los dos por separado, porque tarde o temprano dirían
  cosas distintas y la mesa vería "listo" mientras la cocina ve "pendiente".
- **La demora la cuenta el servidor**, no el navegador, así que dos pantallas de
  cocina muestran siempre lo mismo. Verde hasta 5 minutos, ámbar hasta 10, rojo
  después.
- **Se puede deshacer.** En una cocina real alguien toca el botón de más.
- **Se puede cancelar un plato**, y entonces no se cobra.
- **Sin stock en un toque**: se acabó el salmón y desaparece de la carta de
  todas las mesas al instante.
- **Urgente** sube el ticket al tope de su estación.

### La carta es por plato, con foto

Cada producto tiene imagen, descripción, etiquetas de dieta, estación y sus
opciones de personalización: el punto de la carne, sacar la cebolla, la
limonada sin hielo y en jarra. **Todo eso llega escrito a la cocina**, que es el
punto: el mozo no vuelve a la mesa a preguntar.

**Las fotos no hacen falta para que se vea bien.** Si el archivo no está, la
interfaz dibuja un placeholder generado a partir del nombre del plato. No se
descarga nada de internet y no hay recuadros rotos.

Y el filtro de dieta está arriba de todo y no escondido en un menú: **un celíaco
no tiene que preguntarle a nadie.**

### El pago muestra el detalle antes de mover un centavo

No es un adorno. Verificado leyendo el código de `@tetherto/wdk-cli@1.0.0-beta.2`
(ver `Onaai/Hackaton-2026`), la herramienta `send_token` del MCP de WDK tiene un
parámetro `dryRun` cuya descripción dice textualmente que hay que llamar primero
con `dryRun=true`, mostrarle la vista previa a la persona, y recién después
confirmar.

`WalletLedger.transfer` tiene **el mismo parámetro con el mismo significado**, y
con `dryRun: true` la respuesta viene sin cobro registrado — o sea que saltearse
la confirmación no cobra, y lo garantiza el tipo, no una frase amable.

La comisión es 0,5% **cobrada en el mismo USDT que se envía**: es el argumento
de los módulos *gasless* de WDK, y significa que alguien que nunca tocó cripto
paga la cena sin comprar nada antes.

> ⚠️ **No hay pagos reales.** Es un libro contable en memoria: sin blockchain,
> sin claves, sin frase semilla. Está escrito con la forma del MCP de WDK para
> que reemplazarlo sea cambiar el adaptador y nada más.

---

## El repo

```
app/                       la aplicación
  src/domain/              modelo y reglas. No sabe de HTTP ni de almacenamiento
  src/application/         casos de uso + los puertos (WalletLedger, MenuCatalog…)
  src/infrastructure/      los adaptadores en memoria
  src/config/              carta, billeteras de la demo, cotización
  src/api/                 HTTP y servidor de archivos
  public/                  las tres pantallas. Sin framework, sin build
  tests/                   25 tests, corren con node:test

scripts/                   ingesta de cartas con OCR (fuera del camino principal)
muestras/Menu.pdf          la carta real de Tienda de Café
docs/                      decisión de track, manual del OCR, cómo correrlo
docs/contexto/             los documentos de trabajo previos, enteros
```

La arquitectura sale del motor de
[`Pipeballes/hackatonfeli2`](https://github.com/Pipeballes/hackatonfeli2) —
mismo dominio, mismos puertos, mismo `DomainError`, misma convención de
centavos, mismo `tsconfig` estricto. Lo que se agregó: la interfaz (que ese
README listaba como *PROPUESTO*), la cocina por estación con estado por línea,
las opciones de personalización, y las billeteras.

---

## Probado

```
$ cd app && npm test
# tests 25 · pass 25 · fail 0
```

Además del suite, el flujo completo está recorrido contra el servidor con
`curl`: pedido con opciones → partido por estación → despacho → cuenta →
vista previa → pago → la caja pasa de 0 a 37,84 USDT → mesa cerrada. El detalle
de qué se verificó y **qué no** está en
[`docs/02-como-correrlo.md`](docs/02-como-correrlo.md), secciones 9 y 10.

Lo principal que **no** está probado: no abrí las pantallas en un navegador
—esta máquina no tiene interfaz gráfica—, así que la lógica está verificada por
HTTP pero el HTML y el CSS no los vi renderizados.
