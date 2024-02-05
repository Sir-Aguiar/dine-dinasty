import { Request, Response } from "express";
import { HTTPHandler } from "../../../entities/HTTPHandler";
import { ServerError } from "../../../entities/ServerError";
import { EntityError } from "../../../entities/EntityError";

export const GetFeedController = async (req: Request, res: Response) => {
  const Handler = new HTTPHandler(res);

  try {
    
  } catch (error) {
    console.log(error);
    if (error instanceof EntityError) return Handler.clientError(error.message);
    if (error instanceof ServerError) return Handler.expected(error);

    return Handler.unexpected(error);
  }
};
