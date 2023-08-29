import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

export const FormatDate = (date, variant="body1") => {

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Typography variant={variant}>{dayjs(date).format("DD.MM.YY")}</Typography>
    </Box>
  );
};
