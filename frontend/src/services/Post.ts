import { AxiosInstance } from "axios";

export interface CreatePostInput {
  title: string;
  ownerReview?: string;
  threadId: string;
}

export const CreatePostService = async (API: AxiosInstance, { title, ownerReview, threadId }: CreatePostInput) => {
  const response = await API.post("/post/create", { title, ownerReview, threadId });
  return response.data;
};
