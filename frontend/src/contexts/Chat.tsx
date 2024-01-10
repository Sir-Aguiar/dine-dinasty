import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "./Auth";

/* 
  Cliquei pra iniciar uma nova conversa -> Cria uma nova thread -> Abre o chat da thread nova
*/

type Props = {
  children: React.ReactNode;
};

interface IMessage {
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

  useEffect(() => {
    if (!threadID) {
      navigate("/");
      return;
    }

    setThread(threadID);
  }, [threadID]);

  return <ChatContext.Provider value={{ messages, thread }}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context) throw new Error("ChatContext must be called from within the ChatContextProvider");

  return context;
};
