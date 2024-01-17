import { EntityError } from "../../entities/EntityError";
import { IPost } from "../../entities/Post";
import { IPostCreationRepository } from "../../repositories/Post/PostCreationRepository";

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
    if (typeof threadId !== "string") throw new EntityError("Identificador de conversa em formato inválido");

    if (typeof userId !== "number") throw new EntityError("Identificador usuário em formato inválido");

    if (typeof title !== "string") throw new EntityError("Título em formato inválido");

    if (ownerReview && typeof ownerReview !== "string") throw new EntityError("Descrição está em formato inválido");

    if (title.length > 150) throw new EntityError("O título deste post deve ter no máximo 150 letras");

    return await this.postRepository.execute({ threadId, title, userId, ownerReview });
  }
}
