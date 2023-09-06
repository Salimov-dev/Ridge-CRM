import { Box } from "@mui/material";
import DayOfWeek from "./components/day-of-week";
import { daysOfWeekArray } from "../../../../mock/day-of-week";

const DaysOfWeek = () => {

  const daysArray = daysOfWeekArray

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "22px",
        justifyContent: "space-between",
        background: "darkGreen",
        borderTop: "3px solid gray",
        borderLeft: "3px solid gray",
        borderRight: "3px solid gray",
      }}
    >
      {daysArray?.map((day) => (
        <DayOfWeek key={day._id} day={day.name} color={day.color} />
      ))}
    </Box>
  );
};

export default DaysOfWeek;
