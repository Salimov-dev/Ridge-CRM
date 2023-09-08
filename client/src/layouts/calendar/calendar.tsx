// libraries
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
// components
import Header from "../../components/common/calendar/header/header";
import Tasks from "./components/tasks/tasks";
import Dialogs from "./components/dialogs/dialogs";
import CalendarBody from "../../components/common/calendar/calendar-body/calendar-body";
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
import { getMeetingsList } from "../../store/meeting/meetings.store";
import dayjs from "dayjs";
import CreateTasksButtons from "./components/create-tasks-buttons/create-tasks-buttons";

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
  const meetings = useSelector(getMeetingsList());
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

  const getMeeting = (day) => {
    const meeting = meetings?.filter(
      (meet) => dayjs(meet?.date).format() === dayjs(day)?.format()
    );
    const sortedMeetings = orderBy(meeting, ["date"], ["asc"]);
    return sortedMeetings;
  };

  const getTask = (day) => {
    const currentTasks = tasks?.filter((task) => {
      const taskDate = dayjs(task?.date);
      const targetDate = dayjs(day);
      return (
        taskDate.format("YYYY-MM-DD") === targetDate.format("YYYY-MM-DD") &&
        taskDate.isSame(targetDate, "day")
      );
    });

    const sortedTasks = orderBy(
      currentTasks,
      [(task) => dayjs(task.time)],
      ["asc"]
    );
    return sortedTasks;
  };

  return (
    <>
      <LayoutTitle title="Календарь" />
      <Header buttons={<CreateTasksButtons />} />
      <CalendarBody
        currentMonth={currentMonth}
        setDateCreate={setDateCreate}
        meetings={getMeeting}
        tasks={getTask}
      />
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
