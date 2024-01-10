import { EntityError } from "../../entities/EntityError";
import { IThread } from "../../entities/Thread";
import { IThreadCreationRepository } from "../../repositories/Thread/ThreadCreationRepository";

export interface CreateThreadInput {
  threadId: string;
  userId: number;
  createdAt: number;
}

export type CreateThreadOutput = Promise<IThread>;

export class CreateThread {
  constructor(private threadRepository: IThreadCreationRepository) {}

  async execute({ createdAt, threadId, userId }: CreateThreadInput): CreateThreadOutput {
    if (typeof threadId !== "string") throw new EntityError("Identificador de thread inválido");

    if (typeof userId !== "number") throw new EntityError("Identificador de usuário inválido");

    return await this.threadRepository.execute({ createdAt, threadId, userId });
  }
}
