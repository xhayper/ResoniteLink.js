import type { Member } from "@/models";

export interface SyncList extends Member {
    $type: "list";
    elements: Member[];
}
