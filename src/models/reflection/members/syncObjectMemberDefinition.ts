import type { MemberDefinition } from "@/models/index.js";

/**
 * SyncObjects are entities that are members of a container (like a component), which contain their own members.
 * This indicates that a sync member is embedded as a member.
 */
export interface SyncObjectMemberDefinition extends MemberDefinition {
    $type: "syncObject";

    // Nothing needed here specifically. MemberDefinition already contains the Type, which is the type of the sync object
}
