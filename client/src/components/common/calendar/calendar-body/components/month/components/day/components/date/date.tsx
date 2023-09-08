import { Box, Typography, styled } from "@mui/material";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding-top: 3px;
  margin-bottom: 10px;
`;

const DateOfWeek = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  width: 32px;
`;

const Date = ({ day, isCurrentDay, isFutureDay, isWeekendColumn }) => {
  return (
    <Component>
      <DateOfWeek
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
      </DateOfWeek>
    </Component>
  );
};

export default Date;
