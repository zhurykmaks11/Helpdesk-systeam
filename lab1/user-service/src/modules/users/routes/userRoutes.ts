import { Router } from "express";
import { getAllUsers, createNewUser } from "../controllers/userController";
import {CreateUserDto} from "../dto/CreateUserDto";
import {validateDto} from "../../../middleware/validateDto";
import * as userController from "../controllers/userController";
const router = Router();

router.get("/", getAllUsers);
router.get("/:id", userController.getUserById);
router.post(
    "/",
    validateDto(CreateUserDto),
    userController.createNewUser
);
export default router;