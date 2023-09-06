import React from "react";
import dayjs from "dayjs";
import Day from "./day/day";
import { orderBy } from "lodash";
import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
// store
import { getMeetingsList } from "../../../../store/meeting/meetings.store";
import { getTasksList } from "../../../../store/task/tasks.store";

const Component = styled(Box)`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, minmax(200px, auto));
  border: 1px solid gray;
`;

const Month = ({ month, setDateCreate }) => {
  const meetings = useSelector(getMeetingsList());
  const tasks = useSelector(getTasksList());

  const getMeeting = (day) => {
    const meeting = meetings?.filter(
      (meet) => dayjs(meet?.date).format() === dayjs(day)?.format()
    );
    const sortedMeetings = orderBy(meeting, ["date"], ["asc"]);
    return sortedMeetings;
  };

  const getTask = (day) => {
    const currentTasks = tasks?.filter((task) => {
      const taskDate = dayjs(task?.date);
      const targetDate = dayjs(day);
      return (
        taskDate.format("YYYY-MM-DD") === targetDate.format("YYYY-MM-DD") &&
        taskDate.isSame(targetDate, "day")
      );
    });

    const sortedTasks = orderBy(
      currentTasks,
      [(task) => dayjs(task.time)],
      ["asc"]
    );
    return sortedTasks;
  };

  return (
    <Component>
      {month?.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day
              day={day}
              key={idx}
              isWeekendColumn={idx === 5 || idx === 6}
              meetings={getMeeting(day)}
              tasks={getTask(day)}
              setDateCreate={setDateCreate}
            />
          ))}
        </React.Fragment>
      ))}
    </Component>
  );
};

export default Month;
