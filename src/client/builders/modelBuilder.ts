import type {
    Component,
    EmptyElement,
    Field,
    Member,
    Reference,
    ResoniteLinkMember,
    SyncDictionary_Enum,
    SyncList,
    SyncObject,
    Worker
} from "@/models/index.js";

export const createComponent = (
    componentType: string,
    members: { [key: string]: ResoniteLinkMember }
): Omit<Component, "id"> => ({
    componentType,
    members,
    isReferenceOnly: false
});

export const createEmptyElement = (): EmptyElement => ({
    $type: "empty"
});

export const createField = ($type: string): Field => ({
    $type
});

export const createMember = ($type: string): Member => ({
    $type
});

export const createReference = (targetId: string, targetType?: string): Omit<Reference, "id"> => ({
    $type: "reference",
    targetId,
    targetType
});

export const createSyncList = (elements: Member[]): SyncList => ({
    $type: "list",
    elements
});

export const createSyncObject = (members: { [key: string]: SyncObject }): SyncObject => ({
    $type: "syncObject",
    members
});

export const createSyncDictionaryEnum = (enumType: string, enums: { [key: string]: string }): SyncDictionary_Enum => ({
    $type: "dictionary<enum>",
    enumType,
    elements: enums
});

export const createWorker = (): Omit<Worker, "id"> => ({
    isReferenceOnly: true
});
