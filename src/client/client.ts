import { AsyncEventEmitter } from "@vladfrangu/async_event_emitter";
import { JsonDerivedType, OmitForcefulTypesThing } from "..";
import { ResoniteLinkResponse } from "../models";
import {
  ImportTexture2DFile,
  ImportTexture2DRawData,
  ImportTexture2DRawDataHDR,
} from "../models/assets";
import {
  GetSlot,
  AddSlot,
  UpdateSlot,
  RemoveSlot,
  GetComponent,
  AddComponent,
  UpdateComponent,
  RemoveComponent,
} from "../models/messages/dataModel";
import { ClientSlot } from "./models";

type ResoniteLinkResponseNoMessageId =
  | JsonDerivedType<
      OmitForcefulTypesThing<Omit<ImportTexture2DFile, "messageId">>,
      "importTexture2DFile"
    >
  | JsonDerivedType<
      OmitForcefulTypesThing<Omit<ImportTexture2DRawData, "messageId">>,
      "importTexture2DRawData"
    >
  | JsonDerivedType<
      OmitForcefulTypesThing<Omit<ImportTexture2DRawDataHDR, "messageId">>,
      "importTexture2DRawDataHDR"
    >
  | JsonDerivedType<
      OmitForcefulTypesThing<Omit<GetSlot, "messageId">>,
      "getSlot"
    >
  | JsonDerivedType<
      OmitForcefulTypesThing<Omit<AddSlot, "messageId">>,
      "addSlot"
    >
  | JsonDerivedType<
      OmitForcefulTypesThing<Omit<UpdateSlot, "messageId">>,
      "updateSlot"
    >
  | JsonDerivedType<
      OmitForcefulTypesThing<Omit<RemoveSlot, "messageId">>,
      "removeSlot"
    >
  | JsonDerivedType<
      OmitForcefulTypesThing<Omit<GetComponent, "messageId">>,
      "getComponent"
    >
  | JsonDerivedType<
      OmitForcefulTypesThing<Omit<AddComponent, "messageId">>,
      "addComponent"
    >
  | JsonDerivedType<
      OmitForcefulTypesThing<Omit<UpdateComponent, "messageId">>,
      "updateComponent"
    >
  | JsonDerivedType<
      OmitForcefulTypesThing<Omit<RemoveComponent, "messageId">>,
      "removeComponent"
    >;

export type ClientEvents = {
  connected: [];
  disconnected: [];
  message: [data: ResoniteLinkResponse];

  //TODO: figure out other event that should be included
};

export interface ClientOptions {
  host?: string;
  port: number;
}

// TODO: Add something like workspace, children, caching
// TODO: Allow for instance to be referenced easily
export class Client extends AsyncEventEmitter<ClientEvents> {
  private ws?: WebSocket;

  options: ClientOptions;
  isConnected: boolean = false;

  private promiseMap: Map<
    string,
    {
      resolve: (value: ResoniteLinkResponse) => void;
      reject: (reason?: any) => void;
    }
  > = new Map();

  constructor(options: ClientOptions) {
    super();

    const opts = options ?? {};
    opts.host ??= "localhost";

    this.options = opts;
  }

  connect() {
    if (this.isConnected) return;

    this.ws = new WebSocket(`ws://${this.options.host}:${this.options.port}`);

    this.ws.onmessage = (ev) => {
      this.handleMessage(
        ev.data,
        typeof ev.data === "string" && !ev.data.startsWith("{"),
      );
    };

    this.ws.onopen = () => {
      this.isConnected = true;
      this.emit("connected");
    };

    this.ws.onclose = () => {
      this.isConnected = false;
      this.emit("disconnected");
    };
  }

  disconnect() {
    this.ws?.close();
  }

  async send(
    message: ResoniteLinkResponseNoMessageId,
  ): Promise<ResoniteLinkResponse> {
    const messageId = crypto.randomUUID();

    this.ws?.send(JSON.stringify({ ...message, messageId }));

    if ("payload" in message) {
      this.ws?.send(message.payload as any);
    }

    return new Promise((resolve, reject) => {
      this.promiseMap.set(messageId, { resolve, reject });
    });
  }

  private handleMessage(data: unknown, isBinary: boolean) {
    if (isBinary) return;
    if (typeof data !== "string") return;

    try {
      const d = JSON.parse(data) as ResoniteLinkResponse;

      const existingPromise = this.promiseMap.get(d.sourceMessageId);
      if (existingPromise) {
        existingPromise.resolve(d);
        this.promiseMap.delete(d.sourceMessageId);
      }

      this.emit("message", d);
    } catch (_) {}
  }

  ////////////////// fun stuff

  public async getSlot(
    id: string,
    depth?: number,
    includeComponentData?: boolean,
  ): Promise<ClientSlot> {
    const response = (await this.send({
      $type: "getSlot",
      slotId: id,
      depth: depth ?? 0,
      includeComponentData: includeComponentData ?? false,
    })) as any;
    const clientSlot = new ClientSlot(this, response.data);
    return clientSlot;
  }
}
