import { AxiosInstance } from "axios";

export type TRunStatus =
  | "queued"
  | "in_progress"
  | "requires_action"
  | "cancelling"
  | "cancelled"
  | "failed"
  | "completed"
  | "expired";

export const GetRunStatus = async (API: AxiosInstance, threadId: string, runId: string) => {
  const response = await API.get(`/run/status?runId=${runId}&threadId=${threadId}`);
  return response.data.status as TRunStatus;
};
