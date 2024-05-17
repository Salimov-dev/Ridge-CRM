import { Dispatch, SetStateAction } from "react";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface IUsersDialogsStateProps {
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const usersDialogsState = ({ setState }: IUsersDialogsStateProps) => {
  const handleOpenCreateUserPage = () => {
    setState((prevState) => ({
      ...prevState,
      createUserPage: true
    }));
  };
  const handleCloseCreateUserPage = () => {
    setState((prevState) => ({
      ...prevState,
      createUserPage: false
    }));
  };

  const handleOpenUpdateUserPage = (meetingId: string) => {
    setState((prevState) => ({
      ...prevState,
      updateUserPage: true,
      userId: meetingId
    }));
  };
  const handleCloseUpdateUserPage = () => {
    setState((prevState) => ({
      ...prevState,
      updateUserPage: false
    }));
  };

  const handleCloseUpdateUserAvatarPage = () => {
    setState((prevState: any) => ({
      ...prevState,
      avatarUpdatePage: false
    }));
  };

  const handleOpenUpdateProfilePage = () => {
    setState((prevState) => ({
      ...prevState,
      updateProfilePage: true
    }));
  };
  const handleCloseUpdateProfilePage = () => {
    setState((prevState: any) => ({
      ...prevState,
      updateProfilePage: false
    }));
  };

  const handleOpenUpdatePasswordPage = () => {
    setState((prevState) => ({
      ...prevState,
      updatePasswordPage: true
    }));
  };
  const handleCloseUpdatePasswordPage = () => {
    setState((prevState: any) => ({
      ...prevState,
      updatePasswordPage: false
    }));
  };

  const handleOpenUpdateUserAvatarPage = () => {
    setState((prevState) => ({
      ...prevState,
      avatarUpdatePage: true
    }));
  };

  return {
    handleOpenCreateUserPage,
    handleCloseCreateUserPage,
    handleOpenUpdateUserPage,
    handleCloseUpdateUserPage,
    handleCloseUpdateUserAvatarPage,
    handleCloseUpdateProfilePage,
    handleCloseUpdatePasswordPage,
    handleOpenUpdateUserAvatarPage,
    handleOpenUpdateProfilePage,
    handleOpenUpdatePasswordPage
  };
};

export default usersDialogsState;
