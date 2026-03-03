import type { MemberDefinition, TypeReference } from "@/models/index.js";

export interface FieldDefinition extends MemberDefinition {
    $type: "field";

    /**
     * The datatype of the value this field holds. This will typically be primitive types like float, int, bool, float3 and so on
     * However it can also be a generic parameter for generic container types
     */
    valueType: TypeReference;
}
