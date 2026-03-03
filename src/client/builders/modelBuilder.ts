import { createBool, createFloat3, createFloatQ, createLong, createString } from "@/client/index.js";
import type { OmitIdentity } from "@/utility/index.js";
import type {
    Component,
    EmptyElement,
    Field,
    float3,
    floatQ,
    Member,
    Reference,
    ResoniteLinkMember,
    Slot,
    SyncList,
    SyncObject,
    Worker
} from "@/models/index.js";

export const createComponent = (
    componentType: string,
    members: { [key: string]: OmitIdentity<ResoniteLinkMember> }
): OmitIdentity<Component> => ({
    componentType,
    members,
    isReferenceOnly: false
});

export const createEmptyElement = (): OmitIdentity<EmptyElement> => ({
    $type: "empty"
});

export const createField = ($type: string): OmitIdentity<Field> => ({
    $type
});

export const createMember = ($type: string): OmitIdentity<Member> => ({
    $type
});

export const createReference = (targetId: string, targetType?: string): Omit<Reference, "id"> => ({
    $type: "reference",
    targetId,
    targetType
});

export const createSlot = (
    parent: OmitIdentity<Reference>,
    position: float3,
    rotation: floatQ,
    scale: float3,
    isActive: boolean,
    isPresistent: boolean,
    name: string,
    tag: string,
    orderOffset: number,
    components: OmitIdentity<Component>[] = [],
    children: OmitIdentity<Slot>[] = []
): OmitIdentity<Slot> => ({
    parent,
    position: createFloat3(position),
    rotation: createFloatQ(rotation),
    scale: createFloat3(scale),
    isActive: createBool(isActive),
    isPersistent: createBool(isPresistent),
    name: createString(name),
    tag: createString(tag),
    orderOffset: createLong(orderOffset),
    components,
    children,
    isReferenceOnly: false
});

export const createSyncList = (elements: OmitIdentity<Member>[]): OmitIdentity<SyncList> => ({
    $type: "list",
    elements
});

export const createSyncObject = (members: { [key: string]: OmitIdentity<SyncObject> }): OmitIdentity<SyncObject> => ({
    $type: "syncObject",
    members
});

export const createWorker = (): OmitIdentity<Worker> => ({
    isReferenceOnly: true
});
