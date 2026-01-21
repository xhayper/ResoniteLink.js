import type { Response } from "@/models";

export interface SessionData extends Response {
    $type: "sessionData";
    success: true;

    /**
     * Version number of Resonite
     */
    resoniteVersion: string;

    /**
     * Version number of ResoniteLink library that Resonite uses
     */
    resoniteLinkVersion: string;

    /**
     * An ID uniquely identifying this ResoniteLink session for a given Resonite session
     * The ID is unique for as long as particular session runs on Resonite's end
     * The ID is NOT guaranteed to be unique for different Resonite worlds with ResoniteLink enabled
     * The ID is NOT guaranteed to be unique when the Resonite world restarts
     * You can use this ID to ensure that any ID's you generate do not conflict with any other
     * ResoniteLink session for a given Resonite world.
     */
    uniqueSessionId: string;
}
