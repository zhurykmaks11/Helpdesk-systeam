import { Router } from "express";
import { getAllUsers, createNewUser } from "../controllers/userController";

const router = Router();

router.get("/", getAllUsers);
router.post("/", createNewUser);

export default router;