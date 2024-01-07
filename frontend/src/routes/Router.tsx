import { BrowserRouter, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/Auth";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { Login } from "@mui/icons-material";

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
    <Outlet />
  ) : (
    <CircularProgress className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={25} />
  );
};

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" />
        </Route>
        <Route element={<Login />} path="/login" />
      </Routes>
    </BrowserRouter>
  );
};
