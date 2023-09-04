import { useDispatch, useSelector } from "react-redux";
import DoneIconToggler from "./done-icon-toggler";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Typography, styled } from "@mui/material";
import { FormatTime } from "../../../../../../../../../../utils/date/format-time";
import { setIsDoneTaskStatus } from "../../../../../../../../../../store/task/tasks.store";
import MyTaskUpdateDialog from "../../../../../../../../../../components/UI/dialogs/tasks/my-task-update-dialog";
import {
  setupdateMyTaskId,
  setUpdateMyTaskOpenState,
} from "../../../../../../../../../../store/task/update-my-task.store";
import { setOpenObjectPageId } from "../../../../../../../../../../store/object/open-object-page.store";
import { getCurrentUserId } from "../../../../../../../../../../store/user/users.store";
import {
  setUpdateManagerTaskId,
  setUpdateManagerTaskOpenState,
} from "../../../../../../../../../../store/task/update-manager-task.store";
import ManagerTaskUpdateDialog from "../../../../../../../../../../components/UI/dialogs/tasks/manager-task-update-dialog";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const Title = ({ task }) => {
  const dispatch = useDispatch();

  const handleDoneTask = (task) => {
    const newTask = { ...task, isDone: true };
    dispatch(setIsDoneTaskStatus(newTask));
  };

  const handleNotDoneTask = (task) => {
    const newTask = { ...task, isDone: false };
    dispatch(setIsDoneTaskStatus(newTask));
  };

  const taskId = task?._id;
  const currentUserId = useSelector(getCurrentUserId());
  const isCuratorTask = Boolean(task?.managerId);
  const isCurrentUserIsCuratorTask = currentUserId !== task?.userId;
  const disable = isCuratorTask && isCurrentUserIsCuratorTask;

  const handleClick = () => {
    if (isCuratorTask) {
      dispatch(setUpdateManagerTaskOpenState(true));
      dispatch(setUpdateManagerTaskId(taskId));
    } else {
      dispatch(setupdateMyTaskId(taskId));
      dispatch(setUpdateMyTaskOpenState(true));
    }
  };

  return (
    <Component>
      <Typography sx={{ fontSize: "15px", textDecoration: "underline" }}>
        <b>Задача до: {task.time ? FormatTime(task.time) : "В течение дня"}</b>
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Box onClick={handleClick}>
          <EditOutlinedIcon sx={{ "&:hover": { transform: "scale(1.2)" } }} />
        </Box>
        <DoneIconToggler
          task={task}
          onDoneTask={handleDoneTask}
          onNotDoneTask={handleNotDoneTask}
        />
      </Box>

      {/* <MyTaskUpdateDialog /> */}
      {/* <ManagerTaskUpdateDialog /> */}
    </Component>
  );
};

export default Title;
