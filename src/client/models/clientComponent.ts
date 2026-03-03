import type { Component, ResoniteLinkMember } from "@/models/index.js";
import { Client, Base } from "@/client/index.js";

export class ClientComponent extends Base {
    get id() {
        return this._rawComponent.id;
    }

    get componentType() {
        return this._rawComponent.componentType;
    }

    get members() {
        return this._rawComponent.members;
    }

    readonly isReferenceOnly: boolean = false;

    private _rawComponent: Component;

    constructor(client: Client, component: Component) {
        super(client);
        this._rawComponent = undefined as any;
        this.patch(component);
    }

    patch(component: Component) {
        this._rawComponent = component;
    }

    encode(): Component {
        return this._rawComponent;
    }

    //

    // Setters

    public async setMember(name: string, value: ResoniteLinkMember) {
        const response = await this._wrapSuccess(this._setField("members", { [name]: value }));

        if (response.success) this._rawComponent.members = { ...this.members, [name]: value };
    }

    public async setMembers(members: { [name: string]: ResoniteLinkMember }) {
        const response = await this._wrapSuccess(this._setField("members", members));

        if (response.success) this._rawComponent.members = members;
    }

    private _wrapSuccess<T>(s: Promise<T>): Promise<{ success: boolean }> {
        return s.then(() => ({ success: true })).catch(() => ({ success: false }));
    }

    // Util
    private _setField<const T extends keyof Omit<Component, "id">>(property: T, value: Omit<Component, "id">[T]) {
        let data = {} as any;
        data[property] = value;

        return this.client.send({
            $type: "updateComponent",
            data: {
                id: this._rawComponent.id,
                ...data
            }
        });
    }
}
