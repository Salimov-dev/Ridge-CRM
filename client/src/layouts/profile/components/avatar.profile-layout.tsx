import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
// components
import DialogConfirm from "@components/common/dialog/dialog-confirm";
import AvatarButtonsProfileLayout from "./avatar-buttons.profile-layout.tsx";
import AvatarImageProfileLayout from "./avatar-image.profile-layout";
// store
import { getCurrentUserId } from "@store/user/users.store";
import {
  getUserAvatarsLoadingStatus,
  removeAvatar
} from "@store/avatar/avatar.store";

const AvatarContainer = styled(Box)`
  width: min-content;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const AvatarProfileLayout = ({ state, setState }) => {
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
        <AvatarImageProfileLayout
          avatarSrc={avatarSrc}
          isLoading={isUserLoading}
        />
        <AvatarButtonsProfileLayout
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

export default AvatarProfileLayout;
