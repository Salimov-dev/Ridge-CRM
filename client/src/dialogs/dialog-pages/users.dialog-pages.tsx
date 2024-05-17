import { Dispatch, FC, SetStateAction } from "react";
// components
import DialogStyled from "@components/common/dialog/dialog-styled";
import CreateUser from "@components/pages/user/create-user/create-user";
import UpdateUser from "@components/pages/user/update-user/update-user";
// dialogs;
import usersDialogsState from "@dialogs/dialog-handlers/users.dialog-handlers";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import UpdateAvatar from "@components/pages/avatar/update-avatar-user";
import UpdateProfile from "@components/pages/profile/update-profile";
import UpdatePassword from "@components/pages/password/update-password/update-password";

interface UsersDialogPagesProps {
  state: IDialogPagesState;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const UsersDialogPages: FC<UsersDialogPagesProps> = ({ state, setState }) => {
  const {
    handleCloseCreateUserPage,
    handleCloseUpdateUserPage,
    handleCloseUpdateUserAvatarPage,
    handleCloseUpdateProfilePage,
    handleCloseUpdatePasswordPage
  } = usersDialogsState({ setState });

  return (
    <>
      <DialogStyled
        component={<CreateUser onClose={handleCloseCreateUserPage} />}
        onClose={handleCloseCreateUserPage}
        open={state.createUserPage}
        maxWidth="sm"
      />
      <DialogStyled
        component={
          <UpdateUser
            userId={state.userId}
            onClose={handleCloseUpdateUserPage}
          />
        }
        onClose={handleCloseUpdateUserPage}
        maxWidth="sm"
        open={state.updateUserPage}
      />
      <DialogStyled
        component={<UpdateAvatar onClose={handleCloseUpdateUserAvatarPage} />}
        maxWidth="sm"
        onClose={handleCloseUpdateUserAvatarPage}
        open={state.avatarUpdatePage}
      />
      <DialogStyled
        component={<UpdateProfile onClose={handleCloseUpdateProfilePage} />}
        onClose={handleCloseUpdateProfilePage}
        open={state.updateProfilePage}
        maxWidth="sm"
      />
      <DialogStyled
        component={<UpdatePassword onClose={handleCloseUpdatePasswordPage} />}
        onClose={handleCloseUpdatePasswordPage}
        open={state.updatePasswordPage}
        maxWidth="xs"
      />
    </>
  );
};

export default UsersDialogPages;
