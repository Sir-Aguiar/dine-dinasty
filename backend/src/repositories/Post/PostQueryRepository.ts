import { prisma } from "../../database/client";
import { IPost } from "../../entities/Post";

export interface IPostQueryRepository {
  findByUser(userId: number): Promise<IPost[]>;
}

export class PostQueryRepository implements IPostQueryRepository {
  async findByUser(userId: number): Promise<IPost[]> {
    return await prisma.post.findMany({ where: { userId } });
  }
}
