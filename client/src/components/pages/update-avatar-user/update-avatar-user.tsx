import React, { useState } from "react";
import { toast } from "react-toastify";
import Avatar from "react-avatar-edit";
import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// components
import Header from "./components/header";
import NegativeOutlinedButton from "../../common/buttons/negative-outlined-button";
import PositiveOutlinedButton from "../../common/buttons/positive-outlined-button";
// store
import { getCurrentUserId } from "../../../store/user/users.store";
import {
  updateAvatar,
} from "../../../store/upload/avatar-upload.store";

const AvatarContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 40px;
`;

const ButtonsContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const UpdateAvatar = React.memo(({ onClose }) => {
  const dispatch = useDispatch();

  const [preview, setPreview] = useState(null);
  const currentUserId = useSelector(getCurrentUserId());
  const newPreview = preview?.replace(/^data:image\/\w+;base64,/, "");

  const onClosePreview = () => {
    setPreview(null);
  };
  const onCropPreview = (view) => {
    setPreview(view);
  };

  const handleUploadImage = () => {
    dispatch<any>(updateAvatar({ preview: newPreview, currentUserId }))
      .then(() => onClose())
      .then(() => {
        toast.success("Аватарка успешно загружена");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <>
      <Header onClose={onClose} />
      <AvatarContainer>
        <Avatar
          width="100%"
          height={400}
          onClose={onClosePreview}
          onCrop={onCropPreview}
          src={null}
          label="Выберите изображение"
          labelStyle={{ color: "white", cursor: "pointer" }}
        />
      </AvatarContainer>
      <ButtonsContainer>
        <PositiveOutlinedButton
          title="Загрузить"
          type="text"
          isValid={!preview}
          onClick={() => handleUploadImage()}
        />
        <NegativeOutlinedButton title="Отмена" onClick={onClose} />
      </ButtonsContainer>
    </>
  );
});

export default UpdateAvatar;
