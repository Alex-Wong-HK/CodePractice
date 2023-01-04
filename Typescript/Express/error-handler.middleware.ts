// @ts-ignore
import { Request, Response, NextFunction } from "express";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    return res.status(500).json({
        error: err.name,
        message: err.message,
    });
}
