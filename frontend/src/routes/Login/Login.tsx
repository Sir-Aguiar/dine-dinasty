import React, { useEffect, useState } from "react";
import "./Login.css";

import { CircularProgress } from "@mui/material";
import { TextField } from "@mui/material";
import mockLogo from "/mock-logo.png";
import axios, { AxiosError } from "axios";
import { useAuthContext } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const { signIn, isUserAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormLoading(true);

    const username = document.querySelector<HTMLInputElement>("#username")?.value;
    const password = document.querySelector<HTMLInputElement>("#password")?.value;

    if (!username || !password) return setFormError("Preencha todos os campos");

    try {
      const response = await axios.post("http://localhost:8080/sign-in", { username, password });

      if (signIn(response.data.token)) {
        navigate("/");
      } else {
        setFormError("Houve um erro durante sua autenticação, tente novamente");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const response = error.response;

        if (response) {
          return setFormError(response.data.error.message);
        }

        if (error.code === "ERR_NETWORK") return setFormError("Nossos servidores estão fora do ar");
      }

      setFormError("Houve um erro inesperado, aguarde um momento");
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    if (isUserAuthenticated) navigate("/");
  }, [isUserAuthenticated]);

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <img src={mockLogo} className="max-w-[200px]" />

        <TextField fullWidth label="Nome de usuário" id="username" className="max-w-[328px]" />
        <TextField fullWidth label="Senha" id="password" type="password" className="max-w-[328px]" />

        {formError && <span className="error">{formError}</span>}

        <button type="submit">{formLoading ? <CircularProgress size={20} /> : "Entrar"}</button>

        <a href="/register" className="text-[12px] text-orange-500 underline underline-offset-2">
          Criar conta
        </a>
      </form>
      <div className="filler"></div>
    </div>
  );
};

export default Login;
