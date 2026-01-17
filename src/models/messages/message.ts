import type { JsonDerivedType, OmitIdentityType } from "@/utility";
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
    | JsonDerivedType<OmitIdentityType<ImportTexture2DFile>, "importTexture2DFile">
    | JsonDerivedType<OmitIdentityType<ImportTexture2DRawData>, "importTexture2DRawData">
    | JsonDerivedType<OmitIdentityType<ImportTexture2DRawDataHDR>, "importTexture2DRawDataHDR">
    | JsonDerivedType<OmitIdentityType<ImportAudioClipFile>, "importAudioClipFile">
    | JsonDerivedType<OmitIdentityType<ImportAudioClipRawData>, "importAudioClipRawData">
    | JsonDerivedType<OmitIdentityType<ImportMeshJSON>, "importMeshJSON">
    | JsonDerivedType<OmitIdentityType<ImportMeshRawData>, "importMeshRawData">
    | JsonDerivedType<OmitIdentityType<RequestSessionData>, "requestSessionData">
    | JsonDerivedType<OmitIdentityType<GetSlot>, "getSlot">
    | JsonDerivedType<OmitIdentityType<AddSlot>, "addSlot">
    | JsonDerivedType<OmitIdentityType<UpdateSlot>, "updateSlot">
    | JsonDerivedType<OmitIdentityType<RemoveSlot>, "removeSlot">
    | JsonDerivedType<OmitIdentityType<GetComponent>, "getComponent">
    | JsonDerivedType<OmitIdentityType<AddComponent>, "addComponent">
    | JsonDerivedType<OmitIdentityType<UpdateComponent>, "updateComponent">
    | JsonDerivedType<OmitIdentityType<RemoveComponent>, "removeComponent">;
