import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/Auth";
import { CreateThread } from "../../services/Thread";
import { CircularProgress } from "@mui/material";
import Chef from "../../assets/homepage-chef.png";
const Home: React.FC = () => {
  const navigate = useNavigate();
  const { ServerAPI } = useAuthContext();
  const [threadLoading, setThreadLoading] = useState(false);

  const handleCreateThread = async () => {
    setThreadLoading(true);

    try {
      const threadId = await CreateThread(ServerAPI);
      navigate(`/chat/${threadId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setThreadLoading(false);
    }
  };

  return (
    <div className="home-container">
      <header>
        <img src={Chef} className="max-h-[192px]" />
        <div className="flex flex-col gap-2 justify-between max-w-[650px]">
          <h1 className="font-semibold">Tire dúvidas diretamente com o Chef</h1>
          <p className="text-sm font-normal">
            Forneça as suas necessidades e o que você tem disponível para cozinha, o Chef Chico irá lhe dar a melhor
            receita baseado nisso
          </p>
          <p className="text-sm font-normal">
            Caso queira compartilhar a resposta do Chef com outros usuários você pode criar um post, e gerar uma
            interação em cima disso.
          </p>
          <p className="text-sm font-normal">
            <a href="/feed" className="underline text-accent-orange">
              Confira aqui
            </a>{" "}
            a seção de posts de outros usuários.
          </p>
          <button className="new-chat" onClick={handleCreateThread}>
            {threadLoading ? <CircularProgress size={15} /> : "Nova conversa"}
          </button>
        </div>
      </header>
    </div>
  );
};

export default Home;
