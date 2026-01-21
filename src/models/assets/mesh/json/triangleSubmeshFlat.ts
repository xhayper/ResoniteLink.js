import type { Submesh } from "@/models";

/**
 * A submesh composed of individual triangles.
 *
 * This is an alternate representation and will result in same submesh as TriangleSubmesh
 *
 * With this representation you must take care to provide the indices for each triangle properly.
 *
 * Each triangle requires three indices. Those indices are consecutive.
 */
export interface TriangleSubmeshFlat extends Submesh {
    $type: "trianglesFlat";

    /**
     * Indexes of vertices representing triangles of this mesh.
     *
     * Note that each triangle needs three consecutive indices in this list.
     */
    vertexIndices: number[];
}
