import type { GenericParameter, TypeReference } from "@/models/index.js";

export interface TypeDefinition {
    /**
     * Contains definition of base type of this type if requested and if the base type is relevant to ResoniteLink.
     */
    baseType: TypeReference;

    /**
     * The full type encoded using Resonite's type encoding (which is similar to C# type definitions)
     * Useful for matching the exact types and when providing the type to Resonite when instantiating
     */
    fullTypeName: string;

    /**
     * Name of the assembly that this type is contained in. This is only filled for Resonite data model types.
     */
    assemblyName: string;

    /**
     * Full namespace path where this type is defined
     */
    namespace: string;

    /**
     * Name of the type itself, without namespace or generic arguments
     */
    name: string;

    /**
     * Abstract types cannot ever be instantiated - they are just used as base types for other types
     */
    isAbstract: boolean;

    /**
     * Indicates if this type is an interface
     */
    isInterface: boolean;

    /**
     * Indicates if this is a generic type. Generic types have generic parameters, which allow to substitute different
     * types within the type.
     */
    isGenericType: boolean;

    /**
     * Indicates if this is a definition of a generic type - it represents the "core" type without any generic arguments.
     */
    isGenericTypeDefinition: boolean;

    /**
     * Number of direct generic parameters on this type. This matters primarily for nested types, where the generic parameters/arguments
     * can be spread throughout the base classes.
     */
    directGenericParameterCount: number;

    /**
     * Indicates if this datatype is an engine primitive - one that can be used as value in fields
     */
    isEnginePrimitive: boolean;

    /**
     * Indicates if this represents a value type (e.g. struct)
     */
    isValueType: boolean;

    /**
     * Indicates if this datatype is an enum. You can request details about the enum, including its values separately.
     */
    isEnum: boolean;

    /**
     * Indicates if this type represents a component
     */
    isComponent: boolean;

    /**
     * Indicates if this type represents a sync object
     */
    isSyncObject: boolean;

    /**
     * Indicates if this type represents a world element - a type that can be referenced by the data model
     */
    isWorldElement: boolean;

    /**
     * Indicates if this type is nested within another type definition
     */
    isNested: boolean;

    /**
     * When the type is nested, this contains the name of the type that is declaring this particular type.
     */
    declaringType: string;

    /**
     * For generic types, this lists all the generic arguments for this type when they're provided.
     * If the type represents a generic type definition, it will not include those.
     * This is only populated when the type is a generic type and is NOT a generic type definition.
     */
    genericArguments: TypeReference[];

    /**
     * List of generic parameters and their constraints for generic types.
     * This is only populated for generic types.
     */
    genericParameters: GenericParameter[];

    /**
     * List of interfaces that this type implements. This includes interfaces only specified on the type itself.
     * You will need to check the base type for inherited interfaces.
     */
    interfaces: TypeReference[];
}
