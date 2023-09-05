import { Box, Typography, styled } from "@mui/material";
import CreateButtons from "../header/components/create-buttons";
import BasicTable from "../../../../components/common/table/basic-table";
import CalendarFiltersPanel from "../../../../components/UI/filters-panels/calendar-filters-panel";

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 12px;
`;

const Tasks = ({
  register,
  data,
  tasks,
  columns,
  setValue,
  isTasksLoading,
  handleOpenCreateMeeting,
  handleOpenCreateMyTask,
  handleOpenCreateManagerTask,
}) => {
  return (
    <>
      <Header>
        <Typography variant="h3">Задачи:</Typography>
        <CreateButtons
          onCreateMeeting={handleOpenCreateMeeting}
          onCreateMyTask={handleOpenCreateMyTask}
          onCreateManagerTask={handleOpenCreateManagerTask}
        />
      </Header>
      <CalendarFiltersPanel
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
