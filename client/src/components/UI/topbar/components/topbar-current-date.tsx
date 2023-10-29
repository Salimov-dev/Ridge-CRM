import dayjs from "dayjs";
import { Typography } from "@mui/material";
import { capitalizeFirstLetter } from "../../../../utils/data/capitalize-first-letter";

const TopBarCurrentDate = () => {
  const currentDate = dayjs();
  const formattedDate = capitalizeFirstLetter(
    currentDate.format("dddd, D MMM")
  ).replace(/\.$/, "");
  return (
    <Typography variant="h5" sx={{ marginRight: "50px", color: "gray" }}>
      {formattedDate}
    </Typography>
  );
};

export default TopBarCurrentDate;
