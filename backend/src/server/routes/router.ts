import { Router } from "express";
import { UserRegisterController } from "../controllers/Register";
import { UserAuthenticationController } from "../controllers/SignIn";
import { CreateThreadController } from "../controllers/Thread/CreateThread";
import { PrivateRouteMiddleware } from "../middlewares/PrivateRouteAuth";

const routes = Router();

routes.post("/sign-up", UserRegisterController);
routes.post("/sign-in", UserAuthenticationController);

routes.post("/thread/create", PrivateRouteMiddleware, CreateThreadController);

routes.get("/", (req, res) => {
  res.send("Funcionando");
});

export { routes };
