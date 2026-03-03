import type { Component, Response } from "@/models/index.js";

export interface ComponentData extends Response {
    $type: "componentData";
    success: true;
    /**
     * The requested component data
     */
    data: Component;
}
