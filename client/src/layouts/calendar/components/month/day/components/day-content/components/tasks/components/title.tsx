import { useDispatch } from "react-redux";
import DoneIconToggler from "./done-icon-toggler";
import { Box, Typography, styled } from "@mui/material";
import { FormatTime } from "../../../../../../../../../../utils/date/format-time";
import { setIsDoneTaskStatus } from "../../../../../../../../../../store/task/tasks.store";

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
  return (
    <Component>
      <Typography sx={{ fontSize: "15px", textDecoration: "underline" }}>
        <b>Задача до: {task.time ? FormatTime(task.time) : "В течение дня"}</b>
      </Typography>
      <DoneIconToggler
        task={task}
        onDoneTask={handleDoneTask}
        onNotDoneTask={handleNotDoneTask}
      />
    </Component>
  );
};

export default Title;
