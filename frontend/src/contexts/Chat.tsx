import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreateMessage, GetThreadMessages } from "../services/Message";
import { useAuthContext } from "./Auth";
import { RunThread } from "../services/Thread";
import { GetRunStatus, TRunStatus } from "../services/Run";

type Props = {
  children: React.ReactNode;
};

export interface IMessage {
  messageId: string;
  threadId: string;
  role: string;
  content: string;
}

interface Context {
  messages: IMessage[];
  thread: string;
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  setRunStatus: React.Dispatch<React.SetStateAction<TRunStatus | null>>;
  updateMessages: () => Promise<void>;
  runStatus: TRunStatus | null;
}

const ChatContext = createContext<Context | null>(null);

export const ChatContextProvider = ({ children }: Props) => {
  const { threadId } = useParams();
  const navigate = useNavigate();

  const [thread, setThread] = useState("");
  const [runStatus, setRunStatus] = useState<null | TRunStatus>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { ServerAPI } = useAuthContext();

  const updateMessages = async () => {
    const messages = await GetThreadMessages(ServerAPI, threadId!);
    setMessages(messages);
  };

  useEffect(() => {
    const input = document.querySelector(".chat-container .input")!.classList;

    if (messages.length >= 1 && !input.contains("inactive")) input.add("inactive");
  }, [messages]);

  useEffect(() => {
    if (!threadId) {
      navigate("/");
      return;
    }

    GetThreadMessages(ServerAPI, threadId).then((response) => setMessages(response));

    setThread(threadId);
  }, [threadId]);

  return (
    <ChatContext.Provider value={{ messages, thread, setMessages, runStatus, setRunStatus, updateMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context) throw new Error("ChatContext must be called from within the ChatContextProvider");

  return context;
};
