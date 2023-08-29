import { Box } from "@mui/material";
import Day from "./day";
import React from "react";

const Month = ({ month }) => {
  
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
            <Day day={day} key={idx} isWeekendColumn={idx === 5 || idx === 6}/>
          ))}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Month;
