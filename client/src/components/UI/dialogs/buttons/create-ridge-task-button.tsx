import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getCreateRidgeTaskOpenState,
  setCreateRidgeTaskOpenState,
} from "../../../../store/ridge-task/create-ridge-task.store";

const CreateRidgeTaskButton = ({
  title,
  background,
  color = "inherit",
  isMyTask = false,
}) => {
  const isLoading = useSelector(getCreateRidgeTaskOpenState());
  const dispatch = useDispatch();

  const handleOpenCreateMyTask = () => {
    dispatch(setCreateRidgeTaskOpenState(true));
  };
  return (
    <Button
      variant="contained"
      onClick={handleOpenCreateMyTask}
      disabled={isLoading}
      sx={{
        background: background,
        color: color,
        "&:hover": { background: isMyTask ? "forestGreen" : "red" },
      }}
    >
      {title}
    </Button>
  );
};

export default CreateRidgeTaskButton;
