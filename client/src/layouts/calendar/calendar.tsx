// libraries
import dayjs from "dayjs";
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import React, { useEffect, useMemo, useState } from "react";
// components
import Header from "../../components/common/calendar/header/header";
import TasksTable from "../../components/common/tasks/tasks-table";
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
import { getMeetingsList } from "../../store/meeting/meetings.store";
import {
  getCurrentUserId,
  getIsUserCurator,
} from "../../store/user/users.store";
// hooks
import useCalendar from "../../hooks/calendar/use-calendar";
import useSearchTask from "../../hooks/task/use-search-task";

const initialState = {
  task: "",
  result: "",
  selectedTaskTypes: [],
};

const Calendar = React.memo(() => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [dateCreate, setDateCreate] = useState(null);

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

  const monthIndex = useSelector(getMonthIndexState());
  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const meetings = useSelector(getMeetingsList());
  const tasks = useSelector(getTasksList());

  const { sortedCurrentWeeklyMeetings, transformUsers, transformObjects } =
    useCalendar();

  const currentUserTasks = tasks?.filter(
    (task) => task?.userId === currentUserId
  );
  const actualTasks = isCurator ? currentUserTasks : tasks;
  const searchedTasks = useSearchTask(actualTasks, data);
  const sortedTasks = useMemo(() => {
    return orderBy(searchedTasks, ["date"], ["desc"]);
  }, [searchedTasks]);

  const getMeeting = (day) => {
    const meeting = meetings?.filter(
      (meet) =>
        dayjs(meet?.date).format("YYYY-MM-DD") ===
        dayjs(day)?.format("YYYY-MM-DD")
    );
    const sortedMeetings = orderBy(meeting, ["date"], ["desc"]);

    return sortedMeetings;
  };

  const getTask = (day) => {
    const currentTasks = actualTasks?.filter((task) => {
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
      <CalendarBody
        tasks={getTask}
        meetings={getMeeting}
        currentMonth={currentMonth}
        setDateCreate={setDateCreate}
        background="darkOrange"
      />
      <TasksTable
        register={register}
        data={data}
        tasks={sortedTasks}
        columns={tasksColumns}
        setValue={setValue}
      />
      <CurrentWeeklyMeetings
        meetings={sortedCurrentWeeklyMeetings}
        columns={meetingsColumns}
      />

      <Dialogs
        tasks={getTask}
        meetings={getMeeting}
        users={transformUsers}
        objects={transformObjects}
        dateCreate={dateCreate}
        setDateCreate={setDateCreate}
      />
    </>
  );
});

export default Calendar;
