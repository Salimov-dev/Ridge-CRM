import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import AvatarImage from "./components/avatar-image";
import UpdateAvatarDialog from "../../components/UI/dialogs/avatar/update-avatar-dialog";
import UpdateUserAvatarButton from "../../components/UI/dialogs/buttons/update-user-avatar-button";
// store
import {
  getCurrentUserData,
  getCurrentUserId,
} from "../../store/user/users.store";
// hooks
import useGetUserAvatar from "../../hooks/user/use-get-user-avatar";

import { io } from "socket.io-client";
import configFile from "../../config.json";

const Profile = () => {
  const user = useSelector(getCurrentUserData());
  const currentUserId = useSelector(getCurrentUserId());
  const { avatarSrc, isLoading, refreshAvatar } = useGetUserAvatar(
    currentUserId
  );

  const socket = io(configFile.ioEndPoint);

  socket.on("updateAvatar", async () => {
    refreshAvatar();
  });

  return (
    <Box>
      <h1>Мой профиль: {user?.name?.firstName}</h1>
      <Box sx={{ width: "200px", display: "flex", flexDirection: "column" }}>
        <AvatarImage avatarSrc={avatarSrc} />
        <UpdateUserAvatarButton />
      </Box>

      <UpdateAvatarDialog />
    </Box>
  );
};

export default Profile;
