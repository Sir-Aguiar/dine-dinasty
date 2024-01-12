import { AxiosInstance } from "axios";
import { TRunStatus } from "./Run";

export const CreateThread = async (API: AxiosInstance): Promise<string> => {
  const response = await API.post("/thread/create");
  return response.data.threadId;
};
