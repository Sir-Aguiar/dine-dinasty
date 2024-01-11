import { prisma } from "../../database/client";
import { IMessage } from "../../entities/Message";

export interface IMessageQueryRepository {
  findByThread(threadId: string): Promise<IMessage[]>;
}

export class MessageQueryRepository implements IMessageQueryRepository {
  async findByThread(threadId: string): Promise<IMessage[]> {
    return await prisma.message.findMany({ where: { threadId } });
  }
}
