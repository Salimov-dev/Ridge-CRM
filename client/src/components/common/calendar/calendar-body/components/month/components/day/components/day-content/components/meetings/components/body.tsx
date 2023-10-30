import Truncate from "react-truncate";
import { useSelector } from "react-redux";
import { getObjectsList } from "../../../../../../../../../../../../../store/object/objects.store";
import MeetingObject from "./meeting-object";
import MeetingInfo from "./meeting-info";
import { Box, Typography } from "@mui/material";

const Body = ({ meet, isSelectedDayDialog }) => {
  const objects = useSelector(getObjectsList());

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
      <MeetingObject objects={objects} meet={meet} />
    </Box>
  );
};

export default Body;
