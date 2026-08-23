# Al Toque

**Aleph Hackathon · agosto 2026 · Tether**

Pedidos por QR para restaurantes. Cada comensal entra desde su mesa, arma su
pedido, sigue el estado en tiempo real y paga lo suyo o toda la mesa — en USD₮,
en efectivo con vuelto, o por Mercado Pago.

Dos piezas de Tether hacen el trabajo pesado:

- **WDK CLI** es el backend de billetera del checkout. No se llama a una
  librería: se hace `spawn` del binario `wdk` y se parsea su `--json`.
  `wdk send --dry-run` → confirmación humana → `wdk send` en Sepolia.
- **QVAC** corre un Qwen3 4B en la máquina del local. No asiste a la carta y
  ya: **opera la billetera**. El encargado escribe en castellano y el modelo
  elige qué comando de WDK CLI usar, lo usa, y contesta con lo que volvió.

Nada de eso sale de la máquina. No hay API key en ningún lado.

---

## 👉 El proyecto está en [`mesa/`](mesa/)

```bash
cd mesa
npm install --allow-scripts=@tetherto/wdk-cli
npm run build
npm start
```

| Pantalla | Quién la usa |
|---|---|
| `http://localhost:3000/mesa/12` | El comensal |
| `http://localhost:3000/cocina` | Cocina y caja — **acá está el agente** |

**Toda la documentación de entrega está en [`mesa/README.md`](mesa/README.md):**
permalinks a las líneas exactas donde se usa cada SDK, modelo y hardware, las
tablas de confiabilidad, y qué está y qué no está verificado.

Node ≥ 22.18.0. La primera corrida baja el modelo (2,5 GB) a `~/.qvac/models`.

---

## Lo que hay que mirar primero

**El agente de caja**, en `/cocina`. Es una sola función del producto que cae en
los dos tracks a la vez: un modelo local de 4B operando una billetera real por
WDK CLI, bajo topes y allowlist, y sin poder transmitir.

```
> ¿cuánto llevamos cobrado hoy?
  1. [ver_caja]  → cobrado hoy $19.690 en 1 pagos · ingresos $17.900 · propinas $1.790
  2. [responder] → "Hoy se ha cobrado un total de $19.690, incluyendo $17.900
                    en ingresos y $1.790 en propinas."
```

**El asistente de la carta.** Marcá *sin gluten* y preguntá "quiero algo
contundente": la burger no puede aparecer. No es un filtro de pantalla — el
`enum` de la gramática GBNF no contiene los ids con gluten, así que **el modelo
no tiene el token para escribirlos**.

**La evidencia.** Dos arneses corren la misma tarea N veces y publican la tabla,
incluidas las fallas que no se pudieron arreglar:

```bash
node scripts/confiabilidad-qvac.mjs QWEN3_4B_INST_Q4_K_M 15
node scripts/confiabilidad-agente.mjs QWEN3_4B_INST_Q4_K_M 10
```

---

## Estructura del repo

```
mesa/       LA APP. Es lo que se entrega.
app/        Version anterior, en JS sin build. Queda como referencia
            historica: no tiene el agente de caja ni el asistente con
            gramatica. No es lo que hay que evaluar.
docs/       Notas de decisiones y del OCR de cartas.
scripts/    Ingesta de cartas por OCR (exploracion previa).
muestras/   Fotos de cartas para esa ingesta.
```

La base de producto y la interfaz vienen de
[`Pipeballes/hackatonfeli2`](https://github.com/Pipeballes/hackatonfeli2), rama
`feature-wdk-cli-wallet-flow`, que es de donde sale la integración con WDK CLI.
Lo que se sumó encima es la inferencia local: el asistente de la carta con
gramática, el agente de caja, los dos arneses de confiabilidad, y los métodos de
pago en efectivo y Mercado Pago.
