import type { SlotDataInput, ComponentDataInput, Client } from "@/client/index.js";
import type {
    ResoniteLinkDataModelOperation,
    BatchResponse,
    AddComponent,
    AddSlot,
    GetComponent,
    GetSlot,
    RemoveComponent,
    RemoveSlot,
    UpdateComponent,
    UpdateSlot
} from "@/models/index.js";

export class BatchOperationBuilder {
    private operations: ResoniteLinkDataModelOperation[] = [];
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    getSlot(id: string, options?: { depth?: number; includeComponentData?: boolean }) {
        this.operations.push({
            $type: "getSlot",
            slotId: id,
            depth: options?.depth ?? 0,
            includeComponentData: options?.includeComponentData ?? false
        } as GetSlot);
        return this;
    }

    addSlot(data: Partial<SlotDataInput>, options?: { id?: string }) {
        this.operations.push({
            $type: "addSlot",
            data: { id: options?.id ?? `RJS_${crypto.randomUUID()}`, ...data }
        } as AddSlot);
        return this;
    }

    updateSlot(id: string, data: Partial<SlotDataInput>) {
        this.operations.push({
            $type: "updateSlot",
            data: { id, ...data }
        } as UpdateSlot);
        return this;
    }

    removeSlot(id: string) {
        this.operations.push({
            $type: "removeSlot",
            slotId: id
        } as RemoveSlot);
        return this;
    }

    getComponent(id: string) {
        this.operations.push({
            $type: "getComponent",
            componentId: id
        } as GetComponent);
        return this;
    }

    addComponent(slotId: string, data: Partial<ComponentDataInput>, options?: { id?: string }) {
        this.operations.push({
            $type: "addComponent",
            containerSlotId: slotId,
            data: { id: options?.id ?? `RJS_${crypto.randomUUID()}`, ...data }
        } as AddComponent);
        return this;
    }

    updateComponent(id: string, data: Partial<ComponentDataInput>) {
        this.operations.push({
            $type: "updateComponent",
            data: { id, ...data }
        } as UpdateComponent);
        return this;
    }

    removeComponent(id: string) {
        this.operations.push({
            $type: "removeComponent",
            componentId: id
        } as RemoveComponent);
        return this;
    }

    build(): ResoniteLinkDataModelOperation[] {
        return this.operations;
    }

    count(): number {
        return this.operations.length;
    }

    reset(): this {
        this.operations = [];
        return this;
    }

    async execute(): Promise<BatchResponse | undefined> {
        return this.client.sendDataModelOperationBatch(this.operations);
    }
}
