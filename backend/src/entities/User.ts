import "dotenv/config";
import { hashSync } from "bcrypt";

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

export class User implements IUser {
  constructor(
    public userId: number,
    public email: string,
    public name: string,
    public username: string,
    public password: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public deletedAt: Date | null,
  ) {}

  public updateEmail(email: string) {
    this.email = email;
  }

  public updateName(name: string) {
    this.name = name;
  }

  public updateUsername(username: string) {
    this.username = username;
  }

  public updatePassword(password: string) {
    this.password = hashSync(password, process.env.SALT!);
  }

  public deactivateAccount() {
    this.deletedAt = new Date();
  }

  public reactivateAccount() {
    this.deletedAt = null;
  }
}
