import assert from "node:assert/strict";
import test from "node:test";
import { HackathonExtensionsService } from "../src/application/hackathon-extensions-service.js";
import { RestaurantService } from "../src/application/restaurant-service.js";
import { InMemoryMenuCatalog, InMemorySessionRepository, systemClock, uuidGenerator } from "../src/infrastructure/in-memory.js";
import { demoMenu } from "../src/config/demo-menu.js";
import { ResilientPaymentGateway, SimulatedFallbackGateway, WdkPolicySimulationGateway } from "../src/infrastructure/wdk-policy-gateway.js";
import type { CheckoutWalletGateway } from "../src/application/checkout-wallet.js";

/**
 * Efectivo y Mercado Pago.
 *
 * Ninguno de los dos sale a internet: Mercado Pago es un botón y un logo, y se
 * registra con `simulado: true` para que la pantalla lo pueda decir. La wallet
 * de acá abajo tira excepción a propósito — si algún camino local llegara a
 * tocar WDK CLI, el test lo cazaría.
 */

const walletFalsa: CheckoutWalletGateway = {
  async getWallets() { throw new Error("el pago local no puede tocar WDK CLI"); },
  async preview() { throw new Error("el pago local no puede tocar WDK CLI"); },
  async execute() { throw new Error("el pago local no puede tocar WDK CLI"); },
};

function armar() {
  const sessions = new InMemorySessionRepository();
  const menu = new InMemoryMenuCatalog(demoMenu);
  const gateway = new ResilientPaymentGateway(
    new WdkPolicySimulationGateway({
      merchantAddress: "0x1111111111111111111111111111111111111111",
      tokenAddress: "0xd077a400968890eacc75cdc901f0356c943e4fdb",
      arsPerUsdt: 1_000,
      maxUsdtInBaseUnits: 25_000_000n,
    }),
    new SimulatedFallbackGateway(),
  );
  const service = new RestaurantService(sessions, menu, systemClock, uuidGenerator, gateway);
  const extensions = new HackathonExtensionsService(sessions, menu, systemClock, uuidGenerator, gateway, walletFalsa);
  return { service, extensions };
}

/** Mesa con un pedido entregado y la cuenta pedida: lista para cobrar. */
async function mesaParaCobrar() {
  const { service, extensions } = armar();
  const session = await service.openTable(12);
  const diner = await service.joinTable(session.id, "Emi");
  const orden = await service.placeOrder(session.id, { dinerId: diner.id, items: [{ menuItemId: "burger", quantity: 1 }] });
  for (const estado of ["PREPARING", "READY", "DELIVERED"] as const) await service.updateOrderStatus(orden.id, estado);
  await service.requestBill(session.id, true);
  const bill = await service.getBill(session.id, 0);
  return { service, extensions, sessionId: session.id, dinerId: diner.id, totalInCents: bill.totalInCents };
}

test("efectivo justo: cobra y no hay vuelto", async () => {
  const { extensions, sessionId, dinerId, totalInCents } = await mesaParaCobrar();
  const pago = await extensions.cobrarLocal(sessionId, {
    metodo: "EFECTIVO", mode: "INDIVIDUAL", dinerId, tipPercent: 0, recibidoInCents: totalInCents,
  });
  assert.equal(pago.metodo, "EFECTIVO");
  assert.equal(pago.vueltoInCents, 0);
  assert.equal(pago.simulado, false, "el efectivo NO es simulado: la plata entra de verdad al cajón");
});

test("🔴 el vuelto es lo recibido menos la cuenta", async () => {
  const { extensions, sessionId, dinerId, totalInCents } = await mesaParaCobrar();
  const recibido = totalInCents + 1_210_000;
  const pago = await extensions.cobrarLocal(sessionId, {
    metodo: "EFECTIVO", mode: "INDIVIDUAL", dinerId, tipPercent: 0, recibidoInCents: recibido,
  });
  assert.equal(pago.recibidoInCents, recibido);
  assert.equal(pago.vueltoInCents, recibido - totalInCents);
  assert.equal(pago.totalInCents, totalInCents);
});

test("🔴 con menos plata de la que sale la cuenta no se cobra", async () => {
  const { extensions, sessionId, dinerId, totalInCents } = await mesaParaCobrar();
  await assert.rejects(
    () => extensions.cobrarLocal(sessionId, { metodo: "EFECTIVO", mode: "INDIVIDUAL", dinerId, tipPercent: 0, recibidoInCents: totalInCents - 100 }),
    (error: Error & { code?: string }) => {
      assert.equal(error.code, "VALIDATION_ERROR");
      assert.match(error.message, /no alcanza/);
      return true;
    },
  );
});

test("la propina entra en el total y por lo tanto en el vuelto", async () => {
  const { extensions, service, sessionId, dinerId } = await mesaParaCobrar();
  const conPropina = await service.getBill(sessionId, 10);
  const pago = await extensions.cobrarLocal(sessionId, {
    metodo: "EFECTIVO", mode: "INDIVIDUAL", dinerId, tipPercent: 10, recibidoInCents: conPropina.totalInCents + 500_000,
  });
  assert.ok(pago.tipInCents > 0, "la propina tiene que estar cobrada");
  assert.equal(pago.vueltoInCents, 500_000);
});

