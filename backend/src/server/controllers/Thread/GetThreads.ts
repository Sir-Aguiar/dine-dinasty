import { Request, Response } from "express";
import { HTTPHandler } from "../../../entities/HTTPHandler";
import { ServerError } from "../../../entities/ServerError";
import { EntityError } from "../../../entities/EntityError";
import { ThreadQueryRepository } from "../../../repositories/Thread/ThreadQueryRepository";

export const GetThreadsController = async (req: Request, res: Response) => {
  const Handler = new HTTPHandler(res);
  const { userId } = req.user;

  const ThreadRepository = new ThreadQueryRepository();

  try {
    const threads = (await ThreadRepository.findByUser(userId)).map(({ createdAt, threadId }) => ({
      createdAt,
      threadId,
    }));
    return Handler.ok({ threads });
  } catch (error) {
    if (error instanceof EntityError) return Handler.clientError(error.message);
    if (error instanceof ServerError) return Handler.expected(error);

    return Handler.unexpected(error);
  }
};
