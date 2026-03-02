import type { Response, ComponentDefinition } from "@/models";

export interface ComponentDefinitionData extends Response {
    $type: "componentDefinitionData";
    success: true;

    /**
     * Definition of the component that was requested
     */
    definition: ComponentDefinition;
}
