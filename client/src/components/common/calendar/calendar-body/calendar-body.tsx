import { Box, styled } from "@mui/material";
import Month from "./components/month/month";
import DaysOfWeek from "./components/days-of-week/days-of-week";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const CalendarBody = ({
  tasks,
  currentMonth,
  meetings,
  background,
  setState,
}) => {
  return (
    <Component>
      <DaysOfWeek background={background} />
      <Month
        month={currentMonth}
        meetings={meetings}
        tasks={tasks}
        setState={setState}
      />
    </Component>
  );
};

export default CalendarBody;
