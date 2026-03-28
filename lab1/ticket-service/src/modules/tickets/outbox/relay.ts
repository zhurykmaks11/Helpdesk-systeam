import amqp from "amqplib";
import { outbox } from "./outbox";

export const startRelay = async () => {

    let channel: amqp.Channel;

    const connect = async () => {
        try {
            const connection = await amqp.connect("amqp://localhost");

            connection.on("close", () => {
                console.log("RabbitMQ connection closed. Reconnecting...");
                setTimeout(connect, 3000);
            });

            connection.on("error", (err) => {
                console.log("RabbitMQ error:", err.message);
            });

            channel = await connection.createChannel();

            await channel.assertQueue("ticket_events");

            console.log("✅ Relay connected to RabbitMQ");

        } catch (err) {
            console.log("❌ Failed to connect. Retry...");
            setTimeout(connect, 3000);
        }
    };

    await connect();

    setInterval(() => {

        if (!channel) return;

        outbox.forEach(event => {

            if (!event.processed) {

                try {
                    channel.sendToQueue(
                        "ticket_events",
                        Buffer.from(JSON.stringify(event))
                    );

                    console.log("📤 Sent event:", event.type);

                    event.processed = true;

                } catch (err) {
                    console.log("Send failed, will retry...");
                }
            }

        });

    }, 3000);
};