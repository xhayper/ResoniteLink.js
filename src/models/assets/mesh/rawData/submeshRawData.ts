import type { PointSubmeshRawData, TriangleSubmeshRawData } from "@/models/index.js";
import type { JsonDerivedType } from "@/utility/index.js";

export interface SubmeshRawData {}

export type ResoniteSubmeshRawData =
    | JsonDerivedType<PointSubmeshRawData, "points">
    | JsonDerivedType<TriangleSubmeshRawData, "triangles">;
