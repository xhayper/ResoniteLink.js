import type { DataModelOperation } from "@/models/index.js";

/**
 * Request for full data of a particular component
 */
export interface GetComponent extends DataModelOperation {
    $type: "getComponent";

    /**
     * The ID of the component that's being fetched
     */
    componentId: string;
}
