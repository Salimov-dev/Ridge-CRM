import React, { useState } from "react";
import { Box, Button, styled } from "@mui/material";
import Header from "./components/header";
import UploadButton from "../../common/buttons/upload-button";
import AvatarImage from "../../../layouts/profile/components/avatar-image";
import NegativeOutlinedButton from "../../common/buttons/negative-outlined-button";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { uploadAvatar } from "../../../store/upload/avatar-upload.store";
import useGetUserAvatar from "../../../hooks/user/use-get-user-avatar";
import { getCurrentUserId } from "../../../store/user/users.store";
import Avatar from "react-avatar-edit"

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
  const currentUserId = useSelector(getCurrentUserId());
  const avatarSrc = useGetUserAvatar(currentUserId);
  const [src, setSrc] = useState(null)
  const [preview, setPreview]=useState(null)

  const handleUploadImage = (event) => {
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append("avatar", file);

    dispatch<any>(uploadAvatar(formData))
      .then(() => onClose())
      .then(() => {
        toast.success("Аватарка успешно загружена");
      })
      .catch((err) => {
        console.log("err", err);

        if (err.response) {
          if (err.response.status === 400) {
            toast.error(err.response.data.message);
          } else {
            toast.error(`Ошибка при загрузке файла: ${err.response.status}`);
          }
        } else if (err.request) {
          toast.error("Сервер не отвечает");
        } else {
          toast.error(`Ошибка: ${err.message}`);
        }
      });
  };


  const onClosePreview = () => {
    setPreview(null)
  }
  const onCropPreview = (view) => {
    setPreview(view)
  }

  return (
    <>
      <Header onClose={onClose} />
      <AvatarContainer>
        <Avatar 
          width="100%"
          height={400}
          onClose={onClosePreview}
          onCrop={onCropPreview}
          src={src}
        />
        <Box>

        {/* <img src={preview} alt="" /> */}
        </Box>
      </AvatarContainer>
      <ButtonsContainer>
        <Button onClick={handleUploadImage}>Обновить аватарку</Button>
        <NegativeOutlinedButton title="Отмена" onClick={onClose} />
      </ButtonsContainer>
    </>
  );
});

export default UpdateAvatar;
