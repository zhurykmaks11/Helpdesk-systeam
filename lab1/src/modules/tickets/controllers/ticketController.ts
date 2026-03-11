import { Request, Response } from "express";
import { getTickets, createTicket } from "../services/ticketService";
import { updateTicketStatus } from "../services/ticketService";
import { deleteTicket } from "../services/ticketService";
import { CreateTicketDto } from "../dto/CreateTicketDto";
import { UpdateTicketStatusDto } from "../dto/UpdateTicketStatusDto";

export const getAllTickets = (req: Request, res: Response) => {
    const tickets = getTickets();
    res.json(tickets);
};


export const createNewTicket = (req: Request, res: Response) => {

    console.log(req.body);

    const dto: CreateTicketDto = req.body;

    const ticket = createTicket(dto);

    res.status(201).json(ticket);
};


export const updateStatus = (req: Request, res: Response) => {

    const id = req.params.id as string;
    const dto: UpdateTicketStatusDto = req.body;

    const ticket = updateTicketStatus(id, dto.status);

    if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(ticket);
};

export const deleteTicketById = (req: Request, res: Response) => {

    const id = req.params.id as string;

    const deleted = deleteTicket(id);

    if (!deleted) {
        return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({ message: "Ticket deleted successfully" });
};