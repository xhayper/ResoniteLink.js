import type { SubmeshRawData } from "@/models";

export interface PointSubmeshRawData extends SubmeshRawData {
    $type: "points";

    /**
     * How many points are in this submesh
     */
    pointCount: number;
}
