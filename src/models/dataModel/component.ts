import type { Worker, ResoniteLinkMember } from ".";

export interface Component extends Worker {
  /**
   * Datatype of the component, specified using Resonite's notation (equivalent to the C# notation)
   * This does not need to be specified when updating existing component, as the type cannot be
   * updated over components lifetime.
   */
  componentType: string;

  /**
   * Members (fields, references, lists...) of this component and their data
   */
  members: { [key: string]: ResoniteLinkMember };
}
