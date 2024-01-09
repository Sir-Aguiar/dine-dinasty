import React from "react";
import "./Message.css";

interface Props {
  sender: string;
  content: string;
}

const Message: React.FC<Props> = ({ content, sender }) => {
  return (
    <div className="message">
      <span className="w-8 h-8 bg-orange-400 rounded-full"></span>
      <p className="w-full">{content}</p>
    </div>
  );
};

export default Message;
