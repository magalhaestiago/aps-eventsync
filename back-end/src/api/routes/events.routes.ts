import { EventController } from "api/controllers/events/events.controller";
import { Router } from "express";

const eventRoutes = Router();
const eventControl = new EventController();

eventRoutes.post("/events", eventControl.criarEvento);
eventRoutes.get("/events", eventControl.listarEventos);
eventRoutes.get("/events/:id", eventControl.buscarEvento);
eventRoutes.put("/events/:id", eventControl.atualizarEvento);
eventRoutes.delete("/events/:id", eventControl.deletarEvento);
eventRoutes.put("/finish-event/:id", eventControl.finishEvent);

//rotas de inscrição
eventRoutes.post("/subscriptions/:id", eventControl.inscreverEvento);
eventRoutes.get("/subscriptions/:id", eventControl.listarInscricoes);
eventRoutes.get("/subscriptions", eventControl.listarInscricoesPorUsuario);
eventRoutes.put("/subscriptions/checkin/:cpf/:event_id", eventControl.checkin);

export { eventRoutes };
