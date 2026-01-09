import { ClientComponent } from "../models/clientComponent";
import { Component, Reference, Slot } from "../../models";
import { BaseManager } from "./";

export class ComponentManager extends BaseManager {
  components: Map<string, ClientComponent> = new Map();

  public registerComponent(component: Component): ClientComponent {
    const clientComponent = new ClientComponent(this.client, component);
    this.components.set(component.id, clientComponent);
    return clientComponent;
  }

  public getOrCreate(component: Component): ClientComponent {
    if (this.components.has(component.id))
      return this.components.get(component.id)!;
    return this.registerComponent(component);
  }

  public getFromId(id: string): ClientComponent | undefined {
    return this.components.get(id);
  }

  public getFromReference(reference: Reference): ClientComponent | undefined {
    return this.getFromId(reference.targetId);
  }
}
