import type { Reference, SyncList, SyncObject, EmptyElement } from ".";
import type { JsonDerivedType } from "../../utility/typing";
import { Field_Enum } from "./fields/field_Enum";

export interface Member {
  $type: string;
  /**
   * Unique ID of this member. Can be used for anything needing to reference this member.
   */
  id: string;
}

export type ResoniteLinkMember =
  | JsonDerivedType<SyncObject, "syncObject">
  | JsonDerivedType<SyncList, "list">
  | JsonDerivedType<Reference, "reference">
  | JsonDerivedType<EmptyElement, "empty">
  | JsonDerivedType<Field_Enum, "enum">;
