import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";
// utils
import { FormatTime } from "@utils/date/format-time";
// components
import UpdateElementIconButton from "@components/common/button-icons/update-element.button-icon";
import DoneIconToggler from "../../body/components/day/components/done-icon-toggler.calendar-layout";
// icons
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// store
import { updateMeeting } from "@store/meeting/meetings.store";
import meetingsDialogsState from "@dialogs/dialog-handlers/meetings.dialog-handlers";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const ButtonsContainer = styled(Box)`
  display: flex;
`;

const Title = ({ meet, currentUserId, setState }) => {
  const meetingId = meet?._id;
  const isMeetingDone = meet?.isDone;
  const dispatch = useDispatch();

  const isAuthor = meet?.userId === currentUserId;

  const { handleOpenUpdateMeetingPage } = meetingsDialogsState({ setState });

  const handleDoneMeeting = (meet) => {
    const newMeeting = { ...meet, isDone: true };
    dispatch<any>(updateMeeting(newMeeting));
  };

  const handleNotDoneMeeting = (meet) => {
    const newMeeting = { ...meet, isDone: false };
    dispatch<any>(updateMeeting(newMeeting));
  };

  return (
    <Component>
      <Typography sx={{ textDecoration: "underline" }}>
        <b>Встреча в: {FormatTime(meet.time)}</b>
      </Typography>
      {isAuthor ? (
        <ButtonsContainer>
          <UpdateElementIconButton
            onClick={() => handleOpenUpdateMeetingPage(meetingId)}
            isDone={isMeetingDone}
          />

          <DoneIconToggler
            item={meet}
            onDoneItem={handleDoneMeeting}
            onNotDoneItem={handleNotDoneMeeting}
          />
        </ButtonsContainer>
      ) : (
        <Tooltip
          title="Встреча другого пользователя"
          placement="top-start"
          arrow
        >
          <PersonOutlineOutlinedIcon />
        </Tooltip>
      )}
    </Component>
  );
};

export default Title;
