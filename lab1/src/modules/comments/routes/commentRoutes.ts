import { Router } from "express";
import { getAllComments, createNewComment } from "../controllers/commentController";

const router = Router();

router.get("/", getAllComments);

router.post("/", createNewComment);

export default router;