import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prisma } from "../../database/client";
import { IThread } from "../../entities/Thread";
import { ServerError } from "../../entities/ServerError";

export interface IThreadQueryRepository {
  findByUser(userId: number): Promise<IThread[]>;
  findById(threadId: string): Promise<IThread>;
}

export class ThreadQueryRepository implements IThreadQueryRepository {
  async findByUser(userId: number): Promise<IThread[]> {
    return await prisma.thread.findMany({ where: { userId } });
  }

  async findById(threadId: string): Promise<IThread> {
    try {
      return await prisma.thread.findUniqueOrThrow({ where: { threadId } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new ServerError(404, "Nenhuma thread foi encontrada com este identificador");
      }
      throw error;
    }
  }
}
