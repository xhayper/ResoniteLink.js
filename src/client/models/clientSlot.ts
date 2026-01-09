import { Slot } from "../../models";
import { Client } from "../client";
import { Base } from "./base";
import { ClientComponent } from "./clientComponent";

export class ClientSlot extends Base {
  ROOT_SLOT_ID = "Root";

  //TODO: Type these plz
  parent?: ClientSlot | undefined;
  position: unknown;
  rotation: unknown;
  scale: unknown;

  isActive: boolean;
  isPresistent: boolean;
  isReferenceOnly: boolean;
  name: string;
  tag: string;
  orderOffset: number;

  childrens: ClientSlot[] = [];
  components: ClientComponent[] = [];

  constructor(client: Client, slot: Slot, parent?: Slot) {
    super(client);

    this.parent = parent
      ? this.client.slotManager.getOrCreate(parent)
      : this.client.slotManager.getFromReference(slot.parent);

    this.isActive = undefined as any;
    this.isPresistent = undefined as any;
    this.isReferenceOnly = undefined as any;
    this.name = undefined as any;
    this.tag = undefined as any;
    this.orderOffset = undefined as any;
    this.patch(slot);
  }

  patch(slot: Slot) {
    this.position = slot.position.value;
    this.rotation = slot.rotation.value;
    this.scale = slot.scale.value;
    this.isActive = slot.isActive.value;
    this.isPresistent = slot.isPersistent.value;
    this.isReferenceOnly = slot.isReferenceOnly;
    this.tag = slot.tag.value;
    this.childrens = slot.children.map(this.client.slotManager.getOrCreate);
    this.components = slot.components.map(
      this.client.componentManager.getOrCreate,
    );
  }
}
