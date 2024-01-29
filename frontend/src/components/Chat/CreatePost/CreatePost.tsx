import React, { useState } from "react";
import "./CreatePost.css";
import { Modal, Slide, TextField } from "@mui/material";
import { useChatContext } from "../../../contexts/Chat";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAuthContext } from "../../../contexts/Auth";
import { CreatePostService } from "../../../services/Post";

const CreatePost: React.FC = () => {
  const { CreatePostModal, threadId } = useChatContext();
  const { ServerAPI } = useAuthContext();
  const [userReview, setUserReview] = useState("");
  const [title, setTitle] = useState("");

  const handleUserReview = (value: string) => {
    console.log(value);
    setUserReview(value);
  };

  const onClose = () => {
    CreatePostModal.close();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await CreatePostService(ServerAPI, { title, ownerReview: userReview, threadId });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
          <TextField label="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
          <p className="py-4 px-4 text-sm rounded-sm bg-orange-100">
            Testou esta receita em casa? Deixe aqui sua opinião, sinta-se livre para adicionar algumas notas que você
            observou no preparo desta receita
          </p>
          <div className="w-full h-full min-h-[328px]">
            <ReactQuill
              theme="snow"
              value={userReview}
              onChange={handleUserReview}
              style={{ maxHeight: "300px", overflowY: "auto" }}
            />
          </div>
          <button type="submit" className="share ml-auto">
            Publicar
          </button>
        </form>
      </Slide>
    </Modal>
  );
};

export default CreatePost;
