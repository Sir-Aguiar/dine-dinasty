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
  /**
   * @description This method search for a message that matches the id passed.
   *
   * It can returns a null value, so if the search don't find any row, it won't throw an error (like the others id searches).
   */
  async findById(messageId: string): Promise<IMessage | null> {
    return await prisma.message.findUnique({ where: { messageId } });
  }
}
