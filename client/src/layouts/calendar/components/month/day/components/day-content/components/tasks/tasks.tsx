import Title from "./components/title";
import TaksObject from "./components/task-object";
import TaskComment from "./components/task-comment";
import { ItemContainer, ItemsContainer } from "../styled/styled";
import ManagerTaskElements from "./components/manager-task-elements";
import Loader from "../../../../../../../../../components/common/loader/loader";

const Tasks = ({ tasks }) => {

  return tasks ? (
    <ItemsContainer>
      {tasks?.map((task) => (
        <ItemContainer
          key={task._id}
          sx={{
            color: !task?.isDone
              ? task.managerId
                ? "white"
                : "black"
              : "white",
            background: !task?.isDone
              ? task.managerId
                ? "red"
                : "orange"
              : "gray",
          }}
        >
          <Title task={task} />
          <TaskComment comment={task?.comment} />
          <TaksObject task={task} />
          <ManagerTaskElements task={task} />
        </ItemContainer>
      ))}
    </ItemsContainer>
  ) : (
    <Loader />
  );
};

export default Tasks;
