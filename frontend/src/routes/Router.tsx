import { BrowserRouter, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/Auth";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import Login from "./Login/Login";
import Chat from "./Chat/Chat";
import Home from "./Home/Home";
import { ChatContextProvider } from "../contexts/Chat";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import Profile from "./Profile/Profile";
import Feed from "./Feed/Feed";

const PrivateRoute = () => {
  const { isUserAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuthenticated) {
      const memoryAuthToken = localStorage.getItem("auth_token");

      if (memoryAuthToken) {
        return;
      }

      navigate("/login");
    }
  }, [isUserAuthenticated]);

  return isUserAuthenticated ? (
    <>
      <NavigationBar />
      <Outlet />
    </>
  ) : (
    <CircularProgress className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={25} />
  );
};

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route
            path="/chat/:threadId"
            element={
              <ChatContextProvider>
                <Chat />
              </ChatContextProvider>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<Login />} path="/login" />
      </Routes>
    </BrowserRouter>
  );
};
