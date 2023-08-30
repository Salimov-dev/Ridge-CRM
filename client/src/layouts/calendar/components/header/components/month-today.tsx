import { Typography } from "@mui/material";
import { capitalizeFirstLetter } from "../../../../../utils/data/capitalize-first-letter";
import dayjs from "dayjs";

const MonthToday = ({ monthIndex }) => {
  return (
    <Typography variant="h2">
      {capitalizeFirstLetter(
        dayjs(new Date(dayjs().year(), monthIndex))
          .locale("ru")
          .format("MMMM YYYY")
      )}
    </Typography>
  );
};

export default MonthToday;
