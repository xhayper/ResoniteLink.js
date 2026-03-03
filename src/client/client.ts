import type { JsonDerivedType } from "@/utility/index.js";
import { BatchOperationBuilder } from "@/client/index.js";
import { EventEmitter } from "eventemitter3";
import type {
    RequestSessionDataInput,
    GetSlotInput,
    AddSlotInput,
    UpdateSlotInput,
    RemoveSlotInput,
    GetComponentInput,
    AddComponentInput,
    UpdateComponentInput,
    RemoveComponentInput,
    ImportTexture2DFileInput,
    ImportTexture2DRawDataInput,
    ImportTexture2DRawDataHDRInput,
    ImportCubemapFilesInput,
    ImportCubemapFileWithRegionsInput,
    ImportCubemapRawDataInput,
    ImportCubemapRawDataHDRInput,
    ImportMeshJSONInput,
    ImportMeshRawDataInput,
    ImportAudioClipFileInput,
    ImportAudioClipRawDataInput,
    GetTypeDefinitionInput,
    GetGenericTypeDefinitionInput,
    GetEnumDefinitionInput,
    GetComponentDefinitionInput,
    GetSyncObjectDefinitionInput,
    GetComponentTypeListInput,
    DataModelOperationBatchInput,
    SlotDataInput,
    ComponentDataInput
} from "@/client/index.js";
import type {
    AssetData,
    ComponentData,
    ResoniteLinkResponse,
    Slot,
    SlotData,
    SessionData,
    TypeDefinitionData,
    EnumDefinitionData,
    ComponentDefinitionData,
    SyncObjectDefinitionData,
    ComponentTypeList,
    Rect,
    Vertex,
    ResoniteSubmesh,
    Bone,
    BlendShape,
    SubmeshRawData,
    BlendShapeRawData,
    ResoniteLinkDataModelOperation,
    BatchResponse,
    Reference
} from "@/models/index.js";

async function resolveWebSocket(): Promise<unknown> {
    if (typeof globalThis.WebSocket === "function") {
        return globalThis.WebSocket;
    }

    // @ts-expect-error
    if (typeof process !== "undefined" && process.versions?.node) {
        // @ts-expect-error
        const mod = await import("ws");
        return mod.default ?? mod.WebSocket ?? mod;
    }

    throw new Error("No WebSocket implementation found in this environment.");
}

type ResoniteLinkBinaryPayloadMessage =
    | JsonDerivedType<ImportTexture2DRawDataInput, "importTexture2DRawData">
    | JsonDerivedType<ImportTexture2DRawDataHDRInput, "importTexture2DRawDataHDR">
    //
    | JsonDerivedType<ImportCubemapRawDataInput, "importCubemapRawData">
    | JsonDerivedType<ImportCubemapRawDataHDRInput, "importCubemapRawDataHDR">
    //
    | JsonDerivedType<ImportMeshRawDataInput, "importMeshRawData">
    //
    | JsonDerivedType<ImportAudioClipRawDataInput, "importAudioClipRawData">;

type ResontieLinkMessageOptional =
    | JsonDerivedType<RequestSessionDataInput, "requestSessionData">
    //
    //
    | JsonDerivedType<DataModelOperationBatchInput, "dataModelOperationBatch">
    //
    //
    | JsonDerivedType<GetSlotInput, "getSlot">
    | JsonDerivedType<AddSlotInput, "addSlot">
    | JsonDerivedType<UpdateSlotInput, "updateSlot">
    | JsonDerivedType<RemoveSlotInput, "removeSlot">
    //
    //
    | JsonDerivedType<GetComponentInput, "getComponent">
    | JsonDerivedType<AddComponentInput, "addComponent">
    | JsonDerivedType<UpdateComponentInput, "updateComponent">
    | JsonDerivedType<RemoveComponentInput, "removeComponent">
    //
    //
    | JsonDerivedType<ImportTexture2DFileInput, "importTexture2DFile">
    | ResoniteLinkBinaryPayloadMessage
    //
    //
    | JsonDerivedType<ImportCubemapFilesInput, "importCubemapFiles">
    | JsonDerivedType<ImportCubemapFileWithRegionsInput, "importCubemapFileWithRegions">
    //
    //
    | JsonDerivedType<ImportMeshJSONInput, "importMeshJSON">
    //
    //
    | JsonDerivedType<ImportAudioClipFileInput, "importAudioClipFile">
    //
    //
    | JsonDerivedType<GetTypeDefinitionInput, "getTypeDefinition">
    | JsonDerivedType<GetGenericTypeDefinitionInput, "getGenericTypeDefinition">
    | JsonDerivedType<GetEnumDefinitionInput, "getEnumDefinition">
    | JsonDerivedType<GetComponentDefinitionInput, "getComponentDefinition">
    | JsonDerivedType<GetSyncObjectDefinitionInput, "getSyncObjectDefinition">
    | JsonDerivedType<GetComponentTypeListInput, "getComponentTypeList">;

