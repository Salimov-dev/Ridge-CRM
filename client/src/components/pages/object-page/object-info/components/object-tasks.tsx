import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
import DividerStyled from "../../../../common/divider/divider-styled";
import { tasksColumns } from "../../../../../columns/tasks-columns/tasks-columns";
import BasicTable from "../../../../common/table/basic-table";
import CreateMyTaskButton from "../../../../UI/dialogs/buttons/create-my-task-button";
import CreateManagerTaskButton from "../../../../UI/dialogs/buttons/create-manager-task-button";
import { getTaskLoadingStatus } from "../../../../../store/task/tasks.store";

const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonsContainer = styled(Box)`
  display: flex;
  gap: 4px;
`;

const ObjectTasks = ({ tasks, object }) => {
  const isTasksLoading = useSelector(getTaskLoadingStatus());
  const address = `${object?.location?.city}, ${object?.location?.address}`;

  return (
    <>
      <DividerStyled />
      <Container>
        <Typography variant="h3">Задачи по объекту: {address}</Typography>
        <ButtonsContainer>
          <CreateMyTaskButton
            title="Поставить себе задачу"
            color="black"
            background="orange"
            isMyTask={true}
          />
          <CreateManagerTaskButton
            title="Поставить менеджеру задачу"
            background="Crimson"
          />
        </ButtonsContainer>
      </Container>

      {tasks?.length ? (
        <BasicTable
          items={tasks}
          itemsColumns={tasksColumns}
          isLoading={isTasksLoading}
        />
      ) : (
        <Typography>Не обнаружены</Typography>
      )}
    </>
  );
};

export default ObjectTasks;
