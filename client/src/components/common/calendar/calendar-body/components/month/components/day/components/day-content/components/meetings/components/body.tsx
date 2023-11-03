import Truncate from "react-truncate";
import { Box, Typography } from "@mui/material";
import MeetingObject from "./meeting-object";
import MeetingInfo from "./meeting-info";

const Body = ({ meet, isSelectedDayDialog }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {isSelectedDayDialog ? <MeetingInfo meet={meet} /> : null}
      {!isSelectedDayDialog ? (
        <Truncate lines={2} ellipsis="...">
          <Typography>
            <b>Комментарий:</b> {meet?.comment}
          </Typography>
        </Truncate>
      ) : null}
      <MeetingObject meet={meet} />
    </Box>
  );
};

export default Body;
