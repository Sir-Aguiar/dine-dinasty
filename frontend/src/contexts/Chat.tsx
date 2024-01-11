import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetThreadMessages } from "../services/Message";
import { useAuthContext } from "./Auth";

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
}

const ChatContext = createContext<Context | null>(null);

export const ChatContextProvider = ({ children }: Props) => {
  const { threadID } = useParams();
  const navigate = useNavigate();

  const [thread, setThread] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { ServerAPI } = useAuthContext();

  useEffect(() => {
    if (!threadID) {
      navigate("/");
      return;
    }

    GetThreadMessages(ServerAPI, threadID).then((response) => setMessages(response));

    setThread(threadID);
  }, [threadID]);

  return <ChatContext.Provider value={{ messages, thread }}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context) throw new Error("ChatContext must be called from within the ChatContextProvider");

  return context;
};
