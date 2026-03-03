import type { color, float3, float4, BoneWeight, UV_Coordinates } from "@/models/index.js";

/**
 * Defines a single vertex of a mesh. Position is mandatory field, but all other properties are optional.
 */
export interface Vertex {
    /**
     * Position of the vertex.
     */
    position: float3;
    /**
     * Normal vector of the vertex
     */
    normal?: float3;
    /**
     * Tangent vector of the vertex. The 4th component indicates direction of the binormal
     *
     * When specifying tangent, it's strongly recommended that normals are specified too.
     */
    tangent?: float4;
    /**
     * Color of the vertex
     */
    color?: color;
    /**
     * UV channel coordinates.
     *
     * Each vertex can have multiple UV channels.
     *
     * Each UV channel can have 2-4 dimensions.
     *
     * The number of channels and dimensions for each MUST be same across all vertices.
     */
    uvs: UV_Coordinates[];
    /**
     * Weights that define how much this vertex is affected by specific bones for skinned meshes.
     *
     * The weights should add up to 1 across all the weights.
     */
    boneWeights: BoneWeight[];
}
