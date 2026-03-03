import type { Response, Slot } from "@/models/index.js";

export interface SlotData extends Response {
    $type: "slotData";
    success: true;

    /**
     * Depth of the requested data (this is same as requested, included for reference).
     */
    depth: number;

    /**
     * The requested slot data
     */
    data: Slot;
}
