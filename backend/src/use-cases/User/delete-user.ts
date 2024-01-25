import { IDeleteUserRepository } from "../../repositories/User/UserDeleteRepository";

export interface DeleteUserInput {
  userId: number;
}

export type DeleteUserOutput = Promise<boolean>;

export class DeleteUser {
  constructor(private userRepository: IDeleteUserRepository) {}

  async execute({ userId }: DeleteUserInput): DeleteUserOutput {
    return await this.userRepository.softDelete({ userId });
  }
}
