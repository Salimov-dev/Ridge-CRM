import { useDispatch } from "react-redux";
// mui
import DoneIconToggler from "./done-icon-toggler";
import { Box, Typography, styled } from "@mui/material";
// components
import UpdateElement from "../../../../../../../../../../../buttons/icons buttons/update-element-icon";
// utils
import { FormatTime } from "../../../../../../../../../../../../../utils/date/format-time";
// store
import { updateTask } from "../../../../../../../../../../../../../store/task/tasks.store";
import {
  setUpdateMyTaskId,
  setUpdateMyTaskOpenState,
} from "../../../../../../../../../../../../../store/task/update-my-task.store";
import {
  setUpdateManagerTaskId,
  setUpdateManagerTaskOpenState,
} from "../../../../../../../../../../../../../store/task/update-manager-task.store";

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

  const isCuratorTask = Boolean(task?.managerId);
  const dispatch = useDispatch();

  const handleDoneTask = (task) => {
    const newTask = { ...task, isDone: true };
    dispatch<any>(updateTask(newTask));
  };

  const handleNotDoneTask = (task) => {
    const newTask = { ...task, isDone: false };
    dispatch<any>(updateTask(newTask));
  };

  const handleUpdateTask = () => {
    if (isCuratorTask) {
      dispatch<any>(setUpdateManagerTaskOpenState(true));
      dispatch<any>(setUpdateManagerTaskId(taskId));
    } else {
      dispatch<any>(setUpdateMyTaskId(taskId));
      dispatch<any>(setUpdateMyTaskOpenState(true));
    }
  };

  return (
    <Component>
      <Typography sx={{ textDecoration: "underline" }}>
        <b>Задача до: {task.time ? FormatTime(task.time) : "конца дня"}</b>
      </Typography>
      <ButtonsContainer>
        <UpdateElement onClick={handleUpdateTask} isDone={isTaskDone} />
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
