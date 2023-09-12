import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
import BasicTable from "../../../../common/table/basic-table";
import { getTaskLoadingStatus } from "../../../../../store/task/tasks.store";

const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ObjectTasks = ({ columns, tasks, object, margin = "0", buttons }) => {
  const isTasksLoading = useSelector(getTaskLoadingStatus());
  const address = `${object?.location?.city}, ${object?.location?.address}`;

  return (
    <>
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
        <Typography sx={{ marginBottom: "20px" }}>Не обнаружены</Typography>
      )}
    </>
  );
};

export default ObjectTasks;
