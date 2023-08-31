import { Box } from "@mui/material";
// components
import Meetings from "./components/meetings";
import Tasks from "./components/tasks";
// utils
import { chechIsCurrentDay } from "../../../../../../utils/date/check-is-current-day";
import { chechIsFutureDay } from "../../../../../../utils/date/check-is-future-day";

const DayContent = ({ meeting, task, day }) => {
  const isCurrentDay = chechIsCurrentDay(day);
  const isFutureDay = chechIsFutureDay(day);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <Tasks
        task={task}
        isCurrentDay={isCurrentDay}
        isFutureDay={isFutureDay}
      />
      <Meetings
        meeting={meeting}
        isCurrentDay={isCurrentDay}
        isFutureDay={isFutureDay}
      />
    </Box>
  );
};

export default DayContent;
