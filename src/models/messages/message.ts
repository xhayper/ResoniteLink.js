import type { JsonDerivedType } from "@/utility";
import type {
    ImportAudioClipRawData,
    ImportAudioClipFile,
    RequestSessionData,
    ImportTexture2DRawData,
    ImportTexture2DRawDataHDR,
    ImportTexture2DFile,
    AddSlot,
    UpdateSlot,
    RemoveSlot,
    UpdateComponent,
    RemoveComponent,
    GetComponent,
    AddComponent,
    GetSlot,
    ImportMeshJSON,
    ImportMeshRawData,
    GetTypeDefinition,
    GetGenericTypeDefinition,
    GetEnumDefinition,
    GetComponentDefinition,
    GetSyncObjectDefinition,
    GetComponentTypeList,
    DataModelOperationBatch,
    ImportCubemapFiles,
    ImportCubemapFileWithRegions,
    ImportCubemapRawData,
    ImportCubemapRawDataHDR
} from "@/models";

/**
 * Base class for any messages/commands sent to Resonite
 */
export interface Message {
    $type: string;

    /**
     * Unique ID of this message. This can be used to match the response.
     */
    messageId: string;
}

export type ResoniteLinkMessage =
    | JsonDerivedType<RequestSessionData, "requestSessionData">
    //
    | JsonDerivedType<DataModelOperationBatch, "dataModelOperationBatch">
    //
    | JsonDerivedType<GetSlot, "getSlot">
    | JsonDerivedType<AddSlot, "addSlot">
    | JsonDerivedType<UpdateSlot, "updateSlot">
    | JsonDerivedType<RemoveSlot, "removeSlot">
    //
    | JsonDerivedType<GetComponent, "getComponent">
    | JsonDerivedType<AddComponent, "addComponent">
    | JsonDerivedType<UpdateComponent, "updateComponent">
    | JsonDerivedType<RemoveComponent, "removeComponent">
    //
    | JsonDerivedType<ImportTexture2DFile, "importTexture2DFile">
    | JsonDerivedType<ImportTexture2DRawData, "importTexture2DRawData">
    | JsonDerivedType<ImportTexture2DRawDataHDR, "importTexture2DRawDataHDR">
    //
    | JsonDerivedType<ImportCubemapFiles, "importCubemapFiles">
    | JsonDerivedType<ImportCubemapFileWithRegions, "importCubemapFileWithRegions">
    | JsonDerivedType<ImportCubemapRawData, "importCubemapRawData">
    | JsonDerivedType<ImportCubemapRawDataHDR, "importCubemapRawDataHDR">
    //
    | JsonDerivedType<ImportMeshJSON, "importMeshJSON">
    | JsonDerivedType<ImportMeshRawData, "importMeshRawData">
    //
    | JsonDerivedType<ImportAudioClipFile, "importAudioClipFile">
    | JsonDerivedType<ImportAudioClipRawData, "importAudioClipRawData">
    //
    | JsonDerivedType<GetTypeDefinition, "getTypeDefinition">
    | JsonDerivedType<GetGenericTypeDefinition, "getGenericTypeDefinition">
    | JsonDerivedType<GetEnumDefinition, "getEnumDefinition">
    | JsonDerivedType<GetComponentDefinition, "getComponentDefinition">
    | JsonDerivedType<GetSyncObjectDefinition, "getSyncObjectDefinition">
    | JsonDerivedType<GetComponentTypeList, "getComponentTypeList">;
