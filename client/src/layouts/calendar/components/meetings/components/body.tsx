import { Box, Typography, styled } from "@mui/material";
// components
import MeetingObject from "./meeting-object";
import MeetingInfo from "./meeting-info";
// utils
import { getUserName } from "@utils/user/get-user-name";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Body = ({ meet, isCurator, isSelectedDayDialog }) => {

  return (
    <Component>
      {isSelectedDayDialog ? <MeetingInfo meet={meet} /> : null}
      {!isSelectedDayDialog ? (
        <Typography>
          <b>Комментарий:</b> {meet?.comment}
        </Typography>
      ) : null}
      {isCurator ? (
        <Typography>
          <b>Менеджер:</b> {getUserName(meet?.userId)}
        </Typography>
      ) : null}
      <MeetingObject meet={meet} />
    </Component>
  );
};

export default Body;
