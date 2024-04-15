import { Box, Typography, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// components
import Title from "./components/title";
import TaskObject from "./components/task-object";
import TaskComment from "./components/task-comment";
import Loader from "@components/common/loader/loader";
import Result from "./components/result";
// store
import {
  getCurrentUserId,
  getIsCurrentUserRoleCurator,
  getUsersList
} from "@store/user/users.store";
import { updateTask } from "@store/task/tasks.store";

export const ItemsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ItemContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 6px;
  border-radius: 4px;
`;

const TaskItemCalendar = ({
  tasks,
  draggableDay,
  setDraggableDay,
  setState
}) => {
  const dispatch = useDispatch();
  const users = useSelector(getUsersList());
  const currentUserId = useSelector(getCurrentUserId());
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

  const getUserNameById = (id) => {
    const user = users?.find((user) => user._id === id);
    const isFullName = user?.lastName && user?.firstName;
    const result = `${user?.lastName} ${user?.firstName}`;

    return isFullName ? result : "Новенький";
  };

  const handleDragEnd = (task) => {
    if (task?.date !== draggableDay) {
      const updatedTask = {
        ...task,
        date: draggableDay
      };
      dispatch<any>(updateTask(updatedTask)).then(() => {
        setDraggableDay(null);
      });
    } else {
      setDraggableDay(null);
    }
  };

  return tasks ? (
    <ItemsContainer>
      {tasks?.map((task) => {
        const taskIsDone = task?.isDone;
        const taskIsCall = task?.isCallTask;
        const result = task?.result;
        const isAuthorEntity = task?.userId === currentUserId;

        return (
          <ItemContainer
            key={task?._id}
            draggable={isAuthorEntity && true}
            onDragEnd={() => handleDragEnd(task)}
            sx={{
              cursor: isAuthorEntity ? "grab" : null,
              border: task.managerId
                ? "3px solid red"
                : taskIsCall
                ? "3px solid DarkGreen"
                : "3px solid darkOrange",
              color: !taskIsDone
                ? task.managerId
                  ? "white"
                  : taskIsCall
                  ? "white"
                  : "black"
                : "white",
              background: !taskIsDone
                ? task.managerId
                  ? "Crimson"
                  : taskIsCall
                  ? "DarkOliveGreen"
                  : "orange"
                : "gray"
            }}
          >
            <Title task={task} setState={setState} />
            <TaskComment comment={task?.comment} />

            {task?.managerId === currentUserId ? (
              <Box>
                <Typography>
                  <b>Задачу поставил:</b>
                </Typography>
                <Typography>{getUserNameById(task?.userId)}</Typography>
              </Box>
            ) : null}
            {isCurrentUserRoleCurator && task?.managerId?.length ? (
              <Typography>
                <b>Менеджер:</b> {getUserNameById(task?.managerId)}
              </Typography>
            ) : null}
            <TaskObject task={task} setState={setState} />
            {result ? <Result task={task} /> : null}
          </ItemContainer>
        );
      })}
    </ItemsContainer>
  ) : (
    <Loader />
  );
};

export default TaskItemCalendar;
