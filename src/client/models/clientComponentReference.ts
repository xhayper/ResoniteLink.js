import { ClientComponent } from "./clientComponent";
import { Component } from "../../models";
import { Client } from "../client";

export class ClientComponentReference {
  client: Client;

  private _rawComponent: Component;

  get id() {
    return this._rawComponent.id;
  }

  get componentType() {
    return this._rawComponent.componentType;
  }

  readonly isReferenceOnly = true;
  readonly members = null;

  constructor(client: Client, component: Component) {
    this.client = client;
    this._rawComponent = component;
  }

  encode(): Component {
    return this._rawComponent;
  }

  //////

  public async fetchComponent(): Promise<ClientComponent> {
    return this.client.getComponent(this._rawComponent.id);
  }
}
