import type { Response } from "@/models";

export interface NewEntityId extends Response {
    $type: "newEntityId";
    success: true;

    /**
     * ID of the newly created entity. This can be useful if you're letting Resonite allocate the ID
     * You can then use this to fetch the created entity back.
     */
    entityId: string;
}
