import { CertificateController } from "api/controllers/certificates/certificates.controller";
import { EventController } from "api/controllers/events/events.controller";
import { Router } from "express";

const certificateRoutes = Router();
const certController = new CertificateController();

certificateRoutes.get("/certificates", certController.listarCertificados);
certificateRoutes.get("/certificates/:id", certController.listarCertificadoPorId);
certificateRoutes.post("/certificates", certController.criarCertificado);
certificateRoutes.put("/certificates/validate/:id", certController.validateCertificate)

export { certificateRoutes };
