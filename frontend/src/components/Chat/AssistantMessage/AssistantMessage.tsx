import React from "react";
import "./AssistantMessage.css";

interface Props {
  content: string;
}

const AssistantMessage: React.FC<Props> = ({ content }) => {
  return (
    <div className="assistant-message">
      <div className="header">
        <span className={`index assistant-index`}></span>
      </div>
      <div></div>
    </div>
  );
};

export default AssistantMessage;
