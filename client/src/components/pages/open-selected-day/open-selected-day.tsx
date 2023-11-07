import { Box } from "@mui/material";
// components
import Header from "./components/header";
import Loader from "../../common/loader/loader";
import DayContent from "../../common/calendar/calendar-body/components/month/components/day/components/day-content/day-content";
import React from "react";

const OpenSelectedDay = React.memo(({ onClose, dateCreate, tasks, meetings }) => {
  const meetingsArray = meetings ? meetings(dateCreate) : [];
  const tasksArray = tasks ? tasks(dateCreate) : [];
  const selectedDateIsEmptyDeals =
    !meetingsArray?.length && !tasksArray?.length;

  return true ? (
    <Box>
      <Header
        onClose={onClose}
        dateCreate={dateCreate}
        marginBottom={selectedDateIsEmptyDeals ? "0px" : "40px"}
      />
      <DayContent
        meetings={meetingsArray}
        tasks={tasksArray}
        isSelectedDayDialog={true}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {selectedDateIsEmptyDeals ? "Список дел на выбранную дату пуст" : null}
      </Box>
    </Box>
  ) : (
    <Loader />
  );
});

export default OpenSelectedDay;
