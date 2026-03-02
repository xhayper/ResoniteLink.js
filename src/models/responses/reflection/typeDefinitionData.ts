import type { Response, TypeDefinition } from "@/models";

export interface TypeDefinitionData extends Response {
    $type: "typeDefinitionData";
    success: true;

    /**
     * The structured definition of the type
     */
    definition: TypeDefinition;
}
