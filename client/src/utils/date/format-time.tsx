import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

export const FormatTime = (date, variant="body1") => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Typography variant={variant}>{dayjs(date).format("HH:mm")}</Typography>
    </Box>
  );
};
