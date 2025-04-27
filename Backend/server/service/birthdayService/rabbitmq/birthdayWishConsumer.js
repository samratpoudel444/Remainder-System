const amqp = require("amqplib");
const { sendMail } = require("../utils/NodemailerConfig");

const consumeMessage = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  await channel.assertQueue("birthday_notifications", {
    durable: true,
    arguments: { "x-queue-mode": "lazy" },
  });

  await channel.consume("birthday_notifications", async (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString()); 

      console.log(data);

      const a= [data];

      await sendMail(data);

      channel.ack(msg);
    }
  });
};

consumeMessage();
