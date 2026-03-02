import type { MemberDefinition } from "@/models";

/**
 * Empty members don't contain any data model data, but they can be referenced by other pieces of code.
 * This is often used for linking things, e.g. ProtoFlux nodes.
 */
export interface EmptyMemberDefinition extends MemberDefinition {
    $type: "empty";

    // Nothing needed here. MemberDefinition already contains the type of this member
}
