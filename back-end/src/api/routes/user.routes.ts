import { UserController } from "api/controllers/auth/user.controller";
import { Router } from "express";

const userRoutes = Router();

const userController = new UserController();

userRoutes.get("/user", userController.getById);

export { userRoutes };
