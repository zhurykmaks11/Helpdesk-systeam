import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./modules/users/routes/userRoutes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import {errorHandler} from "./middleware/errorHandler";
import { startConsumer } from "./consumer";

startConsumer();

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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
app.use("/api/v1/users", userRoutes);

app.use((req, res, next) => {
    const error = new Error("Route not found") as any;
    error.status = 404;
    next(error);
});
app.use(errorHandler);
const PORT = process.env.PORT || 3002;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});