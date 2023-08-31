import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
import { FormatTime } from "../../../../../../../utils/date/format-time";
import { getUsersList } from "../../../../../../../store/user/users.store";
import { getMeetingTypesList } from "../../../../../../../store/meeting/meeting-types.store";
import { getMeetingStatusesList } from "../../../../../../../store/meeting/meeting-status.store";
import Loader from "../../../../../../../components/common/loader/loader";

const ItemsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ItemContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 6px;
  border-radius: 4px;
`;

const Meetings = ({ meeting, isCurrentDay, isFutureDay }) => {
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
  return meeting ? (
    <ItemsContainer>
      {meeting?.map((meet) => (
        <ItemContainer
          key={meet._id}
          sx={{
            background: isCurrentDay ? "blue" : isFutureDay ? "blue" : "gray",
          }}
        >
          <Typography sx={{ fontSize:'15px',textDecoration: "underline" }}>
           <b>Встреча в: {FormatTime(meet.time)}</b> 
          </Typography>
          <Typography>{getMeetingStatusName(meet?.status)}</Typography>
          <Typography>{getMeetingTypeName(meet?.meetingType)}</Typography>
          <Typography>
            {meet.location.city}, {meet.location.address}
          </Typography>
          <Typography sx={{fontStyle: 'italic'}}>{getManagerName(meet?.userId)}</Typography>
        </ItemContainer>
      ))}
    </ItemsContainer>
  ) : (
    <Loader />
  );
};

export default Meetings;
