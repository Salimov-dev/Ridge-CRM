import { Box, styled } from "@mui/material";
// components
import Tasks from "./components/tasks/tasks";
import Meetings from "./components/meetings/meetings";
// utils
import { chechIsCurrentDay } from "../../../../../../../utils/date/check-is-current-day";
import { chechIsFutureDay } from "../../../../../../../utils/date/check-is-future-day";

const Components = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 4px;
  padding-bottom: 28px;
`;

const DayContent = ({ meeting, tasks, day }) => {
  const isCurrentDay = chechIsCurrentDay(day);
  const isFutureDay = chechIsFutureDay(day);

  return (
    <Components>
      <Tasks
        tasks={tasks}
        isCurrentDay={isCurrentDay}
        isFutureDay={isFutureDay}
      />
      <Meetings
        meeting={meeting}
        isCurrentDay={isCurrentDay}
        isFutureDay={isFutureDay}
      />
    </Components>
  );
};

export default DayContent;
