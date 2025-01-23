import { PrismaClient } from "@prisma/client";
import { AppError } from "errors/AppError";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class ActivitiesService {
    async getActivities(req: Request, res: Response) {
        const { id } = req.user;

        const activities = await prisma.atividade_complementar.findMany({
            where: {
                userId: id,
            },
            include: {
                event: true,
            },
        });

        if (!activities) {
            throw new AppError("Você não tem nenhuma atividade complementar.", 404);
        }

        return activities;
    }

    async getActivityById(req: Request, res: Response) {
        const { id } = req.params;
        const { id: userId } = req.user;

        const activity = await prisma.atividade_complementar.findUnique({
            where: {
                id: id,
                userId: userId,
            },
            include: {
                event: true,
            },
        });

        if (!activity) {
            throw new AppError("A Atividade Complementar não foi encontrada.", 404);
        }

        return activity;
    }

    async getTotalActivityHours(req: Request, res: Response) {
        const { id } = req.user;

        const activities = await prisma.atividade_complementar.aggregate({
            _sum: {
                horas_aprovadas: true,
            },
            where: {
                userId: id,
            },
        });

        if (!activities) {
            throw new AppError("Você não tem nenhuma atividade complementar.", 404);
        }

        const totalHours = activities._sum.horas_aprovadas;

        return totalHours;
    }
}

export { ActivitiesService };
