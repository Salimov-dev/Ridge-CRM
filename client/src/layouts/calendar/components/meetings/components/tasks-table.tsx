import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
// components
import BasicTable from "@components/common/table/basic-table";
import TasksFiltersPanel from "@ui/filters-panels/tasks-filters-panel";
import { getTaskLoadingStatus } from "@store/task/tasks.store";

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 12px;
`;

const TasksTable = ({ register, data, tasks, columns, setValue }) => {
  const isTasksLoading = useSelector(getTaskLoadingStatus());

  return (
    <>
      <Header>
        <Typography variant="h3">Задачи:</Typography>
      </Header>
      <TasksFiltersPanel
        data={data}
        register={register}
        setValue={setValue}
        isLoading={isTasksLoading}
      />
      <BasicTable
        items={tasks}
        itemsColumns={columns}
        isLoading={isTasksLoading}
      />
    </>
  );
};

export default TasksTable;
