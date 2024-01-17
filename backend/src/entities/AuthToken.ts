import "dotenv/config";

import { sign } from "jsonwebtoken";
import { IUser } from "./User";

export interface IAuthToken {
  userId: number;
  username: string;
  name: string;
  email: string;
}

export const SignAuthToken = ({ userId, email, username, name }: IUser): string => {
  return sign({ userId, username, name, email }, process.env.SECRET!, { expiresIn: "7d" });
};
