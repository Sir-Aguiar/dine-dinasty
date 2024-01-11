import { AxiosInstance } from "axios";
import { IMessage } from "../contexts/Chat";

export const GetThreadMessages = async (API: AxiosInstance, threadId: string): Promise<IMessage[]> => {
  const response = await API.get(`/message?threadId=${threadId}`);
  return response.data.messages;
};

export interface CreateMessageInput {
  content: string;
  threadId: string;
}
export interface CreateMessageResponse extends IMessage {
  createdAt: number;
}

export const CreateMessage = async (API: AxiosInstance, { content, threadId }: CreateMessageInput) => {
  const response = await API.post("/message/create", { threadId, content });
  return response.data.message as CreateMessageResponse;
};
