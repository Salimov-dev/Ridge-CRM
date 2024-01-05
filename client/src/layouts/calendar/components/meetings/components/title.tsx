import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
// utils
import { FormatTime } from "@utils/date/format-time";
// components
import UpdateElementIconButton from "@components/common/buttons/icons buttons/update-element.button-icon";
import DoneIconToggler from "../../tasks/components/done-icon-toggler";
// store
import { updateMeeting } from "@store/meeting/meetings.store";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";

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

  const { handleOpenUpdateMeetingPage } = useDialogHandlers(setState);

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
      <ButtonsContainer>
        {isAuthor ? (
          <UpdateElementIconButton
            onClick={() => handleOpenUpdateMeetingPage(meetingId)}
            isDone={isMeetingDone}
          />
        ) : null}
        {isAuthor ? (
          <DoneIconToggler
            item={meet}
            onDoneItem={handleDoneMeeting}
            onNotDoneItem={handleNotDoneMeeting}
          />
        ) : null}
      </ButtonsContainer>
    </Component>
  );
};

export default Title;
