export type RegisterRequest = {
    name: string;
    email: string;
    password: string;
    cpf: string;
    user_type: string;
};

export type LoginReq = {
    login: string;
    password: string;
};
