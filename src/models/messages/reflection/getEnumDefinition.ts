import type { Message } from "@/models";

export interface GetEnumDefinition extends Message {
    $type: "getEnumDefinition";

    /**
     * The datatype of the enum that definition is requested for
     */
    type: string;
}
