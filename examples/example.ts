import { Client } from "../src/";

const client = new Client({
  port: 1234,
});

client.on("message", (data) => {
  switch (data.$type) {
    case "slotData": {
      console.log("Got slot data =>", data.slot.name.value);
      break;
    }
  }
});

client.connect();
