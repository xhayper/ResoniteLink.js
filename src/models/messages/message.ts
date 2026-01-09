import type { JsonDerivedType, OmitForcefulTypesThing as OmitNonEssentialProperties } from "../../utility";
import type {
  ImportTexture2DRawData,
  ImportTexture2DRawDataHDR,
  ImportTexture2DFile,
} from "../assets";
import type {
  AddSlot,
  UpdateSlot,
  RemoveSlot,
  UpdateComponent,
  RemoveComponent,
  GetComponent,
  AddComponent,
  GetSlot,
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
  | JsonDerivedType<
      OmitNonEssentialProperties<ImportTexture2DFile>,
      "importTexture2DFile"
    >
  | JsonDerivedType<
      OmitNonEssentialProperties<ImportTexture2DRawData>,
      "importTexture2DRawData"
    >
  | JsonDerivedType<
      OmitNonEssentialProperties<ImportTexture2DRawDataHDR>,
      "importTexture2DRawDataHDR"
    >
  | JsonDerivedType<OmitNonEssentialProperties<GetSlot>, "getSlot">
  | JsonDerivedType<OmitNonEssentialProperties<AddSlot>, "addSlot">
  | JsonDerivedType<OmitNonEssentialProperties<UpdateSlot>, "updateSlot">
  | JsonDerivedType<OmitNonEssentialProperties<RemoveSlot>, "removeSlot">
  | JsonDerivedType<OmitNonEssentialProperties<GetComponent>, "getComponent">
  | JsonDerivedType<OmitNonEssentialProperties<AddComponent>, "addComponent">
  | JsonDerivedType<OmitNonEssentialProperties<UpdateComponent>, "updateComponent">
  | JsonDerivedType<OmitNonEssentialProperties<RemoveComponent>, "removeComponent">;
