import { Box, Typography } from "@mui/material";

const DayOfWeek = ({ day }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography>{day}</Typography>
    </Box>
  );
};

export default DayOfWeek;
