// libraries
import { Box, Button, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
// components
import MonthToday from "./components/month-today";
import ControlButtons from "./components/control-buttons";
import CreateTaskButton from "./components/create-task-button";
// store
import { getMonthIndexState } from "../../../../store/month-index.store";
import CreateMeetingButton from "./components/create-meeting-button";
import CreateButtons from "./components/create-buttons";

const Component = styled(Box)`
  margin-bottom: 10px;
  display: flex;
  gap: 4px;
  justify-content: space-between;
`;

const Header = ({ onCreateMyTask, onCreateManagerTask, onCreateMeeting }) => {
  const monthIndex = useSelector(getMonthIndexState());

  return (
    <Component>
      <CreateButtons
        onCreateMeeting={onCreateMeeting}
        onCreateMyTask={onCreateMyTask}
        onCreateManagerTask={onCreateManagerTask}
      />
      <MonthToday monthIndex={monthIndex} />
      <ControlButtons />
    </Component>
  );
};

export default Header;
