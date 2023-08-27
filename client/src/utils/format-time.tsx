import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

export const FormatTime = (date) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Typography variant="body1">{dayjs(date).format("HH:mm")}</Typography>
    </Box>
  );
};
