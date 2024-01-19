import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prisma } from "../../database/client";
import { CreateMessageInput, CreateMessageOutput } from "../../use-cases/Message/create-message";
import { ServerError } from "../../entities/ServerError";

export interface IMessageCreationRepository {
  execute({ content, createdAt, messageId, role, threadId }: CreateMessageInput): CreateMessageOutput;
}

export class MessageCreationRepository implements IMessageCreationRepository {
  async execute({ content, createdAt, messageId, role, threadId }: CreateMessageInput): CreateMessageOutput {
    try {
      return await prisma.message.create({ data: { content, createdAt, messageId, role, threadId } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2003") {
          if (error.meta?.field_name === "messages_threadId_fkey (index)") {
            throw new ServerError(403, "Nenhuma thread foi identificado");
          }
        }
        if (error.code === "P2002") throw new ServerError(403, "Esta mensagem possui um identificador inválido");
      }
      throw error;
    }
  }
}
