import React from "react";
import "./Chat.css";
import { Share } from "@mui/icons-material";
import Message from "../../components/Chat/Message/Message";
import { useChatContext } from "../../contexts/Chat";

const Chat: React.FC = () => {
  const { messages } = useChatContext();

  return (
    <div className="chat-container">
      <div className="chat">
        {messages.map(({ content, role }) => (
          <Message content={content} sender={role} />
        ))}
      </div>
      <div className="w-full h-auto flex items-center gap-4">
        <button className="share">
          <Share sx={{ height: "20px", width: "20px" }} /> Compartilhar receita
        </button>
      </div>
      <div className={`input ${messages.length >= 1 ? "max-h-0 overflow-hidden" : ""}`}>
        <textarea placeholder="Insira aqui sua mensagem"></textarea>
        <button className="w-10 h-10 rounded-full bg-orange-400"></button>
      </div>
    </div>
  );
};

export default Chat;
