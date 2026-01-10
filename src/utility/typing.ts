import { Field, Reference } from "../models";

export type JsonDerivedType<C, T extends string> = C & { $type: T };

// what the fuck is this
export type OmitIdentityType<T> = T extends Reference
  ? Omit<T, "targetType">
  : T extends Field
    ? Omit<T, "id">
    : T extends readonly (infer U)[]
      ? readonly OmitIdentityType<U>[]
      : T extends (infer U)[]
        ? OmitIdentityType<U>[]
        : T extends object
          ? { [K in keyof T]: OmitIdentityType<T[K]> }
          : T;
