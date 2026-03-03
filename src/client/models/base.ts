import { Client } from "@/client/index.js";

export class Base {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    encode() {}
}
