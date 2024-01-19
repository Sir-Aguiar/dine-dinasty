import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prisma } from "../../database/client";
import { ServerError } from "../../entities/ServerError";
import { User } from "../../entities/User";
import { UpdateUserInput, UpdateUserOutput } from "../../use-cases/User/update-user";

export interface IUpdateUserRepository {
  execute({ email, name, username, password, userId }: UpdateUserInput): Promise<UpdateUserOutput>;
}

export class UpdateUserRepository implements IUpdateUserRepository {
  async execute({ email, name, username, password, userId }: User): Promise<UpdateUserOutput> {
    try {
      return await prisma.user.update({ where: { userId }, data: { email, name, username, password } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new ServerError(404, "Nenhum usuário foi encontrado com este identificador");
      }
      throw error;
    }
  }
}
