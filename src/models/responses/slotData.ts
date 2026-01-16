import type { Slot } from "../dataModel";
import type { Response } from ".";

export interface SlotData extends Response {
    $type: "slotData";

    /**
     * Depth of the requested data (this is same as requested, included for reference).
     */
    depth: number;

    /**
     * The requested slot data
     */
    data: Slot;
}
