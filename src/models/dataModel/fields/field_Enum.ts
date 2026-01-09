import type { Field } from "..";

export interface Field_Enum extends Field {
  value: string;
  string: string;
  valueType: "enum";
}
