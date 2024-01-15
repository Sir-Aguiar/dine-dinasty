import React, { useState } from "react";
import "./Chat.css";
import { CircularProgress } from "@mui/material";

import { useChatContext } from "../../contexts/Chat";

import { ChatHistory } from "../../components/Chat/ChatHistory/ChatHistory";
import { UserInput } from "../../components/Chat/UserInput/UserInput";
import { ShareRounded } from "@mui/icons-material";

const Chat: React.FC = () => {
  const { isPageLoading, runStatus } = useChatContext();

  return (
    <div className="chat-container">
      {isPageLoading ? (
        <CircularProgress size={30} className="absolute top-1/2 left-1/2 -translate-x-1/2" />
      ) : (
        <>
          <button className="share" disabled={runStatus !== "completed"}>
            Compartilhar receita <ShareRounded fontSize="small" />
          </button>
          <ChatHistory />

          <UserInput />
        </>
      )}
    </div>
  );
};

export default Chat;
