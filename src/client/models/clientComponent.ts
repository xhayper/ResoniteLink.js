import { Component, Slot } from "../../models";
import { Client } from "../client";
import { Base } from "./base";

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

  encode(): Component {
    return {
      id: this.id,
      componentType: this.componentType,
      members: this.members,
      isReferenceOnly: false,
    };
  }
}
