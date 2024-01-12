import { AxiosInstance } from "axios";
import { TRunStatus } from "./Run";

export const CreateThread = async (API: AxiosInstance): Promise<string> => {
  const response = await API.post("/thread/create");
  return response.data.threadId;
};

export interface RunThreadResponse {
  status: TRunStatus;
  runId: string;
}

export const RunThread = async (API: AxiosInstance, threadId: string): Promise<RunThreadResponse> => {
  const response = await API.get(`/thread/run?threadId=${threadId}`);
  return response.data;
};
