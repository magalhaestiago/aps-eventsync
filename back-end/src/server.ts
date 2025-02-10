import "express-async-errors";
import { authRoutes } from "api/routes/auth.routes";
import Express from "express";
import errorHandlingMiddleware from "middlewares/errorHandlingMiddleware";
import cors from "cors";
import { userRoutes } from "api/routes/user.routes";
import { eventRoutes } from "api/routes/events.routes";
import verifyJWT from "middlewares/ensureAuthenticated";
import { activitiesRoutes } from "api/routes/activities.routes";
import { certificateRoutes } from "api/routes/certificates.routes";

const PORT = 8080;

const server = Express();
server.use(cors());

//teste de conexao
server.get("/", (req, res) => {
    res.send("Conexao feita com sucesso!");
});

// auth Routes
server.use(Express.json());
server.use(authRoutes);

// private routes
server.use(verifyJWT);

server.use(userRoutes);
server.use(eventRoutes);
server.use(activitiesRoutes);
server.use(certificateRoutes);

server.use(errorHandlingMiddleware);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// http://localhost:3000/events/create
