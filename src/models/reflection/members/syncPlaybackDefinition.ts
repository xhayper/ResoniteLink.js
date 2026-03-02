import type { MemberDefinition } from "@/models";

/**
 * Represents a playback state.
 */
export interface SyncPlaybackDefinition extends MemberDefinition {
    $type: "playback";

    // There's nothing in here, since sync playback has a fixed definition.
}
