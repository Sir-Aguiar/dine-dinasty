import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prisma } from "../../database/client";
import { IThread } from "../../entities/Thread";
import { CreateThreadInput } from "../../use-cases/Thread/create-thread";
import { ServerError } from "../../entities/ServerError";

export interface IThreadCreationRepository {
  execute({ userId, threadId, createdAt }: CreateThreadInput): Promise<IThread>;
}

export class ThreadCreationRepository implements IThreadCreationRepository {
  async execute({ userId, threadId, createdAt }: CreateThreadInput): Promise<IThread> {
    try {
      return await prisma.threads.create({ data: { createdAt, threadId, userId } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2003") {
          if (error.meta?.field_name === "userId") {
            throw new ServerError(403, "Nenhum usuário foi identificado");
          }
        }
      }
      throw error;
    }
  }
}
