import { Client, Slot } from "../src/";

const client = new Client({
    port: 4340
});

client.on("connected", async () => {
    console.log("Connected!");

    let t = 0;
    const speed = 0.02;

    const printSlot = (slots: Slot[], depth?: number) => {
        for (const slot of slots) {
            console.log("  ".repeat(depth ?? 0) + `${slot.name.value} (${slot.id})`);
            printSlot(slot.children ?? [], (depth ?? 0) + 1);
        }
    };

    const rootSlot = (await client.getSlot("Root"))!;
    printSlot([rootSlot.encode()]);

    const slot = (await client.createSlot({
        parent: {
            $type: "reference",
            targetId: "Root"
        },
        name: {
            $type: "string",
            value: "This is test"
        },
        tag: {
            $type: "string",
            value: "ResoniteLink.js"
        }
    }))!;

    console.log("Starting animation...");
    setInterval(async () => {
        t += speed;

        const radius = 5;

        const px = Math.cos(t) * radius;
        const pz = Math.sin(t) * radius * 2;
        const py = 5 + Math.sin(t * 2) * 0.5;
        const size = Math.sin(t) * 0.5 + 1.5;

        console.log(`x: ${slot.position.x}, y: ${slot.position.y}, z: ${slot.position.z}`);

        slot.setPosition({ x: px, y: py, z: pz });
        slot.setScale({ x: size, y: size, z: size });
        slot.setRotation({
            x: 0,
            y: Math.sin(t * 0.5),
            z: 0,
            w: Math.sin(t * 0.5)
        });
    }, 16);
});

client.connect();
