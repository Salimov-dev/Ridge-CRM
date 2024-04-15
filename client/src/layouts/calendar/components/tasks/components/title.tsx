import { useDispatch } from "react-redux";
import DoneIconToggler from "../../body/components/day/components/done-icon-toggler.calendar-layout";
import { Box, Typography, styled } from "@mui/material";
// components
import UpdateElement from "@components/common/buttons/icons buttons/update-element.button-icon";
// utils
import { FormatTime } from "@utils/date/format-time";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { updateTask } from "@store/task/tasks.store";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const ButtonsContainer = styled(Box)`
  display: flex;
`;

const Title = ({ task, setState }) => {
  const taskId = task?._id;
  const isTaskDone = task?.isDone;

  const { handleOpenUpdateMyTaskPage, handleOpenUpdateManagerTaskPage } =
    useDialogHandlers(setState);

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

  return (
    <Component>
      <Typography sx={{ textDecoration: "underline" }}>
        <b>Задача до: {task.time ? FormatTime(task.time) : "конца дня"}</b>
      </Typography>
      <ButtonsContainer>
        <UpdateElement
          itemId={taskId}
          onClick={
            isCuratorTask
              ? handleOpenUpdateManagerTaskPage
              : handleOpenUpdateMyTaskPage
          }
          isDone={isTaskDone}
        />
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
