import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

export const correlationId = (req: Request, res: Response, next: NextFunction) => {

    const id = req.headers["x-correlation-id"] || randomUUID();

    console.log("Correlation ID:", id); // 🔥 лог

    req.headers["x-correlation-id"] = id as string;

    next();
};