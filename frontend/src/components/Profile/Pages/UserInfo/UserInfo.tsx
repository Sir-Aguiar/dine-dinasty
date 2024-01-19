import React from "react";
import "./UserInfo.css";
import { useAuthContext } from "../../../../contexts/Auth";
import { Button, TextField } from "@mui/material";

const UserUpdateForm: React.FC = () => {
  const { authState } = useAuthContext();

  return (
    <form className="basic-user-info">
      <TextField fullWidth label="Email" defaultValue={authState?.email} />
      <div className="flex items-center gap-2 w-full">
        <TextField fullWidth label="Nome completo" defaultValue={authState?.name} />
        <TextField fullWidth label="Nome de usuário" defaultValue={authState?.username} />
      </div>
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
