import { TicketStatus } from "../models/Ticket";

export interface UpdateTicketStatusDto {
    status: TicketStatus;
}