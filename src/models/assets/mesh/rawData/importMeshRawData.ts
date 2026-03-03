import type { BinaryPayloadMessage, Bone, SubmeshRawData, BlendShapeRawData } from "@/models/index.js";

/**
 * Imports a mesh asset from raw mesh data.
 *
 * This is recommended method to import meshes, as it's a lot more efficient, but can be more difficult to work with.
 */
export interface ImportMeshRawData extends BinaryPayloadMessage {
    $type: "importMeshRawData";

    /**
     * Number of vertices in this mesh.
     */
    vertexCount: number;
    /**
     * Do vertices have normals?
     */
    hasNormals: boolean;
    /**
     * Do vertices have tangents?
     */
    hasTangents: boolean;
    /**
     * Do vertices have colors?
     */
    hasColors: boolean;
    /**
     * How many bone weights does each vertex have.
     *
     * If some vertices have fewer bone weights, use weight of 0 for remainder bindings
     */
    boneWeightCount: number;
    /**
     * Configuration of UV channels for this mesh.
     *
     * Each entry represents one UV channel of the mesh.
     *
     * Number indicates number of UV dimensions. This must be between 2 and 4 (inclusive)
     */
    uvChannelDimensions: number[];
    /**
     * Submeshes that form this mesh. Meshes will typically have at least one submesh.
     */
    submeshes: SubmeshRawData[];
    /**
     * Blendshapes of this mesh.
     *
     * These allow modifying the vertex positions, normals & tangents for animations such as facial expressions.
     */
    blendshapes: BlendShapeRawData[];
    /**
     * Bones of the mesh when data represents a skinned mesh.
     *
     * These will be referred to by their index from vertex data.
     */
    bones: Bone[];
}
