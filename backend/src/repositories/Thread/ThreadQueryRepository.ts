import { prisma } from "../../database/client";
import { IThread } from "../../entities/Thread";

export interface IThreadQueryRepository {
  findByUser(userId: number): Promise<IThread[]>;
}

export class ThreadQueryRepository implements IThreadQueryRepository {
  async findByUser(userId: number): Promise<IThread[]> {
    return await prisma.thread.findMany({ where: { userId } });
  }
}
