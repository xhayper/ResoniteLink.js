import type { DataModelOperation } from "@/models/index.js";

export interface RemoveSlot extends DataModelOperation {
    $type: "removeSlot";

    /**
     * The ID of the slot to remove.
     */
    slotId: string;
}
