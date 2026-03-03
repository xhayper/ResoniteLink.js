import type { float2, float3, float4 } from "@/models/index.js";
import type { JsonDerivedType } from "@/utility/index.js";

export interface UV_Coordinate {}

export interface UV2D_Coordinate extends UV_Coordinate {
    $type: "2D";
    uv: float2;
}

export interface UV3D_Coordinate extends UV_Coordinate {
    $type: "3D";
    uv: float3;
}

export interface UV4D_Coordinate extends UV_Coordinate {
    $type: "4D";
    uv: float4;
}

export type UV_Coordinates =
    | JsonDerivedType<UV2D_Coordinate, "2D">
    | JsonDerivedType<UV3D_Coordinate, "3D">
    | JsonDerivedType<UV4D_Coordinate, "4D">;
