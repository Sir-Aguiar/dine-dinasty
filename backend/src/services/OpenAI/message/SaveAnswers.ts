import { ApiGPT } from "../API";
import { MessageContentText } from "openai/resources/beta/threads/messages/messages";
import { MessageQueryRepository } from "../../../repositories/Message/MessageQueryRepository";
import { MessageCreationRepository } from "../../../repositories/Message/MessageCreationRepository";
import { CreateMessage } from "../../../use-cases/Message/create-message";

export const SaveAnswers = async (threadId: string) => {
  try {
    const messages = (await ApiGPT.beta.threads.messages.list(threadId)).data.filter(
      ({ role }) => role === "assistant",
    );

    const MessageQuery = new MessageQueryRepository();
    const MessageCreation = new MessageCreationRepository();

    const CreateMessageUseCase = new CreateMessage(MessageCreation);

    for (let index = 0; index < messages.length; index++) {
      const { thread_id: threadId, id: messageId, created_at: createdAt, role, content } = messages[index];

      const messageJSON = (content[0] as MessageContentText).text.value.replaceAll("<JSON>", "").replaceAll("</JSON>","");
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
