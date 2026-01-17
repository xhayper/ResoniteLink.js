import type { JsonDerivedType } from "@/utility";
import type {
    Reference,
    SyncList,
    SyncObject,
    EmptyElement,
    GeneratedPrimitiveType,
    Field_Enum,
    Field_Nullable_Enum
} from "@/models";

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
    | JsonDerivedType<Field_Enum, "enum">
    | JsonDerivedType<Field_Nullable_Enum, "enum?">
    | GeneratedPrimitiveType;
