import { useState } from "react";
import { useSelector } from "react-redux";
// components
import HeaderForLayout from "@components/common/headers/header-for-layout";
import { ContainerStyled } from "@components/common/container/container-styled";
import Loader from "@components/common/loader/loader";
import UserProfileLayoutInfo from "./components/user-profile-info.profile-layout";
import ButtonsProfileLayout from "../../components/UI/layout-buttons/buttons.profile-layout";
import EmailConfirmInfoProfileLayout from "./components/email-confirm-info.profile-layout";
import AvatarProfileLayout from "./components/avatar.profile-layout";
// store
import { getCurrentUserData, getUserNameById } from "@store/user/users.store";
import { getUserAvatarsLoadingStatus } from "@store/avatar/avatar.store";
import DialogPages from "@dialogs/dialog-pages";

const ProfileLayout = () => {
  const [state, setState] = useState({
    avatarUpdatePage: false,
    openDialog: false,
    updateProfilePage: false,
    updatePasswordPage: false
  });

  const user = useSelector(getCurrentUserData());
  const isUserLoading = useSelector(getUserAvatarsLoadingStatus());
  const userNameSelector = useSelector(getUserNameById(user?._id));

  return (
    <ContainerStyled>
      <HeaderForLayout
        title={`${!isUserLoading ? userNameSelector : <Loader />}`}
      />
      <ButtonsProfileLayout setState={setState} />
      <EmailConfirmInfoProfileLayout user={user} />
      <AvatarProfileLayout state={state} setState={setState} />
      <UserProfileLayoutInfo user={user} />

      <DialogPages state={state} setState={setState} />
    </ContainerStyled>
  );
};

export default ProfileLayout;
