import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { getUsersList } from "../../../../../../../../../../store/user/users.store";
import { getMeetingTypesList } from "../../../../../../../../../../store/meeting/meeting-types.store";
import { getMeetingStatusesList } from "../../../../../../../../../../store/meeting/meeting-status.store";

const Body = ({ meet }) => {
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
      <Typography>{getMeetingStatusName(meet?.status)}</Typography>
      <Typography>{getMeetingTypeName(meet?.meetingType)}</Typography>
      <Typography>
        {meet.location.city}, {meet.location.address}
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>
        {getManagerName(meet?.userId)}
      </Typography>
    </>
  );
};

export default Body;
