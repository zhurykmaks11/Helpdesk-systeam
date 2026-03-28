import { Router } from "express";
import { getAllComments, createNewComment } from "../controllers/commentController";
import {CreateCommentDto} from "../dto/CreateCommentDto";
import {validateDto} from "../../../middleware/validateDto";
import * as commentController from "../controllers/commentController";

const router = Router();

router.get("/", getAllComments);

router.post("/", createNewComment);
router.post(
    "/",
    validateDto(CreateCommentDto),
    commentController.createNewComment
);
export default router;