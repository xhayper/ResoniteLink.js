import { Client } from "../src/";

const client = new Client({
  port: 1234,
});

client.on("message", (data) => {
  switch (data.$type) {
    case "slotData": {
      console.log("Got slot data =>", data.slot.name.value);

      for (const component of data.slot.components) {
        for (const [key, value] of Object.entries(component.members)) {
          console.log(`${key} (${value.$type}) => ${value}`);
        }
      }
      break;
    }
  }
});

client.connect();
