export interface BlendShapeFrameRawData {
    /**
     * Position of the frame within the blendshape animation
     *
     * When blendshape has only a single frame, this should be set to 1.0
     *
     * With multiple frames per blendshape, this determines the position at which this set of deltas is fully applied.
     */
    position: number;
}
