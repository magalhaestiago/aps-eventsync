import { PrismaClient } from "@prisma/client";
import { AppError } from "errors/AppError";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class UserService {
    async getUserById(req: Request, res: Response) {
        const { id } = req.user;

        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        if (!user) {
            throw new AppError("User not found", 404);
        }

        return user;
    }
}

export { UserService };
