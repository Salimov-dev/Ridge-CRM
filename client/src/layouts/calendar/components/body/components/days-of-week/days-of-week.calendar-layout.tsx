import { Box, styled } from "@mui/material";
import DayOfWeek from "./day-of-week.calendar-layout";
import { daysOfWeekArray } from "@data/day-of-week";

const Components = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 22px;
  justify-content: space-between;
  border-top: 3px solid gray;
  border-left: 3px solid gray;
  border-right: 3px solid gray;
  background: darkOrange;
`;

const DaysOfWeekCalendarLayout = () => {
  const daysArray = daysOfWeekArray;

  return (
    <Components>
      {daysArray?.map((day) => (
        <DayOfWeek key={day._id} day={day.name} color={day.color} />
      ))}
    </Components>
  );
};

export default DaysOfWeekCalendarLayout;
