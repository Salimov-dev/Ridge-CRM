import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setUpdateUserAvatarOpenState } from "../../../../store/avatar/update-avatar.store";

const UpdateUserAvatarButton = () => {
  const dispatch = useDispatch();

  const handleOpenUpdateAvatar = () => {
    dispatch<any>(setUpdateUserAvatarOpenState(true));
  };

  return (
    <Button
      variant="contained"
      color="success"
      onClick={handleOpenUpdateAvatar}
      sx={{
        color: "white",
        background: "seaGreen",
        "&:hover": { background: "green" },
      }}
    >
      Изменить
    </Button>
  );
};

export default UpdateUserAvatarButton;
