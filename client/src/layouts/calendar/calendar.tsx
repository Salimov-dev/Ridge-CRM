// libraries
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
// components
import CalendarHeader from "@components/common/calendar/header/calendar-header";
import TasksTable from "./components/meetings/tasks-table";
import CalendarBody from "@components/common/calendar/calendar-body/calendar-body";
import HeaderLayout from "@components/common/page-headers/header-layout";
import PageDialogs from "@components/common/dialog/page-dialogs";
import CurrentWeeklyMeetings from "./components/meetings/current-weekly-meetings";
// columns
import { tasksColumns } from "@columns/tasks.columns";
import { meetingsColumns } from "@columns/meetings.columns";
// utils
import getMonth from "@utils/calendar/get-month";
// store
import { getMonthIndexState } from "@store/month-index.store";
import { getCurrentUserId, getIsUserCurator } from "@store/user/users.store";
// hooks
import useCalendar from "@hooks/calendar/use-calendar";

const initialState = {
  task: "",
  result: "",
  selectedTaskTypes: [],
};

const Calendar = React.memo(() => {
  const [state, setState] = useState({
    objectPage: false,
    updatePage: false,
    objectId: null,
    createMyTaskPage: false,
    updateMyTaskPage: false,
    createManagerTaskPage: false,
    updateManagerTaskPage: false,
    createLastContactPage: false,
    updateLastContactPage: false,
    createMeetingPage: false,
    updateMeetingPage: false,
    taskId: "",
    lastContactId: "",
    meetingId: "",
    currentMonth: getMonth(),
    dateCreate: null,
  });
  console.log("state", state);

  // обновление стейта при изменении даты создания сущности из календаря
  const handleChangeDateCreate = (date) => {
    setState((prevState) => ({
      ...prevState,
      dateCreate: date,
    }));
  };

  // обновление стейта при изменении даты текущего месяца календаря
  const handleChangeCurrentMonth = (monthIndex) => {
    setState((prevState) => ({
      ...prevState,
      currentMonth: getMonth(monthIndex),
    }));
  };

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

  const { sortedCurrentWeeklyMeetings, sortedTasks, getMeeting, getTask } =
    useCalendar(data);

  useEffect(() => {
    handleChangeCurrentMonth(monthIndex);
  }, [monthIndex]);

  useEffect(() => {
    localStorage.setItem("search-tasks-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("search-tasks-data", JSON.stringify(initialState));
  }, []);

  return (
    <>
      <HeaderLayout title="Календарь" />
      <CalendarHeader setState={setState} isCurator={isCurator} />
      <CalendarBody
        tasks={getTask}
        meetings={getMeeting}
        currentMonth={state.currentMonth}
        setDateCreate={handleChangeDateCreate}
        background="darkOrange"
        setState={setState}
      />
      <TasksTable
        register={register}
        data={data}
        tasks={sortedTasks}
        columns={tasksColumns()}
        setValue={setValue}
      />
      <CurrentWeeklyMeetings
        meetings={sortedCurrentWeeklyMeetings}
        columns={meetingsColumns()}
      />
      <PageDialogs state={state} setState={setState} />
    </>
  );
});

export default Calendar;
