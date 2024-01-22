import { EntityError } from "../../entities/EntityError";
import { IUser } from "../../entities/User";
import { IUpdateUserRepository } from "../../repositories/User/UserUpdateRepository";

export interface UpdateUserInput {
  userId: number;
  name?: string;
  username?: string;
}

export type UpdateUserOutput = Promise<IUser>;

export class UpdateUser {
  constructor(private userRepository: IUpdateUserRepository) {}

  async execute({ name, username, userId }: UpdateUserInput): UpdateUserOutput {
    if (name) {
      if (typeof name !== "string") throw new EntityError("Este nome é inválido");

      if (name.length > 100) throw new EntityError("Abrevie se necessário, seu nome deve conter até 100 caracteres");
    }

    if (username) {
      if (typeof username !== "string") throw new EntityError("Este nome de usuário é inválido");

      if (username.length > 15) throw new EntityError("O nome de usuário deve possuir até 15 caracteres");
    }

    return this.userRepository.execute({ name, username, userId });
  }
}
