import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCreateUserOpenState } from "../../../../store/user/create-user.store";
import { getUsersLoadingStatus } from "../../../../store/user/users.store";

const CreateManagerButton = () => {
  const isLoading = useSelector(getUsersLoadingStatus());
  const dispatch = useDispatch();

  const handleOpenCreateManager = () => {
    dispatch(setCreateUserOpenState(true));
  };

  return (
    <Button
      variant="contained"
      onClick={handleOpenCreateManager}
      disabled={isLoading}
      sx={{
        color: "white",
        background: "chocolate",
        "&:hover": { background: "sienna" },
      }}
    >
      <Typography variant="body0">Добавить менеджера</Typography>
    </Button>
  );
};

export default CreateManagerButton;
