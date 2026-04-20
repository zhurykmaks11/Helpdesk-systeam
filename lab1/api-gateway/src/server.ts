import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

const TICKET_SERVICE = "http://localhost:3001";
const USER_SERVICE = "http://localhost:3002";



// tickets
app.use("/api/v1/tickets", async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `${TICKET_SERVICE}${req.originalUrl}`,
            data: req.body
        });

        res.json(response.data);

    } catch (err: any) {
        res.status(err.response?.status || 500).json({
            message: "Ticket service error"
        });
    }
});


// users
app.use("/api/v1/users", async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `${USER_SERVICE}${req.originalUrl}`,
            data: req.body
        });

        res.json(response.data);

    } catch (err: any) {
        res.status(err.response?.status || 500).json({
            message: "User service error"
        });
    }
});



app.get("/api/v1/full-ticket/:id", async (req, res) => {

    try {
        const ticketId = req.params.id;

        const ticketPromise = axios.get(
            `${TICKET_SERVICE}/api/v1/tickets/${ticketId}`
        );

        const ticketResponse = await ticketPromise;
        const ticket = ticketResponse.data;

        let user = null;

        try {
            const userResponse = await axios.get(
                `${USER_SERVICE}/api/v1/users/${ticket.userId}`
            );
            user = userResponse.data;
        } catch {
            console.log("⚠User service unavailable");
        }
        res.json({
            ticket,
            user
        });

    } catch (err: any) {
        console.error("Gateway Error:", err.response?.data || err.message);
        res.status(500).json({
            message: "Failed to fetch full ticket",
            details: err.response?.data
        });
    }
});


app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        service: "API Gateway"
    });
});


app.listen(PORT, () => {
    console.log(`🚀 API Gateway running on port ${PORT}`);
});