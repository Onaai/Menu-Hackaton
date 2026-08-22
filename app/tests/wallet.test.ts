import assert from "node:assert/strict";
import test from "node:test";
import { InMemoryWalletLedger } from "../src/infrastructure/wallet-ledger.js";
import { calculateFee } from "../src/domain/wallet.js";
import { DomainError } from "../src/domain/errors.js";

function nuevoLibro() {
  let n = 0;
  const clock = { now: () => new Date("2026-08-22T21:00:00.000Z") };
  const ids = { next: (p: string) => `${p}_${++n}` };
  return new InMemoryWalletLedger(clock, ids);
}

test("la comisión es 0,5% con piso de 2 centavos", () => {
  assert.equal(calculateFee(10_000), 50); // 100 USDT → 0,50
  assert.equal(calculateFee(100), 2); // 1 USDT → piso
  assert.equal(calculateFee(1), 2); // 0,01 USDT → piso
});

test("dryRun no toca ningún saldo pero calcula todo", async () => {
  const libro = nuevoLibro();
  const cliente = await libro.create({ label: "Sofía", kind: "CLIENT", initialBalanceInCents: 10_000 });
  const negocio = await libro.create({ label: "Caja", kind: "BUSINESS", initialBalanceInCents: 0 });

  const preview = await libro.transfer({
    fromWalletId: cliente.id, toWalletId: negocio.id,
    amountInCents: 2_000, concept: "cena", dryRun: true,
  });

  assert.equal(preview.status, "PREVIEW");
  assert.equal(preview.feeInCents, 10);
  assert.equal(preview.debitedInCents, 2_010);
  assert.deepEqual(preview.balancesAfter, { from: 7_990, to: 2_000 });

  // Lo que importa: NADA se movió.
  assert.equal((await libro.getById(cliente.id))?.balanceInCents, 10_000);
  assert.equal((await libro.getById(negocio.id))?.balanceInCents, 0);
  assert.equal((await libro.history()).length, 0);
});

test("la transferencia confirmada mueve la plata y el destino recibe el importe completo", async () => {
  const libro = nuevoLibro();
  const cliente = await libro.create({ label: "Sofía", kind: "CLIENT", initialBalanceInCents: 10_000 });
  const negocio = await libro.create({ label: "Caja", kind: "BUSINESS", initialBalanceInCents: 0 });

  const tx = await libro.transfer({
    fromWalletId: cliente.id, toWalletId: negocio.id,
    amountInCents: 2_000, concept: "cena", dryRun: false,
  });

  assert.equal(tx.status, "CONFIRMED");
  // El que paga cubre la comisión; el negocio cobra el importe entero.
  assert.equal((await libro.getById(cliente.id))?.balanceInCents, 7_990);
  assert.equal((await libro.getById(negocio.id))?.balanceInCents, 2_000);
  assert.equal((await libro.history()).length, 1);
});

test("saldo insuficiente es un error, no un saldo negativo", async () => {
  const libro = nuevoLibro();
  const pobre = await libro.create({ label: "Emi", kind: "CLIENT", initialBalanceInCents: 1_200 });
  const negocio = await libro.create({ label: "Caja", kind: "BUSINESS", initialBalanceInCents: 0 });

  await assert.rejects(
    () => libro.transfer({ fromWalletId: pobre.id, toWalletId: negocio.id, amountInCents: 5_000, concept: "x", dryRun: false }),
    (e: unknown) => e instanceof DomainError && e.code === "CONFLICT",
  );
  assert.equal((await libro.getById(pobre.id))?.balanceInCents, 1_200);
});

test("la comisión también entra en el chequeo de saldo", async () => {
  const libro = nuevoLibro();
  // 20,00 justos: alcanza para el importe pero NO para importe + comisión.
  const justo = await libro.create({ label: "Justo", kind: "CLIENT", initialBalanceInCents: 2_000 });
  const negocio = await libro.create({ label: "Caja", kind: "BUSINESS", initialBalanceInCents: 0 });

  await assert.rejects(
    () => libro.transfer({ fromWalletId: justo.id, toWalletId: negocio.id, amountInCents: 2_000, concept: "x", dryRun: false }),
    (e: unknown) => e instanceof DomainError && e.code === "CONFLICT",
  );
});

test("no se puede transferir a la misma billetera ni importes no positivos", async () => {
  const libro = nuevoLibro();
  const a = await libro.create({ label: "Ana", kind: "CLIENT", initialBalanceInCents: 10_000 });
  const b = await libro.create({ label: "Bruno", kind: "CLIENT", initialBalanceInCents: 0 });

  await assert.rejects(() => libro.transfer({ fromWalletId: a.id, toWalletId: a.id, amountInCents: 100, concept: "x", dryRun: true }));
  await assert.rejects(() => libro.transfer({ fromWalletId: a.id, toWalletId: b.id, amountInCents: 0, concept: "x", dryRun: true }));
  await assert.rejects(() => libro.transfer({ fromWalletId: a.id, toWalletId: b.id, amountInCents: -5, concept: "x", dryRun: true }));
  await assert.rejects(() => libro.transfer({ fromWalletId: a.id, toWalletId: b.id, amountInCents: 1.5, concept: "x", dryRun: true }));
});

test("el historial es por billetera y viene del más nuevo al más viejo", async () => {
  const libro = nuevoLibro();
  const a = await libro.create({ label: "Ana", kind: "CLIENT", initialBalanceInCents: 100_000 });
  const b = await libro.create({ label: "Bruno", kind: "CLIENT", initialBalanceInCents: 100_000 });
  const caja = await libro.create({ label: "Caja", kind: "BUSINESS", initialBalanceInCents: 0 });

  await libro.transfer({ fromWalletId: a.id, toWalletId: caja.id, amountInCents: 1_000, concept: "uno", dryRun: false });
  await libro.transfer({ fromWalletId: b.id, toWalletId: caja.id, amountInCents: 2_000, concept: "dos", dryRun: false });

  assert.equal((await libro.history()).length, 2);
  assert.equal((await libro.history())[0]?.concept, "dos");
  assert.equal((await libro.history(a.id)).length, 1);
  assert.equal((await libro.history(caja.id)).length, 2);
});
