import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ru";

const Day = ({ day, rowIdx }) => {
  const isCurrentDay = () => {
    const currentDay = dayjs().format("DD-MM-YY");
    const calendarDay = day.format("DD-MM-YY");
    const isCurrentDay = currentDay === calendarDay;

    return isCurrentDay;
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "start",
        border: "1px solid gray",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {rowIdx === 0 && (
          <Typography>{day.locale("ru").format("dd").toUpperCase()}</Typography>
        )}
        <Typography
          sx={{
            backgroundColor: isCurrentDay() ? "blue" : "inherit",
            padding: "6px 6px 6px 9px",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
          }}
        >
          {day.format("DD")}
        </Typography>
      </Box>
    </Box>
  );
};

export default Day;
