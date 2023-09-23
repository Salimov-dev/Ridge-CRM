import { useSelector } from "react-redux";
// components
import Title from "./components/title";
import TaksObject from "./components/task-object";
import TaskComment from "./components/task-comment";
import Loader from "../../../../../../../../../../loader/loader";
import Result from "./components/result";
// styled
import { ItemContainer, ItemsContainer } from "../styled/styled";
// store
import { getObjectsList } from "../../../../../../../../../../../../store/object/objects.store";
import { getRidgeObjectsList } from "../../../../../../../../../../../../store/ridge-object/ridge-objects.store";
import { getUsersList } from "../../../../../../../../../../../../store/user/users.store";
import { Typography } from "@mui/material";

const Tasks = ({ tasks, isRidgePage, isCurator }) => {
  const objects = useSelector(getObjectsList());
  const ridgeObjects = useSelector(getRidgeObjectsList());
  const users = useSelector(getUsersList());

  const getManagerName = (id) => {
    const user = users?.find((user) => user._id === id);
    const result = `${user?.name.lastName} ${user?.name.firstName}`;
    return result;
  };

  return tasks ? (
    <ItemsContainer>
      {tasks?.map((task) => {
        const taskIsDone = task?.isDone;

        return (
          <ItemContainer
            key={task._id}
            sx={{
              border: isRidgePage
                ? "3px solid darkGreen"
                : task.managerId
                ? "3px solid red"
                : "3px solid darkOrange",
              color: !taskIsDone
                ? task.managerId || isRidgePage
                  ? "white"
                  : "black"
                : "white",
              background: !taskIsDone
                ? task.managerId
                  ? "Crimson"
                  : isRidgePage
                  ? "darkGreen"
                  : "orange"
                : "gray",
            }}
          >
            <Title task={task} isRidgePage={isRidgePage} />
            <TaskComment comment={task?.comment} />
            {isCurator && task?.managerId?.length ? (
              <Typography>
                <b>Менеджер:</b> {getManagerName(task?.managerId)}
              </Typography>
            ) : null}
            <TaksObject
              task={task}
              objects={isRidgePage ? ridgeObjects : objects}
              isRidgePage={isRidgePage}
            />
            <Result task={task} />
          </ItemContainer>
        );
      })}
    </ItemsContainer>
  ) : (
    <Loader />
  );
};

export default Tasks;
