import type { float4x4 } from "@/models";

/**
 * Represents a bone of a mesh
 */
export interface Bone {
    /**
     * Name of the bone.
     *
     * This generally doesn't have much actual function for mesh data, but is useful for references and debugging.
     */
    name: string;
    /**
     * The bind pose of the bone - its default transform in model space.
     *
     * This is essentially the pose of the bone relative to the vertices where the vertices bound to it will be in their original spot.
     */
    bindPose: float4x4;
}
