import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class CertificateService {
    async listarCertificados() {
        const certificates = await prisma.certificate.findMany({
            where:{
                isReviewed: false
            }
        });
        return certificates;
    }

    async listarCertificadoPorId(req: Request, res: Response) {
        const { id } = req.params;

        const certificate = await prisma.certificate.findUnique({
            where: {
                id,
            },
        });

        return certificate;
    }

    async createCertificado(req: Request, res: Response) {
        const { id } = req.user;
        const { titulo, descricao, horas, urlArquivo, datainicio, datafim, instituicao } = req.body;

        const certificado = await prisma.certificate.create({
            data: {
                titulo,
                userId: id,
                descricao,
                horas,
                urlArquivo,
                datainicio,
                datafim,
                instituicao,
            },
        });

        return certificado;
    }

    async validateCertificate(req: Request, res: Response) {

        const { id: certificateid } = req.params
        const { isValid } = req.body

        const certificado = await prisma.certificate.update({
            where: {
                id: certificateid
            }, data: {
                isValid,
                isReviewed: true
            }

        })

        if (isValid) {
            const event = await prisma.event.create({
                data: {
                    titulo: certificado.titulo,
                    descricao: certificado.descricao,
                    datainicio: certificado.datainicio,
                    carga_horaria: certificado.horas,
                    datafim: certificado.datafim,
                    instituicao: certificado.instituicao,
                    limite_vagas: 0,
                    status: "CONCLUIDO",
                    isValid: false,
                },
            })
            await prisma.atividade_complementar.create({
                data: {
                    eventId: event.id,
                    userId: certificado.userId,
                    horas_aprovadas: event.carga_horaria,
                    participation_type: "ALUNO",
                    

                }
            })
        }


        return certificado;

    }
}

export { CertificateService };
