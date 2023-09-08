import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import { FormatTime } from "../../../../../../../../../../../../../utils/date/format-time";
import {
  setIsDoneMeeting,
  setIsNotDoneMeeting,
} from "../../../../../../../../../../../../../store/meeting/meetings.store";
import DoneIconToggler from "../../tasks/components/done-icon-toggler";

import {
  setUpdateMeetingId,
  setUpdateMeetingOpenState,
} from "../../../../../../../../../../../../../store/meeting/update-meeting.store";
import UpdateMeeting from "../../tasks/components/update-meeting";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const ButtonsContainer = styled(Box)`
  display: flex;
`;

const Title = ({ meet }) => {
  const meetingId = meet?._id;
  const isMeetingDone = meet?.isDone;
  const dispatch = useDispatch();

  const handleDoneMeeting = (meet) => {
    const newMeeting = { ...meet, isDone: true };
    dispatch(setIsDoneMeeting(newMeeting));
  };

  const handleNotDoneMeeting = (meet) => {
    const newMeeting = { ...meet, isDone: false };
    dispatch(setIsNotDoneMeeting(newMeeting));
  };

  const handleUpdateMeeting = () => {
    dispatch(setUpdateMeetingId(meetingId));
    dispatch(setUpdateMeetingOpenState(true));
  };
  return (
    <Component>
      <Typography sx={{ fontSize: "15px", textDecoration: "underline" }}>
        <b>Встреча в: {FormatTime(meet.time)}</b>
      </Typography>
      <ButtonsContainer>
        <UpdateMeeting
          onClick={handleUpdateMeeting}
          isMeetingDone={isMeetingDone}
        />
        <DoneIconToggler
          item={meet}
          onDoneItem={handleDoneMeeting}
          onNotDoneItem={handleNotDoneMeeting}
        />
      </ButtonsContainer>
    </Component>
  );
};

export default Title;
