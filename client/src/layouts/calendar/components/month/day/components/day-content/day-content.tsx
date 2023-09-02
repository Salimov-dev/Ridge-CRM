import { Box, styled } from "@mui/material";
// components

import Tasks from "./components/tasks";
// utils
import { chechIsCurrentDay } from "../../../../../../../utils/date/check-is-current-day";
import { chechIsFutureDay } from "../../../../../../../utils/date/check-is-future-day";
import Meetings from "./components/meetings";

const Components = styled(Box)`
  display: flex;
  flex-direction: column;
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
