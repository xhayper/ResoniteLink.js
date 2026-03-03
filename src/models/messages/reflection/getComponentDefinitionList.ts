import type { Message } from "@/models/index.js";

export interface GetComponentTypeList extends Message {
    $type: "getComponentTypeList";

    /**
     * The path in the category list that will be returned.
     * Null or empty string will return the root categories.
     * Providing "*" as argument will list ALL components available. Use with caution as this will return a lot of data.
     * Use forward / slashes for separating categories
     */
    categoryPath?: string;
}
