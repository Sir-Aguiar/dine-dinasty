import { useEffect, useState } from "react";
import { RunThread } from "../../../services/Thread";
import { useAuthContext } from "../../../contexts/Auth";
import { CreateMessage } from "../../../services/Message";
import { CircularProgress, TextField } from "@mui/material";
import { SendRounded } from "@mui/icons-material";
import { useChatContext } from "../../../contexts/Chat";

export const UserInput: React.FC = () => {
  const { ServerAPI, authToken } = useAuthContext();

  const { updateMessages, WebSocket, threadId } = useChatContext();

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const [userEntry, setUserEntry] = useState("");

  const handleThreadRun = async () => {
    try {
      const { runId } = await RunThread(ServerAPI, threadId);

      WebSocket!.send(JSON.stringify({ action: "RUN-STATUS", threadId, runId, authToken }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitLoading(true);

    try {
      await CreateMessage(ServerAPI, { content: userEntry, threadId });

      await updateMessages();

      await handleThreadRun();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <form className="user-input" onSubmit={handleSubmit}>
      <TextField
        multiline
        maxRows={4}
        fullWidth
        label="Sua mensagem"
        value={userEntry}
        onChange={(e) => setUserEntry(e.target.value)}
        disabled={isSubmitLoading}
      />
      <button className="send" type="submit" disabled={isSubmitLoading}>
        {isSubmitLoading ? <CircularProgress size={18} /> : <SendRounded fontSize="small" />}
      </button>
    </form>
  );
};
