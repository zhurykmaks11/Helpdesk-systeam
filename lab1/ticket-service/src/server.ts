import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ticketRoutes from "../src/modules/tickets/routes/ticketRoutes";
import commentRoutes from "./modules/comments/routes/commentRoutes";
import { errorHandler } from "./middleware/errorHandler";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import {correlationId} from "./middleware/correlationId";
import { startRelay } from "./modules/tickets/outbox/relay";
import {startTicketConsumer} from "./modules/tickets/events/consumer";

startRelay();
startTicketConsumer();
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(correlationId);
app.get("/", (req, res) => {
    res.send("API працює");
});
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date()
    });
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/tickets", ticketRoutes);
app.use("/api/v1/comments", commentRoutes);

app.use((req, res, next) => {
    const error = new Error("Route not found") as any;
    error.status = 404;
    next(error);
});
app.use(errorHandler);
const PORT = process.env.PORT || 3001;



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});