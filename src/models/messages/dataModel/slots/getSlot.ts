import type { Message } from "@/models";

export interface GetSlot extends Message {
    $type: "getSlot";

    /**
     * Unique ID of the slot we're requesting data for.
     *
     * Special case: "Root" will fetch the root slot of the world.
     */
    slotId: string;

    /**
     * How deep to fetch the hierarchy.
     *
     * Value of 0 will fetch only the requested slot fully.
     *
     * Value of 1 will fully fetch the immediate children.
     *
     * Value of -1 will fetch everything fully.
     *
     * Any immediate children of slots beyond this depth will be fetched as references only.
     */
    depth: number;

    /**
     * Indicates if components should be fetched fully with all their data or only as references.
     *
     * Set to False if you plan on fetching the individual component data later.
     */
    includeComponentData: boolean;
}
