import type { Response } from "./response";

export interface AssetData extends Response {
  $type: "assetData";
  /**
   * URL of the imported asset. This can be assigned to static asset providers.
   *
   * Note: Usually this URL is valid only within the session. It is NOT recommended to persist it outside of the ResoniteLink session - static asset providers will automatically update the URL when the world/item is saved.
   */
  assetURL: string;
}
