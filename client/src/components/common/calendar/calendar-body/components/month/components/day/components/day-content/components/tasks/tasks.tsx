import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
// styled
import { ItemContainer, ItemsContainer } from "../styled/styled";
// utils
import { getUserName } from "../../../../../../../../../../../../utils/user/get-user-name";
// components
import Title from "./components/title";
import TaskObject from "./components/task-object";
import TaskComment from "./components/task-comment";
import Loader from "../../../../../../../../../../loader/loader";
import Result from "./components/result";
// store
import { getObjectsList } from "../../../../../../../../../../../../store/object/objects.store";
import { getCurrentUserId } from "../../../../../../../../../../../../store/user/users.store";

const Tasks = ({ tasks, isCurator, isSelectedDayDialog }) => {
  const currentUserId = useSelector(getCurrentUserId());

  return tasks ? (
    <ItemsContainer>
      {tasks?.map((task) => {
        const taskIsDone = task?.isDone;
        const taskIsCall = task?.isCallTask;

        return (
          <ItemContainer
            key={task._id}
            sx={{
              border: task.managerId ? "3px solid red" : (taskIsCall ? "3px solid DarkGreen" : "3px solid darkOrange") ,
              color: !taskIsDone
                ? task.managerId ? "white" : (taskIsCall ? "white" :"black")
                : "white",
              background: !taskIsDone
                ? task.managerId ? "Crimson" : (taskIsCall ? "DarkOliveGreen" :"orange")
                : "gray",
            }}
          >
            <Title task={task} />
            <TaskComment comment={task?.comment} />
            {task?.managerId === currentUserId ? (
              <Box>
                <Typography>
                  <b>Задачу поставил:</b>
                </Typography>
                <Typography>{getUserName(task?.userId)}</Typography>
              </Box>
            ) : null}
            {isCurator && task?.managerId?.length ? (
              <Typography>
                <b>Менеджер:</b> {getUserName(task?.managerId)}
              </Typography>
            ) : null}
            <TaskObject task={task} />
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
