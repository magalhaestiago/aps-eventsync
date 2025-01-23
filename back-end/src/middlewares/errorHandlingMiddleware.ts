import { AppError } from "errors/AppError";
import { type NextFunction, type Request, type Response } from "express";

export default function errorHandlingMiddleware(
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
): Response {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({ message: error.message });
    } else {
        return response.status(500).json({
            message: `Houve um problema com o servidor - ${error.message}`,
            code: "app.internal-server-error",
        });
    }
}
