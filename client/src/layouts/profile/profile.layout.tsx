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
import DialogPages from "@dialogs/dialog-pages";
// store
import { getCurrentUserData, getUserNameById } from "@store/user/users.store";
import { getUserAvatarsLoadingStatus } from "@store/avatar/avatar.store";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// initial-states
import { dialogePagesState } from "@initial-states/dialog-pages-state/dialog-pages.state";

const ProfileLayout = () => {
  const [stateDialogPages, setStateDialogPages] =
    useState<IDialogPagesState>(dialogePagesState);

  const user = useSelector(getCurrentUserData());
  const isUserLoading = useSelector(getUserAvatarsLoadingStatus());
  const userNameSelector = useSelector(getUserNameById(user?._id));

  return (
    <ContainerStyled>
      <HeaderForLayout
        title={`${!isUserLoading ? userNameSelector : <Loader />}`}
      />
      <ButtonsProfileLayout setState={setStateDialogPages} />
      <EmailConfirmInfoProfileLayout user={user} />
      <AvatarProfileLayout
        state={stateDialogPages}
        setState={setStateDialogPages}
      />
      <UserProfileLayoutInfo user={user} />

      <DialogPages state={stateDialogPages} setState={setStateDialogPages} />
    </ContainerStyled>
  );
};

export default ProfileLayout;
