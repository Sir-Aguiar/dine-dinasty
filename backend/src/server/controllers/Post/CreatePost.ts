import { Request, Response } from "express";
import { HTTPHandler } from "../../../entities/HTTPHandler";
import { EntityError } from "../../../entities/EntityError";
import { ServerError } from "../../../entities/ServerError";
import { PostCreationRepository } from "../../../repositories/Post/PostCreationRepository";
import { CreatePost } from "../../../use-cases/Post/create-post";
import { ThreadQueryRepository } from "../../../repositories/Thread/ThreadQueryRepository";

export const CreatePostController = async (req: Request, res: Response) => {
  const Handler = new HTTPHandler(res);

  const { userId } = req.user;

  const { threadId, title, ownerReview } = req.body;

  const PostRepository = new PostCreationRepository();
  const ThreadRepository = new ThreadQueryRepository();
  const CreatePostUseCase = new CreatePost(PostRepository);

  try {
    const thread = await ThreadRepository.findById(threadId);

    if (thread.userId !== userId) return Handler.unauthorized("Você não tem acesso à esta conversa");

    await CreatePostUseCase.execute({ threadId, title, userId, ownerReview });

    return Handler.created({});
  } catch (error) {
    if (error instanceof EntityError) return Handler.clientError(error.message);
    if (error instanceof ServerError) return Handler.expected(error);
    
    return Handler.unexpected(error);
  }
};
