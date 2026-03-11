import { Request, Response } from "express";
import { getUsers, createUser } from "../services/userService";

export const getAllUsers = (req: Request, res: Response) => {
    const users = getUsers();
    res.json(users);
};

export const createNewUser = (req: Request, res: Response) => {

    const { name, email } = req.body;

    const user = createUser(name, email);

    res.status(201).json(user);
};