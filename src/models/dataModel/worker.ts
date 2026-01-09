export interface Worker {
  /**
   * Unique ID of this worker. This can be used to reference it from other places.
   */
  id: string;
  /**
   * When true, this instance doesn't contain full data, but only serves as a reference
   * to this worker existing.
   */
  isReferenceOnly: boolean;
}
