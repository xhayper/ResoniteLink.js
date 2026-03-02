import type { DataModelOperation } from "@/models";

export interface RemoveSlot extends DataModelOperation {
    $type: "removeSlot";

    /**
     * The ID of the slot to remove.
     */
    slotId: string;
}
