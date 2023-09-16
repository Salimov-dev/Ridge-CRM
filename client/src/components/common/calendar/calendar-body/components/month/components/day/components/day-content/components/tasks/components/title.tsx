import { useDispatch } from "react-redux";
// mui
import DoneIconToggler from "./done-icon-toggler";
import { Box, Typography, styled } from "@mui/material";
// components
import UpdateElement from "../../../../../../../../../../../buttons/icons buttons/update-element-icon";
// utils
import { FormatTime } from "../../../../../../../../../../../../../utils/date/format-time";
// store
import { setIsDoneTaskStatus } from "../../../../../../../../../../../../../store/task/tasks.store";
import { setIsDoneRidgeTaskStatus } from "../../../../../../../../../../../../../store/ridge-task/ridge-tasks.store";
import {
  setUpdateMyTaskId,
  setUpdateMyTaskOpenState,
} from "../../../../../../../../../../../../../store/task/update-my-task.store";
import {
  setUpdateManagerTaskId,
  setUpdateManagerTaskOpenState,
} from "../../../../../../../../../../../../../store/task/update-manager-task.store";
import {
  setUpdateRidgeTaskId,
  setUpdateRidgeTaskOpenState,
} from "../../../../../../../../../../../../../store/ridge-task/update-ridge-task.store";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const ButtonsContainer = styled(Box)`
  display: flex;
`;

const Title = ({ task, isRidgePage }) => {
  const taskId = task?._id;
  const isTaskDone = task?.isDone;

  const isCuratorTask = Boolean(task?.managerId);
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
      dispatch(setUpdateMyTaskId(taskId));
      dispatch(setUpdateMyTaskOpenState(true));
    }
  };

  const handleDoneRidgeTask = (task) => {
    const newTask = { ...task, isDone: true };
    dispatch(setIsDoneRidgeTaskStatus(newTask));
  };

  const handleNotDoneRidgeTask = (task) => {
    const newTask = { ...task, isDone: false };
    dispatch(setIsDoneRidgeTaskStatus(newTask));
  };

  const handleUpdateRidgeTask = () => {
    dispatch(setUpdateRidgeTaskId(taskId));
    dispatch(setUpdateRidgeTaskOpenState(true));
  };

  return (
    <Component>
      <Typography sx={{ textDecoration: "underline" }}>
        <b>Задача до: {task.time ? FormatTime(task.time) : "конца дня"}</b>
      </Typography>
      <ButtonsContainer>
        <UpdateElement
          onClick={isRidgePage ? handleUpdateRidgeTask : handleUpdateTask}
          isDone={isTaskDone}
        />
        <DoneIconToggler
          item={task}
          onDoneItem={isRidgePage ? handleDoneRidgeTask : handleDoneTask}
          onNotDoneItem={
            isRidgePage ? handleNotDoneRidgeTask : handleNotDoneTask
          }
        />
      </ButtonsContainer>
    </Component>
  );
};

export default Title;
