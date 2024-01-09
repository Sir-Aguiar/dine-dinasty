import React from "react";
import "./Chat.css";
import { Share } from "@mui/icons-material";

const Chat: React.FC = () => {
  return (
    <div className="chat-container">
      <div className="chat"></div>
      <div className="w-full h-auto flex items-center gap-4">
        <button className="share">
          <Share sx={{ height: "20px", width: "20px" }} /> Compartilhar receita
        </button>
      </div>
      <div className="input">
        <textarea placeholder="Insira aqui sua mensagem"></textarea>
        <button className="w-10 h-10 rounded-full bg-orange-400"></button>
      </div>
    </div>
  );
};

export default Chat;
