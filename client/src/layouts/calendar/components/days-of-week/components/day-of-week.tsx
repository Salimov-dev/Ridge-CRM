import { Box, Typography } from "@mui/material";

const DayOfWeek = ({ day, color }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography sx={{ color: color, fontWeight: "800" }}>{day}</Typography>
    </Box>
  );
};

export default DayOfWeek;
