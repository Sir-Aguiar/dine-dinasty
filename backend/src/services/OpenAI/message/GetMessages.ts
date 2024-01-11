import { ApiGPT } from "../API";

interface Props {
  threadId: string;
}

export const GetMessages = async ({ threadId }: Props) => {
  const messages = await ApiGPT.beta.threads.messages.list(threadId);
  return messages.data;
};
