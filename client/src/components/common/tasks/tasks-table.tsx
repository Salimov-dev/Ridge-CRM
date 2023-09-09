import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
import CreateTasksButtons from "../../../layouts/calendar/components/create-tasks-buttons/create-tasks-buttons";
import BasicTable from "../table/basic-table";
import { getTaskLoadingStatus } from "../../../store/task/tasks.store";
import TasksFiltersPanel from "../../UI/filters-panels/tasks-filters-panel";
import CreateRidgeTasksButtons from "../../../layouts/ridge/components/create-ridge-tasks-buttons/create-ridge-tasks-buttons";

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 12px;
`;

const TasksTable = ({
  register,
  data,
  tasks,
  columns,
  setValue,
  isRidgeObject,
}) => {
  const isTasksLoading = useSelector(getTaskLoadingStatus());

  return (
    <>
      <Header>
        <Typography variant="h3">Задачи:</Typography>
        {isRidgeObject? <CreateRidgeTasksButtons /> : <CreateTasksButtons />}
      </Header >
      <TasksFiltersPanel
        data={data}
        register={register}
        setValue={setValue}
        isLoading={isTasksLoading}
        isRidgeObject={isRidgeObject}
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
