import type {
    ArrayDefinition,
    EmptyMemberDefinition,
    FieldDefinition,
    ListDefinition,
    ReferenceDefinition,
    SyncObjectMemberDefinition,
    TypeReference
} from "@/models";
import { JsonDerivedType } from "@/utility";

export interface MemberDefinition {
    $type: string;

    /**
     * The full type of the member itself.
     * It's recommended to use the subtypes as they provide more structured information for various subtypes when possible.
     * The full type is however useful when matching up members for references.
     */
    type: TypeReference;
}

/**
 * A list of all possible response that ResoniteLink can send
 */
export type ResoniteLinkMemberDefinition =
    | JsonDerivedType<FieldDefinition, "field">
    | JsonDerivedType<ReferenceDefinition, "reference">
    | JsonDerivedType<ListDefinition, "list">
    | JsonDerivedType<ArrayDefinition, "array">
    | JsonDerivedType<SyncObjectMemberDefinition, "syncObject">
    | JsonDerivedType<EmptyMemberDefinition, "empty">
    | JsonDerivedType<SyncObjectMemberDefinition, "playback">;
