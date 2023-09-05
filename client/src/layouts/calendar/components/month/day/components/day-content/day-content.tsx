import { Box, styled } from "@mui/material";
// components
import Tasks from "./components/tasks/tasks";
import Meetings from "./components/meetings/meetings";
import Loader from "../../../../../../../components/common/loader/loader";
import { useSelector } from "react-redux";
import { getTaskLoadingStatus } from "../../../../../../../store/task/tasks.store";
import { getMeetingLoadingStatus } from "../../../../../../../store/meeting/meetings.store";

const Components = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-bottom: 28px;
  gap: 4px;
`;

const DayContent = ({ meetings, tasks }) => {
  const isTasksLoading = useSelector(getTaskLoadingStatus());
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());
  
  const isLoading = !isTasksLoading && !isMeetingsLoading;
  const isTasks = tasks.length;
  const isMeetings = meetings?.length;

  return isLoading ? (
    <Components>
      {isTasks ? <Tasks tasks={tasks} /> : null}
      {isMeetings ? <Meetings meetings={meetings} /> : null}
    </Components>
  ) : (
    <Loader />
  );
};

export default DayContent;
