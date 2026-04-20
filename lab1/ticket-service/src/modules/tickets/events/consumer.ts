import amqp from "amqplib";
import { deleteTicket } from "../services/ticketService";

export const startTicketConsumer = async () => {

    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queue = "ticket_events";

    await channel.assertQueue(queue);

    console.log("Ticket-service listening...");

    channel.consume(queue, (msg) => {

        if (msg) {

            const event = JSON.parse(msg.content.toString());

            if (event.type === "USER_VALIDATION_FAILED") {

                console.log(`⚠️ [SAGA ${event.payload.sagaId}] Compensation triggered`);

                deleteTicket(event.payload.id);

                console.log(`🗑️ [SAGA ${event.payload.sagaId}] Ticket deleted`);
            }
            channel.ack(msg);
        }

    });
};