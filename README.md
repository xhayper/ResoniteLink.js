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

### Basic Setup

```ts
import { Client } from "resonitelink.js";

// Don't forget to change this! Resonite usually switch the port number!
const client = new Client({ port: 4340 });

client.on("connected", async () => {
    // Your code here
});

client.connect();
```

### Create a Slot

```ts
import { createString, createReference } from "resonitelink.js";

const slot = await client.createSlot({
    parent: createReference("Root"),
    name: createString("My Slot"),
    tag: createString("example")
});
```

### Batch Operations

```ts
import { createString, createFloat3, createFloatQ, createReference } from "resonitelink.js";

const response = await client
    .batch()
    .addSlot(
        {
            parent: createReference("Root"),
            name: createString("Parent"),
            position: createFloat3({ x: 0, y: 1, z: 0 })
        },
        { id: "parent" }
    )
    .addSlot(
        {
            parent: createReference("parent"),
            name: createString("Child"),
            position: createFloat3({ x: 0, y: 0.5, z: 0 })
        },
        { id: "child" }
    )
    .getSlot("parent", { depth: 2 })
    .execute();
```

For more examples, see [/examples](https://github.com/xhayper/ResoniteLink.js/blob/main/examples/example.ts)
