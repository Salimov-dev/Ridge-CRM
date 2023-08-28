// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timeGridPlugin";
// import interactionPlugin from "@fullcalendar/interactionPlugin";
// import listPlugin from "@fullcalendar/listPlugin";
import { Box, styled } from "@mui/material";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import getMonth from "../../utils/calendar/get-month";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Month from "./components/month";
import { useState } from "react";

const Container = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: columns;
`;

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  return (
    <>
      <LayoutTitle title="Календарь" />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Header />
        <Box sx={{ display: "flex", flex: 1 }}>
          <Sidebar />
          <Month month={currentMonth}/>
        </Box>
      </Box>
      {/* <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" /> */}
    </>
  );
};

export default Calendar;
