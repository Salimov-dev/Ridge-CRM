import { useDispatch, useSelector } from "react-redux";
// mui
import DoneIconToggler from "./done-icon-toggler";
import { Box, Typography, styled } from "@mui/material";
// components
import UpdateTask from "./update-task";
// utils
import { FormatTime } from "../../../../../../../../../../utils/date/format-time";
// store
import { setIsDoneTaskStatus } from "../../../../../../../../../../store/task/tasks.store";
import { getCurrentUserId } from "../../../../../../../../../../store/user/users.store";
import {
  setupdateMyTaskId,
  setUpdateMyTaskOpenState,
} from "../../../../../../../../../../store/task/update-my-task.store";
import {
  setUpdateManagerTaskId,
  setUpdateManagerTaskOpenState,
} from "../../../../../../../../../../store/task/update-manager-task.store";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const ButtonsContainer = styled(Box)`
  display: flex;
`;

const Title = ({ task }) => {
  const taskId = task?._id;
  const isTaskDone = task?.isDone;
  const currentUserId = useSelector(getCurrentUserId());
  const isCuratorTask = Boolean(task?.managerId);
  const isCurrentUserIsCuratorTask = currentUserId !== task?.userId;
  const disable = isCuratorTask && isCurrentUserIsCuratorTask;
  const dispatch = useDispatch();

  const handleDoneTask = (task) => {
    const newTask = { ...task, isDone: true };
    dispatch(setIsDoneTaskStatus(newTask));
  };

  const handleNotDoneTask = (task) => {
    const newTask = { ...task, isDone: false };
    dispatch(setIsDoneTaskStatus(newTask));
  };

  const handleUpdateTask = () => {
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
      <Typography sx={{ textDecoration: "underline" }}>
        <b>Задача до: {task.time ? FormatTime(task.time) : "конца дня"}</b>
      </Typography>
      <ButtonsContainer>
        <UpdateTask onClick={handleUpdateTask} isTaskDone={isTaskDone} />
        <DoneIconToggler
          item={task}
          onDoneItem={handleDoneTask}
          onNotDoneItem={handleNotDoneTask}
        />
      </ButtonsContainer>
    </Component>
  );
};

export default Title;
