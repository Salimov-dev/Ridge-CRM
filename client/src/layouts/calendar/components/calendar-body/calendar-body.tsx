import { Box, styled } from "@mui/material";
import Month from "../month/month";
import DaysOfWeek from "../days-of-week/days-of-week";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const CalendarBody = ({ currentMonth, onOpenCreateMyTask }) => {
  return (
    <Component>
      <DaysOfWeek />
      <Month month={currentMonth} onClick={onOpenCreateMyTask} />
    </Component>
  );
};

export default CalendarBody;
