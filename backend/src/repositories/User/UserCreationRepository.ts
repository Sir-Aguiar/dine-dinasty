import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prisma } from "../../database/client";
import { CreateUserInput, CreateUserOutput } from "../../use-cases/User/create-user";
import { ServerError } from "../../entities/ServerError";

export interface IUserCreationRepository {
  execute(props: CreateUserInput): CreateUserOutput;
}

export class UserCreationRepository implements IUserCreationRepository {
  async execute({ name, password, username }: CreateUserInput): CreateUserOutput {
    try {
      return await prisma.user.create({ data: { name, password, username } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") throw new ServerError(403, "Nome de usuário já está em uso");
      }
      throw error;
    }
  }
}
