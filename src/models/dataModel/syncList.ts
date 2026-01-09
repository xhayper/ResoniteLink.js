import type { Member } from ".";

export interface SyncList extends Member {
  $type: "list";
  elements: Member[];
}
