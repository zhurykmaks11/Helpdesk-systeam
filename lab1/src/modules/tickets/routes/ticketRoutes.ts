import { Router } from "express";
import { getAllTickets, createNewTicket } from "../controllers/ticketController";
import { updateStatus } from "../controllers/ticketController";
import { deleteTicketById } from "../controllers/ticketController";

const router = Router();

router.get("/", getAllTickets);

router.post("/", createNewTicket);
router.patch("/:id/status", updateStatus);
router.delete("/:id", deleteTicketById);
export default router;