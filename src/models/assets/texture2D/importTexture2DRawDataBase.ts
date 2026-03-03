import type { BinaryPayloadMessage } from "@/models/index.js";

export interface ImportTexture2DRawDataBase<C> extends BinaryPayloadMessage {
    /**
     * Width of the texture
     */
    width: number;
    /**
     * Height of the texture
     */
    height: number;
}
