import { Message } from "@/models/index.js";

/**
 * Represents messages that operate on the data model - either fetching information or modifying it.
 * These messages are synchronized with the update loop of the world as soon as possible before being applied.
 */
export interface DataModelOperation extends Message {}
