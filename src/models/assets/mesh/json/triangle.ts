/**
 * Represents a single triangle of a mesh
 */
export interface Triangle {
    /**
     * Index of the first vertex that forms this triangle
     */
    vertex0Index: number;
    /**
     * Index of the second vertex that forms this triangle
     */
    vertex1Index: number;
    /**
     * Index of the third vertex that forms this triangle
     */
    vertex2Index: number;
}
