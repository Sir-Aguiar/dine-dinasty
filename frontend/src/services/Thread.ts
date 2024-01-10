import { AxiosInstance } from "axios";

export const CreateThread = async (API: AxiosInstance): Promise<string> => {
  const response = await API.post("/thread/create");
  return response.data.threadId;
};
