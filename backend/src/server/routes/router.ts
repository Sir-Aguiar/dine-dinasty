import { Router } from "express";
import { UserRegisterController } from "../controllers/Register";
import { UserAuthenticationController } from "../controllers/SignIn";
import { CreateThreadController } from "../controllers/Thread/CreateThread";
import { PrivateRouteMiddleware } from "../middlewares/PrivateRouteAuth";
import { CreateMessageController } from "../controllers/Message/CreateMessage";
import { GetMessagesController } from "../controllers/Message/GetMessages";
import { GetRunStatusController } from "../controllers/Run/GetStatus";
import { RunThreadController } from "../controllers/Thread/RunThread";
import { CreatePostController } from "../controllers/Post/CreatePost";
import { GetPostsController } from "../controllers/Post/GetPosts";
import { FindPostController } from "../controllers/Post/FindPost";
import { GetFeedController } from "../controllers/Post/GetFeed";
import { UpdateUserController } from "../controllers/User/UpdateUser";

const routes = Router();

routes.post("/sign-up", UserRegisterController);
routes.post("/sign-in", UserAuthenticationController);
routes.put("/user", PrivateRouteMiddleware, UpdateUserController)

routes.post("/thread/create", PrivateRouteMiddleware, CreateThreadController);
routes.get("/thread/run", PrivateRouteMiddleware, RunThreadController);
routes.get("/run/status", PrivateRouteMiddleware, GetRunStatusController);

routes.post("/message/create", PrivateRouteMiddleware, CreateMessageController);
routes.get("/message", PrivateRouteMiddleware, GetMessagesController);

routes.post("/post/create", PrivateRouteMiddleware, CreatePostController);
routes.get("/post", PrivateRouteMiddleware, GetPostsController);
routes.get("/post/:postId", PrivateRouteMiddleware, FindPostController);

routes.get("/feed", PrivateRouteMiddleware, GetFeedController);

routes.get("/", (req, res) => {
  res.send("Funcionando");
});

export { routes };
