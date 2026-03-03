import type { Field } from "@/models/index.js";

export interface Field_Type extends Field {
    $type: "type";

    /**
     * A data model compatible type encoded into a string.
     * This uses similar format to how types are specified in C#, but specific to FrooxEngine.
     * The encoding is same as you get from the reflection API as well.
     * When setting values, you must take care to use only supported data model types.
     */
    type: string;
}
