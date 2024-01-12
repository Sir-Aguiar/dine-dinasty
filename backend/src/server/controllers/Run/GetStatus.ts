import { RequestHandler } from "express";
import { CheckRunStatus } from "../../../services/OpenAI/run/CheckStatus";
import { HTTPHandler } from "../../../entities/HTTPHandler";
import { EntityError } from "../../../entities/EntityError";
import { ServerError } from "../../../entities/ServerError";
import { ThreadQueryRepository } from "../../../repositories/Thread/ThreadQueryRepository";

export const GetRunStatusController: RequestHandler = async (req, res) => {
  const Handler = new HTTPHandler(res);

  const { runId, threadId } = req.query;

  const { userId } = req.user;

  const ThreadQuery = new ThreadQueryRepository();

  try {
    const thread = await ThreadQuery.findById(threadId as string);

    if (userId !== thread.userId) return Handler.unauthorized("Você não tem acesso à esta conversa");

    const { status } = await CheckRunStatus({ runId: runId as string, threadId: threadId as string });

    return Handler.ok({ status });
  } catch (error) {
    console.log(error);

    if (error instanceof EntityError) return Handler.clientError(error.message);
    if (error instanceof ServerError) return Handler.expected(error);

    return Handler.unexpected(error);
  }
};
