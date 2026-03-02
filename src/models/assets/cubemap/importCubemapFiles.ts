import type { Message } from "@/models";

/**
 * Import a cubemap asset from files on the local file system. Note that all image files need
 * to be supported by Resonite, otherwise this will fail.
 * If you are unsure if the file format is supported, send raw texture data instead.
 * Ideally all files should also be same format and size. Otherwise they will be resized
 * to match the largest dimensions, which can lower the quality.
 */
export interface ImportCubemapFiles extends Message {
    $type: "importCubemapFiles";

    /**
     * Path to a texture file representing positive X axis face
     */
    filePathPositiveX: string;

    /**
     * Path to a texture file representing positive Y axis face
     */
    filePathPositiveY: string;

    /**
     * Path to a texture file representing positive Z axis face
     */
    filePathPositiveZ: string;

    /**
     * Path to a texture file representing negative X axis face
     */
    filePathNegativeX: string;

    /**
     * Path to a texture file representing negative Y axis face
     */
    filePathNegativeY: string;

    /**
     * Path to a texture file representing negative Z axis face
     */
    filePathNegativeZ: string;
}
