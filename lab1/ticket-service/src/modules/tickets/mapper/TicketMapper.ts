import { CreateTicketDto } from "../dto/CreateTicketDto";
import { Ticket } from "../models/Ticket";

export const mapCreateDtoToTicket = (dto: CreateTicketDto): Ticket => {

    return {
        id: Date.now().toString(),
        title: dto.title,
        description: dto.description,
        status: "OPEN",
        createdAt: new Date()
    };

};