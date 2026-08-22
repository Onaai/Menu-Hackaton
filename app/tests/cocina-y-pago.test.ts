import assert from "node:assert/strict";
import test from "node:test";
import { RestaurantService } from "../src/application/restaurant-service.js";
import { InMemoryMenuCatalog, InMemorySessionRepository } from "../src/infrastructure/in-memory.js";
import { InMemoryWalletLedger } from "../src/infrastructure/wallet-ledger.js";
import { demoMenu } from "../src/config/demo-menu.js";
import { DomainError } from "../src/domain/errors.js";
import { arsCentsToUsdtCents } from "../src/config/cotizacion.js";

/** Reloj movible: hace falta para probar el semáforo de demora de la cocina. */
class RelojFalso {
  constructor(private t = new Date("2026-08-22T21:00:00.000Z")) {}
  now() { return new Date(this.t); }
  avanzarMinutos(m: number) { this.t = new Date(this.t.getTime() + m * 60_000); }
}

function armar() {
  let n = 0;
  const clock = new RelojFalso();
  const ids = { next: (p: string) => `${p}_${++n}` };
  const wallets = new InMemoryWalletLedger(clock, ids);
  const menu = new InMemoryMenuCatalog(demoMenu);
  const service = new RestaurantService(new InMemorySessionRepository(), menu, clock, ids, wallets);
  return { service, wallets, clock, menu };
}

async function mesaConDosComensales(service: RestaurantService, wallets: InMemoryWalletLedger) {
  const caja = await wallets.create({ label: "Caja", kind: "BUSINESS", initialBalanceInCents: 0 });
  const wSofia = await wallets.create({ label: "Sofía", kind: "CLIENT", initialBalanceInCents: 20_000 });
  const wEmi = await wallets.create({ label: "Emi", kind: "CLIENT", initialBalanceInCents: 1_200 });
  const mesa = await service.openTable(7);
  const sofia = await service.joinTable(mesa.id, "Sofía", wSofia.id);
  const emi = await service.joinTable(mesa.id, "Emi", wEmi.id);
  return { caja, wSofia, wEmi, mesa, sofia, emi };
}

// ── Opciones ────────────────────────────────────────────────────────────────

test("las opciones cambian el precio y llegan escritas a la cocina", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia } = await mesaConDosComensales(service, wallets);

  const orden = await service.placeOrder(mesa.id, {
    dinerId: sofia.id,
    items: [{ menuItemId: "limonada", quantity: 1, choiceIds: ["sin-hielo", "jarra"] }],
  });

  const linea = orden.items[0]!;
  // 520.000 base + 640.000 de la jarra
  assert.equal(linea.unitPriceInCents, 1_160_000);
  assert.deepEqual(linea.choices, ["Hielo: Sin hielo", "Tamaño: Jarra 1 litro"]);
  assert.equal(linea.station, "BARRA");
  assert.equal(linea.status, "PENDING");
});

test("una opción única no admite dos valores a la vez", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia } = await mesaConDosComensales(service, wallets);

  await assert.rejects(
    () => service.placeOrder(mesa.id, {
      dinerId: sofia.id,
      items: [{ menuItemId: "limonada", quantity: 1, choiceIds: ["con-hielo", "sin-hielo"] }],
    }),
    (e: unknown) => e instanceof DomainError && e.code === "VALIDATION_ERROR",
  );
});

test("una opción que no pertenece al producto es un error, no se ignora", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia } = await mesaConDosComensales(service, wallets);

  await assert.rejects(
    () => service.placeOrder(mesa.id, {
      dinerId: sofia.id,
      items: [{ menuItemId: "limonada", quantity: 1, choiceIds: ["extra-panceta"] }],
    }),
    (e: unknown) => e instanceof DomainError && e.code === "VALIDATION_ERROR",
  );
});

test("si no se elige nada, se aplica la opción marcada por defecto", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia } = await mesaConDosComensales(service, wallets);
  const orden = await service.placeOrder(mesa.id, { dinerId: sofia.id, items: [{ menuItemId: "burger", quantity: 1 }] });
  assert.ok(orden.items[0]!.choices?.includes("Punto de la carne: A punto"));
});

// ── Cocina ──────────────────────────────────────────────────────────────────

const mesaDe = (b: Awaited<ReturnType<RestaurantService["getKitchenBoard"]>>, n: number) =>
  b.tickets.find((t) => t.tableNumber === n);

