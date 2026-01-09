import type { Member } from ".";

export interface EmptyElement extends Member {
  $type: "empty";
}
