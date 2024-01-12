import React from "react";
import "./Message.css";

interface Props {
  content: string;
}

const Message: React.FC<Props> = ({ content }) => {
  return (
    <div className="message">
      <div className="header">
        <span className={`index user-index`}></span>
      </div>
      <div className="body">{content}</div>
    </div>
  );
};

export default Message;
