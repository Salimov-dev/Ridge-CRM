import { Box } from "@mui/material";
import dayjs from "dayjs";

export const FormatTime = (date) => {  
  return <Box sx={{ display: "flex", justifyContent: "center" }}>{dayjs(date).format("HH:mm")}</Box>;
};
