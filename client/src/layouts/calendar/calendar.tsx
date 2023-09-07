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
  task: "",
  onlyMyTasks: false,
  selectedTaskTypes: [],
};

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [dateCreate, setDateCreate] = useState(null);

  const tasksColumn = tasksColumns;
  const monthIndex = useSelector(getMonthIndexState());

  const { sortedCurrentWeeklyMeetings, transformUsers, transformObjects } =
    useCalendar();

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
      <Header />
      <CalendarBody currentMonth={currentMonth} setDateCreate={setDateCreate} />
      <Tasks
        register={register}
        data={data}
        tasks={sortedTasks}
        columns={tasksColumn}
        setValue={setValue}
      />
      <CurrentWeeklyMeetings
        meetings={sortedCurrentWeeklyMeetings}
        columns={meetingsColumns}
      />
      <Dialogs
        users={transformUsers}
        objects={transformObjects}
        dateCreate={dateCreate}
        setDateCreate={setDateCreate}
      />
    </>
  );
};

export default Calendar;
