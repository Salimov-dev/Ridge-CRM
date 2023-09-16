import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
// components
import BasicTable from "../table/basic-table";
import TasksFiltersPanel from "../../UI/filters-panels/tasks-filters-panel";
import AddAndClearFiltersButton from "../buttons/add-and-clear-filters-button";
// layouts
import CreateTasksButtons from "../../../layouts/calendar/components/create-tasks-buttons/create-tasks-buttons";
import CreateRidgeTasksButtons from "../../../layouts/ridge/components/create-ridge-tasks-buttons/create-ridge-tasks-buttons";
// store
import { getTaskLoadingStatus } from "../../../store/task/tasks.store";

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
  isRidgeObject = false,
  isInputEmpty = false,
  reset = () => {},
  initialState = "",
}) => {
  const isTasksLoading = useSelector(getTaskLoadingStatus());

  return (
    <>
      <Header>
        <Typography variant="h3">Задачи:</Typography>
        {isRidgeObject ? (
          <AddAndClearFiltersButton
            isInputEmpty={isInputEmpty}
            reset={reset}
            initialState={initialState}
            reverse={true}
            button={<CreateRidgeTasksButtons />}
          />
        ) : (
          <CreateTasksButtons />
        )}
      </Header>
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
