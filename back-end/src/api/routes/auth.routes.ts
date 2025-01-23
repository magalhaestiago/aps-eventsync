import { AuthController } from "api/controllers/auth/auth.controller";
import { Router } from "express";

const authRoutes = Router();

const authController = new AuthController();

authRoutes.post("/login", authController.login);
authRoutes.post("/register", authController.register);



export { authRoutes };
