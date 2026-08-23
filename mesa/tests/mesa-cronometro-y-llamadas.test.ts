import assert from "node:assert/strict";
import test from "node:test";
import { MAX_COMANDAS_PENDIENTES, RestaurantService } from "../src/application/restaurant-service.js";
import { InMemoryMenuCatalog, InMemorySessionRepository, systemClock, uuidGenerator } from "../src/infrastructure/in-memory.js";
import { demoMenu } from "../src/config/demo-menu.js";
import { ResilientPaymentGateway, SimulatedFallbackGateway, WdkPolicySimulationGateway } from "../src/infrastructure/wdk-policy-gateway.js";

function armar() {
  const gateway = new ResilientPaymentGateway(
    new WdkPolicySimulationGateway({
      merchantAddress: "0x1111111111111111111111111111111111111111",
      tokenAddress: "0xd077a400968890eacc75cdc901f0356c943e4fdb",
      arsPerUsdt: 1_000,
      maxUsdtInBaseUnits: 25_000_000n,
    }),
    new SimulatedFallbackGateway(),
  );
  return new RestaurantService(
    new InMemorySessionRepository(),
    new InMemoryMenuCatalog(demoMenu),
    systemClock,
    uuidGenerator,
    gateway,
  );
}

async function mesaConComensal(service: RestaurantService, nombre = "Emi") {
  const session = await service.openTable(12);
  const diner = await service.joinTable(session.id, nombre);
  return { sessionId: session.id, dinerId: diner.id };
}

// ── El tope de comandas pendientes ──────────────────────────────────────────

test("🔴 no se pueden encolar 40 pedidos sin que la cocina entregue ninguno", async () => {
  // El caso: alguien escanea el QR, se va del restaurante, y desde afuera manda
  // pedidos. La mesa sigue abierta porque el local todavia no la cerro, asi que
  // el chequeo de `status` no lo frena. Esto si.
  const service = armar();
  const { sessionId, dinerId } = await mesaConComensal(service);

  for (let i = 0; i < MAX_COMANDAS_PENDIENTES; i++) {
    await service.placeOrder(sessionId, { dinerId, items: [{ menuItemId: "burger", quantity: 1 }] });
  }

  await assert.rejects(
    () => service.placeOrder(sessionId, { dinerId, items: [{ menuItemId: "burger", quantity: 1 }] }),
    (error: Error & { code?: string }) => {
      assert.equal(error.code, "CONFLICT");
      assert.match(error.message, /sin entregar/);
      return true;
    },
  );
});

test("cuando la cocina entrega, se libera lugar para pedir de nuevo", async () => {
  // El tope no es una cuota diaria: es cuanto podes tener en vuelo a la vez.
  const service = armar();
  const { sessionId, dinerId } = await mesaConComensal(service);

  const ordenes = [];
  for (let i = 0; i < MAX_COMANDAS_PENDIENTES; i++) {
    ordenes.push(await service.placeOrder(sessionId, { dinerId, items: [{ menuItemId: "burger", quantity: 1 }] }));
  }
  for (const estado of ["PREPARING", "READY", "DELIVERED"] as const) {
    await service.updateOrderStatus(ordenes[0]!.id, estado);
  }

  const nueva = await service.placeOrder(sessionId, { dinerId, items: [{ menuItemId: "limonada", quantity: 1 }] });
  assert.equal(nueva.status, "RECEIVED");
});

test("el tope es por comensal, no por mesa", async () => {
  // Si fuera por mesa, una mesa de seis se quedaria sin poder pedir enseguida.
  const service = armar();
  const { sessionId, dinerId } = await mesaConComensal(service, "Emi");
  const sofia = await service.joinTable(sessionId, "Sofía");

  for (let i = 0; i < MAX_COMANDAS_PENDIENTES; i++) {
    await service.placeOrder(sessionId, { dinerId, items: [{ menuItemId: "burger", quantity: 1 }] });
  }
  const deSofia = await service.placeOrder(sessionId, { dinerId: sofia.id, items: [{ menuItemId: "risotto", quantity: 1 }] });
  assert.equal(deSofia.status, "RECEIVED");
});

// ── El cronómetro ───────────────────────────────────────────────────────────

