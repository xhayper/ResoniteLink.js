import type { WorkerDefinition } from "@/models";

export interface SyncObjectDefinition extends WorkerDefinition {
    /**
     * Indicates of the base type of this sync object is also a sync object and should have its bindings generated.
     * When false, the base type should not be treated like a sync object anymore.
     */
    baseTypeIsSyncObject: boolean;
}
