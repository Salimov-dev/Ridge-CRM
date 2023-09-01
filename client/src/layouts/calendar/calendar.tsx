// libraries
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// components
import { groupedColumns } from "./table/columns";
import Header from "./components/header/header";
import DaysOfWeek from "./components/days-of-week/days-of-week";
import DialogStyled from "../../components/common/dialog/dialog-styled";
import CalendarBody from "./components/calendar-body/calendar-body";
import CreateButtons from "./components/header/components/create-buttons";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import CreateMyTask from "./components/create-my-task/create-my-task";
import CreateManagerTask from "./components/create-manager-task/create-manager-task";
import CreateMeeting from "../../components/pages/create-meeting/create-meeting";
import CurrentWeeklyMeetings from "./components/current-weekly-meetings/current-weekly-meetings";
// utils
import getMonth from "../../utils/calendar/get-month";
// store
import { getMonthIndexState } from "../../store/month-index.store";
// hooks
import useCalendar from "../../hooks/use-calendar";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [openCreateMyTask, setOpenCreateMyTask] = useState(false);
  const [dateCreateMyTask, setDateCreateMyTask] = useState(null);
  const [openCreateManagerTask, setOpenCreateManagerTask] = useState(false);
  const [openCreateMeeting, setOpenCreateMeeting] = useState(false);
  const monthIndex = useSelector(getMonthIndexState());
  const columns = groupedColumns;

  const {
    meetings,
    users,
    objects,
    isMeetingsLoading,
    handleCloseCreateMyTask,
    handleCloseCreateManagerTask,
    handleCloseCreateMeeting,
    handleOpenCreateMyTask,
    handleOpenCreateMyTaskManagerTask,
    handleOpenCreateMeeting,
  } = useCalendar(
    setOpenCreateManagerTask,
    setOpenCreateMyTask,
    setDateCreateMyTask,
    setOpenCreateMeeting
  );

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <LayoutTitle title="Календарь" />
      <Header
        onCreateMyTask={handleOpenCreateMyTask}
        onCreateManagerTask={handleOpenCreateMyTaskManagerTask}
        onCreateMeeting={handleOpenCreateMeeting}
      />

      <DaysOfWeek />

      <CalendarBody
        currentMonth={currentMonth}
        onOpenCreateMyTask={handleOpenCreateMyTask}
      />

      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <CreateButtons
          onCreateMeeting={handleOpenCreateMeeting}
          onCreateMyTask={handleOpenCreateMyTask}
          onCreateManagerTask={handleOpenCreateMyTaskManagerTask}
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
          <CreateManagerTask
            title="Добавить менеджеру задачу"
            objects={objects}
            users={users}
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
            objects={objects}
            date={dateCreateMyTask}
            onClose={handleCloseCreateMyTask}
          />
        }
      />
    </>
  );
};

export default Calendar;
