import { RequestHandler } from "express";
import { HTTPHandler } from "../../../entities/HTTPHandler";
import { NewThread } from "../../../services/OpenAI/thread/NewThread";
import { ServerError } from "../../../entities/ServerError";
import { EntityError } from "../../../entities/EntityError";
import { ThreadCreationRepository } from "../../../repositories/Thread/ThreadCreationRepository";
import { CreateThread } from "../../../use-cases/Thread/create-thread";

export const CreateThreadController: RequestHandler = async (req, res) => {
  const Handler = new HTTPHandler(res);
  const { userId } = req.user;

  const ThreadRepository = new ThreadCreationRepository();
  const CreateThreadUseCase = new CreateThread(ThreadRepository);

  try {
    const { created_at: createdAt, id: threadId } = await NewThread();
    await CreateThreadUseCase.execute({ createdAt, threadId, userId });
    return Handler.created({ threadId });
  } catch (error) {
    console.log(error);
    if (error instanceof EntityError) return Handler.clientError(error.message);
    if (error instanceof ServerError) return Handler.expected(error);
    return Handler.unexpected(error);
  }
};
