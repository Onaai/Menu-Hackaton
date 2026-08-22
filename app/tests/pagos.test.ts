import assert from "node:assert/strict";
import test from "node:test";
import { RestaurantService } from "../src/application/restaurant-service.js";
import { InMemoryMenuCatalog, InMemorySessionRepository } from "../src/infrastructure/in-memory.js";
import { InMemoryWalletLedger } from "../src/infrastructure/wallet-ledger.js";
import { demoMenu } from "../src/config/demo-menu.js";
import { DomainError } from "../src/domain/errors.js";
import { calcularVuelto } from "../src/domain/pago.js";

class RelojFalso {
  constructor(private t = new Date("2026-08-22T23:00:00.000Z")) {}
  now() { return new Date(this.t); }
  avanzarMinutos(m: number) { this.t = new Date(this.t.getTime() + m * 60_000); }
}

function armar() {
  let n = 0;
  const clock = new RelojFalso();
  const ids = { next: (p: string) => `${p}_${++n}` };
  const wallets = new InMemoryWalletLedger(clock, ids);
  const service = new RestaurantService(new InMemorySessionRepository(), new InMemoryMenuCatalog(demoMenu), clock, ids, wallets);
  return { service, wallets, clock };
}

/**
 * Mesa con dos comensales, cada uno con lo suyo entregado y la cuenta pedida.
 * Sofía: burger $17.900 · Emi: limonada $5.200
 */
async function mesaLista(service: RestaurantService, wallets: InMemoryWalletLedger) {
  await wallets.create({ label: "Caja", kind: "BUSINESS", initialBalanceInCents: 0 });
  const wSofia = await wallets.create({ label: "Sofía", kind: "CLIENT", initialBalanceInCents: 20_000 });
  const wEmi = await wallets.create({ label: "Emi", kind: "CLIENT", initialBalanceInCents: 1_200 });
  const mesa = await service.openTable(7);
  const sofia = await service.joinTable(mesa.id, "Sofía", wSofia.id);
  const emi = await service.joinTable(mesa.id, "Emi", wEmi.id);
  await service.placeOrder(mesa.id, { dinerId: sofia.id, items: [{ menuItemId: "burger", quantity: 1 }] });
  await service.placeOrder(mesa.id, { dinerId: emi.id, items: [{ menuItemId: "limonada", quantity: 1 }] });
  await service.entregarMesa(mesa.id);
  await service.requestBill(mesa.id, true);
  return { mesa, sofia, emi, wSofia, wEmi };
}

// ── Vuelto ──────────────────────────────────────────────────────────────────

test("el vuelto es la resta, y si no alcanza devuelve null", () => {
  assert.equal(calcularVuelto(1_969_000, 3_000_000), 1_031_000);
  assert.equal(calcularVuelto(1_969_000, 1_969_000), 0, "pagar justo da vuelto cero, no error");
  assert.equal(calcularVuelto(1_969_000, 1_000_000), null);
  assert.equal(calcularVuelto(100, 100.5), null, "un importe no entero no es plata válida");
});

// ── Efectivo ────────────────────────────────────────────────────────────────

test("efectivo: la vista previa calcula el vuelto y no cobra nada", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia } = await mesaLista(service, wallets);

  const r = await service.pagar(mesa.id, {
    metodo: "EFECTIVO", modo: "INDIVIDUAL", dinerId: sofia.id,
    tipPercent: 10, recibidoInCents: 3_000_000, dryRun: true,
  });

  assert.equal(r.preview, true);
  assert.equal(r.totalInCents, 1_790_000 + 179_000);
  assert.equal(r.vueltoInCents, 3_000_000 - 1_969_000);
  assert.equal(r.pago, undefined, "sin confirmar no hay cobro registrado");
  assert.equal((await service.getTable(mesa.id)).payments.length, 0);
});

test("efectivo: confirmado queda el vuelto asentado", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia } = await mesaLista(service, wallets);

  const r = await service.pagar(mesa.id, {
    metodo: "EFECTIVO", modo: "INDIVIDUAL", dinerId: sofia.id,
    tipPercent: 10, recibidoInCents: 3_000_000, dryRun: false,
  });

  assert.equal(r.pago?.metodo, "EFECTIVO");
  assert.equal(r.pago?.vueltoInCents, 1_031_000);
  assert.equal(r.pago?.recibidoInCents, 3_000_000);
  assert.equal(r.pago?.dinerName, "Sofía");
});

test("efectivo: pagar justo no necesita declarar con cuánto", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia } = await mesaLista(service, wallets);
  const r = await service.pagar(mesa.id, { metodo: "EFECTIVO", modo: "INDIVIDUAL", dinerId: sofia.id, tipPercent: 0, dryRun: false });
  assert.equal(r.pago?.vueltoInCents, 0);
});

