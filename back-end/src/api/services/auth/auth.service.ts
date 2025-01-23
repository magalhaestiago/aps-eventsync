import { LoginReq, RegisterRequest } from "@models/auth/register";
import { PrismaClient } from "@prisma/client";
import { AppError } from "errors/AppError";
import { Request, Response } from "express";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET ?? "";

const prisma = new PrismaClient();

class AuthService {
    async register(req: Request, res: Response) {
        const { name, email, cpf, password, user_type }: RegisterRequest = req.body;

        const userExist = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });

        if (userExist) {
            throw new AppError("User already exists", 409);
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                cpf,
                password: passwordHash,
                user_type: Role[user_type as keyof typeof Role],
            },
        });

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                cpf: user.cpf,
                user_type: user.user_type,
            },
        };
    }

    async login(req: Request, res: Response) {
        const { login, password }: LoginReq = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email: login.toLowerCase(),
            },
        });

        // check user not found
        if (!user) {
            throw new AppError("Usuário ou senha inválidos", 401);
        }

        // check if password match
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new AppError("Usuário ou senha inválidos", 401);
        }
        // create token
        const token = jwt.sign(
            {
                id: user.id,
            },
            secret
        );

        const response = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                cpf: user.cpf,
                role: user.user_type,
            },
            token,
        };

        return response;
    }
}

export { AuthService };
