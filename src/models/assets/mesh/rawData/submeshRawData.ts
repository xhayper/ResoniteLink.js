import type { PointSubmeshRawData, TriangleSubmeshRawData } from "@/models";
import type { JsonDerivedType } from "@/utility";

export interface SubmeshRawData {}

export type ResoniteSubmeshRawData =
    | JsonDerivedType<PointSubmeshRawData, "points">
    | JsonDerivedType<TriangleSubmeshRawData, "triangles">;
