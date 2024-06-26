import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getMeetingTypesList } from "@store/meeting/meeting-types.store";
import { getMeetingStatusesList } from "@store/meeting/meeting-status.store";
import DividerStyled from "@components/common/divider/divider-styled";
import {
  getUsersList,
  getCurrentUserId,
  getIsUserCurator,
  getUserNameById,
} from "@store/user/users.store";

const MeetingInfo = ({ meet }) => {
  const users = useSelector(getUsersList());
  const meetingTypes = useSelector(getMeetingTypesList());
  const meetingStatuses = useSelector(getMeetingStatusesList());
  const isMeetingDone = meet?.isDone;

  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));

  const getManagerName = (id) => {
    const user = users?.find((user) => user._id === id);
    const result = useSelector(getUserNameById(user?._id));
    return result;
  };

  const getMeetingTypeName = (id) => {
    const meetingType = meetingTypes?.find((type) => type?._id === id);
    const result = meetingType?.name;

    return result;
  };

  const getMeetingStatusName = (id) => {
    const meetingStatus = meetingStatuses?.find((status) => status?._id === id);
    const result = meetingStatus?.name;

    return result;
  };
  return (
    <>
      <Typography>
        <b>Адрес:</b> {meet.city}, {meet.address}
      </Typography>
      <DividerStyled color={isMeetingDone ? "darkGray" : "gray"} margin="0" />
      <Typography>
        <b>Статус:</b> {getMeetingStatusName(meet?.status)}
      </Typography>
      <Typography>
        <b>Повод:</b> {getMeetingTypeName(meet?.meetingType)}
      </Typography>
      <Typography>
        <b>Комментарий:</b> {meet?.comment}
      </Typography>
      {isCurator ? (
        <Typography>
          <b>Менеджер:</b> {getManagerName(meet?.userId)}
        </Typography>
      ) : null}
    </>
  );
};

export default MeetingInfo;
