import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timeGridPlugin";
import interactionPlugin from "@fullcalendar/interactionPlugin";
import listPlugin from "@fullcalendar/listPlugin";
import LayoutTitle from "../../components/common/page-titles/layout-title";

const Calendar = () => {
  return (
    <>
      <LayoutTitle title="Календарь" />
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
    </>
  );
};

export default Calendar;
