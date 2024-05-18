import { Box, styled } from "@mui/material";
import MonthToday from "./components/month-today.calendar-layout";
import ControlButtons from "./components/control-buttons.calendar-layout";
import ButtonsCalendarLayout from "@components/UI/layout-buttons/buttons.calendar-layout";
import { Dispatch, FC, SetStateAction } from "react";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface CalendarLayoutHeaderProps {
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  justify-content: space-between;
`;

const CalendarLayoutHeader: FC<CalendarLayoutHeaderProps> = ({
  setState
}): JSX.Element => {
  return (
    <Component>
      <ButtonsCalendarLayout setState={setState} />
      <MonthToday />
      <ControlButtons />
    </Component>
  );
};

export default CalendarLayoutHeader;
