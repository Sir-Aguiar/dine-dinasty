import "dotenv/config";
import { RequestHandler } from "express";
import { HTTPHandler } from "../../entities/HTTPHandler";
import { JsonWebTokenError, verify } from "jsonwebtoken";
import { IAuthToken } from "../../entities/AuthToken";

export const PrivateRouteMiddleware: RequestHandler = (req, res, next) => {
  const Handler = new HTTPHandler(res);
  const AuthToken = req.header("Authorization")?.split(" ")[1];

  if (!AuthToken) return Handler.unauthorized("É necessário estar autenticado para fazer isto");

  try {
    const user = verify(AuthToken, process.env.SECRET!) as IAuthToken;
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      if (error.cause === "TokenExpiredError") {
        return Handler.unauthorized("Sua seção se encerrou, por favor autentique-se novamente");
      }

      return Handler.unauthorized("É necessário estar autenticado para fazer isto");
    }

    return Handler.unexpected(error);
  }
};
