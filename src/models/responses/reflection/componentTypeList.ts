import type { Response } from "@/models";

export interface ComponentTypeList extends Response {
    $type: "componentTypeList";
    success: true;

    /**
     * List of component types in the requested category
     */
    componentTypes: string;
    /**
     * List of subcategories in the requested category
     */
    subcategories: string;
    /**
     * Number of components in the requested category and all subcategories as well
     */
    totalComponentCount: number;
}
