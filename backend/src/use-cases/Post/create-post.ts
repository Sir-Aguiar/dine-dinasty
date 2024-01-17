import { IPost } from "../../entities/Post";
import { IPostCreationRepository } from "../../repositories/PostCreationRepository";

export interface CreatePostInput {
  threadId: string;
  userId: number;
  title: string;
  ownerReview?: string;
}

export type CreatePostOutput = Promise<IPost>;

export class CreatePost {
  constructor(private postRepository: IPostCreationRepository) {}
  async execute({ threadId, title, userId, ownerReview }: CreatePostInput): CreatePostOutput {

    
    return await this.postRepository.execute({ threadId, title, userId, ownerReview });
  }
}
