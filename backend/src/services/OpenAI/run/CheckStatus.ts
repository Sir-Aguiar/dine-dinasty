import { ApiGPT } from "../API";

interface Props {
  runId: string;
  threadId: string;
}

export const CheckRunStatus = async ({ runId, threadId }: Props) => {
  const run = await ApiGPT.beta.threads.runs.retrieve(threadId, runId);
  return { status: run.status };
};
