import { Box } from "@mui/material";
import dayjs from "dayjs";

export const FormatDate = (date) => {
  
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {dayjs(date).format("DD.MM.YY")}
    </Box>
  );
};
