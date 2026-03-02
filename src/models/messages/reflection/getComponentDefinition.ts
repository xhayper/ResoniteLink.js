import type { Message } from "@/models";

export interface GetComponentDefinition extends Message {
    $type: "getComponentDefinition";

    /**
     * The type of the component we're fetching definition for.
     * This MUST be generic type definition for generic components.
     */
    componentType: string;

    /**
     * Flattening component definition will include all base class members in the definition as well.
     * When false, only members declared on the specific type will be returned - you will need to fetch
     * the base types to construct the whole component.
     */
    flattened: boolean;
}
