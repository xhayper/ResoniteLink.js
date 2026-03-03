import type { DataModelOperation } from "@/models/index.js";

export interface RemoveComponent extends DataModelOperation {
    $type: "removeComponent";

    /**
     * The ID of the component that's being removed
     */
    componentId: string;
}
