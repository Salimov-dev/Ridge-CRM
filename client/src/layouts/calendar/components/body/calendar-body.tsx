import { Box, styled } from "@mui/material";
import MonthCalendarLayout from "./components/month/month.calendar-layout";
import DaysOfWeekCalendarLayout from "./components/days-of-week/days-of-week.calendar-layout";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const CalendarLayoutBody = ({ currentMonth, setState }) => {
  return (
    <Component>
      <DaysOfWeekCalendarLayout />
      <MonthCalendarLayout month={currentMonth} setState={setState} />
    </Component>
  );
};

export default CalendarLayoutBody;
