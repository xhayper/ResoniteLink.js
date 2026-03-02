import type { DataModelOperation } from "@/models";

export interface RemoveComponent extends DataModelOperation {
    $type: "removeComponent";

    /**
     * The ID of the component that's being removed
     */
    componentId: string;
}
