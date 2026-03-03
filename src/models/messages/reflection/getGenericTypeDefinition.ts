import type { Message } from "@/models/index.js";

/**
 * Requests the generic type definition for a particular generic instance type.
 * E.g. if you have generic type such as MyComponent<int>, this will respond with
 * a type definition that is the generic definition MyComponent<T>
 */
export interface GetGenericTypeDefinition extends Message {
    $type: "getGenericTypeDefinition";

    /**
     * The type of the generic instance for which the generic definition is requested
     */
    genericInstanceType: string;
}
