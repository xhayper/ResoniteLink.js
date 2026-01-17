export interface BlendShapeFrame {
    /**
     * Position of the frame within the blendshape animation
     *
     * When blendshape has only a single frame, this should be set to 1.0
     *
     * With multiple frames per blendshape, this determines the position at which this set of deltas is fully applied.
     */
    position: number;
    /**
     * Delta values for vertex positions of this blendshape frame.
     *
     * Number of deltas MUST match number of vertices
     */
    positionDeltas: number[];
    /**
     * Optional. Delta values for vertex normals of this blendshape frame.
     *
     * Number of deltas MUST match number of vertices
     */
    normalDeltas: number[];
    /**
     * Optional. Delta values for vertex tangents of this blendshape frame.
     *
     * Number of deltas MUST match number of vertices
     */
    tangentDeltas: number[];
}
