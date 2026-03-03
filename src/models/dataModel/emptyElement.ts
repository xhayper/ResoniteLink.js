import type { Member } from "@/models/index.js";

export interface EmptyElement extends Member {
    $type: "empty";
}
