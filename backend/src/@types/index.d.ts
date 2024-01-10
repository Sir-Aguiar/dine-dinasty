import { IAuthToken } from "../entities/AuthToken";

declare global {
  namespace Express {
    export interface Request {
      user: IAuthToken;
    }
  }
}
