export interface Reference {
    $type: "reference";

    // this fuckin property can single handely cause this project to crumbe down
    // Remove ?:- error
    // HOURS WASTED: 3
    /**
     * Unique ID of this member. Can be used for anything needing to reference this member.
     */
    id?: string;

    /**
     * The ID of the target that this reference should be set to.
     * It's important to note that the target needs to be a valid type - it's up to the
     * caller to ensure that target of correct type is being referenced.
     * Set to Null to set the reference to null.
     */
    targetId: string;

    /**
     * The type of target that this reference accepts.
     * Note: This is only for reference. It does not need to be provided when setting a value.
     * However the target must conform to this type.
     */
    targetType?: string;
}
