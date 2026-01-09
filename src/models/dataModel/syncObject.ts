import type { Member } from ".";

export interface SyncObject extends Member {
  $type: "syncObject";

  /**
   * Members (fields, references, lists...) of this sync object and their data
   */
  members: { [key: string]: SyncObject };
}
