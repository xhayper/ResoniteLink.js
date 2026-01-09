import type { AddSlot, UpdateSlot, RemoveSlot } from "./dataModel";
import type { JsonDerivedType } from "../../utility/typing";
import type {
  ImportTexture2DRawData,
  ImportTexture2DRawDataHDR,
  ImportTexture2DFile,
} from "../assets";
import type {
  UpdateComponent,
  RemoveComponent,
  GetComponent,
  AddComponent,
} from "./dataModel";
import type { GetSlot } from "./dataModel";

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
  | JsonDerivedType<GetSlot, "getSlot">
  | JsonDerivedType<AddSlot, "addSlot">
  | JsonDerivedType<UpdateSlot, "updateSlot">
  | JsonDerivedType<RemoveSlot, "removeSlot">
  | JsonDerivedType<GetComponent, "getComponent">
  | JsonDerivedType<AddComponent, "addComponent">
  | JsonDerivedType<UpdateComponent, "updateComponent">
  | JsonDerivedType<RemoveComponent, "removeComponent">;
