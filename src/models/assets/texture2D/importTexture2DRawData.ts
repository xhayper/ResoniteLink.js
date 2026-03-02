import type { color32, ImportTexture2DRawDataBase } from "@/models";

/**
 * Imports texture from raw 8-bit color data. Resonite will take care of encoding the data into a file format.
 */
export interface ImportTexture2DRawData extends ImportTexture2DRawDataBase<color32> {
    $type: "importTexture2DRawData";

    /**
     * Color profile of the texture color data
     */
    colorProfile: string;
}