test("el tablero agrupa por MESA, no por estación", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia, emi } = await mesaConDosComensales(service, wallets);
  await service.placeOrder(mesa.id, {
    dinerId: sofia.id,
    items: [{ menuItemId: "burger", quantity: 1 }, { menuItemId: "limonada", quantity: 2 }],
  });
  await service.placeOrder(mesa.id, { dinerId: emi.id, items: [{ menuItemId: "risotto", quantity: 1 }] });

  const board = await service.getKitchenBoard();

  // Un solo ticket, aunque haya tres platos de tres estaciones distintas.
  assert.equal(board.tickets.length, 1);
  const ticket = board.tickets[0]!;
  assert.equal(ticket.tableNumber, 7);
  assert.equal(ticket.pedidos.length, 2, "los dos comensales van adentro del mismo ticket");
  assert.equal(ticket.totalPlatos, 4, "1 burger + 2 limonadas + 1 risotto");
  assert.deepEqual(ticket.pedidos.map((p) => p.dinerName), ["Sofía", "Emi"]);
  assert.equal(board.summary.mesas, 1);
  assert.equal(board.summary.platos, 4);
});

test("dos mesas son dos tickets, y manda la que más espera", async () => {
  const { service, wallets, clock } = armar();
  const { mesa, sofia } = await mesaConDosComensales(service, wallets);
  await service.placeOrder(mesa.id, { dinerId: sofia.id, items: [{ menuItemId: "burger", quantity: 1 }] });

  clock.avanzarMinutos(4);
  const mesa9 = await service.openTable(9);
  const juan = await service.joinTable(mesa9.id, "Juan");
  await service.placeOrder(mesa9.id, { dinerId: juan.id, items: [{ menuItemId: "limonada", quantity: 1 }] });

  const board = await service.getKitchenBoard();
  assert.equal(board.tickets.length, 2);
  assert.equal(board.tickets[0]!.tableNumber, 7, "la mesa 7 espera hace más");
});

test("el cronómetro cuenta desde el pedido pendiente más viejo de la mesa", async () => {
  const { service, wallets, clock } = armar();
  const { mesa, sofia, emi } = await mesaConDosComensales(service, wallets);
  await service.placeOrder(mesa.id, { dinerId: sofia.id, items: [{ menuItemId: "burger", quantity: 1 }] });
  clock.avanzarMinutos(7);
  await service.placeOrder(mesa.id, { dinerId: emi.id, items: [{ menuItemId: "limonada", quantity: 1 }] });

  const ticket = mesaDe(await service.getKitchenBoard(), 7)!;
  assert.equal(ticket.esperaSegundos, 420, "7 minutos: el del pedido viejo, no el del nuevo");
  assert.equal(ticket.pedidos[1]!.esperaSegundos, 0, "cada pedido igual trae el suyo");
});

test("el semáforo cambia con el reloj del servidor", async () => {
  const { service, wallets, clock } = armar();
  const { mesa, sofia } = await mesaConDosComensales(service, wallets);
  await service.placeOrder(mesa.id, { dinerId: sofia.id, items: [{ menuItemId: "burger", quantity: 1 }] });

  assert.equal(mesaDe(await service.getKitchenBoard(), 7)!.urgencia, "verde");
  clock.avanzarMinutos(6);
  assert.equal(mesaDe(await service.getKitchenBoard(), 7)!.urgencia, "ambar");
  clock.avanzarMinutos(6);
  const ticket = mesaDe(await service.getKitchenBoard(), 7)!;
  assert.equal(ticket.urgencia, "rojo");
  assert.equal(ticket.esperaSegundos, 720);
});

test("lo urgente sube al tope aunque espere menos", async () => {
  const { service, wallets, clock } = armar();
  const { mesa, sofia } = await mesaConDosComensales(service, wallets);
  await service.placeOrder(mesa.id, { dinerId: sofia.id, items: [{ menuItemId: "burger", quantity: 1 }] });

  clock.avanzarMinutos(5);
  const mesa9 = await service.openTable(9);
  const juan = await service.joinTable(mesa9.id, "Juan");
  const nuevo = await service.placeOrder(mesa9.id, { dinerId: juan.id, items: [{ menuItemId: "limonada", quantity: 1 }] });

  assert.equal((await service.getKitchenBoard()).tickets[0]!.tableNumber, 7);
  await service.rushOrder(nuevo.id, true);
  const board = await service.getKitchenBoard();
  assert.equal(board.tickets[0]!.tableNumber, 9);
  assert.equal(board.tickets[0]!.urgencia, "rojo");
  assert.equal(board.summary.urgentes, 1);
});

