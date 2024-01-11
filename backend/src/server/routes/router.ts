import { Router } from "express";
import { UserRegisterController } from "../controllers/Register";
import { UserAuthenticationController } from "../controllers/SignIn";
import { CreateThreadController } from "../controllers/Thread/CreateThread";
import { PrivateRouteMiddleware } from "../middlewares/PrivateRouteAuth";
import { CreateMessageController } from "../controllers/Message/CreateMessage";
import { GetMessagesController } from "../controllers/Message/GetMessages";
import { RunThreadController } from "../controllers/Thread/RunThread";
import { GetRunStatusController } from "../controllers/Run/GetStatus";

const routes = Router();

routes.post("/sign-up", UserRegisterController);
routes.post("/sign-in", UserAuthenticationController);

routes.post("/thread/create", PrivateRouteMiddleware, CreateThreadController);
routes.get("/thread/run", PrivateRouteMiddleware, RunThreadController);

routes.get("/run/status", PrivateRouteMiddleware, GetRunStatusController);

routes.post("/message/create", PrivateRouteMiddleware, CreateMessageController);
routes.get("/message", PrivateRouteMiddleware, GetMessagesController);

routes.get("/", (req, res) => {
  res.send("Funcionando");
});

export { routes };
