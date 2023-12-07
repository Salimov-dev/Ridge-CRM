import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import AvatarImage from "./components/avatar-image";
import UpdateAvatarDialog from "../../components/UI/dialogs/avatar/update-avatar-dialog";
import UpdateUserAvatarButton from "../../components/UI/dialogs/buttons/update-user-avatar-button";
// store
import { getCurrentUserData, getCurrentUserId } from "../../store/user/users.store";
import useGetUserAvatar from "../../hooks/user/use-get-user-avatar";

const Profile = () => {
  const user = useSelector(getCurrentUserData());
  const currentUserId = useSelector(getCurrentUserId());
  const avatarSrc = useGetUserAvatar(currentUserId);

  return (
    <Box>
      <h1>Мой профиль: {user?.name?.firstName}</h1>
      <AvatarImage avatarSrc={avatarSrc} />
      <UpdateUserAvatarButton />

      <UpdateAvatarDialog />
    </Box>
  );
};

export default Profile;
