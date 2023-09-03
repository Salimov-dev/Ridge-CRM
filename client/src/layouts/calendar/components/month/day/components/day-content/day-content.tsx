import { Box, styled } from "@mui/material";
// components
import Tasks from "./components/tasks/tasks";
import Meetings from "./components/meetings/meetings";

const Components = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 4px;
  padding-bottom: 28px;
`;

const DayContent = ({ meeting, tasks, day }) => {

  return (
    <Components>
      <Tasks
        tasks={tasks}
      />
      <Meetings
        meeting={meeting}
      />
    </Components>
  );
};

export default DayContent;
