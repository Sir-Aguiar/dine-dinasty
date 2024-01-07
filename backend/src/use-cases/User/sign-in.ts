import { compareSync } from "bcrypt";
import { EntityError } from "../../entities/EntityError";
import { IUser } from "../../entities/User";
import { IUserQueryRepository } from "../../repositories/User/UserQueryRepository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ServerError } from "../../entities/ServerError";

export interface SignInInput {
  username: string;
  password: string;
}
export type SignInOutput = Promise<IUser>;

export class SignIn {
  constructor(private queryRepository: IUserQueryRepository) {}
  async execute({ password, username }: SignInInput): SignInOutput {
    if (typeof password !== "string") throw new EntityError("Insira uma senha válida");

    if (typeof username !== "string") throw new EntityError("Insira um nome de usuário válido");

    try {
      const user = await this.queryRepository.findByUsername(username);

      if (!compareSync(password, user.password)) {
        throw new ServerError(401, "Senha incorreta");
      }

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new ServerError(404, "Nenhum usuário foi encontrado");
      }

      throw error;
    }
  }
}
