import { Ticket } from "../models/Ticket";
import { mapCreateDtoToTicket } from "../mapper/TicketMapper";
import { CreateTicketDto } from "../dto/CreateTicketDto";
import {getUserById} from "./userClient";
import {outbox} from "../outbox/outbox";

const tickets: Ticket[] = [];

export const getTickets = (): Ticket[] => {
    return tickets;
};

export const getTicketById = (id: string): Ticket | undefined => {
    return tickets.find(ticket => ticket.id === id);
};

export const createTicket = async (dto: CreateTicketDto): Promise<Ticket> => {

    const sagaId = Date.now().toString();

    const newTicket = mapCreateDtoToTicket(dto);

    tickets.push(newTicket);

    outbox.push({
        id: Date.now().toString(),
        type: "TICKET_CREATED",
        payload: {
            ...newTicket,
            sagaId
        },
        processed: false
    });

    console.log("OUTBOX:", outbox);

    return newTicket;
};


export const updateTicketStatus = (id: string, status: string): Ticket | null => {

    const ticket = tickets.find(t => t.id === id);

    if (!ticket) {
        return null;
    }

    ticket.status = status as any;

    return ticket;
};

export const deleteTicket = (id: string): boolean => {

    const index = tickets.findIndex(ticket => ticket.id === id);

    if (index === -1) {
        return false;
    }

    tickets.splice(index, 1);

    return true;
};