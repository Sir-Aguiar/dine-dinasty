import React from "react";
import "./Message.css";

interface Props {
  content: string;
}

const Message: React.FC<Props> = ({ content }) => {
  return (
    <div className="message">
      <div className="header">
        <span className={`w-5 h-5 rounded-full bg-green-400`}></span>
      </div>
      <div className="body">{content}</div>
    </div>
  );
};

export default Message;
