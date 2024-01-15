import React, { useState } from "react";
import "./Chat.css";
import { CircularProgress } from "@mui/material";

import { useChatContext } from "../../contexts/Chat";

import { ChatHistory } from "../../components/Chat/ChatHistory/ChatHistory";
import { UserInput } from "../../components/Chat/UserInput/UserInput";

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
