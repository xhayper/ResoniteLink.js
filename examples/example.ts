import { Client } from "../src/";

const client = new Client({
  port: 62366,
});

client.on("connected", async () => {
  console.log("Connected!");
  console.log("Starting animation...");

  let t = 0;
  const speed = 0.02;

  setInterval(async () => {
    t += speed;

    const radius = 5;

    const px = Math.cos(t) * radius;
    const pz = Math.sin(t) * radius * 2;
    const py = 5 + Math.sin(t * 2) * 0.5;
    const size = Math.sin(t) * 0.5 + 1.5;

    await client.send({
      $type: "updateSlot",
      data: {
        id: "Reso_180D4",

        position: {
          $type: "float3",
          value: {
            x: px,
            y: py,
            z: pz,
          },
        },

        scale: {
          $type: "float3",
          value: {
            x: size,
            y: size,
            z: size,
          },
        },

        rotation: {
          $type: "floatQ",
          value: {
            x: 0,
            y: Math.sin(t * 0.5),
            z: 0,
            w: Math.cos(t * 0.5),
          },
        },
      },
    });
  }, 16);
});

client.connect();
