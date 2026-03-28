import { Comment } from "../models/Comment";

const comments: Comment[] = [];

export const getComments = (): Comment[] => {
    return comments;
};

export const createComment = (ticketId: string, message: string): Comment => {

    const newComment: Comment = {
        id: Date.now().toString(),
        ticketId,
        message,
        createdAt: new Date()
    };

    comments.push(newComment);

    return newComment;
};