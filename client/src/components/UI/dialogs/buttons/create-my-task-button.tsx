import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getTaskLoadingStatus } from "../../../../store/task/tasks.store";
import { setCreateMyTaskOpenState } from "../../../../store/task/create-my-task.store";

const CreateMyTaskButton = ({
  title,
  background,
  color = "inherit",
  isMyTask = false,
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getTaskLoadingStatus());

  const handleOpenCreateMyTask = () => {
    dispatch(setCreateMyTaskOpenState(true));
  };
  return (
    <Button
      variant="contained"
      onClick={handleOpenCreateMyTask}
      disabled={isLoading}
      sx={{
        background: background,
        color: color,
        "&:hover": { background: isMyTask ? "darkOrange" : "red" },
      }}
    >
      {title}
    </Button>
  );
};

export default CreateMyTaskButton;
