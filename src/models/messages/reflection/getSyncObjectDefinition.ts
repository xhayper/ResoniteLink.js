import type { Message } from "@/models/index.js";

export interface GetSyncObjectDefinition extends Message {
    $type: "getSyncObjectDefinition";

    /**
     * The type of the sync object we're fetching definition for.
     * This MUST be generic type definition for generic sync objects.
     */
    syncObjectType: string;

    /**
     * Flattening sync object definition will include all base class members in the definition as well.
     * When false, only members declared on the specific type will be returned - you will need to fetch
     * the base types to construct the whole sync object.
     */
    flattened: boolean;
}
