import type { MemberDefinition, ResoniteLinkMemberDefinition } from "@/models";

export interface ListDefinition extends MemberDefinition {
    $type: "list";

    /**
     * Definition of the elements in this list. Lists contain other members as their elements, all of the same type.
     */
    elementDefinition: ResoniteLinkMemberDefinition;
}
