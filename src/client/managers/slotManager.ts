import { Component, Reference, Slot } from "../../models";
import { ClientSlot } from "../models/clientSlot";
import { BaseManager } from "./";

export class SlotManager extends BaseManager {
  slots: Map<string, ClientSlot> = new Map();

  public registerSlot(slot: Slot): ClientSlot {
    const clientSlot = new ClientSlot(this.client, slot);
    this.slots.set(slot.id, clientSlot);
    return clientSlot;
  }

  public getOrCreate(slot: Slot): ClientSlot {
    if (this.slots.has(slot.id)) return this.slots.get(slot.id)!;
    return this.registerSlot(slot);
  }

  public getFromId(id: string): ClientSlot | undefined {
    return this.slots.get(id);
  }

  public getFromReference(reference: Reference): ClientSlot | undefined {
    return this.slots.get(reference.targetId);
  }
}
