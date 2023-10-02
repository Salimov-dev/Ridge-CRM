import { useEffect, useState } from "react";
import { Box, styled } from "@mui/material";
// components
import DayContent from "./components/day-content/day-content";
import ActionsIcons from "./components/day-content/components/actions-icons/actions-icons";
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

const Day = ({ day, tasks, meetings, isWeekendColumn, setDateCreate }) => {
  const [currentPath, setCurrentPath] = useState("");

  const isRidgePage = currentPath === "/ridge";
  const isCurrentDay = chechIsCurrentDay(day);
  const isFutureDay = chechIsFutureDay(day);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
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
      <Date
        day={day}
        isCurrentDay={isCurrentDay}
        isFutureDay={isFutureDay}
        isWeekendColumn={isWeekendColumn}
      />
      <DayContent meetings={meetings} tasks={tasks} isRidgePage={isRidgePage} />
      <ActionsIcons
        day={day}
        setDateCreate={setDateCreate}
        isCurrentDay={isCurrentDay}
        isFutureDay={isFutureDay}
        isRidgePage={isRidgePage}
      />
    </OneDayContainer>
  );
};

export default Day;