test("🔴 Mercado Pago queda marcado como simulado", async () => {
  // Es un botón y un logo: no hay API, ni credenciales, ni webhook. Que la
  // pantalla lo pueda decir depende de este campo, no de un comentario que se
  // desactualiza.
  const { extensions, sessionId, dinerId } = await mesaParaCobrar();
  const pago = await extensions.cobrarLocal(sessionId, { metodo: "MERCADO_PAGO", mode: "INDIVIDUAL", dinerId, tipPercent: 0 });
  assert.equal(pago.metodo, "MERCADO_PAGO");
  assert.equal(pago.simulado, true);
  assert.equal(pago.recibidoInCents, undefined, "Mercado Pago no tiene vuelto");
  assert.equal(pago.vueltoInCents, undefined);
});

test("🔴 no se puede cobrar dos veces al mismo comensal", async () => {
  // El camino local usa las MISMAS validaciones que el de WDK. Un camino de
  // pago con reglas más flojas que el otro es como se cobra dos veces la mesa.
  //
  // Hacen falta DOS comensales: con uno solo, al cobrarle la mesa se cierra y
  // el segundo intento choca antes con "primero se debe solicitar la cuenta".
  // La proteccion existe igual, pero asi se prueba la que corresponde.
  const { service, extensions } = armar();
  const session = await service.openTable(12);
  const emi = await service.joinTable(session.id, "Emi");
  const sofia = await service.joinTable(session.id, "Sofía");
  for (const quien of [emi, sofia]) {
    const orden = await service.placeOrder(session.id, { dinerId: quien.id, items: [{ menuItemId: "burger", quantity: 1 }] });
    for (const estado of ["PREPARING", "READY", "DELIVERED"] as const) await service.updateOrderStatus(orden.id, estado);
  }
  await service.requestBill(session.id, true);
  const bill = await service.getBill(session.id, 0);
  const loDeEmi = bill.diners.find((d) => d.dinerId === emi.id)!.subtotalInCents;

  await extensions.cobrarLocal(session.id, { metodo: "EFECTIVO", mode: "INDIVIDUAL", dinerId: emi.id, tipPercent: 0, recibidoInCents: loDeEmi });
  assert.equal((await service.getTable(session.id)).status, "BILL_REQUESTED", "todavia falta que pague Sofía");

  await assert.rejects(
    () => extensions.cobrarLocal(session.id, { metodo: "MERCADO_PAGO", mode: "INDIVIDUAL", dinerId: emi.id, tipPercent: 0 }),
    (error: Error & { code?: string }) => error.code === "CONFLICT",
  );
});

test("no se puede cobrar antes de pedir la cuenta", async () => {
  const { service, extensions } = armar();
  const session = await service.openTable(9);
  const diner = await service.joinTable(session.id, "Sofía");
  await service.placeOrder(session.id, { dinerId: diner.id, items: [{ menuItemId: "burger", quantity: 1 }] });
  await assert.rejects(
    () => extensions.cobrarLocal(session.id, { metodo: "EFECTIVO", mode: "INDIVIDUAL", dinerId: diner.id, tipPercent: 0, recibidoInCents: 9_999_999 }),
    (error: Error & { code?: string }) => error.code === "INVALID_STATE",
  );
});

test("al cobrar el último consumo, la mesa se cierra sola", async () => {
  const { extensions, sessionId, dinerId, totalInCents, service } = await mesaParaCobrar();
  await extensions.cobrarLocal(sessionId, { metodo: "EFECTIVO", mode: "INDIVIDUAL", dinerId, tipPercent: 0, recibidoInCents: totalInCents });
  assert.equal((await service.getTable(sessionId)).status, "CLOSED");
});

test("🔴 en el cajón queda lo COBRADO, no lo recibido", async () => {
  // Si alguien paga 17.900 con 30.000, entran 30.000 y salen 12.100 de vuelto:
  // en el cajón quedan 17.900. Contar lo recibido haría cerrar la caja de más
  // todas las noches, y es el error clásico de un corte hecho a las apuradas.
  const { extensions, sessionId, dinerId, totalInCents } = await mesaParaCobrar();
  const recibido = totalInCents + 1_500_000;
  await extensions.cobrarLocal(sessionId, { metodo: "EFECTIVO", mode: "INDIVIDUAL", dinerId, tipPercent: 0, recibidoInCents: recibido });

  const corte = await extensions.getFinancialSummary();
  assert.equal(corte.porMetodo.efectivo.enElCajon, totalInCents);
  assert.equal(corte.porMetodo.efectivo.recibidoInCents, recibido);
  assert.equal(corte.porMetodo.efectivo.vueltoInCents, recibido - totalInCents);
  assert.notEqual(corte.porMetodo.efectivo.enElCajon, corte.porMetodo.efectivo.recibidoInCents);
});
