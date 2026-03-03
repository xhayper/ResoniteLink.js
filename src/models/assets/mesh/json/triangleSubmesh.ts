import type { Submesh, Triangle } from "@/models/index.js";

export interface TriangleSubmesh extends Submesh {
    $type: "triangles";

    /**
     * All the triangles that form this submesh
     */
    triangles: Triangle[];
}