test("efectivo: si no alcanza, falla y no cobra", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia } = await mesaLista(service, wallets);

  await assert.rejects(
    () => service.pagar(mesa.id, { metodo: "EFECTIVO", modo: "INDIVIDUAL", dinerId: sofia.id, tipPercent: 0, recibidoInCents: 100_000, dryRun: false }),
    (e: unknown) => e instanceof DomainError && e.code === "VALIDATION_ERROR",
  );
  assert.equal((await service.getTable(mesa.id)).payments.length, 0);
});

// ── Mercado Pago ────────────────────────────────────────────────────────────

test("mercado pago: aprueba y deja referencia", async () => {
  const { service, wallets } = armar();
  const { mesa, emi } = await mesaLista(service, wallets);

  const r = await service.pagar(mesa.id, { metodo: "MERCADO_PAGO", modo: "INDIVIDUAL", dinerId: emi.id, tipPercent: 10, dryRun: false });

  assert.equal(r.pago?.metodo, "MERCADO_PAGO");
  assert.ok(r.pago?.referenciaMp?.startsWith("MP-"), `referencia = ${r.pago?.referenciaMp}`);
  assert.equal(r.totalInCents, 520_000 + 52_000);
  assert.equal(r.pago?.usdtTotalInCents, undefined, "no toca billeteras");
});

// ── Mezcla de métodos en la misma mesa ──────────────────────────────────────

test("cada uno paga con lo que quiere y la mesa cierra sola", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia, emi, wSofia } = await mesaLista(service, wallets);

  await service.pagar(mesa.id, { metodo: "EFECTIVO", modo: "INDIVIDUAL", dinerId: sofia.id, tipPercent: 0, recibidoInCents: 2_000_000, dryRun: false });
  assert.equal((await service.getTable(mesa.id)).status, "BILL_REQUESTED", "falta Emi");

  await service.pagar(mesa.id, { metodo: "MERCADO_PAGO", modo: "INDIVIDUAL", dinerId: emi.id, tipPercent: 0, dryRun: false });
  assert.equal((await service.getTable(mesa.id)).status, "CLOSED");

  // Y la billetera de Sofía no se tocó: pagó en efectivo.
  assert.equal((await wallets.getById(wSofia.id))?.balanceInCents, 20_000);
});

test("no se puede pagar dos veces lo mismo", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia } = await mesaLista(service, wallets);
  await service.pagar(mesa.id, { metodo: "EFECTIVO", modo: "INDIVIDUAL", dinerId: sofia.id, tipPercent: 0, dryRun: false });
  await assert.rejects(
    () => service.pagar(mesa.id, { metodo: "MERCADO_PAGO", modo: "INDIVIDUAL", dinerId: sofia.id, tipPercent: 0, dryRun: false }),
    (e: unknown) => e instanceof DomainError && e.code === "CONFLICT",
  );
});

test("pagar toda la mesa cobra solo lo que falta", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia } = await mesaLista(service, wallets);

  // Uno paga toda la mesa de una: 17.900 + 5.200
  const r = await service.pagar(mesa.id, { metodo: "EFECTIVO", modo: "TABLE", tipPercent: 0, recibidoInCents: 3_000_000, dryRun: false });
  assert.equal(r.totalInCents, 1_790_000 + 520_000);
  assert.equal((await service.getTable(mesa.id)).status, "CLOSED");
  assert.equal(r.pago?.modo, "TABLE");
  assert.ok(sofia);
});

test("un método desconocido se rechaza", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia } = await mesaLista(service, wallets);
  await assert.rejects(
    () => service.pagar(mesa.id, { metodo: "CRIPTO_MAGICA" as never, modo: "INDIVIDUAL", dinerId: sofia.id, tipPercent: 0, dryRun: false }),
    (e: unknown) => e instanceof DomainError && e.code === "VALIDATION_ERROR",
  );
});

// ── Corte de caja ───────────────────────────────────────────────────────────

test("el corte de caja separa por método y suma propinas", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia, emi } = await mesaLista(service, wallets);

  await service.pagar(mesa.id, { metodo: "EFECTIVO", modo: "INDIVIDUAL", dinerId: sofia.id, tipPercent: 10, recibidoInCents: 3_000_000, dryRun: false });
  await service.pagar(mesa.id, { metodo: "MERCADO_PAGO", modo: "INDIVIDUAL", dinerId: emi.id, tipPercent: 10, dryRun: false });

  const c = await service.corteDeCaja();
  assert.equal(c.cantidad, 2);
  assert.equal(c.totalInCents, 1_969_000 + 572_000);
  assert.equal(c.propinasInCents, 179_000 + 52_000);

  const efectivo = c.porMetodo.find((m) => m.metodo === "EFECTIVO")!;
  const mp = c.porMetodo.find((m) => m.metodo === "MERCADO_PAGO")!;
  assert.equal(efectivo.totalInCents, 1_969_000);
  assert.equal(mp.totalInCents, 572_000);
  assert.equal(c.porMetodo.find((m) => m.metodo === "WALLET")!.cantidad, 0);
});

