import type { MemberDefinition, ResoniteLinkMemberDefinition, TypeReference } from "@/models/index.js";

export interface DictionaryDefinition extends MemberDefinition {
    $type: "dictionary";

    /**
     * Datatype of the key used for the dictionary. This is typically only engine primitives. Most commonly string.
     */
    keyType: TypeReference;

    /**
     * Definition of the elements in this dictionary. Dictionaries contain other members as their elements, all of the same type.
     */
    elementDefinition: ResoniteLinkMemberDefinition;
}
