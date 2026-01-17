/**
 * Maps vertex to a specific bone with specific height
 */
export interface BoneWeight {
    /**
     * Index of the bone this maps too in the Bones list of the mesh
     */
    boneIndex: number;
    /**
     * Weight from 0...1 that influences how much is this vertex affected by the bone.
     */
    weight: number;
}
