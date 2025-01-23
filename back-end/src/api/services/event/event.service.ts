import { event_status, PrismaClient } from "@prisma/client";
import { AppError } from "errors/AppError";
import { Request, Response } from "express";
import {
    CreateEventRequest,
    UpdateEventStatusRequest,
    InscricaoEventoRequest,
} from "@models/event/event";

const prisma = new PrismaClient();

class EventService {
    //criar evento
    async criarEvento(req: Request, res: Response) {
        const { id } = req.user;

        const {
            titulo,
            descricao,
            datainicio,
            datafim,
            instituicao,
            carga_horaria,
            limite_vagas,
        }: CreateEventRequest = req.body;

        const event = await prisma.event.create({
            data: {
                titulo,
                descricao,
                datainicio,
                carga_horaria,
                datafim,
                instituicao,
                limite_vagas,
                professorId: id,
            },
        });

        return {
            event: {
                id: event.id,
                titulo: event.titulo,
                descricao: event.descricao,
                datainicio: event.datainicio,
                datafim: event.datafim,
                instituicao: event.instituicao,
                carga_horaria: event.carga_horaria,
                limite_vagas: event.limite_vagas,
                professorId: event.professorId,
            },
        };
    }

    // atualizar todos os dados do evento
    async atualizarEvento(req: Request, res: Response) {
        //atualizar dados do evento incluindo o status do evento
        const { id } = req.params;
        const {
            titulo,
            descricao,
            datainicio,
            datafim,
            instituicao,
            carga_horaria,
            limite_vagas,
            status,
        }: UpdateEventStatusRequest = req.body;

        const event = await prisma.event.update({
            where: {
                id: id,
            },
            data: {
                titulo,
                descricao,
                datainicio,
                datafim,
                instituicao,
                carga_horaria,
                limite_vagas,
                status: status as event_status,
            },
        });

        return {
            event: {
                id: event.id,
                titulo: event.titulo,
                descricao: event.descricao,
                datainicio: event.datainicio,
                datafim: event.datafim,
                instituicao: event.instituicao,
                carga_horaria: event.carga_horaria,
                limite_vagas: event.limite_vagas,
                professorId: event.professorId,
                status: event.status,
            },
        };
    }

    //listar eventos
    async listarEventos(req: Request, res: Response) {
        const events = await prisma.event.findMany();

        return events;
    }

    async buscarEvento(req: Request, res: Response) {
        const { id } = req.params;

        const event = await prisma.event.findUnique({
            where: {
                id: id,
            },
        });

        if (!event) {
            throw new AppError("Evento não encontrado", 404);
        }

        return {
            id: event.id,
            titulo: event.titulo,
            descricao: event.descricao,
            datainicio: event.datainicio,
            datafim: event.datafim,
            instituicao: event.instituicao,
            carga_horaria: event.carga_horaria,
            limite_vagas: event.limite_vagas,
            professorId: event.professorId,
            status: event.status,
        };
    }

    //Inscrição no evento usando o modelo event_aluno do schema.prisma
    async inscreverEvento(req: Request, res: Response) {
        const { eventId, userId }: InscricaoEventoRequest = req.body;

        const event = await prisma.event.findUnique({
            where: {
                id: eventId,
            },
        });

        if (!event) {
            throw new AppError("Evento não encontrado", 404);
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new AppError("Usuário não encontrado", 404);
        }

        //verifica se o usuário já está inscrito no evento
        const eventAlunoExists = await prisma.event_aluno.findFirst({
            where: {
                userId: userId,
                eventId: eventId,
            },
        });

        if (eventAlunoExists) {
            throw new AppError("Usuário já inscrito no evento", 400);
        }

        const eventAluno = await prisma.event_aluno.create({
            data: {
                userId,
                eventId,
            },
        });

        return {
            eventAluno: {
                eventoId: eventAluno.eventId,
                userId: eventAluno.userId,
            },
        };
    }

    //listar inscrições
    async listarInscricoes(req: Request, res: Response) {
        const { id } = req.params;
        const inscricoes = await prisma.event_aluno.findMany({
            where: {
                eventId: id,
            },
        });

        return inscricoes;
    }

    async listarInscricoesPorUsuario(req: Request, res: Response) {
        const { id } = req.user;

        const inscricoes = await prisma.event_aluno.findMany({
            where: {
                userId: id,
            },
            include: {
                event: true,
            },
        });

        return inscricoes;
    }

    //deletar evento
    async deletarEvento(req: Request, res: Response) {
        const { id } = req.params;

        const event = await prisma.event.findUnique({
            where: {
                id: id,
            },
        });

        if (!event) {
            throw new AppError("Evento não encontrado", 404);
        }

        await prisma.event.delete({
            where: {
                id: id,
            },
        });
    }

    async finishEvent(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            throw new AppError("Evento não encontrado", 404);
        }

        const event = await prisma.event.update({
            where: {
                id: id,
            },
            data: {
                status: "CONCLUIDO",
            },
        });

        // get subscribed students

        const subscribedStudents = await prisma.event_aluno.findMany({
            where: {
                eventId: id,
            },
        });

        // foreach subscribed students, check if is present and create an complementaryActivity

        subscribedStudents.forEach(async (student) => {
            if (student.subscription_status === "PRESENT") {
                await prisma.atividade_complementar.create({
                    data: {
                        userId: student.userId,
                        eventId: id,
                        horas_aprovadas: event.carga_horaria,
                        participation_type: "ALUNO",
                    },
                });
            }
        });

        return {
            event: {
                id: event.id,
                titulo: event.titulo,
                descricao: event.descricao,
                datainicio: event.datainicio,
                datafim: event.datafim,
                instituicao: event.instituicao,
                carga_horaria: event.carga_horaria,
                limite_vagas: event.limite_vagas,
                professorId: event.professorId,
                status: event.status,
            },
        };
    }

    async checkin(req: Request, res: Response) {
        const { cpf, event_id } = req.params;
        const { checked_in }: { checked_in: boolean } = req.body;

        const student = await prisma.user.findFirst({
            where: {
                cpf: cpf,
            },
        });

        if (!student) {
            throw new AppError("Estudante não encontrado", 404);
        }

        const event = await prisma.event.findFirst({
            where: {
                id: event_id,
            },
        });

        if (!event) {
            throw new AppError("Evento não encontrado", 404);
        }

        const subscription = await prisma.event_aluno.findFirst({
            where: {
                userId: student.id,
                eventId: event.id,
            },
        });

        if (!subscription) {
            throw new AppError("Estudante não inscrito no evento", 404);
        }

        const presence = checked_in ? "PRESENT" : "NOT_PRESENT";

        const updatedSubscription = await prisma.event_aluno.update({
            data: { subscription_status: presence },
            where: {
                id: subscription.id,
            },
        });

        return updatedSubscription;
    }
}

export { EventService };
