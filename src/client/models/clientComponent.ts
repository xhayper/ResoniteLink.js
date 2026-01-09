import { Component, Slot } from "../../models";
import { Client } from "../client";
import { ComponentManager } from "../managers";
import { Base } from "./base";
import { ClientSlot } from "./clientSlot";

export class ClientComponent extends Base {
  id: string;
  componentType: Component["componentType"];
  members: Component["members"] = {};

  constructor(client: Client, component: Component) {
    super(client);
    this.id = undefined as any;
    this.componentType = undefined as any;
    this.members = undefined as any;
    this.patch(component);
  }

  patch(component: Component) {
    this.id = component.id;
    this.componentType = component.componentType;
    this.members = component.members;
  }
}
