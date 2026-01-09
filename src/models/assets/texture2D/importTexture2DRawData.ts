import type { ImportTexture2DRawDataBase } from "../";

// TODO: figure out the unknown type
/**
 * Imports texture from raw 8-bit color data. Resonite will take care of encoding the data into a file format.
 */
export interface ImportTexture2DRawData extends ImportTexture2DRawDataBase<unknown> {
    $type: "importTexture2DRawData"

    /**
     * Color profile of the texture color data
     */
    colorProfile: string
}
