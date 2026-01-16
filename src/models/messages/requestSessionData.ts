import type { Message } from "./";

/**
 * Requests session data of the current ResoniteLink session.
 * This will make Resonite send back SessionData response.
 */
export interface RequestSessionData extends Message {
    $type: "requestSessionData";
}
