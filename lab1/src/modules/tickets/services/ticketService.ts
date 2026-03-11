import { Ticket } from "../models/Ticket";
import { mapCreateDtoToTicket } from "../mapper/TicketMapper";
import { CreateTicketDto } from "../dto/CreateTicketDto";

const tickets: Ticket[] = [];

export const getTickets = (): Ticket[] => {
    return tickets;
};

export const createTicket = (dto: CreateTicketDto): Ticket => {

    const newTicket = mapCreateDtoToTicket(dto) ;

    tickets.push(newTicket);

    return newTicket;
};

export const updateTicketStatus = (id: string, status: string) => {

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