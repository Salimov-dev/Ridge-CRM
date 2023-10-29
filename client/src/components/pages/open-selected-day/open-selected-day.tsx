import { Box } from "@mui/material";
// components
import Header from "./components/header";
import Loader from "../../common/loader/loader";
import DayContent from "../../common/calendar/calendar-body/components/month/components/day/components/day-content/day-content";

const OpenSelectedDay = ({ onClose, dateCreate, tasks, meetings }) => {
  return true ? (
    <Box>
      <Header onClose={onClose} dateCreate={dateCreate} />
      <DayContent
        meetings={meetings ? meetings(dateCreate) : []}
        tasks={tasks ? tasks(dateCreate) : []}
        isSelectedDayDialog={true}
      />
    </Box>
  ) : (
    <Loader />
  );
};

export default OpenSelectedDay;
