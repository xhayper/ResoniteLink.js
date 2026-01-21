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
    ImportMeshRawData
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
    | JsonDerivedType<ImportTexture2DFile, "importTexture2DFile">
    | JsonDerivedType<ImportTexture2DRawData, "importTexture2DRawData">
    | JsonDerivedType<ImportTexture2DRawDataHDR, "importTexture2DRawDataHDR">
    | JsonDerivedType<ImportAudioClipFile, "importAudioClipFile">
    | JsonDerivedType<ImportAudioClipRawData, "importAudioClipRawData">
    | JsonDerivedType<ImportMeshJSON, "importMeshJSON">
    | JsonDerivedType<ImportMeshRawData, "importMeshRawData">
    | JsonDerivedType<RequestSessionData, "requestSessionData">
    | JsonDerivedType<GetSlot, "getSlot">
    | JsonDerivedType<AddSlot, "addSlot">
    | JsonDerivedType<UpdateSlot, "updateSlot">
    | JsonDerivedType<RemoveSlot, "removeSlot">
    | JsonDerivedType<GetComponent, "getComponent">
    | JsonDerivedType<AddComponent, "addComponent">
    | JsonDerivedType<UpdateComponent, "updateComponent">
    | JsonDerivedType<RemoveComponent, "removeComponent">;
