import { Box, Typography, styled } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
// components
import UploadButton from "../../components/common/buttons/upload-button";
import {
  getCurrentUserData,
  getCurrentUserId,
} from "../../store/user/users.store";
// store
import { uploadAvatar } from "../../store/upload/avatar-upload.store";
// hooks
import useGetUserAvatar from "../../hooks/user/use-get-user-avatar";

const Avatar = styled("img")({
  width: "200px",
  borderRadius: "20px",
});

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUserData());
  const currentUserId = useSelector(getCurrentUserId());
  const avatarSrc = useGetUserAvatar(currentUserId);

  const handleUploadImage = (event) => {
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append("avatar", file);

    dispatch<any>(uploadAvatar(formData))
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

  return (
    <Box>
      <h1>Мой профиль: {user?.name?.firstName}</h1>
      <Box>
        {/* <img src={avatarSrc} alt="ava" /> */}
        {avatarSrc ? (
          <Avatar src={avatarSrc} alt="User Avatar" />
        ) : (
          <Typography variant="body1">No avatar available</Typography>
        )}
      </Box>
      <UploadButton onChange={handleUploadImage} />
    </Box>
  );
};

export default Profile;
