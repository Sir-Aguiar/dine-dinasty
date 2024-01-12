import React, { useState } from "react";
import "./Chat.css";
import { CircularProgress } from "@mui/material";
import { TextField } from "@mui/material";
import { SendRounded } from "@mui/icons-material";
import { CreateMessage } from "../../services/Message";
import { useAuthContext } from "../../contexts/Auth";
import { useChatContext } from "../../contexts/Chat";
import { RunThread } from "../../services/Thread";
import Message from "../../components/Chat/Message/Message";
import AssistantMessage from "../../components/Chat/AssistantMessage/AssistantMessage";

const UserInput: React.FC = () => {
  const { ServerAPI } = useAuthContext();
  const { updateMessages, WebSocket, threadId, setRunStatus } = useChatContext();

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [userEntry, setUserEntry] = useState("");

  const handleThreadRun = async () => {
    try {
      const { runId } = await RunThread(ServerAPI, threadId);

      WebSocket!.addEventListener("message", async (event) => {
        const { status } = JSON.parse(event.data);
        setRunStatus(status);
        if (status === "completed") {
          await updateMessages();
        }
      });

      WebSocket!.send(JSON.stringify({ action: "RUN-STATUS", threadId, runId }));
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

const ChatHistory: React.FC = () => {
  const { chatMessages, runStatus } = useChatContext();

  return (
    <div className="chat-messages">
      {chatMessages.map(
        ({ content, messageId, role }) => role === "user" && <Message content={content} key={messageId} />,
      )}
      {runStatus === "in_progress" && (
        <div className="ai-loader">
          <header>
            <span className={`w-5 h-5 rounded-full bg-orange-400`}></span>
            <span className="font-semibold">Chef Chico</span>
          </header>
          <div className="spinner"></div>
        </div>
      )}
      {chatMessages.map(
        ({ content, messageId, role }) =>
          role === "assistant" && (
            <AssistantMessage
              ingredients={JSON.parse(content).ingredients}
              prepare={JSON.parse(content).prepare}
              key={messageId}
            />
          ),
      )}
    </div>
  );
};

const Chat: React.FC = () => {
  const { isPageLoading } = useChatContext();
  return (
    <div className="chat-container">
      {isPageLoading ? (
        <CircularProgress size={30} className="absolute top-1/2 left-1/2 -translate-x-1/2" />
      ) : (
        <>
          <ChatHistory />
          <UserInput />
        </>
      )}
    </div>
  );
};

export default Chat;
