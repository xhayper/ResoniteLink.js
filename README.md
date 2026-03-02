# ResoniteLink.js

> [!CAUTION]  
> This library is in beta, and this library API can change at any moment, and isn't stabilized yet, and is **NOT** production ready.

A type-safe, easy to use JS wrapper for interacting with ResoniteLink

## Installation

```bash
# Choose yor preferred package manager
npm i resonitelink.js
yarn add resonitelink.js
pnpm add resonitelink.js
bun add resonitelink.js
```

## Usage

```ts
import { Client } from "resonitelink.js";
// const { Client } = require("resonitelink.js"); // or CommonJS style

const client = new Client({
    // Don't forget to change this! This is different every time you enable ResoniteLink
    port: 4340
});

// Emitted when connected to ResoniteLink
client.on("connected", async () => {
    console.log("Connected to ResoniteLink!");

    const printSlot = (slots, depth) => {
        for (const slot of slots) {
            console.log("  ".repeat(depth ?? 0) + `${slot.name.value} (${slot.id})`);
            printSlot(slot.children ?? [], (depth ?? 0) + 1);
        }
    };

    // Getting a Slot
    const rootSlot = (await client.getSlot("Root"))!;
    printSlot([rootSlot.encode()]);

    // Creating a Slot
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
});

client.connect();
```

More example can be seen at [/examples](./examples/)
