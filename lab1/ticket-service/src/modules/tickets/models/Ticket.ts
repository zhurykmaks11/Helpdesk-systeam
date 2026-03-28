export type TicketStatus = "OPEN" | "IN_PROGRESS" | "CLOSED";

export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: TicketStatus;
    createdAt: Date;
}