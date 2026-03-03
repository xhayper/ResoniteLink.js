import type { BlendShapeFrame } from "@/models/index.js";

export interface BlendShape {
    /**
     * Name of the Blendshape
     */
    name: string;
    /**
     * Frames that compose this blendshape
     *
     * Blendshapes need at least 1 frame
     */
    frames: BlendShapeFrame[];
}
