import { Box, styled } from "@mui/material";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
// hooks
import useGetUserAvatar from "../../hooks/user/use-get-user-avatar";
// components
import AvatarImage from "./components/avatar-image";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import UpdateAvatarDialog from "../../components/UI/dialogs/avatar/update-avatar-dialog";
import UpdateUserAvatarButton from "../../components/UI/dialogs/buttons/update-user-avatar-button";
// config
import configFile from "../../config.json";
// store
import {
  getCurrentUserData,
  getCurrentUserId,
  getUsersLoadingStatus,
} from "../../store/user/users.store";

const AvatarContainer = styled(Box)`
  width: 150px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Profile = () => {
  const socket = io(configFile.ioEndPoint);

  const user = useSelector(getCurrentUserData());
  const isUserLoading = useSelector(getUsersLoadingStatus());
  const currentUserId = useSelector(getCurrentUserId());

  const { avatarSrc, isLoading, refreshAvatar } =
    useGetUserAvatar(currentUserId);

  socket.on("updateAvatar", async () => {
    refreshAvatar();
  });

  return (
    <Box>
      <LayoutTitle
        title={`Мой профиль: ${
          !isUserLoading ? `${user?.name?.firstName} ${user?.name?.lastName}` : "загрузка..."
        }`}
      />
      <AvatarContainer>
        <AvatarImage avatarSrc={avatarSrc} isLoading={isLoading} />
        <UpdateUserAvatarButton />
      </AvatarContainer>

      <UpdateAvatarDialog />
    </Box>
  );
};

export default Profile;
