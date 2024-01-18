import React from "react";
import "./NavigationBar.css";
import { useNavigate } from "react-router-dom";

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <nav className="nav-bar">
      <div className="w-full h-full"></div>
      <div className="w-8 h-8 bg-orange-400 rounded-full cursor-pointer" onClick={() => navigate("/profile")}></div>
    </nav>
  );
};

export default NavigationBar;
