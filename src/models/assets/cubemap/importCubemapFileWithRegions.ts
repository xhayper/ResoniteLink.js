import type { Message, Rect } from "@/models";

/**
 * Import cubemap asset from a local file system from a single image file with regions specifying location of each face.
 * Note that the image file needs to be supported by Resonite, otherwise this will fail.
 * If you are unsure if the file format is supported, send raw texture data instead.
 * The regions are in normalized coordinates from 0...1 range and will be calculated to actual pixel locations.
 */
export interface ImportCubemapFileWithRegions extends Message {
    $type: "importCubemapFileWithRegions";

    /**
     * Path to a texture file representing the cubemap
     */
    filePath: string;

    /**
     * Normalized region of the image file representing positive X face
     */
    positiveXregion: Rect;

    /**
     * Normalized region of the image file representing positive Y face
     */
    positiveYregion: Rect;

    /**
     * Normalized region of the image file representing positive Z face
     */
    positiveZregion: Rect;

    /**
     * Normalized region of the image file representing negative X face
     */
    negativeXregion: Rect;

    /**
     * Normalized region of the image file representing negative Y face
     */
    negativeYregion: Rect;

    /**
     * Normalized region of the image file representing negative Z face
     */
    negativeZregion: Rect;
}
