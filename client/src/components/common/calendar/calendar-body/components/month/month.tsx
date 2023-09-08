import React from "react";
import Day from "./components/day/day";
import { Box, styled } from "@mui/material";

const Component = styled(Box)`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, minmax(200px, auto));
  border: 1px solid gray;
`;

const Month = ({ meetings, tasks, month, setDateCreate }) => {
  return (
    <Component>
      {month?.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day
              day={day}
              key={idx}
              isWeekendColumn={idx === 5 || idx === 6}
              meetings={meetings ? meetings(day) : []}
              tasks={tasks ? tasks(day) : []}
              setDateCreate={setDateCreate}
            />
          ))}
        </React.Fragment>
      ))}
    </Component>
  );
};

export default Month;
