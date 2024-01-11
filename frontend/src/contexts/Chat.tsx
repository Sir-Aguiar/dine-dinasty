import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreateMessage, GetThreadMessages } from "../services/Message";
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
  sendMessage: (content: string) => Promise<void>;
}

const ChatContext = createContext<Context | null>(null);

export const ChatContextProvider = ({ children }: Props) => {
  const { threadId } = useParams();
  const navigate = useNavigate();

  const [thread, setThread] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { ServerAPI } = useAuthContext();

  const sendMessage = async (content: string) => {
    const message = await CreateMessage(ServerAPI, { content, threadId: threadId! });
    setMessages((value) => [...value, message]);
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

  return <ChatContext.Provider value={{ messages, thread, sendMessage }}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context) throw new Error("ChatContext must be called from within the ChatContextProvider");

  return context;
};
