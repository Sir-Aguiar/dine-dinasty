import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthTokenPayload } from "../@types/Auth";
import DecodeJWT from "../utils/token-decode";
import axios, { AxiosInstance } from "axios";

type Props = {
  children: React.ReactNode;
};

interface Context {
  isUserAuthenticated: boolean;
  authToken: string | null;
  authState: AuthTokenPayload | null;
  signIn: (token: string) => boolean;
  signOut: () => void;
  ServerAPI: AxiosInstance;
}

const AuthContext = createContext<Context | null>(null);

export const AuthContextProvider = ({ children }: Props) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const [authToken, setAuthToken] = useState<string | null>(null);

  const [authState, setAuthState] = useState<AuthTokenPayload | null>(null);

  useEffect(() => {
    console.log(import.meta.env.VITE_SERVER_HOST);
  }, []);

  const ServerAPI = axios.create({
    baseURL: import.meta.env.VITE_SERVER_HOST,
    headers: { Authorization: `Bearer ${authToken}` },
  });

  const signIn = (token: string) => {
    const Payload = DecodeJWT<AuthTokenPayload>(token);

    if (!Payload) {
      return false;
    }

    localStorage.setItem("auth_token", token);

    setAuthToken(token);
    setAuthState(Payload);
    setIsUserAuthenticated(true);

    return true;
  };

  const signOut = () => {
    localStorage.removeItem("auth_token");
    setIsUserAuthenticated(false);
    setAuthToken(null);
    setAuthState(null);
  };

  useEffect(() => {
    const JWT_TOKEN = localStorage.getItem("auth_token");

    if (!JWT_TOKEN) {
      return signOut();
    }

    const Payload = DecodeJWT<AuthTokenPayload>(JWT_TOKEN);

    if (!Payload) {
      return signOut();
    }

    setAuthToken(JWT_TOKEN);
    setAuthState(Payload);
    setIsUserAuthenticated(true);
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, authState, isUserAuthenticated, ServerAPI, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("AuthContext must be called from within the AuthContextProvider");

  return context;
};
