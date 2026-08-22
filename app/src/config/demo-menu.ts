import type { MenuItem } from "../domain/model.js";

/**
 * Carta de demostración.
 *
 * Todos los importes van en CENTAVOS DE PESO para evitar errores de punto
 * flotante — 1_380_000 son $13.800. Es la misma convención del motor original.
 *
 * Cada producto trae, además del nombre y el precio:
 *
 *   station     → en qué pantalla de cocina aparece. Es lo que permite que la
 *                 barra arranque la limonada mientras la parrilla hace la burger.
 *   prepMinutes → alimenta el semáforo de demora de la cocina.
 *   image       → foto en /public/img. Si el archivo no está, la interfaz dibuja
 *                 un placeholder generado a partir del nombre. Nunca hay un
 *                 recuadro roto.
 *   options     → personalización. Esto es lo que evita que el mozo tenga que
 *                 volver a la mesa a preguntar "¿con hielo?".
 */
export const demoMenu: MenuItem[] = [
  {
    id: "burrata",
    name: "Burrata de estación",
    description: "Tomates asados, pesto de albahaca y focaccia",
    category: "Para empezar",
    priceInCents: 1_380_000,
    available: true,
    station: "FRIOS",
    prepMinutes: 6,
    image: "img/burrata.jpg",
    diet: ["vegetariano"],
    options: [
      {
        id: "burrata-pan",
        label: "Pan",
        kind: "unica",
        required: true,
        choices: [
          { id: "focaccia", label: "Focaccia", priceDeltaInCents: 0, byDefault: true },
          { id: "sin-tacc", label: "Pan sin TACC", priceDeltaInCents: 120_000 },
          { id: "sin-pan", label: "Sin pan", priceDeltaInCents: 0 },
        ],
      },
    ],
  },
  {
    id: "papas-bravas",
    name: "Papas bravas",
    description: "Alioli ahumado, salsa brava y verdeo",
    category: "Para empezar",
    priceInCents: 890_000,
    available: true,
    station: "PARRILLA",
    prepMinutes: 9,
    image: "img/papas-bravas.jpg",
    diet: ["vegetariano"],
    options: [
      {
        id: "papas-sacar",
        label: "Sacar ingredientes",
        kind: "multiple",
        required: false,
        choices: [
          { id: "sin-alioli", label: "Sin alioli", priceDeltaInCents: 0 },
          { id: "sin-brava", label: "Sin salsa brava", priceDeltaInCents: 0 },
          { id: "sin-verdeo", label: "Sin verdeo", priceDeltaInCents: 0 },
        ],
      },
    ],
  },
  {
    id: "burger",
    name: "Burger de la casa",
    description: "Doble carne, cheddar, cebolla y papas rústicas",
    category: "Principales",
    priceInCents: 1_790_000,
    available: true,
    station: "PARRILLA",
    prepMinutes: 14,
    image: "img/burger.jpg",
    options: [
      {
        id: "burger-punto",
        label: "Punto de la carne",
        kind: "unica",
        required: true,
        choices: [
          { id: "jugosa", label: "Jugosa", priceDeltaInCents: 0 },
          { id: "a-punto", label: "A punto", priceDeltaInCents: 0, byDefault: true },
          { id: "cocida", label: "Bien cocida", priceDeltaInCents: 0 },
        ],
      },
      {
        id: "burger-sacar",
        label: "Sacar ingredientes",
        kind: "multiple",
        required: false,
        choices: [
          { id: "sin-cebolla", label: "Sin cebolla", priceDeltaInCents: 0 },
          { id: "sin-cheddar", label: "Sin cheddar", priceDeltaInCents: 0 },
          { id: "sin-pepinillo", label: "Sin pepinillos", priceDeltaInCents: 0 },
        ],
      },
      {
        id: "burger-extra",
        label: "Agregar",
        kind: "multiple",
        required: false,
        choices: [
          { id: "extra-medallon", label: "Medallón extra", priceDeltaInCents: 450_000 },
          { id: "extra-panceta", label: "Panceta", priceDeltaInCents: 280_000 },
        ],
      },
    ],
  },
  {
    id: "risotto",
    name: "Risotto de hongos",
    description: "Portobellos, parmesano y aceite de trufas",
    category: "Principales",
    priceInCents: 1_860_000,
    available: true,
    station: "PARRILLA",
    prepMinutes: 18,
    image: "img/risotto.jpg",
    diet: ["vegetariano", "sin-gluten"],
  },
  {
    id: "pesca",
    name: "Pesca del día",
    description: "Puré de coliflor, limón quemado y alcaparras",
    category: "Principales",
    priceInCents: 2_240_000,
    available: true,
    station: "PARRILLA",
    prepMinutes: 16,
    image: "img/pesca.jpg",
    diet: ["sin-gluten"],
  },
  {
    id: "volcan",
    name: "Volcán de chocolate",
    description: "Centro tibio, helado de crema y sal marina",
    category: "Postres",
    priceInCents: 970_000,
    available: true,
    station: "POSTRES",
    prepMinutes: 8,
    image: "img/volcan.jpg",
    diet: ["vegetariano"],
  },
  {
    id: "gin-citrico",
    name: "Gin cítrico",
    description: "Gin, pomelo, romero y tónica",
    category: "Bebidas",
    priceInCents: 940_000,
    available: true,
    station: "BARRA",
    prepMinutes: 4,
    image: "img/gin-citrico.jpg",
    options: [
      {
        id: "gin-hielo",
        label: "Hielo",
        kind: "unica",
        required: true,
        choices: [
          { id: "con-hielo", label: "Con hielo", priceDeltaInCents: 0, byDefault: true },
          { id: "poco-hielo", label: "Poco hielo", priceDeltaInCents: 0 },
          { id: "sin-hielo", label: "Sin hielo", priceDeltaInCents: 0 },
        ],
      },
    ],
  },
  {
    id: "limonada",
    name: "Limonada de menta",
    description: "Limón, menta fresca y jengibre",
    category: "Bebidas",
    priceInCents: 520_000,
    available: true,
    station: "BARRA",
    prepMinutes: 3,
    image: "img/limonada.jpg",
    diet: ["vegano", "sin-gluten"],
    options: [
      {
        id: "limonada-hielo",
        label: "Hielo",
        kind: "unica",
        required: true,
        choices: [
          { id: "con-hielo", label: "Con hielo", priceDeltaInCents: 0, byDefault: true },
          { id: "sin-hielo", label: "Sin hielo", priceDeltaInCents: 0 },
        ],
      },
      {
        id: "limonada-tamano",
        label: "Tamaño",
        kind: "unica",
        required: true,
        choices: [
          { id: "vaso", label: "Vaso 350 cc", priceDeltaInCents: 0, byDefault: true },
          { id: "jarra", label: "Jarra 1 litro", priceDeltaInCents: 640_000 },
        ],
      },
    ],
  },
];
