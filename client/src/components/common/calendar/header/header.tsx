// libraries
import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
// components
import MonthToday from "./components/month-today";
import ControlButtons from "./components/control-buttons";
// store
import { getMonthIndexState } from "../../../../store/month-index.store";
import { getTaskLoadingStatus } from "../../../../store/task/tasks.store";
import { getMeetingLoadingStatus } from "../../../../store/meeting/meetings.store";
import CreateTasksButtons from "../../../../layouts/calendar/components/create-tasks-buttons/create-tasks-buttons";
import CreateMeetingButton from "../../../UI/dialogs/buttons/create-meeting-button";

const Component = styled(Box)`
  margin-bottom: 6px;
  display: flex;
  gap: 4px;
  justify-content: space-between;
`;

const Buttons = styled(Box)`
  display: flex;
  gap: 4px;
`;

const Header = () => {
  const monthIndex = useSelector(getMonthIndexState());
  const isTasksLoading = useSelector(getTaskLoadingStatus());
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());

  const isLoading = !isTasksLoading && !isMeetingsLoading;

  return (
    <Component>
      <Buttons>
        <CreateTasksButtons />
        <CreateMeetingButton />
      </Buttons>
      <MonthToday monthIndex={monthIndex} />
      <ControlButtons isLoading={isLoading} />
    </Component>
  );
};

export default Header;
