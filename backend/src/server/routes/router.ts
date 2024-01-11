import { Router } from "express";
import { UserRegisterController } from "../controllers/Register";
import { UserAuthenticationController } from "../controllers/SignIn";
import { CreateThreadController } from "../controllers/Thread/CreateThread";
import { PrivateRouteMiddleware } from "../middlewares/PrivateRouteAuth";
import { CreateMessageController } from "../controllers/Message/CreateMessage";

const routes = Router();

routes.post("/sign-up", UserRegisterController);
routes.post("/sign-in", UserAuthenticationController);

routes.post("/thread/create", PrivateRouteMiddleware, CreateThreadController);
routes.post("/message/create", PrivateRouteMiddleware, CreateMessageController);
routes.get("/", (req, res) => {
  res.send("Funcionando");
});

export { routes };
