import { AxiosInstance } from "axios";
import { IMessage } from "../contexts/Chat";

export const GetThreadMessages = async (API: AxiosInstance, threadId: string): Promise<IMessage[]> => {
  const response = await API.get(`/message?threadId=${threadId}`);
  return response.data.messages;
};
