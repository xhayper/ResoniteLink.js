import type { Message } from "@/models";

export interface GetTypeDefinition extends Message {
    $type: "getTypeDefinition";

    /**
     * Full name of the type that we are requesting definition for
     * This can be both a generic type definition or a specific constructed generic type.
     */
    type: string;
}
