import dayjs from "dayjs";
import { Box, styled } from "@mui/material";
// components
import DayContent from "./components/day-content/day-content";
import ActionsIcons from "../../../../../../../../layouts/calendar/components/meetings/actions-icons";
import Date from "./components/date/date";
// utils
import { chechIsCurrentDay } from "../../../../../../../../utils/date/check-is-current-day";
import { chechIsFutureDay } from "../../../../../../../../utils/date/check-is-future-day";

const OneDayContainer = styled(Box)`
  display: flex;
  border: 1px solid gray;
  flex-direction: column;
  cursor: pointer;
  padding: 6px;
`;

const Day = ({
  day,
  tasks,
  meetings,
  isWeekendColumn,
  setDateCreate,
  onDragOver,
  draggableDay,
  setDraggableDay,
  setState,
}) => {
  const isCurrentDay = chechIsCurrentDay(day);
  const isFutureDay = chechIsFutureDay(day);

  const formattedDay = dayjs(day, { format: "YYYYMMDDHHmmss" }).format(
    "YYYY-MM-DDTHH:mm:ss.SSSZ"
  );

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
            : "Crimson",
        },
      }}
    >
      <Date
        day={day}
        setDateCreate={setDateCreate}
        isCurrentDay={isCurrentDay}
        isFutureDay={isFutureDay}
        isWeekendColumn={isWeekendColumn}
      />
      <DayContent
        meetings={meetings}
        tasks={tasks}
        draggableDay={draggableDay}
        setDraggableDay={setDraggableDay}
        isSelectedDayDialog={false}
      />
      <ActionsIcons
        day={day}
        setState={setState}
        setDateCreate={setDateCreate}
        isCurrentDay={isCurrentDay}
        isFutureDay={isFutureDay}
      />
    </OneDayContainer>
  );
};

export default Day;
