import {
  Field_bool,
  Field_float3,
  Field_floatQ,
  Field_long,
  Field_string,
  Reference,
  Slot,
} from "../../models";
import { OmitForcefulTypesThing } from "../../utility";
import { Client } from "../client";
import { Base } from "./base";
import { ClientComponent } from "./clientComponent";

export class ClientSlot extends Base {
  ROOT_SLOT_ID = "Root";

  id: string;

  parent: Omit<Reference, "targetType">;
  position: Omit<Field_float3, "id">;
  rotation: Omit<Field_floatQ, "id">;
  scale: Omit<Field_float3, "id">;

  isActive: Omit<Field_bool, "id">;
  isPersistent: Omit<Field_bool, "id">;
  name: Omit<Field_string, "id">;
  tag: Omit<Field_string, "id">;
  orderOffset: Omit<Field_long, "id">;

  childrens: ClientSlot[] = [];
  components: ClientComponent[] = [];

  constructor(client: Client, slot: Slot) {
    super(client);

    this.id = undefined as any;

    this.parent = undefined as any;
    this.position = undefined as any;
    this.rotation = undefined as any;
    this.scale = undefined as any;

    this.isActive = undefined as any;
    this.isPersistent = undefined as any;
    this.name = undefined as any;
    this.tag = undefined as any;
    this.orderOffset = undefined as any;
    this.patch(slot);
  }

  patch(slot: Slot) {
    this.id = slot.id;

    this.parent = slot.parent;
    this.position = slot.position;
    this.rotation = slot.rotation;
    this.scale = slot.scale;

    this.isActive = slot.isActive;
    this.isPersistent = slot.isPersistent;
    this.name = slot.name;
    this.tag = slot.tag;
    this.orderOffset = slot.orderOffset;
    this.childrens = slot.children?.map(
      (s) => new ClientSlot(this.client, s),
    );
    this.components = slot.components?.map(
      (c) => new ClientComponent(this.client, c),
    );
  }

  encode(): OmitForcefulTypesThing<Slot> {
    return {
      ROOT_SLOT_ID: "Root",

      id: this.id,

      parent: this.parent,
      position: this.position,
      rotation: this.rotation,
      scale: this.scale,

      isActive: this.isActive,
      isPersistent: this.isPersistent,
      name: this.name,
      tag: this.tag,
      orderOffset: this.orderOffset,
      children: this.childrens?.map((c) => c.encode()) ?? [],
      components: this.components?.map((c) => c.encode()) ?? [],

      isReferenceOnly: false,
    };
  }

  // methods
  private update() {
    this.client.send({
      $type: "updateSlot",
      data: this.encode(),
    });
  }

  public setName(name: string) {
    this.name.value = name;
    this.update();
  }
}
