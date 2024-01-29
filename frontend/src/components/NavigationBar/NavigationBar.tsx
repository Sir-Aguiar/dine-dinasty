import React from "react";
import "./NavigationBar.css";
import { useNavigate } from "react-router-dom";

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="nav-bar">
      <nav className="navigation-content">
        <div className="w-full h-full">
          <ul className="link-list">
            <li>
              <a href="/feed">Feed</a>
            </li>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/chats">Threads</a>
            </li>
          </ul>
        </div>
        <div className="w-8 h-8 bg-orange-400 rounded-full cursor-pointer" onClick={() => navigate("/profile")}></div>
      </nav>
    </div>
  );
};

export default NavigationBar;
