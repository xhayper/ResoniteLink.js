import type { Member } from "@/models/index.js";

export interface SyncObject extends Member {
    $type: "syncObject";

    /**
     * Members (fields, references, lists...) of this sync object and their data
     */
    members: Record<string, Member>;
}
