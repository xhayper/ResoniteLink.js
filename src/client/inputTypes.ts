import type {
    AddComponent,
    AddSlot,
    GetComponent,
    GetSlot,
    RemoveComponent,
    RemoveSlot,
    UpdateComponent,
    UpdateSlot,
    RequestSessionData,
    ImportTexture2DFile,
    ImportTexture2DRawData,
    ImportTexture2DRawDataHDR,
    ImportCubemapFiles,
    ImportCubemapFileWithRegions,
    ImportCubemapRawData,
    ImportCubemapRawDataHDR,
    ImportMeshJSON,
    ImportMeshRawData,
    ImportAudioClipFile,
    ImportAudioClipRawData,
    GetTypeDefinition,
    GetGenericTypeDefinition,
    GetEnumDefinition,
    GetComponentDefinition,
    GetSyncObjectDefinition,
    GetComponentTypeList,
    DataModelOperationBatch,
    Slot,
    Component
} from "@/models/index.js";

export type RequestSessionDataInput = Omit<RequestSessionData, "messageId">;

export type GetSlotInput = Omit<GetSlot, "messageId">;
export type AddSlotInput = Omit<AddSlot, "messageId">;
export type UpdateSlotInput = Omit<UpdateSlot, "messageId">;
export type RemoveSlotInput = Omit<RemoveSlot, "messageId">;

export type GetComponentInput = Omit<GetComponent, "messageId">;
export type AddComponentInput = Omit<AddComponent, "messageId">;
export type UpdateComponentInput = Omit<UpdateComponent, "messageId">;
export type RemoveComponentInput = Omit<RemoveComponent, "messageId">;

export type ImportTexture2DFileInput = Omit<ImportTexture2DFile, "messageId">;
export type ImportTexture2DRawDataInput = Omit<ImportTexture2DRawData, "messageId">;
export type ImportTexture2DRawDataHDRInput = Omit<ImportTexture2DRawDataHDR, "messageId">;

export type ImportCubemapFilesInput = Omit<ImportCubemapFiles, "messageId">;
export type ImportCubemapFileWithRegionsInput = Omit<ImportCubemapFileWithRegions, "messageId">;
export type ImportCubemapRawDataInput = Omit<ImportCubemapRawData, "messageId">;
export type ImportCubemapRawDataHDRInput = Omit<ImportCubemapRawDataHDR, "messageId">;

export type ImportMeshJSONInput = Omit<ImportMeshJSON, "messageId">;
export type ImportMeshRawDataInput = Omit<ImportMeshRawData, "messageId">;

export type ImportAudioClipFileInput = Omit<ImportAudioClipFile, "messageId">;
export type ImportAudioClipRawDataInput = Omit<ImportAudioClipRawData, "messageId">;

export type GetTypeDefinitionInput = Omit<GetTypeDefinition, "messageId">;
export type GetGenericTypeDefinitionInput = Omit<GetGenericTypeDefinition, "messageId">;
export type GetEnumDefinitionInput = Omit<GetEnumDefinition, "messageId">;
export type GetComponentDefinitionInput = Omit<GetComponentDefinition, "messageId">;
export type GetSyncObjectDefinitionInput = Omit<GetSyncObjectDefinition, "messageId">;
export type GetComponentTypeListInput = Omit<GetComponentTypeList, "messageId">;

export type DataModelOperationBatchInput = Omit<DataModelOperationBatch, "messageId">;

export type SlotDataInput = Omit<Slot, "id" | "isReferenceOnly">;
export type ComponentDataInput = Omit<Component, "id" | "isReferenceOnly">;
