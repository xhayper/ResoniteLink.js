import type { Message, BlendShape, Bone, ResoniteSubmesh, Vertex } from "@/models";

export interface ImportMeshJSON extends Message {
    $type: "importMeshJSON";

    /**
     * Vertices of this mesh. These are shared across sub-meshes
     */
    vertices: Vertex[];
    /**
     * List of submeshes (points, triangles...) representing this mesh.
     *
     * Meshes will typically have at least one submesh.
     *
     * Each submesh uses indices of the vertices for its primitives.
     */
    submeshes: ResoniteSubmesh[];
    /**
     * Bones of the mesh when data represents a skinned mesh.
     *
     * These will be referred to by their index from vertex data.
     */
    bones: Bone[];
    /**
     * Blendshapes of this mesh.
     *
     * These allow modifying the vertex positions, normals & tangents for animations such as facial expressions.
     */
    blendshapes: BlendShape[];
}
