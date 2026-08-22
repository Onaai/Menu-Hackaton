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

test("el tablero separa por estación: la barra no espera a la parrilla", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia } = await mesaConDosComensales(service, wallets);
  await service.placeOrder(mesa.id, {
    dinerId: sofia.id,
    items: [{ menuItemId: "burger", quantity: 1 }, { menuItemId: "limonada", quantity: 2 }],
  });

  const board = await service.getKitchenBoard();
  const parrilla = board.stations.find((s) => s.station === "PARRILLA")!;
  const barra = board.stations.find((s) => s.station === "BARRA")!;

  assert.equal(parrilla.tickets.length, 1);
  assert.equal(parrilla.tickets[0]!.lines.length, 1);
  assert.equal(parrilla.tickets[0]!.lines[0]!.name, "Burger de la casa");
  assert.equal(barra.pending, 2); // dos limonadas
  assert.equal(barra.tickets[0]!.lines[0]!.name, "Limonada de menta");
});

test("el semáforo de demora cambia con el reloj del servidor", async () => {
  const { service, wallets, clock } = armar();
  const { mesa, sofia } = await mesaConDosComensales(service, wallets);
  await service.placeOrder(mesa.id, { dinerId: sofia.id, items: [{ menuItemId: "burger", quantity: 1 }] });

  assert.equal((await service.getKitchenBoard()).stations.find((s) => s.station === "PARRILLA")!.tickets[0]!.urgency, "verde");
  clock.avanzarMinutos(6);
  assert.equal((await service.getKitchenBoard()).stations.find((s) => s.station === "PARRILLA")!.tickets[0]!.urgency, "ambar");
  clock.avanzarMinutos(6);
  const rojo = (await service.getKitchenBoard()).stations.find((s) => s.station === "PARRILLA")!.tickets[0]!;
  assert.equal(rojo.urgency, "rojo");
  assert.equal(rojo.ageMinutes, 12);
});

test("lo marcado urgente sube al tope de la lista aunque sea más nuevo", async () => {
  const { service, wallets, clock } = armar();
  const { mesa, sofia, emi } = await mesaConDosComensales(service, wallets);
  await service.placeOrder(mesa.id, { dinerId: sofia.id, items: [{ menuItemId: "burger", quantity: 1 }] });
  clock.avanzarMinutos(3);
  const segunda = await service.placeOrder(mesa.id, { dinerId: emi.id, items: [{ menuItemId: "risotto", quantity: 1 }] });

  let parrilla = (await service.getKitchenBoard()).stations.find((s) => s.station === "PARRILLA")!;
  assert.equal(parrilla.tickets[0]!.orderId, (await service.getTable(mesa.id)).orders[0]!.id, "sin urgencia manda la más vieja");

  await service.rushOrder(segunda.id, true);
  parrilla = (await service.getKitchenBoard()).stations.find((s) => s.station === "PARRILLA")!;
  assert.equal(parrilla.tickets[0]!.orderId, segunda.id, "la urgente pasa al frente");
  assert.equal(parrilla.tickets[0]!.urgency, "rojo");
});

test("el estado de la comanda se deduce de sus líneas", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia } = await mesaConDosComensales(service, wallets);
  const orden = await service.placeOrder(mesa.id, {
    dinerId: sofia.id,
    items: [{ menuItemId: "burger", quantity: 1 }, { menuItemId: "limonada", quantity: 1 }],
  });

  assert.equal(orden.status, "RECEIVED");
  let actual = await service.advanceLine(orden.id, 1, "PREPARING"); // solo la limonada
  assert.equal(actual.status, "PREPARING", "una línea en marcha ya mueve la comanda");

  actual = await service.advanceLine(orden.id, 1, "READY");
  assert.equal(actual.status, "PREPARING", "sigue PREPARING porque la burger no arrancó");

  await service.advanceLine(orden.id, 0, "PREPARING");
  actual = await service.advanceLine(orden.id, 0, "READY");
  assert.equal(actual.status, "READY", "recién cuando están las dos");
});

test("no se puede saltear un paso", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia } = await mesaConDosComensales(service, wallets);
  const orden = await service.placeOrder(mesa.id, { dinerId: sofia.id, items: [{ menuItemId: "burger", quantity: 1 }] });

  await assert.rejects(
    () => service.advanceLine(orden.id, 0, "READY"),
    (e: unknown) => e instanceof DomainError && e.code === "INVALID_STATE",
  );
});

test("deshacer retrocede exactamente un paso", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia } = await mesaConDosComensales(service, wallets);
  const orden = await service.placeOrder(mesa.id, { dinerId: sofia.id, items: [{ menuItemId: "burger", quantity: 1 }] });

  await service.advanceLine(orden.id, 0, "PREPARING");
  await service.advanceLine(orden.id, 0, "READY");
  const vuelto = await service.rollbackLine(orden.id, 0);
  assert.equal(vuelto.items[0]!.status, "PREPARING");

  await service.rollbackLine(orden.id, 0);
  const alPrincipio = await service.rollbackLine(orden.id, 0).catch((e) => e);
  assert.ok(alPrincipio instanceof DomainError, "en PENDING ya no hay hacia dónde volver");
});

test("una línea cancelada no se cobra y sale del tablero", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia } = await mesaConDosComensales(service, wallets);
  const orden = await service.placeOrder(mesa.id, {
    dinerId: sofia.id,
    items: [{ menuItemId: "burger", quantity: 1 }, { menuItemId: "limonada", quantity: 1 }],
  });

  const antes = await service.getBill(mesa.id, 0);
  await service.cancelLine(orden.id, 1); // la limonada
  const despues = await service.getBill(mesa.id, 0);

  assert.equal(antes.subtotalInCents - despues.subtotalInCents, 520_000);
  const barra = (await service.getKitchenBoard()).stations.find((s) => s.station === "BARRA")!;
  assert.equal(barra.tickets.length, 0);
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
  const o1 = await service.placeOrder(ctx.mesa.id, { dinerId: ctx.sofia.id, items: [{ menuItemId: "limonada", quantity: 1 }] });
  const o2 = await service.placeOrder(ctx.mesa.id, { dinerId: ctx.emi.id, items: [{ menuItemId: "limonada", quantity: 1 }] });
  for (const o of [o1, o2]) await service.updateOrderStatus(o.id, "PREPARING");
  for (const o of [o1, o2]) await service.updateOrderStatus(o.id, "READY");
  for (const o of [o1, o2]) await service.updateOrderStatus(o.id, "DELIVERED");
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
