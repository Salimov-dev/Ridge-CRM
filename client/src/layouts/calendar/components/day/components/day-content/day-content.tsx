import { Box, Typography, styled } from "@mui/material";
import { FormatTime } from "../../../../../../utils/date/format-time";
import { useSelector } from "react-redux";
import { getUsersList } from "../../../../../../store/user/users.store";
import { getMeetingTypesList } from "../../../../../../store/meeting/meeting-types.store";
import Loader from "../../../../../../components/common/loader/loader";

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
  padding: 4px;
`;

const DayContent = ({ meeting }) => {
  const users = useSelector(getUsersList());
  const meetingTypes = useSelector(getMeetingTypesList());

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
  return (
    <>
      {meeting ? (
        <MeetingContainer>
          {meeting?.map((meet) => (
            <MeetingItem key={meet._id}>
              <Typography>Встреча в: {FormatTime(meet.time)}</Typography>
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
