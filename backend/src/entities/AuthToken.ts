import "dotenv/config";

import { sign } from "jsonwebtoken";
import { IUser } from "./User";

export interface IAuthToken {
  userId: number;
  username: string;
  name: string;
}

export const SignAuthToken = ({ userId, username, name }: IUser): string => {
  return sign({ userId, username, name }, process.env.SECRET!, { expiresIn: "7d" });
};
