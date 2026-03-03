import type { color, ImportTexture2DRawDataBase } from "@/models/index.js";

/**
 * Imports texture from raw floating point color data, allowing for HDR values.
 * Resonite will take care of encoding the data into a file format.
 */
export interface ImportTexture2DRawDataHDR extends ImportTexture2DRawDataBase<color> {
    $type: "importTexture2DRawDataHDR";
}
