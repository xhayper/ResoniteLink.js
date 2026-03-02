import type { color, ImportCubemapRawDataBase } from "@/models";

/**
 * Imports cubemap from raw floating point color data, allowing for HDR values.
 * Resonite will take care of encoding the data into a file format.
 */
export interface ImportCubemapRawDataHDR extends ImportCubemapRawDataBase<color> {
    $type: "importCubemapRawDataHDR";
}
