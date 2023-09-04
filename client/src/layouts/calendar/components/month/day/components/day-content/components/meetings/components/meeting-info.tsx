import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getUsersList } from "../../../../../../../../../../store/user/users.store";
import { getMeetingTypesList } from "../../../../../../../../../../store/meeting/meeting-types.store";
import { getMeetingStatusesList } from "../../../../../../../../../../store/meeting/meeting-status.store";
import DividerStyled from "../../../../../../../../../../components/common/divider/divider-styled";

const MeetingInfo = ({ meet }) => {
  const users = useSelector(getUsersList());
  const meetingTypes = useSelector(getMeetingTypesList());
  const meetingStatuses = useSelector(getMeetingStatusesList());

  const getManagerName = (id) => {
    const user = users?.find((user) => user._id === id);
    const result = `${user?.name.lastName} ${user?.name.firstName}`;
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
        <b>Адрес:</b> {meet.location.city}, {meet.location.address}
      </Typography>
      <DividerStyled />
      <Typography>
        <b>Статус:</b> {getMeetingStatusName(meet?.status)}
      </Typography>
      <Typography>
        <b>Повод:</b> {getMeetingTypeName(meet?.meetingType)}
      </Typography>
      <Typography>
        <b>Менеджер:</b> {getManagerName(meet?.userId)}
      </Typography>
    </>
  );
};

export default MeetingInfo;
