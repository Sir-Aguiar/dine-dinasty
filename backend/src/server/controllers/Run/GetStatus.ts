import { RequestHandler } from "express";
import { CheckRunStatus } from "../../../services/OpenAI/run/CheckStatus";
import { HTTPHandler } from "../../../entities/HTTPHandler";
import { MessageCreationRepository } from "../../../repositories/Message/MessageCreationRepository";
import { CreateMessage } from "../../../use-cases/Message/create-message";
import { GetMessages } from "../../../services/OpenAI/message/GetMessages";
import { MessageContentText } from "openai/resources/beta/threads/messages/messages";
import { EntityError } from "../../../entities/EntityError";
import { ServerError } from "../../../entities/ServerError";
import { ThreadQueryRepository } from "../../../repositories/Thread/ThreadQueryRepository";
import { MessageQueryRepository } from "../../../repositories/Message/MessageQueryRepository";

export const GetRunStatusController: RequestHandler = async (req, res) => {
  const Handler = new HTTPHandler(res);

  const { runId, threadId } = req.query;

  const { userId } = req.user;

  const ThreadQuery = new ThreadQueryRepository();
  const MessageQuery = new MessageQueryRepository();
  const MessageRepository = new MessageCreationRepository();
  const CreateMessageUseCase = new CreateMessage(MessageRepository);

  try {
    const thread = await ThreadQuery.findById(threadId as string);

    if (userId !== thread.userId) return Handler.unauthorized("Você não tem acesso à esta conversa");

    const { status } = await CheckRunStatus({ runId: runId as string, threadId: threadId as string });

    if (status === "completed") {
      const messages = await GetMessages({ threadId: threadId as string });

      for (let index = 0; index < messages.length; index++) {
        if (messages[index].role === "assistant") {
          const message = messages[index];
         
          if (await MessageQuery.findById(message.id)) return;

          const content = message.content[0] as MessageContentText;

          await CreateMessageUseCase.execute({
            content: content.text.value,
            createdAt: message.created_at,
            messageId: message.id,
            threadId: message.thread_id,
            role: "assistant",
          });
        }
      }
    }

    return Handler.ok({ status });
  } catch (error) {
    console.log(error);

    if (error instanceof EntityError) return Handler.clientError(error.message);
    if (error instanceof ServerError) return Handler.expected(error);

    return Handler.unexpected(error);
  }
};
