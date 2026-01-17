import type { Message } from "@/models";

/**
 * Import a texture asset from a file on the local file system. Note that this must be a file
 *
 * format supported by Resonite, otherwise this will fail.
 *
 * If you are unsure if the file format is supported, send raw texture data instead.
 */
export interface ImportTexture2DFile extends Message {
    $type: "importTexture2DFile";

    /**
     * Path of the texture file to import
     */
    filePath: string;
}
