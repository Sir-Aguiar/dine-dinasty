import { AxiosInstance } from "axios";
import { TRunStatus } from "./Run";

export const CreateThread = async (API: AxiosInstance): Promise<string> => {
  const response = await API.post("/thread/create");
  return response.data.threadId;
};

export interface RunThreadResponse {
  runId: string;
  status: TRunStatus
   ;
}

export const RunThread = async (API: AxiosInstance, threadId: string) => {
  const response = await API.get(`/thread/run?threadId=${threadId}`);
  return response.data as RunThreadResponse;
};
