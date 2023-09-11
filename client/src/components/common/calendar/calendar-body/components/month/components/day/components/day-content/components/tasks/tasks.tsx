import Title from "./components/title";
import TaksObject from "./components/task-object";
import TaskComment from "./components/task-comment";
import { ItemContainer, ItemsContainer } from "../styled/styled";
import Loader from "../../../../../../../../../../loader/loader";
import Result from "./components/result";
import { useSelector } from "react-redux";
import { getObjectsList } from "../../../../../../../../../../../../store/object/objects.store";
import { getRidgeObjectsList } from "../../../../../../../../../../../../store/ridge-object/ridge-objects.store";

const Tasks = ({ tasks, isRidgePage }) => {
  const objects = useSelector(getObjectsList());
  const ridgeObjects = useSelector(getRidgeObjectsList());
  return tasks ? (
    <ItemsContainer>
      {tasks?.map((task) => (
        <ItemContainer
          key={task._id}
          sx={{
            color: !task?.isDone
              ? task.managerId || isRidgePage
                ? "white"
                : "black"
              : "white",
            background: !task?.isDone
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
          <TaksObject task={task} objects={isRidgePage ? ridgeObjects : objects } isRidgePage={isRidgePage} />
          <Result task={task} />
        </ItemContainer>
      ))}
    </ItemsContainer>
  ) : (
    <Loader />
  );
};

export default Tasks;
