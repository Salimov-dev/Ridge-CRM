import { Box, Typography, styled } from "@mui/material";
import { FormatTime } from "../../../../../../utils/date/format-time";
import { useSelector } from "react-redux";
import { getUsersList } from "../../../../../../store/user/users.store";
import { getMeetingTypesList } from "../../../../../../store/meeting/meeting-types.store";
import Loader from "../../../../../../components/common/loader/loader";
import { getMeetingStatusesList } from "../../../../../../store/meeting/meeting-status.store";
import { chechIsCurrentDay } from "../../../../../../utils/date/check-is-current-day";
import { chechIsFutureDay } from "../../../../../../utils/date/check-is-future-day";

const MeetingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MeetingItem = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: blue;
  padding: 6px;
  border-radius: 4px;
`;

const DayContent = ({ meeting, day }) => {
  const users = useSelector(getUsersList());
  const meetingTypes = useSelector(getMeetingTypesList());
  const meetingStatuses = useSelector(getMeetingStatusesList());

  const isCurrentDay = chechIsCurrentDay(day);
  const isFutureDay = chechIsFutureDay(day);

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
      {meeting ? (
        <MeetingContainer>
          {meeting?.map((meet) => (
            <MeetingItem
              key={meet._id}
              sx={{
                background: isCurrentDay
                  ? "blue"
                  : isFutureDay
                  ? "blue"
                  : "gray",
              }}
            >
              <Typography>Встреча в: {FormatTime(meet.time)}</Typography>
              <Typography>{getMeetingStatusName(meet?.status)}</Typography>
              <Typography>{getMeetingTypeName(meet?.meetingType)}</Typography>
              <Typography>
                {meet.location.city}, {meet.location.address}
              </Typography>
              <Typography>{getManagerName(meet?.userId)}</Typography>
            </MeetingItem>
          ))}
        </MeetingContainer>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default DayContent;
