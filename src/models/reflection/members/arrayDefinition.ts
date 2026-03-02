import type { MemberDefinition, TypeReference } from "@/models";

export interface ArrayDefinition extends MemberDefinition {
    $type: "array";

    /**
     * The datatype of each element in the array that it holds. Typically primitives like float, int bool, float3 and so on
     * However it can also be a generic parameter for generic container types
     */
    valueType: TypeReference;
}
