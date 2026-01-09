import type { Slot } from "../../../dataModel";
import type { Message } from "../../";

export interface AddUpdateSlotData extends Message {
  /**
   * Data of the slot to set/update.
   * When updating Slot, the ID must be specified.
   * Any fields that are null will be left as is.
   */
  data: Slot;
}

export interface AddSlot extends AddUpdateSlotData {
    $type: "addSlot"
}

export interface UpdateSlot extends AddUpdateSlotData {
    $type: "updateSlot"
}
