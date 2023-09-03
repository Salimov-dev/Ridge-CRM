import Title from "./components/title";
import Loader from "../../../../../../../../../components/common/loader/loader";
import { ItemContainer, ItemsContainer } from "../styled/styled";
import ManagerTaskElements from "./components/manager-task-elements";

const Tasks = ({ tasks, isCurrentDay, isFutureDay }) => {
  return tasks ? (
    <ItemsContainer>
      {tasks?.map((task) => (
        <ItemContainer
          key={task._id}
          sx={{
            color: isCurrentDay
              ? task.managerId
                ? "white"
                : "black"
              : isFutureDay
              ? task.managerId
                ? "white"
                : "black"
              : "white",
            background: isCurrentDay
              ? task.managerId
                ? "red"
                : "orange"
              : isFutureDay
              ? task.managerId
                ? !task?.isDone
                  ? "red"
                  : "gray"
                : !task?.isDone
                ? "orange"
                : "gray"
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