interface RequestResponseMap {
    importTexture2DFile: AssetData;
    importTexture2DRawData: AssetData;
    importTexture2DRawDataHDR: AssetData;
    //
    importCubemapFiles: AssetData;
    importCubemapFileWithRegions: AssetData;
    importCubemapRawData: AssetData;
    importCubemapRawDataHDR: AssetData;
    //
    importAudioClipFile: AssetData;
    importAudioClipRawData: AssetData;
    //
    importMeshJSON: AssetData;
    importMeshRawData: AssetData;
    //
    requestSessionData: SessionData;
    //
    getSlot: SlotData;
    //
    getComponent: ComponentData;
    //
    getTypeDefinition: TypeDefinitionData;
    // getGenericTypeDefinition: idk tbh
    getEnumDefinition: EnumDefinitionData;
    getComponentDefinition: ComponentDefinitionData;
    getSyncObjectDefinition: SyncObjectDefinitionData;
    getComponentTypeList: ComponentTypeList;

    dataModelOperationBatch: BatchResponse;
}

type ResponseFor<T extends { $type: string }> = T["$type"] extends keyof RequestResponseMap
    ? RequestResponseMap[T["$type"]]
    : ResoniteLinkResponse;

export type ClientEvents = {
    connected: () => void;
    disconnected: () => void;
    message: (data: ResoniteLinkResponse) => void;
    response: (data: ResoniteLinkResponse) => void;
    error: (error: unknown) => void;
};

export interface ClientOptions {
    host?: string;
    port: number;
}
export class Client extends EventEmitter<ClientEvents> {
    private ws?: any;

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

