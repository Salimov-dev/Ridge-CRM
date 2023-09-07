import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCreateManagerTaskOpenState } from "../../../../store/task/create-manager-task.store";
import { getTaskLoadingStatus } from "../../../../store/task/tasks.store";

const CreateManagerTaskButton = ({
  title,
  background,
  color = "inherit",
  isMyTask = false,
}) => {
  const isLoading = useSelector(getTaskLoadingStatus());
  const dispatch = useDispatch();

  const handleOpenCreateMyTask = () => {
    dispatch(setCreateManagerTaskOpenState(true));
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

export default CreateManagerTaskButton;
