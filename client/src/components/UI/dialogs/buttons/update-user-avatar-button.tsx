import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setUpdateUserAvatarOpenState } from "../../../../store/avatar/update-avatar.store";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

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
        width: '100%',
        color: "white",
        background: "seaGreen",
        "&:hover": { background: "green" },
      }}
    >
      <BorderColorOutlinedIcon/>
    </Button>
  );
};

export default UpdateUserAvatarButton;
