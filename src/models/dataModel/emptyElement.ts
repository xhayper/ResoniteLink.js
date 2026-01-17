import type { Member } from "@/models";

export interface EmptyElement extends Member {
    $type: "empty";
}
