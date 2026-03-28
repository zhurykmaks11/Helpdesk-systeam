import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
    status?: number;
}

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const status = err.status || 500;

    res.status(status).json({
        status: status,
        message: err.message || "Internal server error",
        timestamp: new Date().toISOString()
    });
};