import type { Component, DataModelOperation } from "@/models/index.js";

export interface AddUpdateComponent extends DataModelOperation {
    /**
     * The state of the component data. Any members that are not included will be left as is.
     * When updating the component, the ID must be specified!
     */
    data: Partial<Component>;
}

export interface AddComponent extends AddUpdateComponent {
    $type: "addComponent";

    /**
     * The ID of the Slot that this component should be added to.
     */
    containerSlotId: string;
}

export interface UpdateComponent extends AddUpdateComponent {
    $type: "updateComponent";
    data: Partial<Component> & { id: string };
}
