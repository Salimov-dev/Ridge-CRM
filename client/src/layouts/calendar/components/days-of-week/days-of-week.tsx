import { Box } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import DayOfWeek from "./components/day-of-week";

const DaysOfWeek = () => {
  const daysArray = [
    { _id: nanoid(), name: "ПН" },
    { _id: nanoid(), name: "ВТ" },
    { _id: nanoid(), name: "СР" },
    { _id: nanoid(), name: "ЧТ" },
    { _id: nanoid(), name: "ПТ" },
    { _id: nanoid(), name: "СБ" },
    { _id: nanoid(), name: "ВС" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: 'center',
        width: "100%",
        height: '30px',
        justifyContent: "space-between",
        background: "darkGreen",
        borderTop: "3px solid gray",
        borderLeft: "3px solid gray",
        borderRight: "3px solid gray",
      }}
    >
      {daysArray.map((day) => (
        <DayOfWeek key={day._id} day={day.name} />
      ))}
    </Box>
  );
};

export default DaysOfWeek;
