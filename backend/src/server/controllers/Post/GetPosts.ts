import { Request, Response } from "express";
import { HTTPHandler } from "../../../entities/HTTPHandler";
import { EntityError } from "../../../entities/EntityError";
import { ServerError } from "../../../entities/ServerError";
export const GetPostsController = async (req: Request, res: Response) => {
  const Handler = new HTTPHandler(res);
  const { userId } = req.user;
  const { postId } = req.query;

  try {
  } catch (error) {
    if (error instanceof EntityError) return Handler.clientError(error.message);
    if (error instanceof ServerError) return Handler.expected(error);

    return Handler.unexpected(error);
  }
};
