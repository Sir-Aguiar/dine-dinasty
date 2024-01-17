export interface IUser {
  userId: number;
  email: string;
  name: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class User {}
