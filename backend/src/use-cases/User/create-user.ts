import { EntityError } from "../../entities/EntityError";
import { IUser } from "../../entities/User";
import { IUserCreationRepository } from "../../repositories/User/UserCreationRepository";

export interface CreateUserInput {
  name: string;
  username: string;
  password: string;
  email: string;
}

export type CreateUserOutput = Promise<IUser>;

export class CreateUser {
  constructor(private repository: IUserCreationRepository) {}

  async execute({ name, password, username, email }: CreateUserInput): CreateUserOutput {
    if (typeof name !== "string") throw new EntityError("Este nome é inválido");

    if (typeof password !== "string") throw new EntityError("Esta senha é inválido");

    if (typeof username !== "string") throw new EntityError("Este nome de usuário é inválido");

    if (typeof email !== "string") throw new EntityError("Este email é inválido");

    if (name.length > 100) throw new EntityError("Abrevie se necessário, seu nome deve conter até 100 caracteres");

    if (username.length > 15) throw new EntityError("O nome de usuário deve possuir até 15 caracteres");

    if (password.length < 6) throw new EntityError("A senha deve possuir mais de 6 caracteres");

    if (email.length > 255) throw new EntityError("O email deve possui menos de 255 caracteres");

    return await this.repository.execute({ name, password, username, email });
  }
}
