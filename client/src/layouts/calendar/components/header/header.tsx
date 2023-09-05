// libraries
import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
// components
import MonthToday from "./components/month-today";
import CreateButtons from "./components/create-buttons";
import ControlButtons from "./components/control-buttons";
// store
import { getMonthIndexState } from "../../../../store/month-index.store";
import { getTaskLoadingStatus } from "../../../../store/task/tasks.store";
import { getMeetingLoadingStatus } from "../../../../store/meeting/meetings.store";

const Component = styled(Box)`
  margin-bottom: 6px;
  display: flex;
  gap: 4px;
  justify-content: space-between;
`;

const Header = ({ onCreateMyTask, onCreateManagerTask, onCreateMeeting }) => {
  const monthIndex = useSelector(getMonthIndexState());
  const isTasksLoading = useSelector(getTaskLoadingStatus());
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());
  
  const isLoading = !isTasksLoading && !isMeetingsLoading;

  return (
    <Component>
      <CreateButtons
        onCreateMeeting={onCreateMeeting}
        onCreateMyTask={onCreateMyTask}
        onCreateManagerTask={onCreateManagerTask}
        isLoading={isLoading}
      />
      <MonthToday monthIndex={monthIndex} />
      <ControlButtons isLoading={isLoading}/>
    </Component>
  );
};

export default Header;