import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/Auth";
import { CreateThread } from "../../services/Thread";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { ServerAPI } = useAuthContext();

  const handleCreateThread = async () => {
    try {
      const threadId = await CreateThread(ServerAPI);
      navigate(`/chat/${threadId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home-container">
      <button className="new-chat" onClick={handleCreateThread}>
        Nova conversa
      </button>
    </div>
  );
};

export default Home;
