import type { Field } from "..";

export interface Field_Enum extends Field {
  $type: "enum";
  value: string;
  enumType: string;
}
