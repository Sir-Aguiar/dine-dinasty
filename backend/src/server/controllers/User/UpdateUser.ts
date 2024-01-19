import { Request, Response } from "express";
import { ServerError } from "../../../entities/ServerError";
import { EntityError } from "../../../entities/EntityError";
import { HTTPHandler } from "../../../entities/HTTPHandler";
export const UpdateUserController = async (req: Request, res: Response) => {
  const Handler = new HTTPHandler(res);

  const { newEmail, newName, newUsername } = req.body;

  try {
  } catch (error) {
    if (error instanceof EntityError) return Handler.clientError(error.message);
    if (error instanceof ServerError) return Handler.expected(error);

    return Handler.unexpected(error);
  }
};
