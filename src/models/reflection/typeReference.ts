/**
 * Represents a reference to another type - typically base type or an interface
 */
export interface TypeReference {
    /**
     * The typename of the referenced type. For generic types, this will always be generic type definition.
     * For generic types the arguments are specified separately.
     */
    type: string;

    /**
     * Indicates that the type represents a generic parameter. This is not a type of its own, but a placeholder that should
     * be replaced with another type when a generic instance is made.
     */
    isGenericParameter: boolean;

    /**
     * For generic referenced types, this is list of generic arguments used.
     * These can be either actual types - or they can be the generic parameters of the derived class.
     * Make sure to check if the name of the generic parameter matches the generic parameters first before trying to get the type definition!
     */
    genericArguments: TypeReference[];
}
