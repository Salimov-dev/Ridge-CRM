import { Box, styled } from "@mui/material";
import Month from "../month/month";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const CalendarBody = ({ currentMonth, onOpenCreate }) => {
  return (
    <Component>
      <Month month={currentMonth} onClick={onOpenCreate} />
    </Component>
  );
};

export default CalendarBody;
