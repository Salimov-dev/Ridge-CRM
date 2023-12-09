import { Box, styled } from "@mui/material";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
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
} from "../../store/user/users.store";
import { getUserAvatarsLoadingStatus, removeAvatar } from "../../store/avatar/avatar.store";
import DeleteUserAvatarButton from "../../components/UI/dialogs/buttons/delete-user-avatar-button";
import ConfirmRemoveDialog from "../../components/common/dialog/confirm-remove-dialog";
import { useState } from "react";

const AvatarContainer = styled(Box)`
  width: 150px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ButtonsContainer = styled(Box)`
  display: flex;
  gap: 4px;
`;

const Profile = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const socket = io(configFile.ioEndPoint);
  
  const user = useSelector(getCurrentUserData());
  const isUserLoading = useSelector(getUserAvatarsLoadingStatus());
  const currentUserId = useSelector(getCurrentUserId());

  const { avatarSrc } = useGetUserAvatar(currentUserId);

  const handleDeleteAvatar = () => {
    dispatch<any>(removeAvatar(currentUserId))
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <LayoutTitle
        title={`Мой профиль: ${
          !isUserLoading
            ? `${user?.name?.firstName} ${user?.name?.lastName}`
            : "загрузка..."
        }`}
      />
      <AvatarContainer>
        <AvatarImage avatarSrc={avatarSrc} isLoading={isUserLoading} />
        <ButtonsContainer>
          <UpdateUserAvatarButton />
          <DeleteUserAvatarButton onOpen={handleClickOpen}/>
        </ButtonsContainer>
      </AvatarContainer>

      <UpdateAvatarDialog />
      <ConfirmRemoveDialog
            removeId={currentUserId}
            open={open}
            onClose={handleClose}
            onRemove={handleDeleteAvatar}
          />
    </Box>
  );
};

export default Profile;
