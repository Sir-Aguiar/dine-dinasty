import { prisma } from "../../database/client";
import { ServerError } from "../../entities/ServerError";
import { IUser } from "../../entities/User";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export interface IUserQueryRepository {
  findByUsername(username: string): Promise<IUser>;
  findById(userId: number): Promise<IUser>;
}

export class UserQueryRepository implements IUserQueryRepository {
  async findByUsername(username: string): Promise<IUser> {
    try {
      return prisma.user.findUniqueOrThrow({ where: { username } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new ServerError(404, "Nenhum usuário foi encontrado");
      }
      throw error;
    }
  }

  async findById(userId: number): Promise<IUser> {
    try {
      return prisma.user.findUniqueOrThrow({ where: { userId } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new ServerError(404, "Nenhum usuário foi encontrado");
      }
      throw error;
    }
  }
}
