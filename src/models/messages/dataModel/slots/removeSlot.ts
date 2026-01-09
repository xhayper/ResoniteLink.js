import type { Message } from "../../";

export interface RemoveSlot extends Message {
  $type: "removeSlot";

  /**
   * The ID of the slot to remove.
   */
  slotId: string;
}
