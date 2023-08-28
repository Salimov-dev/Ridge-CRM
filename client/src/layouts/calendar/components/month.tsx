import { Box } from "@mui/material";
import Day from "./day";
import React from "react";

const Month = ({ month }) => {
  return (
    <Box
      sx={{
        flex: "1",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)", // То же, что и grid-cols-7
        gridTemplateRows: "repeat(5, 1fr)", // То же, что и grid-rows-5
        height: "100%",
        border: "1px solid gray"
      }}
    >
      {month?.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i}/>
          ))}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Month;
