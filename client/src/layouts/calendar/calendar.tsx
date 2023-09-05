// libraries
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
// components
import Header from "./components/header/header";
import Tasks from "./components/tasks/tasks";
import Dialogs from "./components/dialogs/dialogs";
import CalendarBody from "./components/calendar-body/calendar-body";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import CurrentWeeklyMeetings from "./components/current-weekly-meetings/current-weekly-meetings";
// columns
import { tasksColumns } from "../../columns/tasks-columns/tasks-columns";
import { meetingsColumns } from "../../columns/meetings-columns/meetings-columns";
// utils
import getMonth from "../../utils/calendar/get-month";
// store
import { getTasksList } from "../../store/task/tasks.store";
import { getMonthIndexState } from "../../store/month-index.store";
// hooks
import useCalendar from "../../hooks/calendar/use-calendar";
import useSearchTask from "../../hooks/task/use-search-task";

const initialState = {
  object: "",
  task: "",
  onlyMyTasks: false,
  selectedTaskTypes: [],
};

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [dateCreateMyTask, setDateCreateMyTask] = useState(null);
  const [openCreateMyTask, setOpenCreateMyTask] = useState(false);
  const [openCreateManagerTask, setOpenCreateManagerTask] = useState(false);
  const [openCreateMeeting, setOpenCreateMeeting] = useState(false);

  const tasksColumn = tasksColumns;
  const monthIndex = useSelector(getMonthIndexState());

  const {
    sortedCurrentWeeklyMeetings,
    transformUsers,
    transformObjects,
    isMeetingsLoading,
    isTasksLoading,
    handleCloseCreateMyTask,
    handleCloseCreateManagerTask,
    handleCloseCreateMeeting,
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
  const tasks = useSelector(getTasksList());
  const searchedTasks = useSearchTask(tasks, data);
  const sortedTasks = orderBy(searchedTasks, ["date"], ["asc"]);


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
      <CalendarBody
        currentMonth={currentMonth}
        onOpenCreateMyTask={handleOpenCreateMyTask}
      />
      <Tasks
        register={register}
        data={data}
        tasks={sortedTasks}
        columns={tasksColumn}
        setValue={setValue}
        isTasksLoading={isTasksLoading}
        onOpenCreateMeeting={handleOpenCreateMeeting}
        onOpenCreateMyTask={handleOpenCreateMyTask}
        onOpenCreateManagerTask={handleOpenCreateManagerTask}
      />
      <CurrentWeeklyMeetings
        meetings={sortedCurrentWeeklyMeetings}
        columns={meetingsColumns}
        isLoading={isMeetingsLoading}
      />
      <Dialogs
        users={transformUsers}
        objects={transformObjects}
        dateCreateMyTask={dateCreateMyTask}
        openCreateMyTask={openCreateMyTask}
        openCreateManagerTask={openCreateManagerTask}
        openCreateMeeting={openCreateMeeting}
        onOpenCreateManagerTask={handleOpenCreateManagerTask}
        onOpenCreateMyTask={handleOpenCreateMyTask}
        onCloseCreateMyTask={handleCloseCreateMyTask}
        onCloseCreateManagerTask={handleCloseCreateManagerTask}
        onCloseCreateMeeting={handleCloseCreateMeeting}
      />
    </>
  );
};

export default Calendar;
