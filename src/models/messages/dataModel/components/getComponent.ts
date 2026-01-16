import type { Message } from "../../";

/**
 * Request for full data of a particular component
 */
export interface GetComponent extends Message {
    $type: "getComponent";

    /**
     * The ID of the component that's being fetched
     */
    componentId: string;
}
