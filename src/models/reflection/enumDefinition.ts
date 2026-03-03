import type { TypeDefinition } from "@/models/index.js";

export interface EnumDefinition {
    /**
     * Structured type information of the enum
     */
    type: TypeDefinition;

    /**
     * The backing datatype of this enum. Typically int, but some enums can use byte, short, long and so on.
     */
    backingType: string;

    /**
     * Names of values of this enum and their associated values.
     * Note that there can be multiple names for the same value.
     */
    values: Record<string, number>;

    /**
     * Does this enum represent flags?
     */
    isFlags: boolean;
}
