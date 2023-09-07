import { Box, styled } from "@mui/material";
import DayOfWeek from "./components/day-of-week";
import { daysOfWeekArray } from "../../../../mock/day-of-week";

const Components = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 22px;
  justify-content: space-between;
  background: darkGreen;
  border-top: 3px solid gray;
  border-left: 3px solid gray;
  border-right: 3px solid gray;
`;

const DaysOfWeek = () => {
  const daysArray = daysOfWeekArray;

  return (
    <Components>
      {daysArray?.map((day) => (
        <DayOfWeek key={day._id} day={day.name} color={day.color} />
      ))}
    </Components>
  );
};

export default DaysOfWeek;
