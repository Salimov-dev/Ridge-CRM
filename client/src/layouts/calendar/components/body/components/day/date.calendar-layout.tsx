import { Box, Typography, styled } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";

const Component = styled(Box)`
  height: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const DateCalendarLayout = ({
  day,
  isCurrentDay,
  isFutureDay,
  isWeekendColumn
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Component>
      <DateOfWeek
        sx={{
          border: `1px solid ${colors.background["primary"]}`,
          ":hover": {
            color: isCurrentDay ? "white" : "black",
            border: "1px solid yellow",
            backgroundColor: isCurrentDay ? "green" : "yellow"
          },
          backgroundColor: isCurrentDay ? "yellow" : "inherit",
          color: isWeekendColumn
            ? "Crimson"
            : isCurrentDay
            ? "black"
            : isFutureDay
            ? "white"
            : "gray"
        }}
      >
        {day.format("DD")}
      </DateOfWeek>
    </Component>
  );
};

export default DateCalendarLayout;
