import type { JsonDerivedType } from "@/utility/index.js";
import type {
    Reference,
    SyncDictionary_Enum,
    SyncList,
    SyncObject,
    EmptyElement,
    GeneratedPrimitiveType,
    Field_Enum,
    Field_Nullable_Enum,
    Field_Type,
    SyncPlayback
} from "@/models/index.js";

export interface Member {
    $type: string;
    /**
     * Unique ID of this member. Can be used for anything needing to reference this member.
     */
    id?: string;
}

export type ResoniteLinkMember =
    | JsonDerivedType<EmptyElement, "empty">
    | JsonDerivedType<Field_Type, "type">
    | JsonDerivedType<Field_Enum, "enum">
    | JsonDerivedType<Field_Nullable_Enum, "enum?">
    | JsonDerivedType<Reference, "reference">
    | JsonDerivedType<SyncList, "list">
    | JsonDerivedType<SyncDictionary_Enum, "dictionary<enum>">
    | JsonDerivedType<SyncObject, "syncObject">
    | JsonDerivedType<SyncPlayback, "playback">
    | GeneratedPrimitiveType;
