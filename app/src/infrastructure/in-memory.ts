import { randomUUID } from "node:crypto";
import type { Clock, IdGenerator, MenuCatalog, SessionRepository } from "../application/ports.js";
import { assertDomain } from "../domain/errors.js";
import type { MenuItem, TableSession } from "../domain/model.js";

export class InMemorySessionRepository implements SessionRepository {
  private readonly data = new Map<string, TableSession>();

  async getById(id: string): Promise<TableSession | null> {
    const session = this.data.get(id);
    return session ? structuredClone(session) : null;
  }

  async list(): Promise<TableSession[]> {
    return [...this.data.values()].map((session) => structuredClone(session));
  }

  async save(session: TableSession): Promise<void> {
    this.data.set(session.id, structuredClone(session));
  }
}

export class InMemoryMenuCatalog implements MenuCatalog {
  private readonly items: MenuItem[];

  constructor(items: MenuItem[]) {
    this.items = structuredClone(items);
  }

  async getById(id: string): Promise<MenuItem | null> {
    const item = this.items.find((candidate) => candidate.id === id);
    return item ? structuredClone(item) : null;
  }

  async list(): Promise<MenuItem[]> {
    return structuredClone(this.items);
  }

  /**
   * El botón "sin stock" de la cocina. Es de las cosas que más se usan en un
   * local real: se acabó el salmón a las 21:30 y hay que sacarlo de la carta
   * de todos AHORA, no llamando por teléfono a cada mesa.
   */
  async setAvailability(id: string, available: boolean): Promise<MenuItem> {
    const item = this.items.find((candidate) => candidate.id === id);
    assertDomain(item, "NOT_FOUND", `No existe el producto ${id}.`);
    item.available = available;
    return structuredClone(item);
  }

  async upsert(item: MenuItem): Promise<MenuItem> {
    const i = this.items.findIndex((x) => x.id === item.id);
    if (i === -1) this.items.push(structuredClone(item));
    else this.items[i] = structuredClone(item);
    return structuredClone(item);
  }

  async remove(id: string): Promise<void> {
    const i = this.items.findIndex((x) => x.id === id);
    assertDomain(i !== -1, "NOT_FOUND", `No existe el producto ${id}.`);
    this.items.splice(i, 1);
  }
}

export const systemClock: Clock = { now: () => new Date() };
export const uuidGenerator: IdGenerator = { next: (prefix) => `${prefix}_${randomUUID()}` };
