import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/Auth";
import { CreateThread } from "../../services/Thread";
import { CircularProgress } from "@mui/material";

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
      <button className="new-chat" onClick={handleCreateThread}>
        {threadLoading ? <CircularProgress size={20} /> : "Nova conversa"}
      </button>
    </div>
  );
};

export default Home;
