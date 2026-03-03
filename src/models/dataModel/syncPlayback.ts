import type { Member } from "@/models/index.js";

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
