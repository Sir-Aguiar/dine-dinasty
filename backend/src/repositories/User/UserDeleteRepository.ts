import { prisma } from "../../database/client";
import { DeleteUserInput, DeleteUserOutput } from "../../use-cases/User/delete-user";

export interface IDeleteUserRepository {
  softDelete({ userId }: DeleteUserInput): DeleteUserOutput;
}

export class DeleteUserRepository implements IDeleteUserRepository {
  async softDelete({ userId }: DeleteUserInput): DeleteUserOutput {
    try {
      await prisma.user.update({ where: { userId }, data: { deletedAt: new Date() } });
      return true;
    } catch (error) {
      throw error;
    }
  }
}
