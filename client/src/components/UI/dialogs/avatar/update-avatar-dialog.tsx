import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import {
  getUpdateUserAvatarOpenState,
  setUpdateUserAvatarOpenState,
} from "../../../../store/avatar/update-avatar.store";
import UpdateAvatar from "../../../pages/update-avatar-user/update-avatar-user";

const UpdateAvatarDialog = React.memo(({ avatarSrc }) => {
  const dispatch = useDispatch();
  const isOpenUpdateAvatar = useSelector(getUpdateUserAvatarOpenState());

  const handleCloseUpdateAvatar = () => {
    dispatch<any>(setUpdateUserAvatarOpenState(false));
  };

  return (
    <DialogStyled
      component={
        <UpdateAvatar
          onClose={handleCloseUpdateAvatar}
          avatarSrc={avatarSrc}
        />
      }
      maxWidth="sm"
      onClose={handleCloseUpdateAvatar}
      open={isOpenUpdateAvatar}
    />
  );
});

export default UpdateAvatarDialog;
