import type { Member } from "@/models/index.js";

export interface SyncList extends Member {
    $type: "list";
    elements: Member[];
}
