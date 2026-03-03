import type { Submesh } from "@/models/index.js";

export interface PointSubmesh extends Submesh {
    $type: "points";
    /**
     * Indexes of vertices for each point in this submesh.
     */
    vertexIndices: number[];
}
