import type { MemberDefinition, TypeReference } from "@/models";

export interface ReferenceDefinition extends MemberDefinition {
    $type: "reference";

    /**
     * Datatype of the target of this reference. This is a full type reference, so it can contain other generic arguments/parameters.
     */
    targetType: TypeReference;
}
