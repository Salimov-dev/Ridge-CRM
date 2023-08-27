import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

export const FormatDate = (date) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Typography variant="body1">{dayjs(date).format("DD.MM.YY")}</Typography>
    </Box>
  );
};