test("entregar una línea la saca del ticket", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia } = await mesaConDosComensales(service, wallets);
  const orden = await service.placeOrder(mesa.id, {
    dinerId: sofia.id,
    items: [{ menuItemId: "burger", quantity: 1 }, { menuItemId: "limonada", quantity: 1 }],
  });

  await service.entregarLinea(orden.id, 1);
  const ticket = mesaDe(await service.getKitchenBoard(), 7)!;
  assert.equal(ticket.totalPlatos, 1);
  assert.deepEqual(ticket.pedidos[0]!.lines.map((l) => l.name), ["Burger de la casa"]);
});

test("entregar sin pasar por los estados intermedios es válido", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia } = await mesaConDosComensales(service, wallets);
  const orden = await service.placeOrder(mesa.id, { dinerId: sofia.id, items: [{ menuItemId: "burger", quantity: 1 }] });

  // En un café nadie toca "empezar" y después "listo": sale y se entrega.
  const actualizado = await service.entregarLinea(orden.id, 0);
  assert.equal(actualizado.items[0]!.status, "DELIVERED");
  assert.equal(actualizado.status, "DELIVERED");
});

test("no se puede entregar dos veces la misma línea", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia } = await mesaConDosComensales(service, wallets);
  const orden = await service.placeOrder(mesa.id, { dinerId: sofia.id, items: [{ menuItemId: "burger", quantity: 1 }] });
  await service.entregarLinea(orden.id, 0);
  await assert.rejects(
    () => service.entregarLinea(orden.id, 0),
    (e: unknown) => e instanceof DomainError && e.code === "INVALID_STATE",
  );
});

test("entregar la mesa entera vacía el ticket de una", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia, emi } = await mesaConDosComensales(service, wallets);
  await service.placeOrder(mesa.id, { dinerId: sofia.id, items: [{ menuItemId: "burger", quantity: 1 }] });
  await service.placeOrder(mesa.id, { dinerId: emi.id, items: [{ menuItemId: "limonada", quantity: 2 }] });

  await service.entregarMesa(mesa.id);

  assert.equal((await service.getKitchenBoard()).tickets.length, 0);
  const sesion = await service.getTable(mesa.id);
  assert.ok(sesion.orders.every((o) => o.status === "DELIVERED"));
});

test("entregar una mesa sin nada pendiente es un error", async () => {
  const { service, wallets } = armar();
  const { mesa } = await mesaConDosComensales(service, wallets);
  await assert.rejects(
    () => service.entregarMesa(mesa.id),
    (e: unknown) => e instanceof DomainError && e.code === "INVALID_STATE",
  );
});

test("una línea cancelada no se cobra y sale del ticket", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia } = await mesaConDosComensales(service, wallets);
  const orden = await service.placeOrder(mesa.id, {
    dinerId: sofia.id,
    items: [{ menuItemId: "burger", quantity: 1 }, { menuItemId: "limonada", quantity: 1 }],
  });

  const antes = await service.getBill(mesa.id, 0);
  await service.cancelLine(orden.id, 1);
  const despues = await service.getBill(mesa.id, 0);

  assert.equal(antes.subtotalInCents - despues.subtotalInCents, 520_000);
  assert.equal(mesaDe(await service.getKitchenBoard(), 7)!.totalPlatos, 1);
});

test("marcar sin stock saca el producto de la carta y bloquea el pedido", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia } = await mesaConDosComensales(service, wallets);

  await service.setMenuAvailability("pesca", false);
  const carta = await service.listMenu();
  assert.equal(carta.find((i) => i.id === "pesca")?.available, false);

  await assert.rejects(
    () => service.placeOrder(mesa.id, { dinerId: sofia.id, items: [{ menuItemId: "pesca", quantity: 1 }] }),
    (e: unknown) => e instanceof DomainError && e.code === "CONFLICT",
  );
});

// ── Pago con billetera ──────────────────────────────────────────────────────

