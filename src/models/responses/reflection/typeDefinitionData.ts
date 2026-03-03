import type { Response, TypeDefinition } from "@/models/index.js";

export interface TypeDefinitionData extends Response {
    $type: "typeDefinitionData";
    success: true;

    /**
     * The structured definition of the type
     */
    definition: TypeDefinition;
}
