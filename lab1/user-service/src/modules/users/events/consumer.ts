import amqp from "amqplib";
import { getUsers } from "../services/userService";
import { User } from "../models/User";

export const startConsumer = async () => {

    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queue = "ticket_events";

    await channel.assertQueue(queue);

    console.log("👤 User-service listening for events...");

    channel.consume(queue, (msg) => {

        if (msg) {

            const event = JSON.parse(msg.content.toString());

            // 👉 Лог отримання
            console.log(`📥 [SAGA ${event.payload.sagaId}] Received ${event.type}`);

            if (event.type === "TICKET_CREATED") {

                const userId = event.payload.userId;

                const users: User[] = getUsers();

                const userExists = users.find((u: User) => u.id === userId);

                if (userExists) {

                    console.log(`✅ [SAGA ${event.payload.sagaId}] User validated`);

                    channel.sendToQueue(
                        "ticket_events",
                        Buffer.from(JSON.stringify({
                            type: "USER_VALIDATED",
                            payload: event.payload
                        }))
                    );

                } else {

                    console.log(`❌ [SAGA ${event.payload.sagaId}] User NOT found`);

                    channel.sendToQueue(
                        "ticket_events",
                        Buffer.from(JSON.stringify({
                            type: "USER_VALIDATION_FAILED",
                            payload: event.payload
                        }))
                    );
                }
            }

            channel.ack(msg);
        }
    });
};