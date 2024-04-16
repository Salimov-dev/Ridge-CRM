import dayjs from "dayjs";
import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { orderBy } from "lodash";
// components
import DateCalendarLayout from "./components/date.calendar-layout";
import DayContentCalendarLayout from "./components/day-content.calendar-layout";
import ActionsIconsCalendarLayout from "@layouts/calendar/components/body/components/day/components/actions-icons.calendar-layout.";
// utils
import { chechIsCurrentDay } from "@utils/date/check-is-current-day";
import { chechIsFutureDay } from "@utils/date/check-is-future-day";
// store
import { getMeetingsList } from "@store/meeting/meetings.store";
import { getTasksList } from "@store/task/tasks.store";
import {
  getCurrentUserId,
  getIsCurrentUserRoleCurator,
  getIsCurrentUserRoleManager
} from "@store/user/users.store";

const OneDayContainer = styled(Box)`
  display: flex;
  border: 1px solid gray;
  flex-direction: column;
  padding: 6px;
`;

const DayCalendarLay = ({
  day,
  index,
  onDragOver,
  draggableDay,
  setDraggableDay,
  setState
}) => {
  const meetings = useSelector(getMeetingsList());
  const tasks = useSelector(getTasksList());
  const currentUserId = useSelector(getCurrentUserId());

  const isWeekendColumn = index === 5 || index === 6;
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());
  const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());
  const isCurrentDay = chechIsCurrentDay(day);
  const isFutureDay = chechIsFutureDay(day);

  const formattedDay = dayjs(day, { format: "YYYYMMDDHHmmss" }).format(
    "YYYY-MM-DDTHH:mm:ss.SSSZ"
  );

  const getMeetings = (day) => {
    const currentUserMeetings = meetings?.filter(
      (task) => task?.userId === currentUserId
    );
    const actualMeetings = isCurrentUserRoleCurator
      ? meetings
      : currentUserMeetings;
    const currentMeetings = actualMeetings?.filter(
      (meet) =>
        dayjs(meet?.date).format("YYYY-MM-DD") ===
        dayjs(day)?.format("YYYY-MM-DD")
    );
    const sortedMeetings = orderBy(currentMeetings, ["date"], ["desc"]);

    return sortedMeetings ?? [];
  };

  const getTask = (day) => {
    const currentUserTasks = tasks?.filter(
      (task) => task?.userId === currentUserId
    );
    const actualTasks = isCurrentUserRoleManager ? tasks : currentUserTasks;
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
      [(task) => dayjs(task.time).format("HH:mm")],
      ["asc"]
    );

    return sortedTasks ?? [];
  };

  return (
    <OneDayContainer
      onDragOver={onDragOver}
      sx={{
        height: "100%",
        backgroundColor: isWeekendColumn ? "#171e32" : "inherit",
        borderColor: isCurrentDay
          ? "yellow"
          : isFutureDay
          ? "white"
          : "inherit",
        borderWidth: isCurrentDay ? "3px" : isFutureDay ? "1px" : "1px",
        borderStyle: isCurrentDay ? "dashed" : isFutureDay ? "solid" : "solid",
        border: formattedDay === draggableDay ? "3px dashed DeepPink" : null,
        "&:hover": {
          borderColor: isCurrentDay
            ? "yellow"
            : isFutureDay
            ? formattedDay !== draggableDay
              ? "yellow"
              : "DeepPink"
            : "Crimson"
        }
      }}
    >
      <DateCalendarLayout
        day={day}
        isCurrentDay={isCurrentDay}
        isFutureDay={isFutureDay}
        isWeekendColumn={isWeekendColumn}
      />
      <DayContentCalendarLayout
        meetings={getMeetings(day)}
        tasks={getTask(day)}
        draggableDay={draggableDay}
        setDraggableDay={setDraggableDay}
        isSelectedDayDialog={false}
        setState={setState}
      />
      <ActionsIconsCalendarLayout
        day={day}
        setState={setState}
        isCurrentDay={isCurrentDay}
        isFutureDay={isFutureDay}
      />
    </OneDayContainer>
  );
};

export default DayCalendarLay;