test("🔴 en el cajón queda lo COBRADO en efectivo, no lo recibido", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia } = await mesaLista(service, wallets);

  // Paga 17.900 con un billete de 30.000: entran 30.000 y salen 12.100 de vuelto.
  await service.pagar(mesa.id, { metodo: "EFECTIVO", modo: "INDIVIDUAL", dinerId: sofia.id, tipPercent: 0, recibidoInCents: 3_000_000, dryRun: false });

  const c = await service.corteDeCaja();
  // Si se contara el "recibido", la caja cerraría 1.210.000 de más todas las noches.
  assert.equal(c.efectivoEnCajaInCents, 1_790_000);
  assert.notEqual(c.efectivoEnCajaInCents, 3_000_000);
});

test("el corte junta las mesas de todo el turno, no una sola", async () => {
  const { service, wallets } = armar();
  const { mesa, sofia, emi } = await mesaLista(service, wallets);
  await service.pagar(mesa.id, { metodo: "EFECTIVO", modo: "INDIVIDUAL", dinerId: sofia.id, tipPercent: 0, dryRun: false });
  await service.pagar(mesa.id, { metodo: "EFECTIVO", modo: "INDIVIDUAL", dinerId: emi.id, tipPercent: 0, dryRun: false });

  const otra = await service.openTable(9);
  const juan = await service.joinTable(otra.id, "Juan");
  await service.placeOrder(otra.id, { dinerId: juan.id, items: [{ menuItemId: "volcan", quantity: 1 }] });
  await service.entregarMesa(otra.id);
  await service.requestBill(otra.id, true);
  await service.pagar(otra.id, { metodo: "MERCADO_PAGO", modo: "TABLE", tipPercent: 0, dryRun: false });

  const c = await service.corteDeCaja();
  assert.equal(c.cantidad, 3);
  assert.equal(c.totalInCents, 1_790_000 + 520_000 + 970_000);
});

// ── Edición de la carta ─────────────────────────────────────────────────────

test("el encargado cambia el precio y solo cambia el precio", async () => {
  const { service } = armar();
  const antes = (await service.listMenu()).find((i) => i.id === "burger")!;
  const item = await service.editarProducto("burger", { priceInCents: 2_500_000 });

  assert.equal(item.priceInCents, 2_500_000);
  assert.equal(item.name, antes.name, "un patch parcial no puede borrar lo que no mandaste");
  assert.equal(item.description, antes.description);
  assert.deepEqual(item.options, antes.options);
});

test("un precio inválido se rechaza", async () => {
  const { service } = armar();
  for (const malo of [0, -100, 12.5]) {
    await assert.rejects(
      () => service.editarProducto("burger", { priceInCents: malo }),
      (e: unknown) => e instanceof DomainError && e.code === "VALIDATION_ERROR",
      `${malo} tendría que fallar`,
    );
  }
});

test("crear producto deriva el id del nombre, sin tildes ni espacios", async () => {
  const { service } = armar();
  const item = await service.crearProducto({ name: "Ñoquis del 29 con Tuco", priceInCents: 1_500_000 });
  assert.equal(item.id, "noquis-del-29-con-tuco");
  assert.equal(item.available, true);
  await assert.rejects(
    () => service.crearProducto({ name: "Ñoquis del 29 con Tuco" }),
    (e: unknown) => e instanceof DomainError && e.code === "CONFLICT",
  );
});

test("🔴 no se borra un producto que está en un pedido abierto", async () => {
  const { service, wallets } = armar();
  await wallets.create({ label: "Caja", kind: "BUSINESS", initialBalanceInCents: 0 });
  const mesa = await service.openTable(7);
  const sofia = await service.joinTable(mesa.id, "Sofía");
  await service.placeOrder(mesa.id, { dinerId: sofia.id, items: [{ menuItemId: "burger", quantity: 1 }] });

  await assert.rejects(
    () => service.borrarProducto("burger"),
    (e: unknown) => e instanceof DomainError && e.code === "CONFLICT",
  );
  // El que nadie pidió sí se puede borrar.
  assert.deepEqual(await service.borrarProducto("volcan"), { ok: true });
  assert.equal((await service.listMenu()).some((i) => i.id === "volcan"), false);
});