    async connect() {
        if (this.isConnected) return;

        // can't really have strict typing cuz yknow... well, WebSocket isn't global till node 22
        // @ts-expect-error
        this.ws = new (await resolveWebSocket())(`ws://${this.options.host}:${this.options.port}`);

        this.ws.onmessage = (ev: any) => {
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

        this.ws.onerror = (err: any) => {
            this.emit("error", err);
        };
    }

    disconnect() {
        this.ws?.close();
    }

    async send<const T extends ResoniteLinkBinaryPayloadMessage>(
        message: T,
        payload: ArrayBufferLike
    ): Promise<ResponseFor<T>>;
    async send<const T extends ResontieLinkMessageOptional>(message: T): Promise<ResponseFor<T>>;
    async send<const T extends ResontieLinkMessageOptional>(
        message: T,
        payload?: ArrayBufferLike
    ): Promise<ResponseFor<T>> {
        const messageId = crypto.randomUUID();

        this.ws?.send(JSON.stringify({ ...message, messageId }));

        if (payload) {
            this.ws?.send(payload as any);
        }

        return new Promise((resolve, reject) => {
            this.promiseMap.set(messageId, {
                resolve: resolve as any,
                reject
            });
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
                this.emit("response", d);
            }

            this.emit("message", d);
        } catch (err) {
            this.emit("error", err);
        }
    }

    private async request<T extends ResoniteLinkBinaryPayloadMessage>(
        message: T,
        payload: ArrayBufferLike,
        errorMessage: string
    ): Promise<ResponseFor<T> | undefined>;
    private async request<T extends ResontieLinkMessageOptional>(
        message: T,
        errorMessage: string
    ): Promise<ResponseFor<T> | undefined>;
    private async request<T extends ResontieLinkMessageOptional>(
        message: T,
        errorMessageOrPayload: string | ArrayBufferLike,
        errorMessage?: string
    ): Promise<ResponseFor<T> | undefined> {
        const hasPayload = typeof errorMessageOrPayload !== "string";
        const payload = hasPayload ? errorMessageOrPayload : undefined;
        const errMsg = hasPayload ? errorMessage! : (errorMessageOrPayload as string);

        const response = await (payload ? this.send(message as any, payload) : this.send(message)).catch((err) => {
            this.emit("error", err);
            return { success: false } as any;
        });

        if (!response.success) {
            this.emit("error", new Error(`${errMsg}: ${response.error ?? "Unknown error"}`));
            return;
        }

        return response as ResponseFor<T>;
    }

    public async getSlot(
        id: string,
        options?: { depth?: number; includeComponentData?: boolean }
    ): Promise<Slot | undefined> {
        const response = await this.request(
            {
                $type: "getSlot",
                slotId: id,
                depth: options?.depth ?? 0,
                includeComponentData: options?.includeComponentData ?? false
            },
            `Failed to get slot ${id}`
        );

        return response?.data;
    }

    public async getComponent(id: string): Promise<ComponentData | undefined> {
        return this.request(
            {
                $type: "getComponent",
                componentId: id
            },
            `Failed to get component ${id}`
        );
    }

    public async removeComponent(id: string): Promise<void> {
        await this.send({
            $type: "removeComponent",
            componentId: id
        });
    }

    public async removeSlot(id: string): Promise<void> {
        await this.send({
            $type: "removeSlot",
            slotId: id
        });
    }

    public async createSlot(data: Partial<SlotDataInput>, options?: { id?: string }): Promise<Slot | undefined> {
        const slotId = options?.id ?? `RJS_${crypto.randomUUID()}`;

        const response = await this.request(
            {
                $type: "addSlot",
                data: {
                    id: slotId,
                    ...data
                } as any
            },
            `Failed to create slot ${slotId}`
        );

        if (!response) return;

        return this.getSlot(slotId);
    }

    public async createComponent(
        slotId: string,
        data: Partial<ComponentDataInput>,
        options?: { id?: string }
    ): Promise<ComponentData | undefined> {
        const componentId = options?.id ?? `RJS_${crypto.randomUUID()}`;

        const response = await this.request(
            {
                $type: "addComponent",
                containerSlotId: slotId,
                data: {
                    id: componentId,
                    ...data
                } as any
            },
            `Failed to create component ${componentId}`
        );

        if (!response) return;

        return this.getComponent(componentId);
    }

    public async getSessionData(): Promise<SessionData | undefined> {
        return this.request(
            {
                $type: "requestSessionData"
            },
            "Failed to get session data"
        );
    }

    public async updateSlot(id: string, data: Partial<SlotDataInput>): Promise<void> {
        await this.send({
            $type: "updateSlot",
            data: {
                id,
                ...data
            } as any
        });
    }

    public async updateComponent(id: string, data: Partial<ComponentDataInput>): Promise<void> {
        await this.send({
            $type: "updateComponent",
            data: {
                id,
                ...data
            } as any
        });
    }

    public async importTexture2DFile(filePath: string): Promise<AssetData | undefined> {
        return this.request(
            {
                $type: "importTexture2DFile",
                filePath
            },
            `Failed to import texture2D file ${filePath}`
        );
    }

    public async importTexture2DRawData(
        payload: ArrayBufferLike,
        options: { width: number; height: number; colorProfile: string }
    ): Promise<AssetData | undefined> {
        return this.request(
            {
                $type: "importTexture2DRawData",
                width: options.width,
                height: options.height,
                colorProfile: options.colorProfile
            },
            payload,
            "Failed to import texture2D raw data"
        );
    }

    public async importTexture2DRawDataHDR(
        payload: ArrayBufferLike,
        options: { width: number; height: number }
    ): Promise<AssetData | undefined> {
        return this.request(
            {
                $type: "importTexture2DRawDataHDR",
                width: options.width,
                height: options.height
            },
            payload,
            "Failed to import texture2D HDR raw data"
        );
    }

    public async importCubemapFiles(options: {
        filePathPositiveX: string;
        filePathPositiveY: string;
        filePathPositiveZ: string;
        filePathNegativeX: string;
        filePathNegativeY: string;
        filePathNegativeZ: string;
    }): Promise<AssetData | undefined> {
        return this.request(
            {
                $type: "importCubemapFiles",
                filePathPositiveX: options.filePathPositiveX,
                filePathPositiveY: options.filePathPositiveY,
                filePathPositiveZ: options.filePathPositiveZ,
                filePathNegativeX: options.filePathNegativeX,
                filePathNegativeY: options.filePathNegativeY,
                filePathNegativeZ: options.filePathNegativeZ
            },
            "Failed to import cubemap files"
        );
    }

    public async importCubemapFileWithRegions(options: {
        filePath: string;
        positiveXregion: Rect;
        positiveYregion: Rect;
        positiveZregion: Rect;
        negativeXregion: Rect;
        negativeYregion: Rect;
        negativeZregion: Rect;
    }): Promise<AssetData | undefined> {
        return this.request(
            {
                $type: "importCubemapFileWithRegions",
                filePath: options.filePath,
                positiveXregion: options.positiveXregion,
                positiveYregion: options.positiveYregion,
                positiveZregion: options.positiveZregion,
                negativeXregion: options.negativeXregion,
                negativeYregion: options.negativeYregion,
                negativeZregion: options.negativeZregion
            },
            `Failed to import cubemap file with regions ${options.filePath}`
        );
    }

    public async importCubemapRawData(
        payload: ArrayBufferLike,
        options: { size: number; mipMaps: boolean; colorProfile: string }
    ): Promise<AssetData | undefined> {
        return this.request(
            {
                $type: "importCubemapRawData",
                size: options.size,
                mipMaps: options.mipMaps,
                colorProfile: options.colorProfile
            },
            payload,
            "Failed to import cubemap raw data"
        );
    }

    public async importCubemapRawDataHDR(
        payload: ArrayBufferLike,
        options: { size: number; mipMaps: boolean }
    ): Promise<AssetData | undefined> {
        return this.request(
            {
                $type: "importCubemapRawDataHDR",
                size: options.size,
                mipMaps: options.mipMaps
            },
            payload,
            "Failed to import cubemap HDR raw data"
        );
    }

    public async importMeshJSON(options: {
        vertices: Vertex[];
        submeshes: ResoniteSubmesh[];
        bones: Bone[];
        blendshapes: BlendShape[];
    }): Promise<AssetData | undefined> {
        return this.request(
            {
                $type: "importMeshJSON",
                vertices: options.vertices,
                submeshes: options.submeshes,
                bones: options.bones,
                blendshapes: options.blendshapes
            },
            "Failed to import mesh JSON"
        );
    }

    public async importMeshRawData(
        payload: ArrayBufferLike,
        options: {
            vertexCount: number;
            hasNormals: boolean;
            hasTangents: boolean;
            hasColors: boolean;
            boneWeightCount: number;
            uvChannelDimensions: number[];
            submeshes: SubmeshRawData[];
            blendshapes: BlendShapeRawData[];
            bones: Bone[];
        }
    ): Promise<AssetData | undefined> {
        return this.request(
            {
                $type: "importMeshRawData",
                vertexCount: options.vertexCount,
                hasNormals: options.hasNormals,
                hasTangents: options.hasTangents,
                hasColors: options.hasColors,
                boneWeightCount: options.boneWeightCount,
                uvChannelDimensions: options.uvChannelDimensions,
                submeshes: options.submeshes,
                blendshapes: options.blendshapes,
                bones: options.bones
            },
            payload,
            "Failed to import mesh raw data"
        );
    }

    public async importAudioClipFile(filePath: string): Promise<AssetData | undefined> {
        return this.request(
            {
                $type: "importAudioClipFile",
                filePath
            },
            `Failed to import audio clip file ${filePath}`
        );
    }

    public async importAudioClipRawData(
        payload: ArrayBufferLike,
        options: { sampleCount: number; sampleRate: number; channelCount: number }
    ): Promise<AssetData | undefined> {
        return this.request(
            {
                $type: "importAudioClipRawData",
                sampleCount: options.sampleCount,
                sampleRate: options.sampleRate,
                channelCount: options.channelCount
            },
            payload,
            "Failed to import audio clip raw data"
        );
    }

    public async getTypeDefinition(type: string): Promise<TypeDefinitionData | undefined> {
        return this.request(
            {
                $type: "getTypeDefinition",
                type
            },
            `Failed to get type definition for ${type}`
        );
    }

    public async getGenericTypeDefinition(genericInstanceType: string): Promise<ResoniteLinkResponse> {
        return await this.send({
            $type: "getGenericTypeDefinition",
            genericInstanceType
        });
    }

    public async getEnumDefinition(type: string): Promise<EnumDefinitionData | undefined> {
        return this.request(
            {
                $type: "getEnumDefinition",
                type
            },
            `Failed to get enum definition for ${type}`
        );
    }

    public async getComponentDefinition(
        componentType: string,
        options?: { flattened?: boolean }
    ): Promise<ComponentDefinitionData | undefined> {
        return this.request(
            {
                $type: "getComponentDefinition",
                componentType,
                flattened: options?.flattened ?? true
            },
            `Failed to get component definition for ${componentType}`
        );
    }

    public async getSyncObjectDefinition(
        syncObjectType: string,
        options?: { flattened?: boolean }
    ): Promise<SyncObjectDefinitionData | undefined> {
        return this.request(
            {
                $type: "getSyncObjectDefinition",
                syncObjectType,
                flattened: options?.flattened ?? true
            },
            `Failed to get sync object definition for ${syncObjectType}`
        );
    }

    public async getComponentTypeList(options?: { categoryPath?: string }): Promise<ComponentTypeList | undefined> {
        return this.request(
            {
                $type: "getComponentTypeList",
                categoryPath: options?.categoryPath
            },
            "Failed to get component type list"
        );
    }

    public async sendDataModelOperationBatch(
        operations: ResoniteLinkDataModelOperation[]
    ): Promise<BatchResponse | undefined> {
        if (operations.length === 0) {
            this.emit("error", new Error("Batch operations array cannot be empty"));
            return undefined;
        }

        return this.request(
            {
                $type: "dataModelOperationBatch",
                operations
            },
            "Failed to send data model operation batch"
        );
    }

    public batch(): BatchOperationBuilder {
        return new BatchOperationBuilder(this);
    }

    public slots(): BatchOperationBuilder {
        return this.batch();
    }

    public components(): BatchOperationBuilder {
        return this.batch();
    }
}
