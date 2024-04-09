// libraries
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
// components
import CalendarHeader from "@components/common/calendar/calendar-header/calendar-header";
import TasksTable from "./components/meetings/components/tasks-table";
import CalendarBody from "@components/common/calendar/calendar-body/calendar-body";
import HeaderLayout from "@components/common/page-headers/header-layout";
import PageDialogs from "@components/common/dialog/page-dialogs";
import CurrentWeeklyMeetings from "./components/meetings/components/current-weekly-meetings";
import { ContainerStyled } from "@components/common/container/container-styled";
// columns
import { tasksColumns } from "@columns/tasks.columns";
import { meetingsColumns } from "@columns/meetings.columns";
// utils
import getMonth from "@utils/calendar/get-month";
// hooks
import useCalendar from "@hooks/calendar/use-calendar";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { getMonthIndexState } from "@store/month-index.store";
import { getCurrentUserId, getIsUserCurator } from "@store/user/users.store";
import { getObjectsList } from "@store/object/objects.store";

const initialState = {
  task: "",
  result: "",
  selectedTaskTypes: [],
  onlyMyTasks: false
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
    videoPlayerPage: false
  });

  const localStorageState = JSON.parse(
    localStorage.getItem("search-tasks-data")
  );

  const { register, watch, setValue } = useForm({
    defaultValues: !!localStorageState ? localStorageState : initialState,
    mode: "onChange"
  });

  const data = watch();
  const monthIndex = useSelector(getMonthIndexState());
  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const isDialogPage = true;

  const objects = useSelector(getObjectsList());
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );
  const actualObjects = isCurator ? currentUserObjects : objects;

  const {
    sortedCurrentWeeklyMeetings,
    sortedTasks,
    getMeeting,
    getTask,
    handleChangeCurrentMonth
  } = useCalendar(data, setState);

  const {
    handleOpenUpdateMyTaskPage,
    handleOpenUpdateManagerTaskPage,
    handleOpenObjectPage,
    handleOpenUpdateMeetingPage,
    handleOpenVideoPlayerPage
  } = useDialogHandlers(setState);

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
    <ContainerStyled>
      <HeaderLayout title="Календарь" />
      <CalendarHeader
        setState={setState}
        isCurator={isCurator}
        onOpenVideoPlayerPage={handleOpenVideoPlayerPage}
      />
      <CalendarBody
        tasks={getTask}
        meetings={getMeeting}
        currentMonth={state.currentMonth}
        background="darkOrange"
        setState={setState}
      />
      <TasksTable
        register={register}
        data={data}
        tasks={sortedTasks}
        columns={tasksColumns(
          handleOpenUpdateMyTaskPage,
          handleOpenUpdateManagerTaskPage,
          handleOpenObjectPage,
          isDialogPage
        )}
        setValue={setValue}
      />
      <CurrentWeeklyMeetings
        meetings={sortedCurrentWeeklyMeetings}
        columns={meetingsColumns(
          handleOpenUpdateMeetingPage,
          handleOpenObjectPage,
          isDialogPage
        )}
      />
      <PageDialogs
        state={state}
        setState={setState}
        objects={actualObjects}
        videoTitle="Как пользоваться страницей с Календарем"
        videoSrc="https://www.youtube.com/embed/8DoIs0htfsU"
      />
    </ContainerStyled>
  );
});

export default Calendar;
