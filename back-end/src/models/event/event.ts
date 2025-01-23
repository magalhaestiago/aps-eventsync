export type CreateEventRequest = {
    titulo: string;
    descricao: string;
    datainicio: Date;
    datafim: Date;
    carga_horaria: number;
    instituicao: string;
    limite_vagas: number;
    professorId: string;
};

export type UpdateEventStatusRequest = {
    titulo: string;
    descricao: string;
    datainicio: Date;
    datafim: Date;
    instituicao: string;
    carga_horaria: number;
    limite_vagas: number;
    status: string;
};

export type InscricaoEventoRequest = {
    eventId: string;
    userId: string;
};
