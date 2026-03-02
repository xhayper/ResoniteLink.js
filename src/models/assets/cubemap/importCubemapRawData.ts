import type { color32, ImportCubemapRawDataBase } from "@/models";

export interface ImportCubemapRawData extends ImportCubemapRawDataBase<color32> {
    $type: "importCubemapRawData";

    /**
     * Imports cubemap from raw 8-bit color data. Resonite will take care of encoding the data into a file format.
     */

    /**
     * Color profile of the cubemap color data
     */
    colorProfile: string;
}
