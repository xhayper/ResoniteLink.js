import type { PointSubmesh, TriangleSubmesh, TriangleSubmeshFlat } from "@/models/index.js";
import type { JsonDerivedType } from "@/utility/index.js";

export interface Submesh {}

export type ResoniteSubmesh =
    | JsonDerivedType<PointSubmesh, "points">
    | JsonDerivedType<TriangleSubmesh, "triangles">
    | JsonDerivedType<TriangleSubmeshFlat, "trianglesFlat">;
