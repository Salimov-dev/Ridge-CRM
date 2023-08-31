// libraries
import dayjs from "dayjs";
import { orderBy } from "lodash";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import { groupedColumns } from "./table/columns";
import Header from "./components/header/header";
import CreateTask from "./components/create-task/create-task";
import DaysOfWeek from "./components/days-of-week/days-of-week";
import DialogStyled from "../../components/common/dialog/dialog-styled";
import CalendarBody from "./components/calendar-body/calendar-body";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import CurrentWeeklyMeetings from "./components/current-weekly-meetings/current-weekly-meetings";
// utils
import getMonth from "../../utils/calendar/get-month";
import { capitalizeFirstLetter } from "../../utils/data/capitalize-first-letter";
// schema
import { taskSchema } from "../../schemas/schemas";
// store
import { getMonthIndexState } from "../../store/month-index.store";
import { getObjectsList } from "../../store/object/objects.store";
import { getCurrentUserId, getUsersList } from "../../store/user/users.store";
import {
  getMeetingLoadingStatus,
  getMeetingsList,
} from "../../store/meeting/meetings.store";
import { createTask, getTasksList } from "../../store/task/tasks.store";
import CurrentWeeklyMyTasks from "./components/current-weekly-my-tasks/current-weekly-my-tasks";
import { Box } from "@mui/material";
import useCalendar from "../../hooks/use-calendar";

const initialState = {
  comment: "",
  date: dayjs(),
  time: null,
  objectId: "",
  managerId: "",
};

const Calendar = () => {
  const [openCreateMyTask, setOpenCreateMyTask] = useState(false);
  const [openCreateManagerTask, setOpenCreateManagerTask] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const monthIndex = useSelector(getMonthIndexState());
  const columns = groupedColumns;
  const dispatch = useDispatch();

  const objects = useSelector(getObjectsList());
  const meetings = useSelector(getMeetingsList());
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());

  const today = dayjs();
  const startOfWeek = today.startOf("week");
  const endOfWeek = today.endOf("week");

  const currentWeeklyMeetings = meetings?.filter((meet) =>
    dayjs(meet.date).isBetween(startOfWeek, endOfWeek, null, "[]")
  );

  const sortedCurrentWeeklyMeetings = orderBy(
    currentWeeklyMeetings,
    ["date"],
    ["asc"]
  );

  const users = useSelector(getUsersList());
  const currentUserId = useSelector(getCurrentUserId());
  const usersWithoutCurrentUser = users.filter(
    (user) => user._id !== currentUserId
  );

  let transformUsers = [];
  usersWithoutCurrentUser?.forEach((user) => {
    transformUsers?.push({
      _id: user._id,
      name: `${user.name.lastName} ${user.name.firstName}`,
    });
  });

  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(taskSchema),
  });
  const watchDate = watch("date", null);
  const isFullValid = !watchDate || !isValid;

  const data = watch();

  const {
    onSubmitMyTask,
    onSubmitManagerTask,
    handleCloseCreate,
    handleCloseCreateManagerTask,
    handleopenCreateMyTaskMyTask,
    handleopenCreateMyTaskManagerTask,
  } = useCalendar(
    data,
    setOpenCreateManagerTask,
    setOpenCreateMyTask,
    setValue,
    reset
  );

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <LayoutTitle title="Календарь" />
      <Header
        onCreateMyTask={handleopenCreateMyTaskMyTask}
        onCreateManagerTask={handleopenCreateMyTaskManagerTask}
      />
      <DaysOfWeek />
      <CalendarBody
        currentMonth={currentMonth}
        onOpenCreateMyTask={handleopenCreateMyTaskMyTask}
      />
      <CurrentWeeklyMeetings
        meetings={sortedCurrentWeeklyMeetings}
        columns={columns}
        isLoading={isMeetingsLoading}
      />

      {/* <CurrentWeeklyMyTasks
        meetings={sortedCurrentWeeklyMeetings}
        columns={columns}
        isLoading={isMeetingsLoading}
      /> */}

      <DialogStyled
        onClose={handleCloseCreateManagerTask}
        open={openCreateManagerTask}
        maxWidth="sm"
        fullWidth={false}
        component={
          <CreateTask
            data={data}
            title="Добавить менеджеру задачу"
            objects={transformObjects}
            users={transformUsers}
            register={register}
            onSubmit={onSubmitManagerTask}
            handleSubmit={handleSubmit}
            errors={errors}
            setValue={setValue}
            onClose={handleCloseCreateManagerTask}
            isValid={isFullValid}
            isManagerTask={true}
          />
        }
      />
      <DialogStyled
        onClose={handleCloseCreate}
        open={openCreateMyTask}
        maxWidth="sm"
        fullWidth={false}
        component={
          <CreateTask
            data={data}
            title="Добавить себе задачу"
            objects={transformObjects}
            register={register}
            onSubmit={onSubmitMyTask}
            handleSubmit={handleSubmit}
            errors={errors}
            setValue={setValue}
            onClose={handleCloseCreate}
            isValid={isFullValid}
          />
        }
      />
    </>
  );
};

export default Calendar;
