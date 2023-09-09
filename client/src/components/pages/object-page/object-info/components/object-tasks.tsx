import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
import DividerStyled from "../../../../common/divider/divider-styled";
import BasicTable from "../../../../common/table/basic-table";
import { getTaskLoadingStatus } from "../../../../../store/task/tasks.store";
import { tasksColumns } from "../../../../../columns/tasks-columns/tasks-columns";

const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ObjectTasks = ({ tasks, object, margin="0", buttons }) => {
  const isTasksLoading = useSelector(getTaskLoadingStatus());
  const columns = tasksColumns
  const address = `${object?.location?.city}, ${object?.location?.address}`;

  return (
    <>
      <DividerStyled />
      <Container>
        <Typography variant="h3" sx={{ margin: margin }}>
          Задачи по объекту: {address}
        </Typography>
        {buttons}
      </Container>

      {tasks?.length ? (
        <BasicTable
          items={tasks}
          itemsColumns={columns}
          isLoading={isTasksLoading}
        />
      ) : (
        <Typography>Не обнаружены</Typography>
      )}
    </>
  );
};

export default ObjectTasks;
