import { prisma } from "../../database/client";
import { UpdateUserInput, UpdateUserOutput } from "../../use-cases/User/update-user";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ServerError } from "../../entities/ServerError";

export interface IUpdateUserRepository {
  execute({ name, username, userId }: UpdateUserInput): Promise<UpdateUserOutput>;
}

export class UpdateUserRepository implements IUpdateUserRepository {
  async execute({ name, username, userId }: UpdateUserInput): Promise<UpdateUserOutput> {
    try {
      return await prisma.user.update({ where: { userId }, data: { name, username } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new ServerError(404, "Nenhum usuário foi encontrado com este identificador");
      }
      throw error;
    }
  }
}
