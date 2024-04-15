import { useSelector } from "react-redux";
import { Box, styled } from "@mui/material";
// components
import Loader from "@components/common/loader/loader";
import MeetingItemCalendar from "@layouts/calendar/components/meetings/meetings-item.calendar";
import TaskItemCalendar from "@layouts/calendar/components/tasks/tasks-item.calendar";
// store
import { getTaskLoadingStatus } from "@store/task/tasks.store";
import { getMeetingLoadingStatus } from "@store/meeting/meetings.store";
import {
  getCurrentUserId,
  getIsCurrentUserRoleCurator,
  getIsUserCurator
} from "@store/user/users.store";

const Components = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-bottom: 28px;
  gap: 4px;
`;

const DayContentCalendarLayout = ({
  meetings,
  tasks,
  draggableDay,
  setDraggableDay,
  isSelectedDayDialog,
  setState
}) => {
  const isTasksLoading = useSelector(getTaskLoadingStatus());
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());

  const isFullLoading = !isTasksLoading && !isMeetingsLoading;
  const isTasks = tasks?.length;
  const isMeetings = meetings?.length;

  return isFullLoading ? (
    <Components>
      {isTasks ? (
        <TaskItemCalendar
          tasks={tasks}
          draggableDay={draggableDay}
          setDraggableDay={setDraggableDay}
          setState={setState}
        />
      ) : null}
      {isMeetings ? (
        <MeetingItemCalendar
          meetings={meetings}
          draggableDay={draggableDay}
          setDraggableDay={setDraggableDay}
          isSelectedDayDialog={isSelectedDayDialog}
          setState={setState}
        />
      ) : null}
    </Components>
  ) : (
    <Loader />
  );
};

export default DayContentCalendarLayout;
