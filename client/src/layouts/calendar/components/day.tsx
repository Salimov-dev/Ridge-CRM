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
  padding: 3px 3px 3px 6px;
  border-radius: 50%;
  width: 26px;
  height: 26px;
`;

const Day = ({ day, rowIdx }) => {
  const firstRow = rowIdx === 0

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
        }}
      >
        {firstRow && (
          <DayOfWeek>
            <Typography>
              {day.locale("ru").format("dd").toUpperCase()}
            </Typography>
          </DayOfWeek>
        )}
        <DateOfMonthContainer>
          <DateOfMonth
            sx={{
              backgroundColor: isCurrentDay() ? "blue" : "inherit",
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
