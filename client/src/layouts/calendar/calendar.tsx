// libraries
import dayjs from "dayjs";
import { useSelector } from "react-redux";
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
// schema
import { taskSchema } from "../../schemas/schemas";
// store
import { getMonthIndexState } from "../../store/month-index.store";
import useCalendar from "../../hooks/use-calendar";
import CreateMeeting from "../../components/pages/create-meeting/create-meeting";
import CreateButtons from "./components/header/components/create-buttons";
import { Box } from "@mui/material";

const initialState = {
  comment: "",
  date: dayjs(),
  time: null,
  objectId: "",
  managerId: "",
};

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [openCreateMyTask, setOpenCreateMyTask] = useState(false);
  const [openCreateMeeting, setOpenCreateMeeting] = useState(false);
  const [openCreateManagerTask, setOpenCreateManagerTask] = useState(false);
  const monthIndex = useSelector(getMonthIndexState());
  const columns = groupedColumns;

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
  const data = watch();
  const watchDate = watch("date", null);
  const isFullValid = !watchDate || !isValid;

  const {
    meetings,
    users,
    objects,
    isMeetingsLoading,
    onSubmitMyTask,
    onSubmitManagerTask,
    handleCloseCreateMyTask,
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

  const handleOpenCreateMeeting = () => {
    setOpenCreateMeeting(true);
  };

  const handleCloseCreateMeeting = () => {
    setOpenCreateMeeting(false);
  };
  return (
    <>
      <LayoutTitle title="Календарь" />
      <Header
        onCreateMyTask={handleopenCreateMyTaskMyTask}
        onCreateManagerTask={handleopenCreateMyTaskManagerTask}
        onCreateMeeting={handleOpenCreateMeeting}
      />
      <DaysOfWeek />
      <CalendarBody
        currentMonth={currentMonth}
        onOpenCreateMyTask={handleopenCreateMyTaskMyTask}
      />
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <CreateButtons
          onCreateMeeting={handleOpenCreateMeeting}
          onCreateMyTask={handleopenCreateMyTaskMyTask}
          onCreateManagerTask={handleopenCreateMyTaskManagerTask}
        />
      </Box>
      <CurrentWeeklyMeetings
        meetings={meetings}
        columns={columns}
        isLoading={isMeetingsLoading}
      />

      {/* <CurrentWeeklyMyTasks
        meetings={sortedCurrentWeeklyMeetings}
        columns={columns}
        isLoading={isMeetingsLoading}
      /> */}

      <DialogStyled
        component={<CreateMeeting onClose={handleCloseCreateMeeting} />}
        onClose={handleCloseCreateMeeting}
        open={openCreateMeeting}
      />
      <DialogStyled
        onClose={handleCloseCreateManagerTask}
        open={openCreateManagerTask}
        maxWidth="sm"
        fullWidth={false}
        component={
          <CreateTask
            data={data}
            title="Добавить менеджеру задачу"
            objects={objects}
            users={users}
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
        onClose={handleCloseCreateMyTask}
        open={openCreateMyTask}
        maxWidth="sm"
        fullWidth={false}
        component={
          <CreateTask
            data={data}
            title="Добавить себе задачу"
            objects={objects}
            register={register}
            onSubmit={onSubmitMyTask}
            handleSubmit={handleSubmit}
            errors={errors}
            setValue={setValue}
            onClose={handleCloseCreateMyTask}
            isValid={isFullValid}
          />
        }
      />
    </>
  );
};

export default Calendar;
