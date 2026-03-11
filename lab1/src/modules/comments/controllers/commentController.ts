import { Request, Response } from "express";
import { getComments, createComment } from "../services/commentService";

export const getAllComments = (req: Request, res: Response) => {

    const comments = getComments();

    res.json(comments);
};

export const createNewComment = (req: Request, res: Response) => {

    const { ticketId, message } = req.body;

    const comment = createComment(ticketId, message);

    res.status(201).json(comment);
};