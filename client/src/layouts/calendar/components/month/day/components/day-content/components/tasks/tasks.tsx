import Title from "./components/title";
import Loader from "../../../../../../../../../components/common/loader/loader";
import { ItemContainer, ItemsContainer } from "../styled/styled";
import ManagerTaskElements from "./components/manager-task-elements";

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
          <ManagerTaskElements task={task} />
        </ItemContainer>
      ))}
    </ItemsContainer>
  ) : (
    <Loader />
  );
};

export default Tasks;
