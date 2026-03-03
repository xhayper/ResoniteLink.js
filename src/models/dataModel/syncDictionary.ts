import type { Member } from "@/models/index.js";

export interface SyncDictionary extends Member {
    $type: string;

    elements: Record<string, unknown>;
}

export interface SyncDictionary_Enum extends SyncDictionary {
    $type: "dictionary<enum>";

    enumType: string;
    elements: Record<string, string>;
}
