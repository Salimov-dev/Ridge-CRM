import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
import CreateButtons from "../create-tasks-buttons/create-tasks-buttons";
import BasicTable from "../../../../components/common/table/basic-table";
import { getTaskLoadingStatus } from "../../../../store/task/tasks.store";
import TasksFiltersPanel from "../../../../components/UI/filters-panels/tasks-filters-panel";

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 12px;
`;

const Tasks = ({ register, data, tasks, columns, setValue }) => {
  const isTasksLoading = useSelector(getTaskLoadingStatus());

  return (
    <>
      <Header>
        <Typography variant="h3">Задачи:</Typography>
        <CreateButtons />
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

export default Tasks;
