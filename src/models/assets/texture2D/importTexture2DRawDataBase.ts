import type { BinaryPayloadMessage } from "../../messages";

export interface ImportTexture2DRawDataBase extends BinaryPayloadMessage {
  /**
   * Width of the texture
   */
  width: number;
  /**
   * Height of the texture
   */
  height: number;
}
