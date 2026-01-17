export interface BlendShapeRawData {
    /**
     * Name of the Blendshape
     */
    name: string;
    /**
     * Indicates if this blendshape frame has normal deltas
     */
    hasNormalDeltas: boolean;
    /**
     * Indicates if this blendshape frame has tangent deltas
     */
    hasTangentDeltas: boolean;
    /**
     * Frames that compose this blendshape
     *
     * Blendshapes need at least 1 frame
     */
    frames: BlendShapeRawData[];
}
