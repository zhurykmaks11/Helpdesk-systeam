import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ticketRoutes from "./modules/tickets/routes/ticketRoutes";
import userRoutes from "./modules/users/routes/userRoutes";
import commentRoutes from "./modules/comments/routes/commentRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/tickets", ticketRoutes);
app.use("/users", userRoutes);
app.use("/comments", commentRoutes);

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("API працює");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});