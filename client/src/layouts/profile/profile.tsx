import { useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
// components
import HeaderLayout from "@components/common/page-headers/header-layout";
import PageDialogs from "@components/common/dialog/page-dialogs";
import Avatar from "./components/avatar";
import EmailConfirmInfo from "./components/email-confirm-info";
import UserProfileInfo from "./components/user-profile-info";
// store
import { getCurrentUserData, getUserNameById } from "@store/user/users.store";
import { getUserAvatarsLoadingStatus } from "@store/avatar/avatar.store";
import styled from "@emotion/styled";

const Component = styled(Box)`
  height: 100vh;
`;

const Profile = () => {
  const [state, setState] = useState({
    avatarUpdatePage: false,
    openDialog: false,
    updateProfilePage: false,
  });

  const user = useSelector(getCurrentUserData());
  const isUserLoading = useSelector(getUserAvatarsLoadingStatus());
  const userNameSelector = useSelector(getUserNameById(user?._id));

  return (
    <Component>
      <HeaderLayout
        title={`Мой профиль: ${
          !isUserLoading ? userNameSelector : "загрузка..."
        }`}
      />
      <EmailConfirmInfo user={user} />
      <Avatar state={state} setState={setState} />
      <UserProfileInfo user={user} setState={setState} />

      <PageDialogs state={state} setState={setState} />
    </Component>
  );
};

export default Profile;
