import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { RestaurantService } from "./application/restaurant-service.js";
import { createApiHandler } from "./api/handler.js";
import { demoMenu } from "./config/demo-menu.js";
import { seedDemo } from "./config/demo-seed.js";
import { ARS_PER_USDT } from "./config/cotizacion.js";
import { InMemoryMenuCatalog, InMemorySessionRepository, systemClock, uuidGenerator } from "./infrastructure/in-memory.js";
import { InMemoryWalletLedger } from "./infrastructure/wallet-ledger.js";

const aqui = path.dirname(fileURLToPath(import.meta.url));
// dist/src/index.js → la carpeta public está dos niveles arriba.
const publicDir = path.resolve(aqui, "..", "..", "public");

const wallets = new InMemoryWalletLedger(systemClock, uuidGenerator);
const service = new RestaurantService(
  new InMemorySessionRepository(),
  new InMemoryMenuCatalog(demoMenu),
  systemClock,
  uuidGenerator,
  wallets,
);

const semilla = await seedDemo(service, wallets);

const port = Number(process.env.PORT ?? 3000);
const server = createServer(createApiHandler(service, wallets, publicDir));

server.listen(port, () => {
  console.log("");
  console.log("  ┌──────────────────────────────────────────────────────────┐");
  console.log("  │  MESA ABIERTA                                            │");
  console.log("  └──────────────────────────────────────────────────────────┘");
  console.log("");
  console.log(`  Carta (comensal)   http://localhost:${port}/`);
  console.log(`  Cocina             http://localhost:${port}/cocina.html`);
  console.log(`  Billeteras         http://localhost:${port}/billeteras.html`);
  console.log("");
  console.log(`  Cotización         1 USDT = $${ARS_PER_USDT.toLocaleString("es-AR")}`);
  console.log("");
  for (const linea of semilla.resumen) console.log(`  ${linea}`);
  console.log("");
  console.log("  Todo en memoria: al cortar el servidor se borra. No hay pagos reales.");
  console.log("");
});
