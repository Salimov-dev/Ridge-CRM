import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// styled
import { ItemContainer, ItemsContainer } from "../styled";
// components
import Title from "./components/title";
import TaskObject from "./components/task-object";
import TaskComment from "./components/task-comment";
import Loader from "@components/common/loader/loader";
import Result from "./components/result";
// store
import { getCurrentUserId, getUsersList } from "@store/user/users.store";
import { updateTask } from "@store/task/tasks.store";

const Tasks = ({
  tasks,
  isCurator,
  draggableDay,
  setDraggableDay,
  isSelectedDayDialog,
  setState
}) => {
  const dispatch = useDispatch();
  const users = useSelector(getUsersList());
  const currentUserId = useSelector(getCurrentUserId());

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

        return (
          <ItemContainer
            key={task?._id}
            draggable={true}
            onDragEnd={() => handleDragEnd(task)}
            sx={{
              cursor: "grab",
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
            {isCurator && task?.managerId?.length ? (
              <Typography>
                <b>Менеджер:</b> {getUserNameById(task?.managerId)}
              </Typography>
            ) : null}
            <TaskObject task={task} setState={setState} />
            {isSelectedDayDialog ? <Result task={task} /> : null}
          </ItemContainer>
        );
      })}
    </ItemsContainer>
  ) : (
    <Loader />
  );
};

export default Tasks;
