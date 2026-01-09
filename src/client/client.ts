import { ResoniteLinkMessage, ResoniteLinkResponse } from "../models";
import TypedEmitter from "../utility/typed-emitter";
import { WebSocket, type RawData } from "ws";
import EventEmitter from "node:events";
import { ComponentManager, SlotManager } from "./managers";

export type ClientEvents = {
  connected: () => void;
  disconnected: () => void;
  message: (data: ResoniteLinkResponse) => void;

  //TODO: figure out other event that should be included
};

export interface ClientOptions {
  host?: string;
  port: number;
}

// TODO: Add something like workspace, children, caching
// TODO: Allow for instance to be referenced easily
export class Client extends (EventEmitter as new () => TypedEmitter<ClientEvents>) {
  private ws?: WebSocket;

  options: ClientOptions;
  isConnected: boolean = false;

  componentManager: ComponentManager;
  slotManager: SlotManager;

  constructor(options: ClientOptions) {
    super();

    const opts = options ?? {};
    opts.host ??= "localhost";

    this.options = opts;

    this.componentManager = new ComponentManager(this);
    this.slotManager = new SlotManager(this);
  }

  connect() {
    if (this.isConnected) return;

    this.ws = new WebSocket(`${this.options.host}:${this.options.port}`);

    this.ws.on("message", this.handleMessage);
    this.ws.on("open", () => {
      this.isConnected = true;
      this.emit("connected");
    });
    this.ws.on("close", () => {
      this.emit("disconnected");
    });
  }

  disconnect() {
    this.ws?.close();
  }

  send(message: ResoniteLinkMessage) {
    this.ws?.send(JSON.stringify(message));
  }

  private handleMessage(data: RawData, isBinary: boolean) {
    try {
      const d = JSON.parse(data.toString("utf-8"));
      this.emit("message", d as ResoniteLinkResponse);
    } catch (_) {}
  }
}
