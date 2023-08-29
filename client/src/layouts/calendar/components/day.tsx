import { Box, Typography, styled } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ru";

const DayOfWeek = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid gray;
  background: darkGreen;
`;

const DateOfMonthContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const DateOfMonth = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  width: 32px;
`;

const Day = ({ day }) => {
  const isCurrentDay = () => {
    const currentDay = dayjs().format("DD-MM-YY");
    const calendarDay = day.format("DD-MM-YY");
    const isCurrentDay = currentDay === calendarDay;

    return isCurrentDay;
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "start",
        border: "1px solid gray",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: '3px'
        }}
      >
        <DateOfMonthContainer>
          <DateOfMonth
            sx={{
              backgroundColor: isCurrentDay() ? "yellow" : "inherit",
              color: isCurrentDay() ? 'black' : 'inherit'
            }}
          >
            {day.format("DD")}
          </DateOfMonth>
        </DateOfMonthContainer>
      </Box>
    </Box>
  );
};

export default Day;
