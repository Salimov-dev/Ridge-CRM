import React from "react";
import dayjs from "dayjs";
import Day from "../day/day";
import { orderBy } from "lodash";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { getMeetingsList } from "../../../../store/meeting/meetings.store";

const Month = ({ month, onClick }) => {
  const meetings = useSelector(getMeetingsList());

  const getMeeting = (day) => {
    const meeting = meetings?.filter(
      (meet) => dayjs(meet?.date).format() === dayjs(day)?.format()
    );
    const sortedMeetings = orderBy(meeting, ["date"], ["desc"]);
    return sortedMeetings;
  };

  return (
    <Box
      sx={{
        flex: "1",
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gridTemplateRows: "repeat(5, 1fr)",
        border: "1px solid gray",
      }}
    >
      {month?.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day
              day={day}
              key={idx}
              onClick={onClick}
              isWeekendColumn={idx === 5 || idx === 6}
              meeting={getMeeting(day)}
            />
          ))}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Month;
