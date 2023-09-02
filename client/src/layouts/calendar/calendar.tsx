// libraries
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
// components
import Header from "./components/header/header";
import DaysOfWeek from "./components/days-of-week/days-of-week";
import DialogStyled from "../../components/common/dialog/dialog-styled";
import CalendarBody from "./components/calendar-body/calendar-body";
import BasicTable from "../../components/common/table/basic-table";
import CreateButtons from "./components/header/components/create-buttons";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import CreateMyTask from "./components/create-my-task/create-my-task";
import CreateManagerTask from "./components/create-manager-task/create-manager-task";
import CreateMeeting from "../../components/pages/create-meeting/create-meeting";
import CurrentWeeklyMeetings from "./components/current-weekly-meetings/current-weekly-meetings";
import CalendarFiltersPanel from "../../components/UI/filters-panels/calendar-filters-panel";
// columns
import { tasksColumns } from "../../columns/tasks-columns";
// utils
import getMonth from "../../utils/calendar/get-month";
// store
import { getMonthIndexState } from "../../store/month-index.store";
// hooks
import useCalendar from "../../hooks/calendar/use-calendar";
import useSearchTask from "../../hooks/task/use-search-task";
import { meetingsColumns } from "../../columns/meetings-columns";
import { loadUpdateMeetingOpenState } from "../../store/meeting/update-meeting.store";
import UpdateMeeting from "../../components/pages/update-meeting/update-meeting";

const initialState = {
  object: "",
  task: "",
  onlyMyTasks: false,
  selectedTaskTypes: [],
};

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [openCreateMyTask, setOpenCreateMyTask] = useState(false);
  const [dateCreateMyTask, setDateCreateMyTask] = useState(null);
  const [openCreateManagerTask, setOpenCreateManagerTask] = useState(false);
  const [openCreateMeeting, setOpenCreateMeeting] = useState(false);
  const tasksColumn = tasksColumns;
  const monthIndex = useSelector(getMonthIndexState());
  const isOpenUpdate = useSelector(loadUpdateMeetingOpenState());

  const {
    sortedCurrentWeeklyMeetings,
    transformUsers,
    transformObjects,
    sortedTasks,
    isMeetingsLoading,
    isTasksLoading,
    handleCloseCreateMyTask,
    handleCloseCreateManagerTask,
    handleCloseCreateMeeting,
    handleCloseUpdateMeeting,
    handleOpenCreateMyTask,
    handleOpenCreateManagerTask,
    handleOpenCreateMeeting,
  } = useCalendar(
    setOpenCreateManagerTask,
    setOpenCreateMyTask,
    setDateCreateMyTask,
    setOpenCreateMeeting
  );

  const localStorageState = JSON.parse(
    localStorage.getItem("search-tasks-data")
  );

  const { register, watch, setValue } = useForm({
    defaultValues: Boolean(localStorageState)
      ? localStorageState
      : initialState,
    mode: "onBlur",
  });
  const data = watch();
  const searchedTasks = useSearchTask(sortedTasks, data);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    localStorage.setItem("search-tasks-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("search-tasks-data", JSON.stringify(initialState));
  }, []);

  return (
    <>
      <LayoutTitle title="Календарь" />
      <Header
        onCreateMyTask={handleOpenCreateMyTask}
        onCreateManagerTask={handleOpenCreateManagerTask}
        onCreateMeeting={handleOpenCreateMeeting}
      />

      <DaysOfWeek />

      <CalendarBody
        currentMonth={currentMonth}
        onOpenCreateMyTask={handleOpenCreateMyTask}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          marginBottom: "4px",
        }}
      >
        <Typography variant="h3">Задачи:</Typography>
        <CreateButtons
          onCreateMeeting={handleOpenCreateMeeting}
          onCreateMyTask={handleOpenCreateMyTask}
          onCreateManagerTask={handleOpenCreateManagerTask}
        />
      </Box>

      <Box sx={{ marginBottom: "10px" }}></Box>
      <CalendarFiltersPanel
        data={data}
        register={register}
        tasks={sortedTasks}
        setValue={setValue}
        isLoading={isTasksLoading}
      />
      <BasicTable
        items={searchedTasks}
        itemsColumns={tasksColumn}
        isLoading={isTasksLoading}
      />

      <CurrentWeeklyMeetings
        meetings={sortedCurrentWeeklyMeetings}
        columns={meetingsColumns}
        isLoading={isMeetingsLoading}
      />

      <DialogStyled
        component={<CreateMeeting onClose={handleCloseCreateMeeting} />}
        onClose={handleCloseCreateMeeting}
        open={openCreateMeeting}
      />

      <DialogStyled
        component={<UpdateMeeting onClose={handleCloseUpdateMeeting} />}
        onClose={handleCloseUpdateMeeting}
        open={isOpenUpdate}
        fullWidth={false}
      />

      <DialogStyled
        onClose={handleCloseCreateManagerTask}
        open={openCreateManagerTask}
        maxWidth="lg"
        fullWidth={false}
        component={
          <CreateManagerTask
            title="Поставить менеджеру задачу"
            objects={transformObjects}
            users={transformUsers}
            onClose={handleCloseCreateManagerTask}
          />
        }
      />

      <DialogStyled
        onClose={handleCloseCreateMyTask}
        open={openCreateMyTask}
        maxWidth="sm"
        fullWidth={false}
        component={
          <CreateMyTask
            title="Добавить себе задачу"
            objects={transformObjects}
            date={dateCreateMyTask}
            onClose={handleCloseCreateMyTask}
          />
        }
      />
    </>
  );
};

export default Calendar;
