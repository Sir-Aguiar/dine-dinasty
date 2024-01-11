import { RequestHandler } from "express";
import { HTTPHandler } from "../../../entities/HTTPHandler";
import { ThreadQueryRepository } from "../../../repositories/Thread/ThreadQueryRepository";
import { ServerError } from "../../../entities/ServerError";
import { RunThread } from "../../../services/OpenAI/thread/RunThread";

export const RunThreadController: RequestHandler = async (req, res) => {
  const Handler = new HTTPHandler(res);

  const { threadId } = req.query;
  const { userId } = req.user;

  const ThreadQuery = new ThreadQueryRepository();

  try {
    const thread = await ThreadQuery.findById(threadId as string);

    if (userId !== thread.userId) return Handler.unauthorized("Você não tem acesso à esta conversa");

    const { id: runId, status } = await RunThread({ threadId: threadId as string });
    
    return Handler.ok({ runId, status });
  } catch (error) {
    if (error instanceof ServerError) return Handler.expected(error);

    return Handler.unexpected(error);
  }
};
