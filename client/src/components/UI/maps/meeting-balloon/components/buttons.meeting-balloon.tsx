import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { Dispatch, FC, SetStateAction } from "react";
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";
// store
import { getMeetingById } from "@store/meeting/meetings.store";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import { IMeeting } from "@interfaces/meeting/meeting.interface";
// dialogs
import meetingsDialogsState from "@dialogs/dialog-handlers/meetings.dialog-handlers";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";

interface ButtonsMeetingBalloonProps {
  meetingId: string;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const ButtonsContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 4px;
  margin: 6px 0 0 0;
`;

const ButtonsMeetingBalloon: FC<ButtonsMeetingBalloonProps> = ({
  meetingId,
  setState
}) => {
  const meeting: IMeeting = useSelector(getMeetingById(meetingId));
  const objectId: string = meeting?.objectId;

  const { handleOpenUpdateMeetingPage } = meetingsDialogsState({ setState });
  const { handleOpenObjectPage } = useDialogHandlers(setState);

  return (
    <ButtonsContainer>
      <ButtonStyled
        title="Править встречу"
        style="MEETING"
        size="small"
        width="100%"
        onClick={() => handleOpenUpdateMeetingPage(meetingId)}
      />
      {objectId && (
        <ButtonStyled
          title="Страница объекта"
          style="OBJECT"
          width="100%"
          size="small"
          onClick={() => handleOpenObjectPage(objectId)}
        />
      )}
    </ButtonsContainer>
  );
};

export default ButtonsMeetingBalloon;
