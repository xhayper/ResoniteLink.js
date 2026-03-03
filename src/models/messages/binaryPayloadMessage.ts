import type { Message } from "@/models/index.js";

/**
 * Represents a message with a binary payload. This payload is sent as a separate WebSocket binary
 * message that follows immediatelly after this one.
 */
export interface BinaryPayloadMessage extends Message {}
