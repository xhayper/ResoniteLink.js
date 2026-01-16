import type { AssetData, ComponentData, SlotData } from ".";
import type { JsonDerivedType } from "../../utility";
import { SessionData } from "./sessionData";

/**
 * Response from Resonite to a message that has been sent. This can simply indicate success/failure or contain response data when requested.
 */
export interface Response {
    $type: string;
    /**
     * Unique ID of the message that this response is to.
     */
    sourceMessageId: string;
    /**
     * Indicates if the request succeeded or failed. When false, check the error.
     */
    success: boolean;
    /**
     * Contains details on why the request failed.
     */
    errorInfo: string;
}

/**
 * A list of all possible response that ResoniteLink can send
 */
export type ResoniteLinkResponse =
    | JsonDerivedType<AssetData, "assetData">
    | JsonDerivedType<ComponentData, "componentData">
    | JsonDerivedType<SessionData, "sessionData">
    | JsonDerivedType<SlotData, "slotData">;
