import type { Message } from "./";

/**
 * Represents a message with a binary payload. This payload is sent as a separate WebSocket binary
 * message that follows immediatelly after this one.
 */
export interface BinaryPayloadMessage extends Message {
    /**
     * Doesn't actually exist in JSON, It's required for the ResoniteLink.js library to work
     */
    payload: Uint8Array;
}
