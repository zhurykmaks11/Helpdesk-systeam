import { getTickets, createTicket } from "../services/ticketService";
import { updateTicketStatus } from "../services/ticketService";
import { deleteTicket } from "../services/ticketService";
import { CreateTicketDto } from "../dto/CreateTicketDto";
import { UpdateTicketStatusDto } from "../dto/UpdateTicketStatusDto";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../middleware/AppError";
import {correlationId} from  "../../../middleware/correlationId";

export const getAllTickets = (req: Request, res: Response) => {
    const tickets = getTickets();
    res.json(tickets);

};
export const testError = (req: Request, res: Response, next: NextFunction) => {
    next(new Error("Test server error"));
};


// export const createNewTicket = (req: Request, res: Response, next: NextFunction) => {
//
//     const dto: CreateTicketDto = req.body;
//
//     if (!dto.title || !dto.description) {
//         return next(new AppError("Title and description are required", 400));
//     }
//
//     const ticket = createTicket(dto);
//
//     res.status(201).json(ticket);
// };
export const createNewTicket = async (req: Request, res: Response, next: NextFunction) => {
    const dto: CreateTicketDto = req.body;

    if (!dto.title || !dto.description || !dto.userId) {
        return next(new AppError("Title, description and userId are required", 400));
    }

    try {

        const correlationId = req.headers["x-correlation-id"] as string;
        const ticket = await createTicket(dto);
        res.status(201).json(ticket);
    } catch (err) {
        next(err);
    }
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

export const getById = (req: Request, res: Response, next: NextFunction) => {

    const ticket = getTickets().find(t => t.id === req.params.id);

    if (!ticket) {
        return next(new AppError("Ticket not found", 404));
    }

    res.json(ticket);
};