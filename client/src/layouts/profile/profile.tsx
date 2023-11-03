// MUI
import { Box, Button, Menu, MenuItem, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/user/users.store";
import { useState, useRef } from "react";
import uploadService from "../../services/upload/upload";
import UploadButton from "../../components/common/buttons/upload-button";

const Avatar = styled(`img`)({
  width: "200px",
  borderRadius: "20px",
});

const Profile = () => {
  const user = useSelector(getCurrentUserData());

  const inputImageRef = useRef(null);

  const handleUploadImage = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("avatar", file);
      await uploadService.post(formData);
    } catch (err) {
      console.warn("Ошибка при загрузке файла", err);
    }
  };

  return (
    <Box>
      <h1>Мой профиль: {user?.name?.firstName}</h1>
      <Box>
        <Avatar src={user?.image} alt="" />
      </Box>
      <UploadButton ref={inputImageRef} onChange={handleUploadImage} />
    </Box>
  );
};

export default Profile;
