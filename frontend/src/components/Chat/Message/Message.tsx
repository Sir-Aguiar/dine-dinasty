import React from "react";
import "./Message.css";
import { CircularProgress } from "@mui/material";

interface Props {
  sender: string;
  content: string;
}

const Message: React.FC<Props> = ({ content, sender }) => {
  return (
    <div className="message">
      <div className="w-full flex items-center gap-3 font-bold">
        <span className={`w-5 h-5 rounded-full ${sender === "user" ? "bg-green-400" : "bg-orange-400"}`} />
        {sender === "user" ? "" : "Chef Chico"}
      </div>
      {sender === "user" ? (
        <p className="w-full font-medium">{content}</p>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content }} className="chat-message"></div>
      )}
    </div>
  );
};

export default Message;
