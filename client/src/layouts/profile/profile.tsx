import { useState } from "react";
import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// hooks
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
// components
import AvatarImage from "./components/avatar-image";
import HeaderLayout from "@components/common/page-headers/header-layout";
import DialogConfirm from "@components/common/dialog/dialog-confirm";
import PageDialogs from "@components/common/dialog/page-dialogs";
import Buttons from "./components/buttons";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
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

const Profile = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    avatarUpdatePage: false,
    openDialog: false,
  });

  const { handleOpenUpdateUserAvatarPage } = useDialogHandlers(setState);

  const user = useSelector(getCurrentUserData());

  const isUserLoading = useSelector(getUserAvatarsLoadingStatus());
  const currentUserId = useSelector(getCurrentUserId());

  const { avatarSrc } = useGetUserAvatar(currentUserId);

  const handleClickOpenConfirmDialog = () => {
    setState((prevState) => ({ ...prevState, openDialog: true }));
  };

  const handleCloseConfirmDialog = () => {
    setState((prevState) => ({ ...prevState, openDialog: false }));
  };

  const handleDeleteAvatar = (currentUserId) => {
    dispatch<any>(removeAvatar(currentUserId)).then(() =>
      handleCloseConfirmDialog()
    );
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
        <Buttons
          handleOpenUpdateUserAvatarPage={handleOpenUpdateUserAvatarPage}
          handleClickOpenConfirmDialog={handleClickOpenConfirmDialog}
          avatarSrc={avatarSrc}
        />
      </AvatarContainer>

      <DialogConfirm
        question="Вы уверены, что хотите удалить аватарку?"
        open={state.openDialog}
        onSuccessClick={() => handleDeleteAvatar(currentUserId)}
        onClose={handleCloseConfirmDialog}
      />
      <PageDialogs state={state} setState={setState} />
    </Box>
  );
};

export default Profile;
