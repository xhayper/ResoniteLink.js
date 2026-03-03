import type { TypeDefinition, MemberDefinition } from "@/models/index.js";

export interface WorkerDefinition {
    /**
     * Structured type definition of this component. This is particularly important for generic components, as it will
     * contain information about the generic parameters and constraints. These generic parameters need to be substituted
     * for the desired type in the members.
     */
    type: TypeDefinition;

    /**
     * List of all members and their definitions that this container has.
     */
    members: Record<string, MemberDefinition>;
}
