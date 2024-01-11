import { ApiGPT } from "../API";

interface Props {
  role: "user";
  content: string;
  threadId: string;
}

export const NewMessage = async ({ threadId, content, role }: Props) => {
  const message = await ApiGPT.beta.threads.messages.create(threadId, { content, role });
  return message;
};
