import type { PointSubmesh, TriangleSubmesh, TriangleSubmeshFlat } from "@/models";
import type { JsonDerivedType } from "@/utility";

export interface Submesh {}

export type ResoniteSubmesh =
    | JsonDerivedType<PointSubmesh, "points">
    | JsonDerivedType<TriangleSubmesh, "triangles">
    | JsonDerivedType<TriangleSubmeshFlat, "trianglesFlat">;
