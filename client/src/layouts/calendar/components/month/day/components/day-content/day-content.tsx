import { Box, styled } from "@mui/material";
// components
import Tasks from "./components/tasks/tasks";
import Meetings from "./components/meetings/meetings";

const Components = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-bottom: 28px;
  gap: 4px;
`;

const DayContent = ({ meetings, tasks }) => {
  const isTasks = tasks.length;
  const isMeetings = meetings?.length;

  return (
    <Components>
      {isTasks ? <Tasks tasks={tasks} /> : null}
      {isMeetings ? <Meetings meetings={meetings} /> : null}
    </Components>
  );
};

export default DayContent;
