import { Router } from "express";
import {getAllTickets, createNewTicket, testError} from "../controllers/ticketController";
import { updateStatus } from "../controllers/ticketController";
import { deleteTicketById } from "../controllers/ticketController";
import { validateDto } from "../../../middleware/validateDto";
import { CreateTicketDto } from "../dto/CreateTicketDto";

import * as ticketController from "../controllers/ticketController";
const router = Router();
/**
 * @swagger
 * /api/v1/tickets:
 *   get:
 *     summary: Get all tickets
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: List of tickets
 */
router.get("/", getAllTickets);
/**
 * @swagger
 * /api/v1/tickets:
 *   post:
 *     summary: Create ticket
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ticket created
 */
router.post(
    "/",
    validateDto(CreateTicketDto),
    createNewTicket
);
router.patch("/:id/status", updateStatus);
router.delete("/:id", deleteTicketById);
router.get("/error", testError);

export default router;