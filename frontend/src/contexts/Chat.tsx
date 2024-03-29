import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetThreadMessages } from "../services/Message";
import { useAuthContext } from "./Auth";
import { connectSocket } from "../services/connectSocket";
import { TRunStatus } from "../services/Run";

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
  chatMessages: IMessage[];
  threadId: string;
  updateMessages: () => Promise<void>;
  WebSocket: WebSocket | undefined;
  isPageLoading: boolean;
  setRunStatus: React.Dispatch<React.SetStateAction<TRunStatus | undefined>>;
  runStatus: TRunStatus | undefined;
  CreatePostModal: {
    open(): void;
    close(): void;
    isOpen: boolean;
  };
}

const ChatContext = createContext<Context | null>(null);

export const ChatContextProvider = ({ children }: Props) => {
  const { threadId } = useParams();
  const navigate = useNavigate();

  const { ServerAPI } = useAuthContext();

  const [WebSocket, setWebSocket] = useState<WebSocket>();

  const [chatMessages, setChatMessages] = useState<IMessage[]>([]);
  const [runStatus, setRunStatus] = useState<TRunStatus>();

  const [isCreatePostOpen, setCreatePostOpen] = useState(false);

  const CreatePostModal = useMemo(() => {
    return {
      open: () => setCreatePostOpen(true),
      close: () => setCreatePostOpen(false),
      isOpen: isCreatePostOpen,
    };
  }, [isCreatePostOpen]);

  const [isPageLoading, setIsPageLoading] = useState(true);

  const updateMessages = async () => {
    const messages = await GetThreadMessages(ServerAPI, threadId!);
    console.log(messages);
    setChatMessages(messages);
  };

  useEffect(() => {
    if (threadId) {
      setIsPageLoading(true);

      updateMessages()
        .then(() => {
          setWebSocket(connectSocket());
        })

        .catch((error) => console.log(error))

        .finally(() => setIsPageLoading(false));
    } else {
      navigate("/");
    }
  }, [threadId]);

  useEffect(() => {
    if (!WebSocket) return setIsPageLoading(true);

    if (WebSocket) {
      WebSocket!.addEventListener("message", async (event) => {
        const { status, action } = JSON.parse(event.data);

        if (action === "RUN-STATUS") {
          setRunStatus(status);

          if (status === "completed") {
            await updateMessages();
          }
        }
      });
    }
  }, [WebSocket]);

  useEffect(() => {
    if (chatMessages.length >= 1) {
      document.querySelector(".user-input")?.classList.add("inactive");
    }
  }, [chatMessages]);

  return (
    <ChatContext.Provider
      value={{
        chatMessages,
        updateMessages,
        threadId: threadId!,
        WebSocket,
        isPageLoading,
        runStatus,
        setRunStatus,
        CreatePostModal,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context) throw new Error("ChatContext must be called from within the ChatContextProvider");

  return context;
};
