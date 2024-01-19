import { EntityError } from "../../entities/EntityError";
import { IUser, User } from "../../entities/User";
import { IUpdateUserRepository } from "../../repositories/User/UserUpdateRepository";

export type UpdateUserInput = User;
export type UpdateUserOutput = Promise<IUser>;

export class UpdateUser {
  constructor(private userRepository: IUpdateUserRepository) {}

  async execute(user: UpdateUserInput): UpdateUserOutput {
    const { name, email, username } = user;

    if (typeof name !== "string") throw new EntityError("Este nome é inválido");

    if (typeof username !== "string") throw new EntityError("Este nome de usuário é inválido");

    if (typeof email !== "string") throw new EntityError("Este email é inválido");

    if (name.length > 100) throw new EntityError("Abrevie se necessário, seu nome deve conter até 100 caracteres");

    if (username.length > 15) throw new EntityError("O nome de usuário deve possuir até 15 caracteres");

    if (email.length > 255) throw new EntityError("O email deve possui menos de 255 caracteres");

    return this.userRepository.execute(user);
  }
}
