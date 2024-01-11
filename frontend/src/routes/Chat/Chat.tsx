import React, { useEffect, useState } from "react";
import "./Chat.css";
import { SendRounded, Share } from "@mui/icons-material";
import Message from "../../components/Chat/Message/Message";
import { useChatContext } from "../../contexts/Chat";
import { CircularProgress } from "@mui/material";
import { CreateMessage } from "../../services/Message";
import { useAuthContext } from "../../contexts/Auth";
import { RunThread } from "../../services/Thread";
import { GetRunStatus } from "../../services/Run";

const Chat: React.FC = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const { messages, thread, setMessages, setRunStatus, runStatus, updateMessages } = useChatContext();
  const { ServerAPI } = useAuthContext();

  const [userInput, setUserInput] = useState("");

  const handleMessageSubmit = async () => {
    setIsSubmitLoading(true);

    try {
      const message = await CreateMessage(ServerAPI, { content: userInput, threadId: thread });

      document.querySelector(".chat-container .input")?.classList.add("inactive");

      setMessages((value) => [...value, message]);

      await handleThreadRun();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const handleThreadRun = async () => {
    try {
      const { runId } = await RunThread(ServerAPI, thread);

      const interval = setInterval(() => {
        GetRunStatus(ServerAPI, thread, runId).then((status) => {
          setRunStatus(status);
          if (status === "completed") clearInterval(interval);
        });
      }, 3500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (runStatus === "completed") updateMessages();
  }, [runStatus]);

  return (
    <div className="chat-container">
      <div className="chat">
        {messages.map(({ content, role, messageId }) => (
          <Message content={content} sender={role} key={messageId} />
        ))}
      </div>
      <div className="w-full h-auto flex items-center gap-4">
        <button className="share">
          <Share sx={{ height: "20px", width: "20px" }} /> Compartilhar receita
        </button>
      </div>
      <div className={`input`}>
        {isSubmitLoading && (
          <div className="p-2 w-full h-full flex items-center justify-center absolute backdrop-blur-[1px]">
            <CircularProgress size={20} />
          </div>
        )}
        <textarea
          placeholder="Insira aqui sua mensagem"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isSubmitLoading}
        />
        <button
          className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-white"
          onClick={handleMessageSubmit}
          disabled={isSubmitLoading}
        >
          <SendRounded fontSize="small" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
