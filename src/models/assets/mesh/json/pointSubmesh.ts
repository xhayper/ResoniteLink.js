import type { Submesh } from "@/models";

export interface PointSubmesh extends Submesh {
    $type: "points";
    /**
     * Indexes of vertices for each point in this submesh.
     */
    vertexIndicies: number[];
}
