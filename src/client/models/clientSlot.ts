import { Slot } from "../../models";
import { float3, floatQ } from "../../models/dataModel/primitives";
import { OmitIdentityType } from "../../utility";
import { Client } from "../client";
import { Base } from "./base";
import { ClientComponent } from "./clientComponent";
import { ClientComponentReference } from "./clientComponentReference";

export class ClientSlot extends Base {
    ROOT_SLOT_ID = "Root";

    get id() {
        return this._rawSlot.id;
    }

    get parent() {
        return this._rawSlot.parent.targetId;
    }
    get position() {
        return this._rawSlot.position.value;
    }
    get rotation() {
        return this._rawSlot.rotation.value;
    }
    get scale() {
        return this._rawSlot.scale.value;
    }

    get isActive() {
        return this._rawSlot.isActive.value;
    }
    get isPersistent() {
        return this._rawSlot.isPersistent.value;
    }
    get name() {
        return this._rawSlot.name.value;
    }
    get tag() {
        return this._rawSlot.tag.value;
    }
    get orderOffset() {
        return this._rawSlot.orderOffset.value;
    }

    private _rawSlot: Slot;

    childrens: ClientSlot[] = [];
    components: (ClientComponent | ClientComponentReference)[] = [];

    constructor(client: Client, slot: Slot) {
        super(client);
        this._rawSlot = undefined as any;
        this.patch(slot);
    }

    patch(slot: Slot) {
        this._rawSlot = slot;
        this.childrens = (slot.children ?? []).map((s) => new ClientSlot(this.client, s));
        this.components = (slot.components ?? []).map((c) =>
            c.isReferenceOnly ? new ClientComponentReference(this.client, c) : new ClientComponent(this.client, c)
        );
    }

    encode(): Slot {
        return {
            ROOT_SLOT_ID: "Root",

            id: this.id,

            parent: this._rawSlot.parent,
            position: this._rawSlot.position,
            rotation: this._rawSlot.rotation,
            scale: this._rawSlot.scale,

            isActive: this._rawSlot.isActive,
            isPersistent: this._rawSlot.isPersistent,
            name: this._rawSlot.name,
            tag: this._rawSlot.tag,
            orderOffset: this._rawSlot.orderOffset,
            children: this.childrens?.map((c) => c.encode()) ?? [],
            components: this.components?.map((c) => c.encode()) ?? [],

            isReferenceOnly: false
        };
    }

    // Updater

    public async setParent(targetId: string) {
        const response = await this._wrapSuccess(
            this._setField("parent", {
                $type: "reference",
                targetId: targetId
            })
        );

        if (response.success) this._rawSlot.parent.targetId = targetId;
    }

    public async setPosition(position: float3) {
        const response = await this._wrapSuccess(
            this._setField("position", {
                $type: "float3",
                value: position
            })
        );

        if (response.success) this._rawSlot.position.value = position;
    }

    public async setRotation(rotation: floatQ) {
        const response = await this._wrapSuccess(
            this._setField("rotation", {
                $type: "floatQ",
                value: rotation
            })
        );

        if (response.success) this._rawSlot.rotation.value = rotation;
    }

    public async setScale(scale: float3) {
        const response = await this._wrapSuccess(
            this._setField("scale", {
                $type: "float3",
                value: scale
            })
        );

        if (response.success) this._rawSlot.scale.value = scale;
    }

    public async setIsActive(isActive: boolean) {
        const response = await this._wrapSuccess(
            this._setField("isActive", {
                $type: "bool",
                value: isActive
            })
        );

        if (response.success) this._rawSlot.isActive.value = isActive;
    }

    public async setIsPersistent(isPersistent: boolean) {
        const response = await this._wrapSuccess(
            this._setField("isPersistent", {
                $type: "bool",
                value: isPersistent
            })
        );

        if (response.success) this._rawSlot.isPersistent.value = isPersistent;
    }

    public async setName(name: string) {
        const response = await this._wrapSuccess(
            this._setField("name", {
                $type: "string",
                value: name
            })
        );

        if (response.success) this._rawSlot.name.value = name;
    }

    public async setTag(tag: string) {
        const response = await this._wrapSuccess(
            this._setField("tag", {
                $type: "string",
                value: tag
            })
        );

        if (response.success) this._rawSlot.tag.value = tag;
    }

    public async setOrderOffset(orderOffset: number) {
        const response = await this._wrapSuccess(
            this._setField("orderOffset", {
                $type: "long",
                value: orderOffset
            })
        );

        if (response.success) this._rawSlot.orderOffset.value = orderOffset;
    }

    /**
     * Remove ourself
     */
    public async remove() {
        this.client.removeSlot(this._rawSlot.id);
    }

    private _wrapSuccess<T>(s: Promise<T>): Promise<{ success: boolean }> {
        return s.then(() => ({ success: true })).catch(() => ({ success: false }));
    }

    // Util

    private _setField<T extends keyof Slot>(property: T, value: OmitIdentityType<Slot[T]>) {
        return this.client.send({
            $type: "updateSlot",
            data: {
                id: this._rawSlot.id,
                [property]: value
            }
        });
    }
}
