import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import dayjs from "dayjs";
import DayCalendarLayout from "../day/day.calendar-layout";

const Component = styled(Box)`
  flex: 1;
  display: -webkit-grid;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, minmax(200px, auto));
  border: 1px solid gray;
`;

const MonthCalendarLayout = ({ month, setState }) => {
  const [draggableDay, setDraggableDay] = useState(null);

  const formattedDate = dayjs(draggableDay, {
    format: "YYYYMMDDHHmmss"
  }).format("YYYY-MM-DDTHH:mm:ss.SSSZ");

  const handleDragOver = (e, day) => {
    e.preventDefault();
    setDraggableDay(day);
  };
  return (
    <Component>
      {month?.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <DayCalendarLayout
              day={day}
              key={idx}
              draggableDay={formattedDate}
              setDraggableDay={setDraggableDay}
              onDragOver={(e) => handleDragOver(e, day)}
              isWeekendColumn={idx === 5 || idx === 6}
              setState={setState}
            />
          ))}
        </React.Fragment>
      ))}
    </Component>
  );
};

export default MonthCalendarLayout;
