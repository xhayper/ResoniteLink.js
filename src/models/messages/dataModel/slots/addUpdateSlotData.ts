import type { Slot, Message } from "@/models";

export interface AddUpdateSlotData extends Message {
    /**
     * Data of the slot to set/update.
     * When updating Slot, the ID must be specified.
     * Any fields that are null will be left as is.
     */
    data: Partial<Slot>;
}

export interface AddSlot extends AddUpdateSlotData {
    $type: "addSlot";
    data: Partial<Slot>;
}

export interface UpdateSlot extends AddUpdateSlotData {
    $type: "updateSlot";
    data: Partial<Slot> & { id: string };
}
