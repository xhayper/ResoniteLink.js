import type { ImportTexture2DRawDataBase } from "@/models";

/**
 * Imports texture from raw floating point color data, allowing for HDR values.
 * Resonite will take care of encoding the data into a file format.
 */
export interface ImportTexture2DRawDataHDR extends ImportTexture2DRawDataBase {
    $type: "importTexture2DRawDataHDR";
}
