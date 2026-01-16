import { ImportAudioClipRawData } from "../assets/audio/importAudioClipRawData";
import { ImportAudioClipFile } from "../assets/audio/importAudioClipFile";
import type { JsonDerivedType, OmitIdentityType } from "../../utility";
import { RequestSessionData } from "./requestSessionData";
import type { ImportTexture2DRawData, ImportTexture2DRawDataHDR, ImportTexture2DFile } from "../assets";
import type {
    AddSlot,
    UpdateSlot,
    RemoveSlot,
    UpdateComponent,
    RemoveComponent,
    GetComponent,
    AddComponent,
    GetSlot
} from "./dataModel";

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
    | JsonDerivedType<OmitIdentityType<RequestSessionData>, "requestSessionData">
    | JsonDerivedType<OmitIdentityType<GetSlot>, "getSlot">
    | JsonDerivedType<OmitIdentityType<AddSlot>, "addSlot">
    | JsonDerivedType<OmitIdentityType<UpdateSlot>, "updateSlot">
    | JsonDerivedType<OmitIdentityType<RemoveSlot>, "removeSlot">
    | JsonDerivedType<OmitIdentityType<GetComponent>, "getComponent">
    | JsonDerivedType<OmitIdentityType<AddComponent>, "addComponent">
    | JsonDerivedType<OmitIdentityType<UpdateComponent>, "updateComponent">
    | JsonDerivedType<OmitIdentityType<RemoveComponent>, "removeComponent">;
