import { Box, Typography } from "@mui/material";
import DividerStyled from "../../../../common/divider/divider-styled";
import { tasksColumns } from "../../../../../columns/tasks-columns";
import CreateTaskButton from "../../../../../layouts/calendar/components/header/components/create-task-button";
import BasicTable from "../../../../common/table/basic-table";

const ObjectTasks = ({
  tasks,
  isTasksLoading,
  onCreateMyTask,
  onCreateManagerTask,
}) => {
  return (
    <>
      <DividerStyled />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h3">Задачи по этому объекту:</Typography>
        <Box sx={{display: 'flex', gap: '4px'}}>
          <CreateTaskButton
            onClick={onCreateMyTask}
            title="Поставить себе задачу"
            color="black"
            background="orange"
            isMyTask={true}
          />
          <CreateTaskButton
            onClick={onCreateManagerTask}
            title="Поставить менеджеру задачу"
            background="red"
          />
        </Box>
      </Box>

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
