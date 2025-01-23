class AppError extends Error {
    public readonly statusCode: number;

    constructor(message = "Algo deu errado, tente novamente", statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}

export { AppError };
