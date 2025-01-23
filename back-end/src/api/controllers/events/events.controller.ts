import { Request, Response } from "express";
import { EventService } from "api/services/event/event.service";

const eventService = new EventService();

class EventController {
    async criarEvento(req: Request, res: Response) {
        const response = await eventService.criarEvento(req, res);

        return res.status(201).send({
            message: "Evento criado com sucesso",
            event: response.event,
        });
    }

    async listarEventos(req: Request, res: Response) {
        const events = await eventService.listarEventos(req, res);

        return res.status(200).send({
            message: "Eventos listados com sucesso",
            events,
        });
    }

    async buscarEvento(req: Request, res: Response) {
        const event = await eventService.buscarEvento(req, res);
        return res.status(200).send({
            message: "Evento encontrado com sucesso",
            event,
        });
    }

    async atualizarEvento(req: Request, res: Response) {
        const response = await eventService.atualizarEvento(req, res);

        return res.status(200).send({
            message: "Evento atualizado com sucesso",
            event: response.event,
        });
    }

    async finishEvent(req: Request, res: Response) {
        const response = await eventService.finishEvent(req, res);

        return res.status(200).send({
            message: "Evento finalizado com sucesso",
            event: response.event,
        });
    }

    async deletarEvento(req: Request, res: Response) {
        await eventService.deletarEvento(req, res);

        return res.status(200).send({
            message: "Evento deletado com sucesso",
        });
    }

    async inscreverEvento(req: Request, res: Response) {
        await eventService.inscreverEvento(req, res);

        return res.status(201).send({
            message: "Inscrição realizada com sucesso",
            inscricao: {
                eventId: req.params.id,
                userId: req.body.userId,
            },
        });
    }

    async listarInscricoes(req: Request, res: Response) {
        const inscricoes = await eventService.listarInscricoes(req, res);

        return res.status(200).send({
            message: "Inscrições listadas com sucesso",
            inscricoes,
        });
    }

    async listarInscricoesPorUsuario(req: Request, res: Response) {
        const inscricoes = await eventService.listarInscricoesPorUsuario(req, res);
        return res.status(200).send({
            message: "Inscrições listadas com sucesso",
            inscricoes,
        });
    }

    async checkin(req: Request, res: Response) {
        const response = await eventService.checkin(req, res);

        return res.status(200).send({
            message: "Checkin realizado com sucesso",
            subscription: response,
        });
    }
}

export { EventController };
