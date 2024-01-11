import "dotenv/config";
import { ApiGPT } from "../API";

interface Props {
  threadId: string;
}

export const RunThread = async ({ threadId }: Props) => {
  const run = await ApiGPT.beta.threads.runs.create(threadId, {
    assistant_id: process.env.ASSISTANT!,
  });

  return run;
};

