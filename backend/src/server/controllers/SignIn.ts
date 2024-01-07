import { RequestHandler } from "express";
import { HTTPHandler } from "../../entities/HTTPHandler";
import { EntityError } from "../../entities/EntityError";
import { ServerError } from "../../entities/ServerError";
import { SignAuthToken } from "../../entities/AuthToken";
import { SignIn } from "../../use-cases/User/sign-in";
import { UserQueryRepository } from "../../repositories/User/UserQueryRepository";

export const UserAuthenticationController: RequestHandler = async (req, res) => {
  const Handler = new HTTPHandler(res);

  const { username, password } = req.body;

  const userQueryRepository = new UserQueryRepository();
  const signIn = new SignIn(userQueryRepository);

  try {
    const user = await signIn.execute({ password, username });

    const token = SignAuthToken(user);

    return Handler.ok({ token });
  } catch (error) {
    if (error instanceof EntityError) return Handler.clientError(error.message);

    if (error instanceof ServerError) return Handler.expected(error);

    return Handler.unexpected(error);
  }
};
