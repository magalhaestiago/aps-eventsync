import { AppError } from "errors/AppError";
import { type Response, type NextFunction, type Request } from "express";
import { verify } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const secret = process.env.SECRET ?? "";
const prisma = new PrismaClient();

interface IPayload {
    iat: number;
    id: string;
}

async function verifyJWT(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authorization = req.headers.authorization;

    if (!authorization) {
        throw new AppError("Token inválido", 401);
    }
    const token = authorization.split(" ")[1];

    try {
        const { id } = verify(token, secret) as IPayload;

        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) {
            throw new AppError("Usuário não encontrado.", 401);
        }

        req.user = {
            id,
        };

        next();
    } catch {
        throw new AppError("Token inválido", 401);
    }
}

export default verifyJWT;
