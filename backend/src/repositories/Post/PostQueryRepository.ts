import { prisma } from "../../database/client";
import { IPost } from "../../entities/Post";

export interface IPostQueryRepository {
  findByUser(userId: number): Promise<IPost[]>;
  findByDate(from: Date, to: Date): Promise<IPost[]>;
}

export class PostQueryRepository implements IPostQueryRepository {
  async findByUser(userId: number): Promise<IPost[]> {
    return await prisma.post.findMany({ where: { userId } });
  }

  async findByDate(from: Date, to: Date): Promise<IPost[]> {
    return await prisma.post.findMany({
      where: {
        createdAt: { gte: from, lte: to },
      },
    });
  }
}
