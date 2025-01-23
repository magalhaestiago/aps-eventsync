import { Request, Response } from "express";
import { UserService } from "api/services/auth/user.service";

const userService = new UserService();

class UserController {
    async getById(req: Request, res: Response) {
        const response = await userService.getUserById(req, res);

        return res.status(200).send({
            user: response,
        });
    }
}

export { UserController };
