import { EntityError } from "../../entities/EntityError";
import { IMessage } from "../../entities/Message";
import { IMessageCreationRepository } from "../../repositories/Message/MessageCreationRepository";

export interface CreateMessageInput {
  messageId: string;
  threadId: string;
  role: string;
  content: string;
  createdAt: number;
}

export type CreateMessageOutput = Promise<IMessage>;

export class CreateMessage {
  constructor(private messageRepository: IMessageCreationRepository) {}

  async execute({ content, createdAt, messageId, role, threadId }: CreateMessageInput): CreateMessageOutput {
    if (typeof threadId !== "string") throw new EntityError("Identificador de thread inválido");

    if (typeof messageId !== "string") throw new EntityError("Identificador de mensagem inválido");

    if (typeof content !== "string") throw new EntityError("O conteúdo desta imagem é inválido");

    if (role !== "user" && role !== "assistant") throw new EntityError("Esta mensagem possui propriedades inválidas");

    return await this.messageRepository.execute({ content, createdAt, messageId, role, threadId });
  }
}
