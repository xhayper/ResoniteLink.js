import type { Response, ResoniteLinkResponse } from "@/models";

/**
 * Represents a response to a batch of messages, e.g DataModelOperationBatch, containing individual responses to each.
 * IMPORTANT: Note that Success on this message itself only indicates that the batch itself was processed successfully,
 * but not necessarily that each individual message has succeeded. You need to check each individual response for this.
 */
export interface BatchResponse extends Response {
    $type: "batchResponse";
    success: true;

    /**
     * List of individual responses for a MessageBatch
     */
    responsess: ResoniteLinkResponse[];
}
