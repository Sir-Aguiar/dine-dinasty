import { Request, Response } from "express";
import { HTTPHandler } from "../../../entities/HTTPHandler";
import { EntityError } from "../../../entities/EntityError";
import { ServerError } from "../../../entities/ServerError";
import { PostQueryRepository } from "../../../repositories/Post/PostQueryRepository";

export const GetPostsController = async (req: Request, res: Response) => {
  const Handler = new HTTPHandler(res);
  const { userId } = req.query;

  const PostQuery = new PostQueryRepository();

  try {
    if (userId) {
      const posts = await PostQuery.findByUser(Number(userId));
      return Handler.ok({ posts });
    }

    return Handler.ok({});
  } catch (error) {
    if (error instanceof EntityError) return Handler.clientError(error.message);
    if (error instanceof ServerError) return Handler.expected(error);

    return Handler.unexpected(error);
  }
};
