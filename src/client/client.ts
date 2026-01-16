import { AssetData, BinaryPayloadMessage, ComponentData, ResoniteLinkResponse, Slot, SlotData } from "../models";
import { RequestSessionData } from "../models/messages/requestSessionData";
import { AsyncEventEmitter } from "@vladfrangu/async_event_emitter";
import { SessionData } from "../models/responses/sessionData";
import { JsonDerivedType, OmitIdentityType } from "..";
import { ClientComponent, ClientSlot } from "./models";
import {
    ImportAudioClipFile,
    ImportAudioClipRawData,
    ImportTexture2DFile,
    ImportTexture2DRawData,
    ImportTexture2DRawDataHDR
} from "../models/assets";
import {
    GetSlot,
    AddSlot,
    UpdateSlot,
    RemoveSlot,
    GetComponent,
    AddComponent,
    UpdateComponent,
    RemoveComponent
} from "../models/messages/dataModel";

type ResoniteLinkResponseNoMessageId =
    | JsonDerivedType<OmitIdentityType<Omit<ImportTexture2DFile, "messageId">>, "importTexture2DFile">
    | JsonDerivedType<OmitIdentityType<Omit<ImportTexture2DRawData, "messageId">>, "importTexture2DRawData">
    | JsonDerivedType<OmitIdentityType<Omit<ImportTexture2DRawDataHDR, "messageId">>, "importTexture2DRawDataHDR">
    | JsonDerivedType<OmitIdentityType<Omit<ImportAudioClipFile, "messageId">>, "importAudioClipFile">
    | JsonDerivedType<OmitIdentityType<Omit<ImportAudioClipRawData, "messageId">>, "importAudioClipRawData">
    | JsonDerivedType<OmitIdentityType<Omit<RequestSessionData, "messageId">>, "requestSessionData">
    | JsonDerivedType<OmitIdentityType<Omit<GetSlot, "messageId">>, "getSlot">
    | JsonDerivedType<OmitIdentityType<Omit<AddSlot, "messageId">>, "addSlot">
    | JsonDerivedType<OmitIdentityType<Omit<UpdateSlot, "messageId">>, "updateSlot">
    | JsonDerivedType<OmitIdentityType<Omit<RemoveSlot, "messageId">>, "removeSlot">
    | JsonDerivedType<OmitIdentityType<Omit<GetComponent, "messageId">>, "getComponent">
    | JsonDerivedType<OmitIdentityType<Omit<AddComponent, "messageId">>, "addComponent">
    | JsonDerivedType<OmitIdentityType<Omit<UpdateComponent, "messageId">>, "updateComponent">
    | JsonDerivedType<OmitIdentityType<Omit<RemoveComponent, "messageId">>, "removeComponent">;

interface RequestResponseMap {
    importTexture2DFile: AssetData;
    importTexture2DRawData: AssetData;
    importTexture2DRawDataHDR: AssetData;
    importAudioClipFile: AssetData;
    importAudioClipRawData: AssetData;
    requestSessionData: SessionData;
    getSlot: SlotData;
    getComponent: ComponentData;
}

type ResponseFor<T extends { $type: string }> = T["$type"] extends keyof RequestResponseMap
    ? RequestResponseMap[T["$type"]]
    : ResoniteLinkResponse;

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

// TODO: Allow for instance to be referenced, instead of creating a new one everytime
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
            this.handleMessage(ev.data, typeof ev.data === "string" && !ev.data.startsWith("{"));
        };

        this.ws.onopen = () => {
            this.isConnected = true;
            this.emit("connected");
        };

        this.ws.onclose = () => {
            this.isConnected = false;
            this.emit("disconnected");

            this.promiseMap.forEach(({ reject }) => reject());
            this.promiseMap.clear();
        };
    }

    disconnect() {
        this.ws?.close();
    }

    async send<T extends BinaryPayloadMessage>(message: T, payload: ArrayBuffer): Promise<ResponseFor<T>>;
    async send<T extends ResoniteLinkResponseNoMessageId>(message: T): Promise<ResponseFor<T>>;
    async send(message: ResoniteLinkResponseNoMessageId, payload?: ArrayBuffer): Promise<ResoniteLinkResponse> {
        const messageId = crypto.randomUUID();

        this.ws?.send(JSON.stringify({ ...message, messageId }));

        if (payload) {
            this.ws?.send(payload as any);
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

    public async getSlot(id: string, depth?: number, includeComponentData?: boolean): Promise<ClientSlot | undefined> {
        const response = (await this.send({
            $type: "getSlot",
            slotId: id,
            depth: depth ?? 0,
            includeComponentData: includeComponentData ?? false
        })) as any;
        if (!response.success) return;
        const clientSlot = new ClientSlot(this, response.data);
        return clientSlot;
    }

    public async getComponent(id: string): Promise<ClientComponent> {
        const response = (await this.send({
            $type: "getComponent",
            componentId: id
        })) as any;
        const clientComponent = new ClientComponent(this, response.data);
        return clientComponent;
    }

    public async removeCOmponent(id: string): Promise<void> {
        return void (await this.send({
            $type: "removeComponent",
            componentId: id
        }));
    }

    public async removeSlot(id: string): Promise<void> {
        return void (await this.send({
            $type: "removeSlot",
            slotId: id
        }));
    }

    public async createSlot(
        slot: Partial<Omit<OmitIdentityType<Slot>, "id">>,
        id?: string
    ): Promise<ClientSlot | undefined> {
        const slotId = id ?? `ResoniteLink.js_${crypto.randomUUID()}`;

        const response = await this.send({
            $type: "addSlot",
            data: {
                id: slotId,
                ...slot
            }
        }).catch(() => ({ success: false }) as SlotData);

        if (!response.success) return;

        return this.getSlot(slotId);
    }

    public async getSessionData(): Promise<SessionData | undefined> {
        const response = await this.send({
            $type: "requestSessionData"
        }).catch(() => ({ success: false }) as SessionData);

        if (!response.success) return;

        return response;
    }
}
