import { Box, Typography, styled } from "@mui/material";
// components
import MeetingObject from "./meeting-object";
import MeetingInfo from "./meeting-info";
// utils
import { getUserName } from "@utils/user/get-user-name";
import { getUserNameById } from "@store/user/users.store";
import { useSelector } from "react-redux";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Body = ({ meet, isCurator, isSelectedDayDialog, setState }) => {
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
          <b>Менеджер:</b> {useSelector(getUserNameById(meet?.userId))}
        </Typography>
      ) : null}
      <MeetingObject meet={meet} setState={setState} />
    </Component>
  );
};

export default Body;
