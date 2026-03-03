import { Client, createString, createFloat3, createFloatQ, createBool, createLong, createReference } from "../dist";

const client = new Client({
    port: 4340
});

client.on("connected", async () => {
    console.log("Connected to ResoniteLink!");

    const batchResponse = await client
        .batch()
        .addSlot(
            {
                parent: createReference("Root"),
                name: createString("Parent Slot"),
                tag: createString("batch-example"),
                position: createFloat3({ x: 0, y: 1, z: 0 }),
                rotation: createFloatQ({ x: 0, y: 0, z: 0, w: 1 }),
                scale: createFloat3({ x: 1, y: 1, z: 1 }),
                isActive: createBool(true),
                orderOffset: createLong(0)
            },
            { id: "parent-slot" }
        )
        .addSlot(
            {
                parent: createReference("parent-slot"),
                name: createString("Child Slot 1"),
                position: createFloat3({ x: 0, y: 0.5, z: 0 })
            },
            { id: "child-slot-1" }
        )
        .addSlot(
            {
                parent: createReference("parent-slot"),
                name: createString("Child Slot 2"),
                position: createFloat3({ x: 0.5, y: 0.5, z: 0 })
            },
            { id: "child-slot-2" }
        )
        .getSlot("parent-slot", { depth: 2 })
        .execute();

    console.log(`Batch operations completed: ${batchResponse?.success}`);

    const slot1 = await client.createSlot({
        parent: createReference("Root"),
        name: createString("Slot 1"),
        tag: createString("example")
    });

    console.log(`Created: ${slot1?.name.value}`);

    const slot2 = await client.createSlot({
        parent: createReference(slot1?.id ?? "Root"),
        name: createString("Slot 2"),
        tag: createString("child")
    });

    console.log(`Created child: ${slot2?.name.value}`);

    const rootSlot = await client.getSlot("Root", { depth: 1 });
    if (rootSlot) {
        console.log(`Root has ${rootSlot.children?.length ?? 0} direct children`);
        rootSlot.children?.slice(0, 3).forEach((child) => {
            console.log(`  - ${child.name.value}`);
        });
    }

    client.disconnect();
});

client.connect();
