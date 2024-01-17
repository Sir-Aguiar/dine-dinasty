import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prisma } from "../database/client";
import { IPost } from "../entities/Post";
import { CreatePostInput } from "../use-cases/Post/create-post";

export interface IPostCreationRepository {
  execute({ threadId, userId, title, ownerReview }: CreatePostInput): Promise<IPost>;
}

export class PostCreationRepository implements IPostCreationRepository {
  async execute({ threadId, userId, title, ownerReview }: CreatePostInput): Promise<IPost> {
    try {
      return await prisma.post.create({ data: { title, userId, threadId, ownerReview } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2003") {
          
        }
      }


      throw error;
    }
  }
}
