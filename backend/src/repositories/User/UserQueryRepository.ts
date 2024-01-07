import { prisma } from "../../database/client";
import { IUser } from "../../entities/User";

export interface IUserQueryRepository {
  findByUsername(username: string): Promise<IUser>;
}

export class UserQueryRepository implements IUserQueryRepository {
  async findByUsername(username: string): Promise<IUser> {
    return prisma.user.findUniqueOrThrow({ where: { username } });
  }
}
