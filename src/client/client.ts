import type { JsonDerivedType, OmitIdentity, OptionalIdentity } from "@/utility";
import { AsyncEventEmitter } from "@vladfrangu/async_event_emitter";
import { ClientComponent, ClientSlot } from "@/client";
import type {
    AssetData,
    ComponentData,
    ResoniteLinkResponse,
    Slot,
    SlotData,
    RequestSessionData,
    ImportAudioClipFile,
    ImportAudioClipRawData,
    ImportTexture2DFile,
    ImportTexture2DRawData,
    ImportTexture2DRawDataHDR,
    GetSlot,
    AddSlot,
    UpdateSlot,
    RemoveSlot,
    GetComponent,
    AddComponent,
    UpdateComponent,
    RemoveComponent,
    ImportMeshJSON,
    ImportMeshRawData,
    SessionData,
    BinaryPayloadMessage
} from "@/models";

type ResontieLinkMessageOptional =
    | JsonDerivedType<OptionalIdentity<ImportTexture2DFile>, "importTexture2DFile">
    | JsonDerivedType<OptionalIdentity<ImportTexture2DRawData>, "importTexture2DRawData">
    | JsonDerivedType<OptionalIdentity<ImportTexture2DRawDataHDR>, "importTexture2DRawDataHDR">
    | JsonDerivedType<OptionalIdentity<ImportAudioClipFile>, "importAudioClipFile">
    | JsonDerivedType<OptionalIdentity<ImportAudioClipRawData>, "importAudioClipRawData">
    | JsonDerivedType<OptionalIdentity<ImportMeshJSON>, "importMeshJSON">
    | JsonDerivedType<OptionalIdentity<ImportMeshRawData>, "importMeshRawData">
    | JsonDerivedType<OptionalIdentity<RequestSessionData>, "requestSessionData">
    | JsonDerivedType<OptionalIdentity<GetSlot>, "getSlot">
    | JsonDerivedType<OptionalIdentity<AddSlot>, "addSlot">
    | JsonDerivedType<OptionalIdentity<UpdateSlot>, "updateSlot">
    | JsonDerivedType<OptionalIdentity<RemoveSlot>, "removeSlot">
    | JsonDerivedType<OptionalIdentity<GetComponent>, "getComponent">
    | JsonDerivedType<OptionalIdentity<AddComponent>, "addComponent">
    | JsonDerivedType<OptionalIdentity<UpdateComponent>, "updateComponent">
    | JsonDerivedType<OptionalIdentity<RemoveComponent>, "removeComponent">;

interface RequestResponseMap {
    importTexture2DFile: AssetData;
    importTexture2DRawData: AssetData;
    importTexture2DRawDataHDR: AssetData;
    importAudioClipFile: AssetData;
    importAudioClipRawData: AssetData;
    importMeshJSON: AssetData;
    importMeshRawData: AssetData;
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

// TODO: Allow for instance to be referenced / cached, instead of creating a new one everytime
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

    async send<const T extends BinaryPayloadMessage>(message: T, payload: ArrayBuffer): Promise<ResponseFor<T>>;
    async send<const T extends ResontieLinkMessageOptional>(message: T): Promise<ResponseFor<T>>;
    async send<const T extends ResontieLinkMessageOptional>(
        message: T,
        payload?: ArrayBuffer
    ): Promise<ResponseFor<T>> {
        const messageId = crypto.randomUUID();

        this.ws?.send(JSON.stringify({ ...message, messageId }));

        if (payload) {
            this.ws?.send(payload as any);
        }

        return new Promise((resolve, reject) => {
            this.promiseMap.set(messageId, { resolve: resolve as any, reject });
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

    public async createSlot(slot: Partial<OmitIdentity<Slot>>, id?: string): Promise<ClientSlot | undefined> {
        const slotId = id ?? `RJS_${crypto.randomUUID()}`;

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

        return response as SessionData;
    }
}
