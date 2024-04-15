import { Box, styled } from "@mui/material";
import MonthToday from "./components/month-today.calendar-layout";
import ControlButtons from "./components/control-buttons.calendar-layout";
import ButtonsCalendarLayout from "@components/UI/layout-buttons/buttons.calendar-layout";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  justify-content: space-between;
`;

const CalendarLayoutHeader = ({ setState }) => {
  return (
    <Component>
      <ButtonsCalendarLayout setState={setState} />
      <MonthToday />
      <ControlButtons />
    </Component>
  );
};

export default CalendarLayoutHeader;
