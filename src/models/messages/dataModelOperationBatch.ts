import type {
    AddComponent,
    AddSlot,
    GetComponent,
    GetSlot,
    Message,
    RemoveComponent,
    RemoveSlot,
    UpdateComponent,
    UpdateSlot
} from "@/models";
import type { JsonDerivedType } from "@/utility";

/**
 * Batch of individual data model operation messages. All of these are guaranteed to be processed in sequence
 * without any engine updates in between. This can prevent the engine updates or user actions affecting the updated objects.
 * IMPORTANT!!! You can only include messages that derive from DataModelOperation base class.
 * Other message types cannot be batched, as they are not processed in sync with the data model.
 */
export interface DataModelOperationBatch extends Message {
    /**
     * List of data model operation messages that will be processed in sequence.
     * IMPORTANT: These must derive from the DataModelOperation base class.
     */
    operations: ResoniteLinkDataModelOperation[];
}

export type ResoniteLinkDataModelOperation =
    | JsonDerivedType<GetSlot, "getSlot">
    | JsonDerivedType<AddSlot, "addSlot">
    | JsonDerivedType<UpdateSlot, "updateSlot">
    | JsonDerivedType<RemoveSlot, "removeSlot">
    //
    | JsonDerivedType<GetComponent, "getComponent">
    | JsonDerivedType<AddComponent, "addComponent">
    | JsonDerivedType<UpdateComponent, "updateComponent">
    | JsonDerivedType<RemoveComponent, "removeComponent">;
