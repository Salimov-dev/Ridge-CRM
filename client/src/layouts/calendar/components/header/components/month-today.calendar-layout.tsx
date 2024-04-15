import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
import { getMonthIndexState } from "@store/month-index.store";

const MonthToday = () => {
  const monthIndex = useSelector(getMonthIndexState());
  return (
    <Typography variant="h2" sx={{ color: "white" }}>
      {capitalizeFirstLetter(
        dayjs(new Date(dayjs().year(), monthIndex))
          .locale("ru")
          .format("MMMM YYYY")
      )}
    </Typography>
  );
};

export default MonthToday;
