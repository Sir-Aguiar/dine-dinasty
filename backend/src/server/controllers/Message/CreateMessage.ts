import { RequestHandler } from "express";
import { HTTPHandler } from "../../../entities/HTTPHandler";
import { MessageCreationRepository } from "../../../repositories/Message/MessageCreationRepository";
import { CreateMessage } from "../../../use-cases/Message/create-message";
import { NewMessage } from "../../../services/OpenAI/message/NewMessage";
import { EntityError } from "../../../entities/EntityError";
import { ServerError } from "../../../entities/ServerError";
import { MessageQueryRepository } from "../../../repositories/Message/MessageQueryRepository";
import { ThreadQueryRepository } from "../../../repositories/Thread/ThreadQueryRepository";

export const CreateMessageController: RequestHandler = async (req, res) => {
  const Handler = new HTTPHandler(res);
  const { content, threadId } = req.body;
  const { userId } = req.user;

  const MessageQuery = new MessageQueryRepository();
  const ThreadQuery = new ThreadQueryRepository();

  const MessageRepository = new MessageCreationRepository();
  const CreateMessageUseCase = new CreateMessage(MessageRepository);

  try {
    const thread = await ThreadQuery.findById(threadId as string);

    if (userId !== thread.userId) return Handler.unauthorized("Você não tem acesso à esta conversa");

    if ((await MessageQuery.findByThread(threadId)).length >= 1) {
      return Handler.forbidden("Esta conversa já foi encerrada");
    }

    const { created_at: createdAt, id: messageId } = await NewMessage({ role: "user", threadId, content });

    const message = await CreateMessageUseCase.execute({ content, createdAt, messageId, role: "user", threadId });

    return Handler.ok({ message });
  } catch (error) {
    console.log(error);

    if (error instanceof EntityError) return Handler.clientError(error.message);

    if (error instanceof ServerError) return Handler.expected(error);

    return Handler.unexpected(error);
  }
};
