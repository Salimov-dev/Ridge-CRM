import { Box, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
// components
import MeetingObject from "./meeting-object";
import MeetingInfo from "./meeting-info";
// utils
import {
  getIsCurrentUserRoleCurator,
  getUserNameById
} from "@store/user/users.store";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Body = ({ meet, isSelectedDayDialog, setState }) => {
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

  return (
    <Component>
      {isSelectedDayDialog ? <MeetingInfo meet={meet} /> : null}
      {!isSelectedDayDialog ? (
        <Typography>
          <b>Комментарий:</b> {meet?.comment}
        </Typography>
      ) : null}
      {isCurrentUserRoleCurator ? (
        <Typography>
          <b>Менеджер:</b> {useSelector(getUserNameById(meet?.userId))}
        </Typography>
      ) : null}
      <MeetingObject meet={meet} setState={setState} />
    </Component>
  );
};

export default Body;
