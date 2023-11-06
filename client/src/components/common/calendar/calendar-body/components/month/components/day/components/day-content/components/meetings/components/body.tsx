import Truncate from "react-truncate";
import { Box, Typography } from "@mui/material";
import MeetingObject from "./meeting-object";
import MeetingInfo from "./meeting-info";
import { getUserName } from "../../../../../../../../../../../../../utils/user/get-user-name";

const Body = ({ meet, isCurator, isSelectedDayDialog }) => {
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
      {isCurator  ? (
              <Typography>
                <b>Менеджер:</b> {getUserName(meet?.userId)}
              </Typography>
            ) : null}
      <MeetingObject meet={meet} />
    </Box>
  );
};

export default Body;
