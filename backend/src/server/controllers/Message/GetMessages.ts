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
    const thread = await ThreadQuery.findById(threadId as string);

    if (userId !== thread.userId) return Handler.unauthorized("Você não tem acesso à esta conversa");

    const messages = await MessageQuery.findByThread(threadId as string);

    return Handler.ok({ messages });
  } catch (error) {
    console.log(error)
    return Handler.unexpected(error);
  }
};
