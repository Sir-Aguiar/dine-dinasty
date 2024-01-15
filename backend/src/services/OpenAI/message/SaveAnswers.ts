import { ApiGPT } from "../API";
import { MessageContentText, ThreadMessage, ThreadMessagesPage } from "openai/resources/beta/threads/messages/messages";
import { MessageQueryRepository } from "../../../repositories/Message/MessageQueryRepository";
import { MessageCreationRepository } from "../../../repositories/Message/MessageCreationRepository";
import { CreateMessage } from "../../../use-cases/Message/create-message";

const ExtractBotMessage = (messages: ThreadMessagesPage) => messages.data.filter(({ role }) => role === "assistant");

const FormatBotMessage = (message: ThreadMessage) => {
  const messageContent = message.content[0] as MessageContentText;
  const messageJSON = messageContent.text.value.replaceAll("<JSON>", "").replaceAll("</JSON>", "");
  return messageJSON;
};

export const SaveAnswers = async (threadId: string) => {
  try {
    const messages = await ApiGPT.beta.threads.messages.list(threadId);
    const botMessages = ExtractBotMessage(messages);

    const MessageQuery = new MessageQueryRepository();
    const MessageCreation = new MessageCreationRepository();

    const CreateMessageUseCase = new CreateMessage(MessageCreation);

    for (let index = 0; index < botMessages.length; index++) {
      const { thread_id: threadId, id: messageId, created_at: createdAt, role } = botMessages[index];

      const messageJSON = FormatBotMessage(botMessages[index]);

      if (await MessageQuery.findById(messageId)) return;

      const messageRecipe = JSON.parse(messageJSON);

      await CreateMessageUseCase.execute({
        createdAt,
        messageId,
        role,
        threadId,
        content: JSON.stringify(messageRecipe),
      });
    }
  } catch (error) {
    console.log(error);
  }
};
