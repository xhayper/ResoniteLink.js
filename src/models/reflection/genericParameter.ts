import type { TypeReference } from "@/models/index.js";

export interface GenericParameter {
    /**
     * Name of the generic parameter. This is used to match up
     */
    name: string;

    /**
     * List of types that this generic parameter must match. These are typically classes/interfaces.
     * Special constraints like struct/unmanaged/class are represented through other properties.
     * They can be combined with types constraints.
     */
    types: TypeReference[];

    /**
     * Requires that this parameter is an unmanaged type
     * See C# documentation for the unmanaged keyword
     */
    unmanaged: boolean;

    /**
     * Requires that this parameter is a struct type
     * See C# documentation for the struct keyword
     */
    struct: boolean;

    /**
     * Requires this parameter to be an enum type
     */
    enum: boolean;

    /**
     * Requires that this parameter is a class type
     * See C# documentation for the struct keyword
     */
    class: boolean;
}
