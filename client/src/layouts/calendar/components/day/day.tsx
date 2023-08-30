import { toast } from "react-toastify";
import { Box, Typography, styled } from "@mui/material";
// utils
import { chechIsCurrentDay } from "../../../../utils/date/check-is-current-day";
import { chechIsFutureDay } from "../../../../utils/date/check-is-future-day";
import DayContent from "./components/day-content/day-content";

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
  justify-content: center;
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

const Day = ({ day, isWeekendColumn, onClick, meeting }) => {
  const isCurrentDay = chechIsCurrentDay(day);
  const isFutureDay = chechIsFutureDay(day);

  return (
    <OneDayContainer
      onClick={() => {
        if (isCurrentDay || isFutureDay) {
          onClick(day);
        } else {
          toast.error("Нельзя поставить задачу ранее текущей даты!");
        }
      }}
      sx={{
        backgroundColor: isWeekendColumn ? "#171e32" : "inherit",
        borderColor: isCurrentDay
          ? "yellow"
          : isFutureDay
          ? "green"
          : "inherit",
        border: isCurrentDay
          ? "2px dotted white"
          : isFutureDay
          ? "1px solid white"
          : "1px solid gray",
        "&:hover": {
          borderColor: isCurrentDay ? "yellow" : isFutureDay ? "yellow" : "red",
        },
      }}
    >
      <ContainerDate>
        <Date
          sx={{
            backgroundColor: isCurrentDay ? "yellow" : "inherit",
            color: isWeekendColumn
              ? "red"
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
      <DayContent meeting={meeting} />
    </OneDayContainer>
  );
};

export default Day;
