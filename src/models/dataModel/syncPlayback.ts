import type { Member } from "@/models/index.js";

/**
 * Represents a playback state (audio, animation and so on).
 * When getting data, all fields will always be populated with the current state.
 * However when setting state, you can set any fields to null, which will preserve their current value.
 * This can be useful to for example change playback state without having to set a specific position or change the loop state.
 * Note that some operations are also not explicit. E.g. setting Play to False, but keeping position is Pause.
 * Setting Play to False and setting Position to 0 is Stop.
 */
export interface SyncPlayback extends Member {
    $type: "playback";

    /**
     * Indicates if playback is currently playing or not (paused)
     */
    play?: boolean | null;

    /**
     * When true the playback loops around
     */
    loop?: boolean | null;

    /**
     * Current position (in seconds) of the playback
     */
    position?: number | null;

    /**
     * Current playback speed
     * Normal speed is 1.0. 2.0 is twice as fast, 0.5 half the speed
     */
    speed?: number | null;
}
