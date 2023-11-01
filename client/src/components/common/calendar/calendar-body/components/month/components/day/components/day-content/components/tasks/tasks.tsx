import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
// components
import Title from "./components/title";
import TaskObject from "./components/task-object";
import TaskComment from "./components/task-comment";
import Loader from "../../../../../../../../../../loader/loader";
import Result from "./components/result";
// styled
import { ItemContainer, ItemsContainer } from "../styled/styled";
// store
import { getObjectsList } from "../../../../../../../../../../../../store/object/objects.store";
import { getCurrentUserId } from "../../../../../../../../../../../../store/user/users.store";
import { getUserName } from "../../../../../../../../../../../../utils/user/get-user-name";

const Tasks = ({ tasks, isCurator, isSelectedDayDialog }) => {
  const objects = useSelector(getObjectsList());

  const currentUserId = useSelector(getCurrentUserId());

  return tasks ? (
    <ItemsContainer>
      {tasks?.map((task) => {
        const taskIsDone = task?.isDone;

        return (
          <ItemContainer
            key={task._id}
            sx={{
              border: task.managerId ? "3px solid red" : "3px solid darkOrange",
              color: !taskIsDone
                ? task.managerId
                  ? "white"
                  : "black"
                : "white",
              background: !taskIsDone
                ? task.managerId
                  ? "Crimson"
                  : "orange"
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
            <TaskObject task={task} objects={objects} />
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
