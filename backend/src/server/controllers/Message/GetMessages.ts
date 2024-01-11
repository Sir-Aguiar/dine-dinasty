import { RequestHandler } from "express";
import { ThreadQueryRepository } from "../../../repositories/Thread/ThreadQueryRepository";
import { MessageQueryRepository } from "../../../repositories/Message/MessageQueryRepository";
import { HTTPHandler } from "../../../entities/HTTPHandler";

export const GetMessagesController: RequestHandler = async (req, res) => {
  const Handler = new HTTPHandler(res);
  const { threadId } = req.query;
  const { userId } = req.user;

  const ThreadQuery = new ThreadQueryRepository();
  const MessageQuery = new MessageQueryRepository();

  try {
    const userThreads = await ThreadQuery.findByUser(userId);

    if (!userThreads.map(({ threadId }) => threadId).includes(threadId as string)) {
      return Handler.unauthorized("Você não tem acesso à esta conversa");
    }

    const messages = await MessageQuery.findByThread(threadId as string);

    return Handler.ok({ messages });
  } catch (error) {
    return Handler.unexpected(error);
  }
};
