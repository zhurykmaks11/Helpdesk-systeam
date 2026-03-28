import amqp from "amqplib";

export const startConsumer = async () => {

    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queue = "ticket_events";

    await channel.assertQueue(queue);
    console.log("User-service listening for events...");

    channel.consume(queue, (msg) => {

        if (msg) {
            const event = JSON.parse(msg.content.toString());

            console.log("Received event:", event.type);
            console.log("Payload:", event.payload);

            channel.ack(msg);
        }

    });
};