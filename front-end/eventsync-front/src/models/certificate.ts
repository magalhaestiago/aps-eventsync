import { UserType } from "./user";

export type Certificate = {
    //id: string;
    titulo: string;
    descricao: string;
    horas: number;
    //createdAt: string;
    //updatedAt: string;
    dadosArquivo?: string;
    urlArquivo: string;
    userId: string;
    dataInicio: Date;
    dataFim: Date;
    instituicao: string;
    isValid?: boolean;
    isReviewed?: boolean;
    User: UserType;
};
