import { UserType } from "./user";

export type Natureza = "ENSINO" | "PESQUISA" | "GERAL" | "EXTENSAO" | "ESPORTIVA" | "CULTURAL";

export type EventType = {
    titulo: string;
    descricao: string;
    datainicio: Date;
    datafim: Date;
    carga_horaria: number;
    instituicao: string;
    professorId: string;
    natureza: Natureza;
};

export type EventTypeFromServer = {
    id: string;
    titulo: string;
    descricao: string;
    datainicio: Date;
    datafim: Date;
    instituicao: string;
    carga_horaria: number;
    limite_vagas: number;
    status: string;
    professorId: string;
    natureza: Natureza;
    eventAlunos: Subscription[];
    professor: UserType;
};
export type Subscription = {
    id: string;
    subscription_status: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    eventId: string;
    event: EventTypeFromServer;
    User: UserType;
};




