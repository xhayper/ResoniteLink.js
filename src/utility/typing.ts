import type { Member, Message, Reference, Worker } from "@/models";

export type JsonDerivedType<C, T extends string> = C & { $type: T };

// what the fuck is this
type IdentityFields<T> = T extends Reference
    ? "targetType"
    : T extends Member | Worker
      ? "id"
      : T extends Message
        ? "messageId"
        : never;

export type OmitIdentity<T> = T extends readonly (infer U)[]
    ? readonly OmitIdentity<U>[]
    : T extends (infer U)[]
      ? OmitIdentity<U>[]
      : T extends object
        ? { [K in Exclude<keyof T, IdentityFields<T>>]: OmitIdentity<T[K]> }
        : T;

export type OptionalOmitIdentity<T> = T extends readonly (infer U)[]
    ? readonly OptionalOmitIdentity<U>[]
    : T extends (infer U)[]
      ? OptionalOmitIdentity<U>[]
      : T extends object
        ? { [K in Exclude<keyof T, IdentityFields<T>>]?: OptionalOmitIdentity<T[K]> }
        : T;
