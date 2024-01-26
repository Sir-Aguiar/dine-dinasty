import React from "react";
import "./Chat.css";
import { CircularProgress } from "@mui/material";

import { useChatContext } from "../../contexts/Chat";

import { ChatHistory } from "../../components/Chat/ChatHistory/ChatHistory";
import { UserInput } from "../../components/Chat/UserInput/UserInput";
import { ShareRounded } from "@mui/icons-material";
import CreatePost from "../../components/Chat/CreatePost/CreatePost";

const Chat: React.FC = () => {
  const { isPageLoading, runStatus, chatMessages, CreatePostModal } = useChatContext();
  const isDisabled = runStatus !== "completed" && chatMessages.length < 2;

  return (
    <div className="chat-container">
      {isPageLoading ? (
        <CircularProgress size={30} className="absolute top-1/2 left-1/2 -translate-x-1/2" />
      ) : (
        <>
          <ChatHistory />
          <button
            className="share"
            disabled={isDisabled}
            onClick={() => CreatePostModal.open()}
            title={isDisabled ? "Inicie uma conversa para poder compartilhar sua receita" : "Compartilhar receita"}
          >
            Compartilhar receita <ShareRounded fontSize="small" />
          </button>
          <CreatePost />
          <UserInput />
        </>
      )}
    </div>
  );
};

export default Chat;
