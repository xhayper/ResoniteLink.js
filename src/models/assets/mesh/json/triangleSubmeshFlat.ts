import type { Submesh } from "@/models";

/**
 * A submesh composed of individual triangles.
 *
 * This is an alternate representation and will result in same submesh as TriangleSubmesh
 *
 * With this representation you must take care to provide the indicies for each triangle properly.
 *
 * Each triangle requires three indicies. Those indicies are consecutive.
 */
export interface TriangleSubmeshFlat extends Submesh {
    $type: "trianglesFlat";

    /**
     * Indexes of vertices representing triangles of this mesh.
     *
     * Note that each triangle needs three consecutive indicies in this list.
     */
    vertexIndicies: number[];
}
