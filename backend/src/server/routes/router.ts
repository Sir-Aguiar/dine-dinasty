import { Router } from "express";
import { UserRegisterController } from "../controllers/Register";

const routes = Router();

routes.post("/sign-up", UserRegisterController);

routes.get("/", (req, res) => {
  res.send("Funcionando");
});

export { routes };
