import { Box, Typography, styled } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ru";

const OneDayContainer = styled(Box)`
  display: flex;
  border: 1px solid gray;
  flex-direction: column;
  cursor: pointer;
`;

const ContainerDate = styled(Typography)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 3px;
`;

const Date = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  width: 32px;
`;

const Day = ({ day, isWeekendColumn, onClick }) => {
  const isCurrentDay = () => {
    const currentDay = dayjs().format("DD-MM-YY");
    const calendarDay = day.format("DD-MM-YY");
    const isCurrentDay = currentDay === calendarDay;

    return isCurrentDay;
  };

  return (
    <OneDayContainer
      onClick={onClick}
      sx={{ backgroundColor: isWeekendColumn ? "#171e32" : "inherit" }}
    >
      <ContainerDate>
        <Date
          sx={{
            backgroundColor: isCurrentDay() ? "yellow" : "inherit",
            color: isWeekendColumn
              ? "red"
              : isCurrentDay()
              ? "black"
              : "inherit",
          }}
        >
          {day.format("DD")}
        </Date>
      </ContainerDate>
      <Box></Box>
    </OneDayContainer>
  );
};

export default Day;
