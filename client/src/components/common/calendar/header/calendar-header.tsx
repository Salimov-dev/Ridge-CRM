// libraries
import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
// components
import MonthToday from "./components/month-today";
import ControlButtons from "./components/control-buttons";
import Buttons from "@layouts/calendar/components/meetings/buttons";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { getMonthIndexState } from "@store/month-index.store";
import { getTaskLoadingStatus } from "@store/task/tasks.store";
import { getMeetingLoadingStatus } from "@store/meeting/meetings.store";

const Component = styled(Box)`
  margin-bottom: 6px;
  display: flex;
  gap: 4px;
  justify-content: space-between;
`;

const CalendarHeader = ({ setState, isCurator }) => {
  const monthIndex = useSelector(getMonthIndexState());
  const isTasksLoading = useSelector(getTaskLoadingStatus());
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());
  const isLoading = !isTasksLoading && !isMeetingsLoading;

  const {
    handleOpenCreateMyTaskPage,
    handleOpenCreateManagerTaskPage,
    handleOpenCreateMeetingPage,
  } = useDialogHandlers(setState);

  return (
    <Component>
      <Buttons
        onOpenCreateMyTask={handleOpenCreateMyTaskPage}
        onOpenCreateManagerTask={handleOpenCreateManagerTaskPage}
        onOpenCreateMeetingPage={handleOpenCreateMeetingPage}
        isCurator={isCurator}
      />
      <MonthToday monthIndex={monthIndex} />
      <ControlButtons isLoading={isLoading} />
    </Component>
  );
};

export default CalendarHeader;
