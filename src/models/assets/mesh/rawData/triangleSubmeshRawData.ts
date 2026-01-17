import type { SubmeshRawData } from "@/models";

export interface TriangleSubmeshRawData extends SubmeshRawData {
    $type: "triangles";
    /**
     * How many triangles are in this submesh
     */
    triangleCount: number;
}
