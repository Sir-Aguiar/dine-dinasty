import React from "react";
import "./CreatePost.css";
import { Button, Modal, Slide, TextField } from "@mui/material";
import { useChatContext } from "../../../contexts/Chat";

const CreatePost: React.FC = () => {
  const { CreatePostModal } = useChatContext();
  

  const onClose = () => {
    CreatePostModal.close();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


  };

  return (
    <Modal
      open={CreatePostModal.isOpen}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Slide direction="up" in={CreatePostModal.isOpen} mountOnEnter unmountOnExit>
        <form className="create-post" onSubmit={handleSubmit}>
          <TextField label="Título" />
          <TextField multiline maxRows={6} minRows={6} fullWidth label="Opiniões sobre a receita (opcional)" />
          <button type="submit" className="share ml-auto">
            Publicar
          </button>
        </form>
      </Slide>
    </Modal>
  );
};

export default CreatePost;
