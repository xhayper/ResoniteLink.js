import type {
    Worker,
    Component,
    Field_bool,
    Field_float3,
    Field_floatQ,
    Field_long,
    Field_string,
    Reference
} from "@/models";

export interface Slot extends Worker {
    ROOT_SLOT_ID: "Root";

    parent: Reference;
    position: Field_float3;
    rotation: Field_floatQ;
    scale: Field_float3;

    isActive: Field_bool;
    isPersistent: Field_bool;
    name: Field_string;
    tag: Field_string;
    orderOffset: Field_long;

    /**
     * All the components that belong to this slot.
     */
    components: Component[];
    /**
     * All the children that this slot has
     */
    children: Slot[];
}
