import type { ImportTexture2DRawDataBase } from "./";

// TODO: figure out the unknown type
/**
 * Imports texture from raw floating point color data, allowing for HDR values.
 * Resonite will take care of encoding the data into a file format.
 */
export interface ImportTexture2DRawDataHDR extends ImportTexture2DRawDataBase<unknown> {
    $type: "importTexture2DRawDataHDR"
}