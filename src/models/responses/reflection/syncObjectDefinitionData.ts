import type { Response, SyncObjectDefinition } from "@/models/index.js";

export interface SyncObjectDefinitionData extends Response {
    $type: "syncObjectDefinitionData";
    success: true;

    /**
     * Definition of the sync object that was requested
     */
    definition: SyncObjectDefinition;
}
