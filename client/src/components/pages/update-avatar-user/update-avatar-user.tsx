import React, { useState } from "react";
import { toast } from "react-toastify";
import Avatar from "react-avatar-edit";
import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// components
import Header from "./components/header";
import NegativeOutlinedButton from "../../common/buttons/negative-outlined-button";
import PositiveOutlinedButton from "../../common/buttons/positive-outlined-button";
import IsLoadingDialog from "../../common/dialog/is-loading-dialog";
// store
import { getCurrentUserId } from "../../../store/user/users.store";
import { updateAvatar } from "../../../store/avatar/avatar.store";

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
  const [isLoading, setIsLoading] = useState(false);

  const currentUserId = useSelector(getCurrentUserId());
  const newPreview = preview?.replace(/^data:image\/\w+;base64,/, "");
  console.log("newPreview", newPreview);

  const onClosePreview = () => {
    setPreview(null);
  };
  const onCropPreview = (view) => {
    setPreview(view);
  };

  const handleUploadImage = () => {
    setIsLoading(true);
    dispatch<any>(updateAvatar({ preview: newPreview, currentUserId }))
      .then(() => {
        setIsLoading(false);
        onClose();
        toast.success("Аватарка успешно загружена");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("err", err);
      });
  };

  return isLoading ? (
    <IsLoadingDialog
      text="Немного подождите, изменяем `Аватарку`"
      isLoading={isLoading}
    />
  ) : (
    <Box>
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
    </Box>
  );
});

export default UpdateAvatar;
