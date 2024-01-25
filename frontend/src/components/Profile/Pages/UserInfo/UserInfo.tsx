import React, { useState } from "react";
import "./UserInfo.css";
import { useAuthContext } from "../../../../contexts/Auth";
import { Button, CircularProgress, TextField } from "@mui/material";
import { UpdateUser } from "../../../../services/User";

const UserUpdateForm: React.FC = () => {
  const { authState, ServerAPI, signIn } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const name = document.querySelector<HTMLInputElement>("input#name");
    const username = document.querySelector<HTMLInputElement>("input#username");

    if (!name || !username) return;

    try {
      const { token } = await UpdateUser(ServerAPI, {
        name: name.value.length >= 1 ? name.value : undefined,
        username: username.value.length >= 1 ? username.value : undefined,
      });
      
      signIn(token);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="basic-user-info" onSubmit={handleSubmit}>
      <div className="flex items-center gap-2 w-full">
        <TextField fullWidth id="name" label="Nome completo" defaultValue={authState?.name} />
        <TextField fullWidth id="username" label="Nome de usuário" defaultValue={authState?.username} />
      </div>
      <Button type="submit" variant="contained">
        {isLoading ? <CircularProgress size={15} color="inherit" /> : "Atualizar dados"}
      </Button>
    </form>
  );
};

const UpdatePasswordForm: React.FC = () => {
  return (
    <form className="basic-user-info">
      <div className="w-full flex flex-col gap-2">
        <h1>Atualizar senha</h1>
        <TextField fullWidth label="Senha atual" type="password" />
        <div className="w-full flex items-center gap-2">
          <TextField fullWidth label="Senha nova" type="password" />
          <TextField fullWidth label="Confirme a senha nova" type="password" />
        </div>
      </div>
      <Button type="submit" variant="contained">
        Atualizar senha
      </Button>
    </form>
  );
};

const UserPreferences: React.FC = () => {
  return <div></div>;
};

const UserInfo: React.FC = () => {
  return (
    <main className="tab-content">
      <UserUpdateForm />
      <UpdatePasswordForm />
      <UserPreferences />
    </main>
  );
};

export default UserInfo;
