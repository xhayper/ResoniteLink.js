import type { BinaryPayloadMessage } from "@/models";

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
