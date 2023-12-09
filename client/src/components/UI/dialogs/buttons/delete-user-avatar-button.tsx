import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { removeAvatar } from "../../../../store/avatar/avatar.store";
import { getCurrentUserId } from "../../../../store/user/users.store";

const DeleteUserAvatarButton = ({onOpen}) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId());

  const handleDeleteAvatar = () => {
    dispatch<any>(removeAvatar(currentUserId));
  };

  return (
    <Button
      variant="contained"
      color="success"
      onClick={onOpen}
      sx={{
        width: '100%',
        color: "white",
        background: "red",
        "&:hover": { background: "FireBrick" },
      }}
    >
      <ClearOutlinedIcon/>
    </Button>
  );
};

export default DeleteUserAvatarButton;
