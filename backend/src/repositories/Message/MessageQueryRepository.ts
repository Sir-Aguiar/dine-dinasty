import { prisma } from "../../database/client";
import { IMessage } from "../../entities/Message";

export interface IMessageQueryRepository {
  findByThread(threadId: string): Promise<IMessage[]>;
  findById(messageId: string): Promise<IMessage | null>;
}

export class MessageQueryRepository implements IMessageQueryRepository {
  async findByThread(threadId: string): Promise<IMessage[]> {
    return await prisma.message.findMany({ where: { threadId } });
  }
  
  async findById(messageId: string): Promise<IMessage | null> {
    return await prisma.message.findUnique({ where: { messageId } });
  }
}
