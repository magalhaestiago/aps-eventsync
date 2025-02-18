import { Request, Response } from "express";
import { EventService } from "api/services/event/event.service";
import { CertificateService } from "api/services/certificates/certificate.service";

const certificatesService = new CertificateService();

class CertificateController {
    async listarCertificados(req: Request, res: Response) {
        const certificates = await certificatesService.listarCertificados();

        return res.status(200).send({
            message: "Certificados listados com sucesso",
            certificates,
        });
    }

    async listarCertificadoPorId(req: Request, res: Response) {
        const certificate = await certificatesService.listarCertificadoPorId(req, res);

        return res.status(200).send({
            message: "Certificado listado com sucesso",
            certificate,
        });
    }

    async criarCertificado(req: Request, res: Response) {
        const certificado = await certificatesService.createCertificado(req, res);

        return res.status(201).send({
            message: "Certificado criado com sucesso",
            certificado,
        });

    }
    /*
    async criarCertificado(req: Request, res: Response) {
        const certificado = await certificatesService.createCertificado(req, res);

        return res.status(201).send({
            message: "Certificado criado com sucesso",
            certificado,
        });
    }
        */
        

    async validateCertificate(req: Request, res: Response) {
        const certificado = await certificatesService.validateCertificate(req, res);

        return res.status(201).send({
            message: "Certificado validado com sucesso",
            certificado,
        });
    }
}

export { CertificateController };