async function mesaListaParaPagar(service: RestaurantService, wallets: InMemoryWalletLedger) {
  const ctx = await mesaConDosComensales(service, wallets);
  await service.placeOrder(ctx.mesa.id, { dinerId: ctx.sofia.id, items: [{ menuItemId: "limonada", quantity: 1 }] });
  await service.placeOrder(ctx.mesa.id, { dinerId: ctx.emi.id, items: [{ menuItemId: "limonada", quantity: 1 }] });
  await service.entregarMesa(ctx.mesa.id);
  await service.requestBill(ctx.mesa.id, true);
  return ctx;
}

test("la vista previa del pago no mueve un centavo", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia, wSofia, caja } = await mesaListaParaPagar(service, wallets);

  const r = await service.payWithWallet(mesa.id, { mode: "INDIVIDUAL", tipPercent: 10, dinerId: sofia.id, dryRun: true });

  assert.equal(r.preview, true);
  assert.equal(r.payment, undefined, "sin confirmar no hay cobro registrado");
  assert.equal(r.arsTotalInCents, 520_000 + 52_000);
  assert.equal(r.usdtTotalInCents, arsCentsToUsdtCents(572_000));
  assert.equal((await wallets.getById(wSofia.id))?.balanceInCents, 20_000);
  assert.equal((await wallets.getById(caja.id))?.balanceInCents, 0);
  assert.equal((await service.getTable(mesa.id)).payments.length, 0);
});

test("confirmado, la plata llega a la caja del negocio", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia, wSofia, caja } = await mesaListaParaPagar(service, wallets);

  const r = await service.payWithWallet(mesa.id, { mode: "INDIVIDUAL", tipPercent: 10, dinerId: sofia.id, dryRun: false });

  assert.equal(r.preview, false);
  assert.ok(r.payment);
  assert.equal(r.payment!.transferId, r.transfer.id);
  assert.equal((await wallets.getById(caja.id))?.balanceInCents, r.usdtTotalInCents);
  assert.equal((await wallets.getById(wSofia.id))?.balanceInCents, 20_000 - r.transfer.debitedInCents);
});

test("la mesa se cierra sola cuando pagaron todos los que consumieron", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia, emi } = await mesaListaParaPagar(service, wallets);

  await service.payWithWallet(mesa.id, { mode: "INDIVIDUAL", tipPercent: 0, dinerId: sofia.id, dryRun: false });
  assert.equal((await service.getTable(mesa.id)).status, "BILL_REQUESTED", "falta uno");

  await service.payWithWallet(mesa.id, { mode: "INDIVIDUAL", tipPercent: 0, dinerId: emi.id, dryRun: false });
  assert.equal((await service.getTable(mesa.id)).status, "CLOSED");
});

test("si no alcanza el saldo, el pago falla y no queda cobro a medias", async () => {
  const { service, wallets } = armar();
  const { mesa, wEmi, caja } = await mesaListaParaPagar(service, wallets);

  // Emi tiene 12 USDT; pagar la mesa entera cuesta más.
  await assert.rejects(
    () => service.payWithWallet(mesa.id, { mode: "TABLE", tipPercent: 100, walletId: wEmi.id, dryRun: false }),
    (e: unknown) => e instanceof DomainError && e.code === "CONFLICT",
  );

  assert.equal((await wallets.getById(caja.id))?.balanceInCents, 0);
  assert.equal((await service.getTable(mesa.id)).payments.length, 0);
  assert.equal((await service.getTable(mesa.id)).status, "BILL_REQUESTED");
});

test("no se puede pagar antes de pedir la cuenta", async () => {
  const { service, wallets } = armar();
  const ctx = await mesaConDosComensales(service, wallets);
  await service.placeOrder(ctx.mesa.id, { dinerId: ctx.sofia.id, items: [{ menuItemId: "limonada", quantity: 1 }] });

  await assert.rejects(
    () => service.payWithWallet(ctx.mesa.id, { mode: "TABLE", tipPercent: 0, walletId: ctx.wSofia.id, dryRun: false }),
    (e: unknown) => e instanceof DomainError && e.code === "INVALID_STATE",
  );
});

test("no se pueden mezclar las dos formas de dividir en la misma cuenta", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia, wSofia } = await mesaListaParaPagar(service, wallets);

  await service.payWithWallet(mesa.id, { mode: "INDIVIDUAL", tipPercent: 0, dinerId: sofia.id, dryRun: false });
  await assert.rejects(
    () => service.payWithWallet(mesa.id, { mode: "TABLE", tipPercent: 0, walletId: wSofia.id, dryRun: false }),
    (e: unknown) => e instanceof DomainError && e.code === "CONFLICT",
  );
});
