import { Request, Response } from "express";
import { AuthService } from "api/services/auth/auth.service";

const authService = new AuthService();

class AuthController {
    async login(req: Request, res: Response) {
        const response = await authService.login(req, res);

        return res.status(200).send({
            message: "Login successful",
            user: response.user,
            token: response.token,
        });
    }

    async register(req: Request, res: Response) {
        const response = await authService.register(req, res);

        return res.status(201).send({
            message: "User created successfully",
            user: response.user,
        });
    }
}

export { AuthController };
