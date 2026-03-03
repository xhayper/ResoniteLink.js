import type { SubmeshRawData } from "@/models/index.js";

export interface PointSubmeshRawData extends SubmeshRawData {
    $type: "points";

    /**
     * How many points are in this submesh
     */
    pointCount: number;
}
