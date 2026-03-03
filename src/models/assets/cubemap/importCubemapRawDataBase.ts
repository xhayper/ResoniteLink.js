import type { BinaryPayloadMessage } from "@/models/index.js";

export interface ImportCubemapRawDataBase<C> extends BinaryPayloadMessage {
    /**
     * Size of each face. All faces are square
     */
    size: number;

    /**
     * Whether mipmap data is included or not.
     */
    mipMaps: boolean;
}
