import type { Submesh, Triangle } from "@/models";

export interface TriangleSubmesh extends Submesh {
    $type: "triangles";

    /**
     * All the triangles that form this submesh
     */
    triangles: Triangle[];
}
