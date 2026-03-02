import type { Response, EnumDefinition } from "@/models";

export interface EnumDefinitionData extends Response {
    $type: "enumDefinitionData";
    success: true;

    /**
     * The definition of the enum type
     */
    definition: EnumDefinition;
}
