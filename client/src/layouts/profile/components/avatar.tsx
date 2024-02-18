import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
// components
import AvatarImage from "./avatar-image";
import DialogConfirm from "@components/common/dialog/dialog-confirm";
import Buttons from "./buttons";
// store
import { getCurrentUserId } from "@store/user/users.store";
import {
  getUserAvatarsLoadingStatus,
  removeAvatar
} from "@store/avatar/avatar.store";

const AvatarContainer = styled(Box)`
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Avatar = ({ state, setState }) => {
  const dispatch = useDispatch();
  const isUserLoading = useSelector(getUserAvatarsLoadingStatus());
  const currentUserId = useSelector(getCurrentUserId());
  const { handleOpenUpdateUserAvatarPage } = useDialogHandlers(setState);
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
    <>
      <AvatarContainer>
        <Typography variant="h2">Моё изображение:</Typography>
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
    </>
  );
};

export default Avatar;
