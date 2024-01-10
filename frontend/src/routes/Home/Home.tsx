import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <button className="new-chat">Nova conversa</button>
    </div>
  );
};

export default Home;
