import { Field, Reference } from "../models";

export type JsonDerivedType<C, T extends string> = C & { $type: T };

// what the fuck is this
export type OmitForcefulTypesThing<T> = T extends Reference
  ? Omit<T, "targetType">
  : T extends Field
    ? Omit<T, "id">
    : T extends readonly (infer U)[]
      ? readonly OmitForcefulTypesThing<U>[]
      : T extends (infer U)[]
        ? OmitForcefulTypesThing<U>[]
        : T extends object
          ? { [K in keyof T]: OmitForcefulTypesThing<T[K]> }
          : T;
