import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Avatar from "react-avatar-edit";
import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import compress from "compress-base64";
// components
import HeaderWithCloseButton from "@components/common/page-headers/header-with-close-button";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
// store
import { getCurrentUserId } from "@store/user/users.store";
import { updateAvatar } from "@store/avatar/avatar.store";

const AvatarContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 40px;
`;

const UpdateAvatar = React.memo(({ onClose }) => {
  const dispatch = useDispatch();

  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [compressedPreview, setCompressedPreview] = useState([]);

  const currentUserId = useSelector(getCurrentUserId());
  const newPreview = preview?.replace(/^data:image\/\w+;base64,/, "");

  const onClosePreview = () => {
    setPreview(null);
  };

  const onCropPreview = (view) => {
    setPreview(view);
  };

  const compressedBase64 = () => {
    return compress(preview, {
      width: 100,
      type: "image/png",
      max: 130,
      min: 20,
      quality: 0.6
    }).then((res) => {
      const result = res?.replace(/^data:image\/\w+;base64,/, "");
      return setCompressedPreview(result);
    });
  };

  const handleUploadImage = () => {
    setIsLoading(true);

    dispatch<any>(
      updateAvatar({
        userId: currentUserId,
        src: compressedPreview
      })
    )
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

  useEffect(() => {
    compressedBase64();
  }, [preview]);

  return (
    <>
      <HeaderWithCloseButton
        title="Изменить аватарку"
        color="black"
        margin="0 0 20px 0"
        onClose={onClose}
      />
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
      <SuccessCancelFormButtons
        onSuccess={() => handleUploadImage()}
        onCancel={onClose}
      />
      <LoaderFullWindow isLoading={isLoading} />
    </>
  );
});

export default UpdateAvatar;
