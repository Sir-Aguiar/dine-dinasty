import { RequestHandler } from "express";
import { CreateUser } from "../../use-cases/User/create-user";
import { UserCreationRepository } from "../../repositories/User/UserCreationRepository";
import { EntityError } from "../../entities/EntityError";
import { HTTPHandler } from "../../entities/HTTPHandler";
import { ServerError } from "../../entities/ServerError";
import { SignAuthToken } from "../../entities/AuthToken";

export const UserRegisterController: RequestHandler = async (req, res) => {
  const Handler = new HTTPHandler(res);

  const { password, username, name, email } = req.body;

  const createUseRepository = new UserCreationRepository();
  const createUser = new CreateUser(createUseRepository);

  try {
    const created = await createUser.execute({ name, password, username, email });

    const token = SignAuthToken(created);

    return Handler.created({ token });
  } catch (error) {
    if (error instanceof EntityError) {
      return Handler.clientError(error.message);
    }

    if (error instanceof ServerError) {
      return Handler.expected(error);
    }

    return Handler.unexpected(error);
  }
};
