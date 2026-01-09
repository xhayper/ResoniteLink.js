import type { Component } from "../dataModel";
import type { Response } from "./response";

export interface ComponentData extends Response {
  $type: "componentData";

  /**
   * The requested component data
   */
  data: Component;
}
