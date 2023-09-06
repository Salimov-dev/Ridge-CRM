import { Box, Typography, styled } from "@mui/material";
// components
import DayContent from "./components/day-content/day-content";
import CreateTaskIcon from "./components/day-content/components/create-my-task-icon/create-my-task-icon";
// utils
import { chechIsCurrentDay } from "../../../../../utils/date/check-is-current-day";
import { chechIsFutureDay } from "../../../../../utils/date/check-is-future-day";
import CreateMeetingIcon from "./components/day-content/components/create-meeting-icon/create-meeting-icon";
import CreateMyTaskIcon from "./components/day-content/components/create-my-task-icon/create-my-task-icon";
import CreateManagerTaskIcon from "./components/day-content/components/create-manager-task-icon/create-manager-task-icon";

const OneDayContainer = styled(Box)`
  display: flex;
  border: 1px solid gray;
  flex-direction: column;
  cursor: pointer;
  padding: 6px;
`;

const ContainerDate = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding-top: 3px;
  margin-bottom: 10px;
`;

const Date = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  width: 32px;
`;

const Day = ({ day, tasks, meetings, isWeekendColumn, setDateCreate }) => {
  const isCurrentDay = chechIsCurrentDay(day);
  const isFutureDay = chechIsFutureDay(day);
  return (
    <OneDayContainer
      sx={{
        height: "100%",
        backgroundColor: isWeekendColumn ? "#171e32" : "inherit",
        borderColor: isCurrentDay
          ? "yellow"
          : isFutureDay
          ? "green"
          : "inherit",
        border: isCurrentDay
          ? "3px dashed yellow"
          : isFutureDay
          ? "1px solid white"
          : "1px solid gray",
        "&:hover": {
          borderColor: isCurrentDay
            ? "yellow"
            : isFutureDay
            ? "yellow"
            : "Crimson",
        },
      }}
    >
      <ContainerDate>
        <Date
          sx={{
            backgroundColor: isCurrentDay ? "yellow" : "inherit",
            color: isWeekendColumn
              ? "Crimson"
              : isCurrentDay
              ? "black"
              : isFutureDay
              ? "white"
              : "gray",
          }}
        >
          {day.format("DD")}
        </Date>
      </ContainerDate>
      <DayContent meetings={meetings} tasks={tasks} />
      <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
        <CreateManagerTaskIcon
          day={day}
          isCurrentDay={isCurrentDay}
          isFutureDay={isFutureDay}
          setDateCreate={setDateCreate}
          hoverColor="FireBrick"
        />
        <CreateMeetingIcon
          day={day}
          isCurrentDay={isCurrentDay}
          isFutureDay={isFutureDay}
          setDateCreate={setDateCreate}
        />
        <CreateMyTaskIcon
          day={day}
          isCurrentDay={isCurrentDay}
          isFutureDay={isFutureDay}
          setDateCreate={setDateCreate}
          hoverColor="orange"
        />
      </Box>
    </OneDayContainer>
  );
};

export default Day;
