import type { WorkerDefinition } from "@/models";

export interface ComponentDefinition extends WorkerDefinition {
    /**
     * Indicates of the base type of this component is also a component and should have its bindings generated.
     * When false, the base type should not be treated like a component anymore.
     */
    baseTypeIsComponent: boolean;

    /**
     * The path where this component is categorized to
     */
    categoryPath: string;
}