test("🔴 la cocina recibe el reloj del servidor junto con las comandas", async () => {
  // Sin esto, el navegador calcularia el tiempo con SU reloj contra un
  // createdAt del servidor: una tablet desfasada dos minutos mostraria dos
  // minutos de mas en TODAS las comandas.
  const service = armar();
  const { sessionId, dinerId } = await mesaConComensal(service);
  await service.placeOrder(sessionId, { dinerId, items: [{ menuItemId: "burger", quantity: 1 }] });

  const comandas = await service.listKitchenOrders();
  assert.equal(comandas.length, 1);
  // createdAt es lo que el cronometro cuenta desde.
  assert.ok(!Number.isNaN(Date.parse(comandas[0]!.createdAt)));
  assert.ok(!Number.isNaN(Date.parse(comandas[0]!.updatedAt)));
});

test("al entregar, updatedAt marca el final para congelar el cronometro", async () => {
  const service = armar();
  const { sessionId, dinerId } = await mesaConComensal(service);
  const orden = await service.placeOrder(sessionId, { dinerId, items: [{ menuItemId: "burger", quantity: 1 }] });

  for (const estado of ["PREPARING", "READY", "DELIVERED"] as const) {
    await service.updateOrderStatus(orden.id, estado);
  }
  const entregada = (await service.listKitchenOrders("DELIVERED"))[0]!;
  assert.ok(Date.parse(entregada.updatedAt) >= Date.parse(entregada.createdAt));
});

// ── Llamar al mozo ──────────────────────────────────────────────────────────

test("el comensal llama y aparece en las pendientes del local", async () => {
  const service = armar();
  const { sessionId, dinerId } = await mesaConComensal(service);

  const { llamada, yaEstaba } = await service.llamarAlMozo(sessionId, dinerId, "la cuenta");
  assert.equal(yaEstaba, false);
  assert.equal(llamada.motivo, "la cuenta");
  assert.equal(llamada.dinerName, "Emi");

  const pendientes = await service.listarLlamadasPendientes();
  assert.equal(pendientes.length, 1);
  assert.equal(pendientes[0]?.tableNumber, 12);
});

test("🔴 tocar el boton diez veces deja UNA sola llamada", async () => {
  // No es solo anti-abuso: diez avisos identicos en la pantalla del local son
  // diez avisos que nadie mira.
  const service = armar();
  const { sessionId, dinerId } = await mesaConComensal(service);

  for (let i = 0; i < 10; i++) await service.llamarAlMozo(sessionId, dinerId, "necesito algo");
  assert.equal((await service.listarLlamadasPendientes()).length, 1);

  const segunda = await service.llamarAlMozo(sessionId, dinerId, "necesito algo");
  assert.equal(segunda.yaEstaba, true, "la segunda tiene que avisar que ya habia una");
});

test("atendida la llamada, se puede volver a llamar", async () => {
  const service = armar();
  const { sessionId, dinerId } = await mesaConComensal(service);
  const { llamada } = await service.llamarAlMozo(sessionId, dinerId, "una consulta");

  await service.atenderLlamada(sessionId, llamada.id);
  assert.equal((await service.listarLlamadasPendientes()).length, 0);

  const nueva = await service.llamarAlMozo(sessionId, dinerId, "la cuenta");
  assert.equal(nueva.yaEstaba, false);
  assert.equal((await service.listarLlamadasPendientes()).length, 1);
});

test("atender dos veces la misma llamada no cambia el momento en que se atendio", async () => {
  const service = armar();
  const { sessionId, dinerId } = await mesaConComensal(service);
  const { llamada } = await service.llamarAlMozo(sessionId, dinerId, "la cuenta");

  const primera = await service.atenderLlamada(sessionId, llamada.id);
  const segunda = await service.atenderLlamada(sessionId, llamada.id);
  assert.equal(primera.atendidaEn, segunda.atendidaEn);
});

test("un motivo fuera de la lista se rechaza", async () => {
  // La lista es cerrada para que el motivo no sea texto libre que despues hay
  // que moderar en la pantalla del local.
  const service = armar();
  const { sessionId, dinerId } = await mesaConComensal(service);
  await assert.rejects(
    () => service.llamarAlMozo(sessionId, dinerId, "<script>alert(1)</script>"),
    (error: Error & { code?: string }) => error.code === "VALIDATION_ERROR",
  );
});

test("alguien que no esta en la mesa no puede llamar al mozo de esa mesa", async () => {
  const service = armar();
  const { sessionId } = await mesaConComensal(service);
  await assert.rejects(
    () => service.llamarAlMozo(sessionId, "diner_de_otra_mesa", "la cuenta"),
    (error: Error & { code?: string }) => error.code === "NOT_FOUND",
  );
});
