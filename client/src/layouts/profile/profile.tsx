import { useState } from "react";
import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// hooks
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
// components
import AvatarImage from "./components/avatar-image";
import HeaderLayout from "@components/common/page-headers/header-layout";
import DialogConfirm from "@components/common/dialog/dialog-confirm";
import UpdateAvatarDialog from "@components/UI/dialogs/avatar/update-avatar-dialog";
import UpdateUserAvatarButton from "@components/UI/dialogs/buttons/update-user-avatar-button";
import DeleteUserAvatarButton from "@components/UI/dialogs/buttons/delete-user-avatar-button";
// store
import { getCurrentUserData, getCurrentUserId } from "@store/user/users.store";
import {
  getUserAvatarsLoadingStatus,
  removeAvatar,
} from "@store/avatar/avatar.store";

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

  const user = useSelector(getCurrentUserData());
  const isUserLoading = useSelector(getUserAvatarsLoadingStatus());
  const currentUserId = useSelector(getCurrentUserId());

  const { avatarSrc } = useGetUserAvatar(currentUserId);

  const handleDeleteAvatar = (currentUserId) => {
    dispatch<any>(removeAvatar(currentUserId));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <HeaderLayout
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
          <DeleteUserAvatarButton onOpen={handleClickOpen} />
        </ButtonsContainer>
      </AvatarContainer>

      <UpdateAvatarDialog />
      <DialogConfirm
        question="Вы уверены, что хотите удалить аватарку?"
        open={open}
        onSuccessClick={() => handleDeleteAvatar(currentUserId)}
        onClose={handleClose}
      />
    </Box>
  );
};

export default Profile;
