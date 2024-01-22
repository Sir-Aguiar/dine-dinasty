import { Request, Response } from "express";
import { ServerError } from "../../../entities/ServerError";
import { EntityError } from "../../../entities/EntityError";
import { HTTPHandler } from "../../../entities/HTTPHandler";
import { UpdateUserRepository } from "../../../repositories/User/UserUpdateRepository";
import { UpdateUser } from "../../../use-cases/User/update-user";
import { SignAuthToken } from "../../../entities/AuthToken";

export const UpdateUserController = async (req: Request, res: Response) => {
  const Handler = new HTTPHandler(res);
  const { userId } = req.user;
  const { name, username } = req.body;

  const UserUpdate = new UpdateUserRepository();
  const UpdateUserUseCase = new UpdateUser(UserUpdate);

  try {
    const updatedUser = await UpdateUserUseCase.execute({ name, username, userId });
    const token = SignAuthToken(updatedUser);

    return Handler.ok({ token });
  } catch (error) {
    if (error instanceof EntityError) return Handler.clientError(error.message);
    if (error instanceof ServerError) return Handler.expected(error);

    return Handler.unexpected(error);
  }
};
