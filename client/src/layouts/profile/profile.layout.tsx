import { useState } from "react";
import { useSelector } from "react-redux";
// components
import HeaderLayout from "@components/common/page-headers/header-layout";
import PageDialogs from "@components/common/dialog/page-dialogs";
import { ContainerStyled } from "@components/common/container/container-styled";
import Loader from "@components/common/loader/loader";
import UserProfileLayoutInfo from "./components/user-profile-info.profile-layout";
import ButtonsProfileLayout from "../../components/UI/layout-buttons/buttons.profile-layout";
import EmailConfirmInfoProfileLayout from "./components/email-confirm-info.profile-layout";
import AvatarProfileLayout from "./components/avatar.profile-layout";
// store
import { getCurrentUserData, getUserNameById } from "@store/user/users.store";
import { getUserAvatarsLoadingStatus } from "@store/avatar/avatar.store";

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
      <HeaderLayout
        title={`${!isUserLoading ? userNameSelector : <Loader />}`}
      />
      <ButtonsProfileLayout setState={setState} />
      <EmailConfirmInfoProfileLayout user={user} />
      <AvatarProfileLayout state={state} setState={setState} />
      <UserProfileLayoutInfo user={user} />

      <PageDialogs state={state} setState={setState} />
    </ContainerStyled>
  );
};

export default ProfileLayout;
