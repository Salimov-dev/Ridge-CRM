import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
import BasicTable from "@common/table/basic-table";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import sortingByDateAndTime from "@utils/other/sorting-by-date-and-time";
import {
  getObjectTasksList,
  getTaskLoadingStatus
} from "@store/task/tasks.store";

const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ObjectTasks = ({
  columns,
  objectId,
  object,
  onOpenCreateMyTask,
  onOpenCreateManagerTask,
  isAuthorEntity
}) => {
  const isTasksLoading = useSelector(getTaskLoadingStatus());
  const address = `${object?.city}, ${object?.address}`;

  const tasks = useSelector(getObjectTasksList(objectId));

  const sortedTasks = sortingByDateAndTime(tasks);

  return (
    <>
      <Container sx={{ alignItems: "start" }}>
        <Typography variant="h3">Задачи по объекту: {address}</Typography>
        {isAuthorEntity ? (
          <ButtonStyled
            title="Поставить себе задачу или звонок"
            style="MY_TASK_CALL"
            variant="contained"
            onClick={() => onOpenCreateMyTask(objectId)}
          />
        ) : (
          <ButtonStyled
            title="Поставить менеджеру задачу"
            style="MANAGER_TASK"
            variant="contained"
            onClick={() => onOpenCreateManagerTask(objectId)}
          />
        )}
      </Container>

      {sortedTasks?.length ? (
        <BasicTable
          items={sortedTasks}
          itemsColumns={columns}
          isLoading={isTasksLoading}
          isDialogMode={true}
        />
      ) : (
        <Typography sx={{ marginBottom: "20px" }}>Не обнаружены</Typography>
      )}
    </>
  );
};

export default ObjectTasks;
