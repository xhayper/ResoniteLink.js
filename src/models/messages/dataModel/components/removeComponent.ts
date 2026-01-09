import type { Message } from "../../";

export interface RemoveComponent extends Message {
  $type: "removeComponent";

  /**
   * The ID of the component that's being removed
   */
  componentId: string;
}
